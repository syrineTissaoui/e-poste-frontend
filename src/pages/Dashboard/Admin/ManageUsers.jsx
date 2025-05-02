import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';

const apiUrl = "http://localhost:5000/api/utilisateurs"; // N'oublie pas de mettre le vrai lien d'API

const GestionUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [filtreRole, setFiltreRole] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("");
  const [modaleVisible, setModaleVisible] = useState(false);
  const [utilisateurSelectionne, setUtilisateurSelectionne] = useState(null);
  const [action, setAction] = useState("modifier");

  useEffect(() => {
  
    fetchUtilisateurs();
  }, []);

  
  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/Utilisateurs");
      setUtilisateurs(res.data);
      console.log("utilisateurs",res.data);
      
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs", error);
      toast.error("Erreur lors du chargement des utilisateurs !");
    }
  };
  const handleModifier = (utilisateur) => {
    setUtilisateurSelectionne(utilisateur);
    setAction("modifier");
    setModaleVisible(true);
  };

  const handleSupprimer = async (utilisateur) => {
    setUtilisateurSelectionne(utilisateur);
    setAction("supprimer");
    setModaleVisible(true);
  };

  const handleAjout = () => {
    setUtilisateurSelectionne(null);
    setAction("ajouter");
    setModaleVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const nouveau = {
      nom: form.nom.value,
      email: form.email.value,
      role: form.role.value,
      motDePasse : form.motDePasse.value,
      status: form.status.value,
    };

    try {
      if (action === "ajouter") {
        await axios.post("http://localhost:5000/api/Utilisateurs", nouveau);
        toast.success("Utilisateur ajouté avec succès !");
      } else if (action === "modifier") {
        await axios.put(`http://localhost:5000/api/Utilisateurs/${utilisateurSelectionne._id}`, nouveau);
        toast.success("Utilisateur modifié avec succès !");
      }
      fetchUtilisateurs();
      setModaleVisible(false);
    } catch (err) {
      console.error("Erreur lors de l'envoi du formulaire", err);
      toast.error("Erreur lors de la mise à jour de l'utilisateur !");
    }
  };

  const confirmerSuppression = async () => {
    try {
      await axios.delete(`${apiUrl}/${utilisateurSelectionne._id}`);
      toast.success("Utilisateur supprimé avec succès !");
      fetchUtilisateurs();
      setModaleVisible(false);
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
      toast.error("Erreur lors de la suppression de l'utilisateur !");
    }
  };

  const utilisateursFiltres = utilisateurs.filter((u) => {
    return (
      (u.nom?.toLowerCase().includes(recherche.toLowerCase()) ||
        u.email?.toLowerCase().includes(recherche.toLowerCase())) &&
      (filtreRole ? u.role === filtreRole : true) &&
      (filtreStatut ? u.status === filtreStatut : true)
    );
  });

  const stats = {
    clients: utilisateurs.filter((u) => u.role === "client").length,
    livreurs: utilisateurs.filter((u) => u.role === "livreur").length,
    supports: utilisateurs.filter((u) => u.role === "support-client").length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-2xl shadow text-center">Clients : {stats.clients}</div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded-2xl shadow text-center">Livreurs : {stats.livreurs}</div>
        <div className="bg-yellow-200 text-yellow-900 p-4 rounded-2xl shadow text-center">Supports : {stats.supports}</div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou email"
          className="p-2 border rounded w-full md:w-auto"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <select className="p-2 border rounded" value={filtreRole} onChange={(e) => setFiltreRole(e.target.value)}>
          <option value="">Tous les rôles</option>
          <option value="client">Client</option>
          <option value="livreur">Livreur</option>
          <option value="support client">Support Client</option>
        </select>
        <select className="p-2 border rounded" value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>
        <button onClick={handleAjout} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
          + Ajouter un utilisateur
        </button>
      </div>

      {/* Tableau */}
      <table className="w-full border text-left shadow rounded overflow-hidden">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rôle</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateursFiltres.map((u) => (
            <tr key={u._id} className="border-t hover:bg-gray-50">
              <td className="p-2">{u.nom}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.status}</td>
              <td className="p-2">{new Date(u.createdAt).toLocaleDateString()}</td>
              <td className="p-2 flex gap-2">
                <button className="text-blue-600" onClick={() => handleModifier(u)}>Modifier</button>
                <button className="text-red-600" onClick={() => handleSupprimer(u)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale */}
      <AnimatePresence>
        {modaleVisible && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white p-6 rounded-2xl w-full max-w-md shadow"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              {action === "supprimer" ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Confirmer la suppression</h2>
                  <p>Voulez-vous vraiment supprimer <strong>{utilisateurSelectionne.nom}</strong> ?</p>
                  <div className="flex justify-end gap-2 mt-4">
                    <button className="text-gray-600" onClick={() => setModaleVisible(false)}>Annuler</button>
                    <button className="text-red-600" onClick={confirmerSuppression}>Supprimer</button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">{action === "ajouter" ? "Ajouter" : "Modifier"} un utilisateur</h2>
                  <form onSubmit={handleSubmit}>
                    <input name="nom" type="text" defaultValue={utilisateurSelectionne?.nom} placeholder="Nom" className="w-full border p-2 mb-2 rounded" required />
                    <input name="email" type="email" defaultValue={utilisateurSelectionne?.email} placeholder="Email" className="w-full border p-2 mb-2 rounded" required />
                    <input name="motDePasse" type="password" defaultValue={utilisateurSelectionne?.motDePasse} placeholder="Mot de passe" className="w-full border p-2 mb-2 rounded" required />

                    <select name="role" defaultValue={utilisateurSelectionne?.role} className="w-full border p-2 mb-2 rounded" required>
                      <option value="client">Client</option>
                      <option value="livreur">Livreur</option>
                      <option value="support client">Support Client</option>
                    </select>
                    <select name="status" defaultValue={utilisateurSelectionne?.status} className="w-full border p-2 mb-2 rounded" required>
                      <option value="actif">Actif</option>
                      <option value="inactif">Inactif</option>
                    </select>
                    <div className="flex justify-end gap-2 mt-4">
                      <button className="text-gray-600" type="button" onClick={() => setModaleVisible(false)}>Annuler</button>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded">{action === "ajouter" ? "Ajouter" : "Modifier"}</button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GestionUtilisateurs;
