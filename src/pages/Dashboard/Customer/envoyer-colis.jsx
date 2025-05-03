import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


const EnvoyerColis = () => {
  const [expediteur, setExpediteur] = useState({
    nom: "",
    email: "",
    typeColis: "",
    poids: "",
    adresse: "",
    dateRecuperation: "",
    fraisLivraison: 0,
  });

  const [destinataire, setDestinataire] = useState({
    nom: "",
    telephone: "",
    email: "",
    codePostal: "",
    adresse: "",
  });

  const [step, setStep] = useState(1); // 1 = formulaire, 2 = confirmation
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [loading, setLoading] = useState(false); //  Pour gérer un petit chargement
  const [trackingNumber, setTrackingNumber] = useState(""); // Ajout pour le numéro de suivi

  // Calcul automatique des frais selon le poids
  const handlePoidsChange = (e) => {
    const poids = e.target.value;
    const frais = poids * 2; // Exemple: 2 dinars par kg
    setExpediteur((prev) => ({ ...prev, poids, fraisLivraison: frais }));
  };

  const handleExpediteurChange = (e) => {
    const { name, value } = e.target;
    setExpediteur((prev) => ({ ...prev, [name]: value }));
  };

  const handleDestinataireChange = (e) => {
    const { name, value } = e.target;
    setDestinataire((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnnuler = () => {
    // Remettre à zéro les champs
    setExpediteur({
      nom: "",
      email: "",
      typeColis: "",
      poids: "",
      adresse: "",
      dateRecuperation: "",
      fraisLivraison: 0,
    });
    setDestinataire({
      nom: "",
      telephone: "",
      email: "",
      codePostal: "",
      adresse: "",
    });
    setStep(1);
    setConfirmationMessage("");
    setTrackingNumber(""); // Réinitialisation du numéro de suivi
  };

  const handleSuivant = () => {
    // Validation simple avant de passer au résumé
    if (!expediteur.nom || !expediteur.email || !expediteur.typeColis || !expediteur.poids || !expediteur.adresse) {
      alert("Merci de remplir toutes les informations de l'expéditeur.");
      return;
    }
    if (!destinataire.nom || !destinataire.telephone || !destinataire.adresse) {
      alert("Merci de remplir toutes les informations du destinataire.");
      return;
    }
    setStep(2);
  };

  const handleConfirmer = async () => {
    const client_id = localStorage.getItem("userId")
    setLoading(true);
    const numeroSuivi = uuidv4(); // Génère un numéro de suivi
  
    try {
      const payload = {
        numeroSuivi,
        expediteur: expediteur.nom,
        destinataire: destinataire.nom,
        adresseExp: expediteur.adresse,
        adresseDest: destinataire.adresse,
        codePostal: destinataire.codePostal,
        tel: destinataire.telephone,
        type: expediteur.typeColis || "Standard",
        poids: parseFloat(expediteur.poids),
        prix: expediteur.fraisLivraison,
        dateExpedition: expediteur.dateRecuperation || new Date().toISOString(),
        dateLivraison: null,
        historique: "",
        clientId:client_id
      };
  console.log('payload',payload)
      const response = await axios.post("http://localhost:5000/api/colis/envoyer", payload);
  
      if (response.data?.colis?.numeroSuivi) {
        setTrackingNumber(response.data.colis.numeroSuivi);
      }
  
      setConfirmationMessage("Envoi confirmé !");
      handleAnnuler(); // Réinitialise le formulaire
    } catch (error) {
      console.error("Erreur d'envoi :", error.response?.data || error.message);
      setConfirmationMessage("❌ Échec de l'envoi. Veuillez vérifier les champs obligatoires.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Envoyer un Colis</h1>

      {step === 1 ? (
        <div className="flex flex-wrap gap-8">
          {/* Formulaire Expéditeur */}
          <div className="flex-1 bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Informations Expéditeur</h2>
            <form className="space-y-4">
              <input type="text" name="nom" placeholder="Nom" value={expediteur.nom} onChange={handleExpediteurChange} className="w-full p-2 border rounded" />
              <input type="email" name="email" placeholder="Email" value={expediteur.email} onChange={handleExpediteurChange} className="w-full p-2 border rounded" />
              <input type="text" name="typeColis" placeholder="Type de colis" value={expediteur.typeColis} onChange={handleExpediteurChange} className="w-full p-2 border rounded" />
              <input type="number" name="poids" placeholder="Poids du colis (kg)" value={expediteur.poids} onChange={handlePoidsChange} className="w-full p-2 border rounded" />
              <div className="text-yellow-600 font-semibold">
                Frais de livraison : {expediteur.fraisLivraison} TND
              </div>
              <input type="text" name="adresse" placeholder="Adresse d'expéditeur" value={expediteur.adresse} onChange={handleExpediteurChange} className="w-full p-2 border rounded" />
              <input type="date" name="dateRecuperation" value={expediteur.dateRecuperation} onChange={handleExpediteurChange} className="w-full p-2 border rounded" />
            </form>
          </div>

          {/* Formulaire Destinataire */}
          <div className="flex-1 bg-yellow-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Informations Destinataire</h2>
            <form className="space-y-4">
              <input type="text" name="nom" placeholder="Nom" value={destinataire.nom} onChange={handleDestinataireChange} className="w-full p-2 border rounded" />
              <input type="tel" name="telephone" placeholder="Téléphone" value={destinataire.telephone} onChange={handleDestinataireChange} className="w-full p-2 border rounded" />
              <input type="email" name="email" placeholder="Email" value={destinataire.email} onChange={handleDestinataireChange} className="w-full p-2 border rounded" />
              <input type="text" name="codePostal" placeholder="Code Postal" value={destinataire.codePostal} onChange={handleDestinataireChange} className="w-full p-2 border rounded" />
              <input type="text" name="adresse" placeholder="Adresse de destinataire" value={destinataire.adresse} onChange={handleDestinataireChange} className="w-full p-2 border rounded" />
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Résumé de l'envoi</h2>
          <div className="space-y-2">
            <h3 className="font-semibold">Expéditeur :</h3>
            <p>Nom : {expediteur.nom}</p>
            <p>Email : {expediteur.email}</p>
            <p>Type de Colis : {expediteur.typeColis}</p>
            <p>Poids : {expediteur.poids} kg</p>
            <p>Frais Livraison : {expediteur.fraisLivraison} TND</p>
            <p>Adresse : {expediteur.adresse}</p>
            <p>Date de Récupération : {expediteur.dateRecuperation}</p>

            <h3 className="font-semibold mt-6">Destinataire :</h3>
            <p>Nom : {destinataire.nom}</p>
            <p>Téléphone : {destinataire.telephone}</p>
            <p>Email : {destinataire.email}</p>
            <p>Code Postal : {destinataire.codePostal}</p>
            <p>Adresse : {destinataire.adresse}</p>
          </div>
        </div>
      )}

      {/* Boutons */}
      <div className="flex gap-4 mt-8">
        {step === 1 ? (
          <>
            <button onClick={handleAnnuler} className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded">
              Annuler
            </button>
            <button onClick={handleSuivant} className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded">
              Suivant
            </button>
          </>
        ) : (
          <>
            <button onClick={handleAnnuler} className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded">
              Annuler
            </button>
            <button onClick={handleConfirmer} disabled={loading} className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded">
              {loading ? "Envoi en cours..." : "Confirmer"}
            </button>
          </>
        )}
      </div>

      {/* Message Confirmation */}
      {confirmationMessage && (
        <div className="mt-6 text-xl font-semibold text-center">
          {confirmationMessage}
          {trackingNumber && (
            <div className="mt-4 text-lg text-green-600">
              Numéro de suivi : <span className="font-bold">{trackingNumber}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnvoyerColis;