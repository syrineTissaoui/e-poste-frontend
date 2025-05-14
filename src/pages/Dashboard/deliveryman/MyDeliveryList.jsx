import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast';
import axios from 'axios';

const MyDeliveryList = () => {
  const queryClient = useQueryClient();
  const deliveryManId = localStorage.getItem('userId');

  const [filtreType, setFiltreType] = useState('');
  const [filtreDate, setFiltreDate] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['my-deliveries', deliveryManId],
    queryFn: async () => {
      const [colisRes, courriersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/colis'),
        axios.get('http://localhost:5000/api/courriers')
      ]);
      return {
        colis: colisRes.data,
        courriers: courriersRes.data
      };
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const filteredColis = data.colis.filter((item) => item.Livreur === deliveryManId);
  const filteredCourriers = data.courriers.filter((item) => item.Livreur === deliveryManId);

  const handleCancel = async (item, type) => {
    if (item.statut !== 'En attente') {
      Swal.fire({ icon: 'error', title: 'Erreur !', text: "L'élément ne peut être annulé que s’il est en attente." });
      return;
    }

    const confirmed = await Swal.fire({
      title: `Voulez-vous annuler cet élément : ${item._id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, annuler',
      cancelButtonText: 'Non',
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.put(`http://localhost:5000/api/${type}/${item._id}`, { statut: 'Annulé' });
        queryClient.invalidateQueries(['my-deliveries']);
        toast.success(`${type === 'colis' ? 'Colis' : 'Courrier'} ${item._id} annulé.`);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'annulation.");
      }
    }
  };

  const handleDeliver = async (item, type) => {
    const confirmed = await Swal.fire({
      title: `Confirmer la livraison de ${item._id} ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, livré',
      cancelButtonText: 'Non',
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.put(`http://localhost:5000/api/${type}/${item._id}`, { statut: 'Livré' });
        queryClient.invalidateQueries(['my-deliveries']);
        toast.success(`${type === 'colis' ? 'Colis' : 'Courrier'} ${item._id} marqué comme livré.`);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la mise à jour.");
      }
    }
  };

  const renderRows = (items, type) => {
    if (filtreType && type !== filtreType) return null;

   const filtered = items.filter((item) => {
  if (filtreDate) {
    return item.dateLivraison && item.dateLivraison.startsWith(filtreDate);
  }
  return true;
});

    return filtered.map((item) => (
      <tr key={item._id} className="text-center">
        <td className="border px-4 py-2">{type === 'colis' ? 'Colis' : 'Courrier'}</td>
        <td className="border px-4 py-2">{item.destinataire}</td>
        <td className="border px-4 py-2">{item.tel}</td>
        <td className="border px-4 py-2">{item.adresseDest}</td>
        <td className="border px-4 py-2 font-medium">{item.statut}</td>
        <td className="border px-4 py-2">
          {item.dateLivraison ? new Date(item.dateLivraison).toLocaleDateString() : '-'}
        </td>
        <td className="border px-4 py-2 space-x-2">
          {(item.statut === 'En attente' || item.statut === 'En Transit') && (
            <>
              <button
                onClick={() => handleCancel(item, type)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeliver(item, type)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Livré
              </button>
            </>
          )}
          {item.statut === 'Livré' && (
            <span className="bg-gray-300 px-3 py-1 rounded text-gray-700">
              Livré
            </span>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Mes Colis et Courriers Assignés</h2>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filtreType}
          onChange={(e) => setFiltreType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Tous les types</option>
          <option value="colis">Colis</option>
          <option value="courriers">Courriers</option>
        </select>

        <input
          type="date"
          value={filtreDate}
          onChange={(e) => setFiltreDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Destinataire</th>
              <th className="px-4 py-2 border">Téléphone</th>
              <th className="px-4 py-2 border">Adresse</th>
              <th className="px-4 py-2 border">Statut</th>
              <th className="px-4 py-2 border">Date de livraison</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {renderRows(filteredColis, 'colis')}
            {renderRows(filteredCourriers, 'courriers')}
            {filteredColis.length === 0 && filteredCourriers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  Aucun colis ou courrier assigné
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveryList;
