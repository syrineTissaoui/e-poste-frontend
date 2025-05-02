import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";

const HistoriqueEnvois = () => {
  const [envois, setEnvois] = useState([]);
  const [filteredEnvois, setFilteredEnvois] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtreType, setFiltreType] = useState("");
  const [filtreDate, setFiltreDate] = useState("");
  const [selectedEnvoi, setSelectedEnvoi] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clientId = localStorage.getItem('userId'); // or use user ID if stored

  useEffect(() => {
    const fetchEnvois = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/recent-activities?clientId=${clientId}`);
        console.log('res',res.data);
        
        setEnvois(res.data);
        setFilteredEnvois(res.data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    };

    fetchEnvois();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filtrerEnvois(value, filtreType, filtreDate);
  };

  const handleFiltreType = (e) => {
    const value = e.target.value;
    setFiltreType(value);
    filtrerEnvois(searchTerm, value, filtreDate);
  };

  const handleFiltreDate = (e) => {
    const value = e.target.value;
    setFiltreDate(value);
    filtrerEnvois(searchTerm, filtreType, value);
  };

  const filtrerEnvois = (search, type, date) => {
    let data = envois;

    if (search) {
      data = data.filter((envoi) =>
        envoi.c.numeroSuivi.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (type) {
      data = data.filter((envoi) => envoi.type.toLowerCase() === type);
    }
    if (date) {
      data = data.filter((envoi) => envoi.dateEnvoi.startsWith(date));
    }

    setFilteredEnvois(data);
  };

  const openModal = (envoi) => {
    setSelectedEnvoi(envoi);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEnvoi(null);
  };

  const supprimerEnvoi = async (id , type) => {
    if (confirm("Voulez-vous vraiment supprimer cet envoi ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/${type}/${id}`);
        setEnvois((prev) => prev.filter((e) => e._id !== id));
        setFilteredEnvois((prev) => prev.filter((e) => e._id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  const annulerEnvoi = async (id) => {
    if (confirm("Voulez-vous vraiment annuler cet envoi ?")) {
      try {
        await axios.patch(`/api/mes-envois/${id}/annuler`);
        setEnvois((prev) =>
          prev.map((e) => (e._id === id ? { ...e, statut: "annulé" } : e))
        );
        setFilteredEnvois((prev) =>
          prev.map((e) => (e._id === id ? { ...e, statut: "annulé" } : e))
        );
      } catch (error) {
        console.error("Erreur lors de l'annulation :", error);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Historique de mes envois</h1>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par numéro"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded w-60"
        />
        <select
          value={filtreType}
          onChange={handleFiltreType}
          className="p-2 border rounded"
        >
          <option value="">Tous</option>
          <option value="courrier">Courrier</option>
          <option value="colis">Colis</option>
        </select>
        <input
          type="date"
          value={filtreDate}
          onChange={handleFiltreDate}
          className="p-2 border rounded"
        />
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-blue-200">
              <th className="py-2 px-4">Num</th>
              <th className="py-2 px-4">Expéditeur</th>
              <th className="py-2 px-4">Destinataire</th>
              <th className="py-2 px-4">Date d'envoi</th>
              <th className="py-2 px-4">Date de livraison</th>
              <th className="py-2 px-4">Statut</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnvois.map((envoi) => (
              <tr key={envoi.c._id} className="border-t">
                <td className="py-3 px-4">{envoi.c.numeroSuivi}</td>
                <td className="py-3 px-4">{envoi.c.expediteur}</td>
                <td className="py-3 px-4">{envoi.c.destinataire}</td>
                <td className="py-3 px-4">
  {envoi.type === "courrier" 
    ? envoi.c.dateEnvoi 
    : envoi.c.dateExpedition}
</td>                <td className="py-3 px-4">{envoi.c.dateLivraison || "-"}</td>
                <td className="py-3 px-4 capitalize">{envoi.c.statut}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button 
                    onClick={() => openModal(envoi)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    Voir détails
                  </button>

                  {envoi.c.statut === "En Attente" && (
                    <button 
                      onClick={() => annulerEnvoi(envoi._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    >
                      Annuler
                    </button>
                  )}

                  <button 
                    onClick={() => supprimerEnvoi(envoi.c._id ,envoi.type)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modale Voir Details */}
      <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Dialog.Panel className="bg-white rounded-lg p-8 w-full max-w-2xl">
          <button
            onClick={closeModal}
            className="mb-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
          >
            Retour
          </button>

          {selectedEnvoi && (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Détails de l'envoi</h2>
              <p><strong>Num :</strong> {selectedEnvoi.c.numeroSuivi}</p>
              <p><strong>Type :</strong> {selectedEnvoi.type}</p>
              <p><strong>Expéditeur :</strong> {selectedEnvoi.c.expediteur}</p>
              <p><strong>Adresse Expéditeur :</strong> {selectedEnvoi.c.adresseExp}</p>
              <p><strong>Destinataire :</strong> {selectedEnvoi.c.destinataire}</p>
              <p><strong>Adresse Destinataire :</strong> {selectedEnvoi.c.adresseDest}</p>
              <p><strong>Date d'envoi :</strong> {selectedEnvoi.c.date}</p>
              <p><strong>Date de livraison :</strong> {selectedEnvoi.c.dateLivraison || "-"}</p>
              <p><strong>Statut :</strong> {selectedEnvoi.c.statut}</p>
            </div>
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default HistoriqueEnvois;
