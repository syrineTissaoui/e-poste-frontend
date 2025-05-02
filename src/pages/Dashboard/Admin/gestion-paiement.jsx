import { useEffect, useState } from 'react'
import axios from 'axios'
import { FiSearch } from 'react-icons/fi'
import { FaEdit, FaTrash, FaEye, FaExclamationCircle } from 'react-icons/fa'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'


const GestionPaiements = () => {
  const [paiements, setPaiements] = useState([])
  const [filtreNom, setFiltreNom] = useState('')
  const [filtreType, setFiltreType] = useState('')
  const [filtreDate, setFiltreDate] = useState('')
  const [paiementSelectionne, setPaiementSelectionne] = useState(null)
  const [paiementASupprimer, setPaiementASupprimer] = useState(null)
  const [paiementAProbleme, setPaiementAProbleme] = useState(null)
  const [descriptionProbleme, setDescriptionProbleme] = useState('')
  const [actionProbleme, setActionProbleme] = useState('')
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchPaiements = async () => {
      try {
        const [colisRes, courrierRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/colis`),
          axios.get(`${import.meta.env.VITE_API_URL}/courriers`)
        ]);
  
        const paiementsFromColis = colisRes.data.map((colis) => ({
          _id: colis._id,
          numeroPaiement: `COL-${colis._id.slice(-6)}`,
          client: colis.expediteur,
          type: "Colis",
          montant: colis.prix,
          datePaiement: colis.dateEnvoi,
          statut: colis.statut || "en attente",
          moyenPaiement: "Paiement à la livraison"
        }));
  
        const paiementsFromCourriers = courrierRes.data.map((courrier) => ({
          _id: courrier._id,
          numeroPaiement: `COUR-${courrier._id.slice(-6)}`,
          client: courrier.expediteur,
          type: "Courrier",
          montant: courrier.prix,
          datePaiement: courrier.dateEnvoi,
          statut: courrier.statut || "en attente",
          moyenPaiement: "Paiement par carte"
        }));
  
        setPaiements([...paiementsFromColis, ...paiementsFromCourriers]);
      } catch (error) {
        console.error("Erreur lors du chargement des paiements:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPaiements();
  }, []);
  

  const paiementsFiltres = paiements.filter(p =>
    (p.client.toLowerCase().includes(filtreNom.toLowerCase()) ||
      p.numeroPaiement.toLowerCase().includes(filtreNom.toLowerCase())) &&
    (filtreType ? p.type === filtreType : true) &&
    (filtreDate ? p.datePaiement.slice(0, 10) === filtreDate : true)
  )

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/paiements/${paiementASupprimer._id}`)
      setPaiements(paiements.filter(p => p._id !== paiementASupprimer._id))
      alert('Paiement supprimé avec succès ')
    } catch (err) {
      alert('Échec de la suppression ')
    } finally {
      setPaiementASupprimer(null)
    }
  }

  const handleProblemeSubmit = async () => {
    if (!paiementAProbleme) return;
  
    const { _id, type } = paiementAProbleme;
    const basePath = type === "Colis" ? "colis" : "courriers";
  
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/${basePath}/${_id}`, {
        description: descriptionProbleme,
        action: actionProbleme
      });
  
      alert('Problème signalé avec succès !');
  
      // Refresh data from both sources
      const [colisRes, courrierRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/colis`),
        axios.get(`${import.meta.env.VITE_API_URL}/courriers`)
      ]);
  
      const updatedPaiements = [
        ...colisRes.data.map(c => ({
          _id: c._id,
          numeroPaiement: `COL-${c._id.slice(-6)}`,
          client: c.expediteur,
          type: "Colis",
          montant: c.prix,
          datePaiement: c.dateEnvoi,
          statut: c.statut || "en attente",
          moyenPaiement: "Paiement à la livraison"
        })),
        ...courrierRes.data.map(c => ({
          _id: c._id,
          numeroPaiement: `COUR-${c._id.slice(-6)}`,
          client: c.expediteur,
          type: "Courrier",
          montant: c.prix,
          datePaiement: c.dateEnvoi,
          statut: c.statut || "en attente",
          moyenPaiement: "Paiement par carte"
        }))
      ];
  
      setPaiements(updatedPaiements);
    } catch (error) {
      console.error('Erreur lors du signalement du problème :', error);
      alert('Échec du signalement du problème.');
    } finally {
      setPaiementAProbleme(null);
      setDescriptionProbleme('');
      setActionProbleme('');
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Gestion des Paiements</h2>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center border rounded px-2 bg-white shadow">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Nom ou numéro"
            className="ml-2 p-2 outline-none"
            value={filtreNom}
            onChange={(e) => setFiltreNom(e.target.value)}
          />
        </div>
        <select
          className="p-2 rounded border shadow"
          value={filtreType}
          onChange={(e) => setFiltreType(e.target.value)}
        >
          <option value="">Tous les types</option>
          <option value="Colis">Colis</option>
          <option value="Courrier">Courrier</option>
        </select>
        <input
          type="date"
          className="p-2 border rounded shadow"
          value={filtreDate}
          onChange={(e) => setFiltreDate(e.target.value)}
        />
      </div>

      {/* Tableau */}
      {loading ? <LoadingSpinner /> : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">N° Paiement</th>
                <th className="px-3 py-2">Client</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Montant</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Statut</th>
                <th className="px-3 py-2">Moyen</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paiementsFiltres.map((p, i) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2">{p.numeroPaiement}</td>
                  <td className="px-3 py-2">{p.client}</td>
                  <td className="px-3 py-2">{p.type}</td>
                  <td className="px-3 py-2">{p.montant} TND</td>
                  <td className="px-3 py-2">{new Date(p.datePaiement).toLocaleDateString()}</td>
                  <td className="px-3 py-2 font-semibold text-blue-700">{p.statut}</td>
                  <td className="px-3 py-2">{p.moyenPaiement}</td>
                  <td className="px-3 py-2 space-x-2">
                    <button className="text-blue-600 hover:underline" onClick={() => setPaiementSelectionne(p)}><FaEye /></button>
                    <button className="text-yellow-600 hover:text-yellow-800" onClick={() => setPaiementAProbleme(p)}><FaExclamationCircle /></button>
                    {/*  Affiche un symbole visuel s'il y a un problème */}
  {p.probleme && <span title="Problème signalé" className="text-red-500 text-lg">❗</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Détails */}
      {paiementSelectionne && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Détails du Paiement</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>N° Paiement:</strong> {paiementSelectionne.numeroPaiement}</li>
              <li><strong>Client:</strong> {paiementSelectionne.client}</li>
              <li><strong>Type:</strong> {paiementSelectionne.type}</li>
              <li><strong>Montant:</strong> {paiementSelectionne.montant} TND</li>
              <li><strong>Moyen:</strong> {paiementSelectionne.moyenPaiement}</li>
              <li><strong>Date:</strong> {new Date(paiementSelectionne.datePaiement).toLocaleDateString()}</li>
              <li><strong>Statut:</strong> {paiementSelectionne.statut}</li>
            </ul>
            <div className="mt-6 flex justify-end gap-4">
              <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setPaiementSelectionne(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}

     

      {/* Modal Problème Paiement */}
      {paiementAProbleme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
            <h3 className="text-xl font-bold text-yellow-600 mb-4">Signaler un problème</h3>
            <textarea
              rows="3"
              placeholder="Décris le problème..."
              value={descriptionProbleme}
              onChange={(e) => setDescriptionProbleme(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <select
              value={actionProbleme}
              onChange={(e) => setActionProbleme(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Sélectionner une action</option>
              <option value="rembourser">Rembourser le paiement</option>
              <option value="annuler">Annuler le paiement</option>
            </select>
            <div className="flex justify-end gap-4">
              <button className="px-4 py-2 border rounded" onClick={() => setPaiementAProbleme(null)}>Annuler</button>
              <button
                onClick={handleProblemeSubmit}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionPaiements
