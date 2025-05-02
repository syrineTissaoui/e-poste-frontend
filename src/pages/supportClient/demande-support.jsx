import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../src/components/Shared/LoadingSpinner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

dayjs.extend(relativeTime);

const DemandeSupport = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tickets, setTickets] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ sujet: '', description: '', utilisateur: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tickets/getAll');
        setTickets(res.data);

        const clientRes = await axios.get('http://localhost:5000/api/clients');
        setClients(clientRes.data);
      } catch (err) {
        setError(err.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (ticket) => {
    const { value: status } = await Swal.fire({
      title: `Changer le statut du ticket #${ticket._id.slice(-5)}`,
      input: 'select',
      inputOptions: {
        Ouvert: 'Ouvert',
        "En cours": 'En cours',
        Résolu: 'Résolu'
      },
      inputPlaceholder: 'Sélectionnez un statut',
      showCancelButton: true
    });

    if (status) {
      try {
        await axios.put(`http://localhost:5000/api/tickets/${ticket._id}`, { statut: status });
        toast.success(`Statut du ticket mis à jour vers ${status}`);
        const updated = await axios.get('http://localhost:5000/api/tickets/getAll');
        setTickets(updated.data);
      } catch (error) {
        toast.error("Erreur lors de la mise à jour du statut");
      }
    }
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tickets', {
        sujet: form.sujet,
        description: form.description,
        utilisateur: form.utilisateur,
      });
      toast.success('Ticket envoyé !');
      setIsModalOpen(false);
      setForm({ sujet: '', description: '', utilisateur: '' });
      const updated = await axios.get('http://localhost:5000/api/tickets/getAll');
      setTickets(updated.data);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi du ticket");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  const statusBadge = (statut) => {
    const base = "px-2 py-1 rounded text-white text-xs font-semibold";
    switch (statut) {
      case 'Résolu': return `${base} bg-green-500`;
      case 'En cours': return `${base} bg-gray-500`;
      case 'Ouvert': return `${base} bg-yellow-400`;
      default: return `${base} bg-red-400`;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-xl font-semibold">Tickets récents</h3>
          <div className="space-x-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm"
            >
              Créer un ticket
            </button>
          </div>
        </div>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Ticket</th>
              <th className="px-6 py-3">Sujet</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Statut</th>
              <th className="px-6 py-3">Dernière mise à jour</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">#{item._id.slice(-5)}</td>
                <td className="px-6 py-4">{item.sujet}</td>
                <td className="px-6 py-4">{item.utilisateur.nom}</td>
                <td className="px-6 py-4">
                  <span className={statusBadge(item.statut)}>{item.statut}</span>
                </td>
                <td className="px-6 py-4">{dayjs(item.dateCreation).format('DD/MM/YYYY')}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleStatusChange(item)}
                    className="text-blue-500 hover:underline"
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Créer un nouveau ticket</h2>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <input
                type="text"
                placeholder="Sujet"
                value={form.sujet}
                onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                required
              />
              <textarea
                placeholder="Description du problème"
                rows="4"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                required
              ></textarea>
              <select
                value={form.utilisateur}
                onChange={(e) => setForm({ ...form, utilisateur: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                required
              >
                <option value="">Sélectionnez un client</option>
                {clients.map(client => (
                  <option key={client._id} value={client._id}>{client.nom}</option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandeSupport;
