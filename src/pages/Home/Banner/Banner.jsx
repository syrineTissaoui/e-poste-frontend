import bannerBg from '../../../assets/images/accueil.jpg';

import React, { useState } from "react";
import axios from "axios"; // Importer Axios

import { FaClock, FaShippingFast, FaCheckCircle } from "react-icons/fa"; 

const Banner = () => {
  const [numeroSuivi, setNumeroSuivi] = useState("");
  const [statut, setStatut] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [loading, setLoading] = useState(false); 
const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour faire l'appel API réel
  const handleSuivreClick = async () => {
  if (!numeroSuivi.trim()) {
    setErrorMessage("Veuillez saisir un numéro de suivi.");
    setIsModalOpen(true);
    return;
  }

  setLoading(true);
  try {
    const response = await axios.get(`http://localhost:5000/api/colis/${numeroSuivi}`);

    if (!response.data || !response.data.statut) {
      setErrorMessage("Numéro de suivi invalide ou non trouvé.");
      setIsModalOpen(true);
      return;
    }

    setStatut(response.data.statut);
    setErrorMessage('');
    setIsModalOpen(true);
  } catch (error) {
    if (error.response?.status === 404) {
      setErrorMessage("Numéro de suivi incorrect.");
    } else {
      setErrorMessage("Erreur lors de la récupération. Veuillez réessayer plus tard.");
    }
    setIsModalOpen(true);
  } finally {
    setLoading(false);
  }
};


  // Fonction pour fermer la modale
 const closeModal = () => {
  setIsModalOpen(false);
  setStatut(null);
  setErrorMessage('');
};


  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center text-white px-4 bg-black bg-opacity-60">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
          Bienvenue sur Poste TN
        </h1>
        <p className="mt-4 text-lg sm:text-xl max-w-3xl">
          Suivez, envoyez et gérez vos <strong>colis et courriers</strong> en toute simplicité. 
          <br className="hidden lg:block" />
          Une plateforme rapide, sécurisée et 100% tunisienne.
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center w-full max-w-xl space-y-3 md:space-y-0 md:space-x-3">
          <input
            type="text"
            placeholder="Saisissez votre numéro de suivi"
            value={numeroSuivi}
            onChange={(e) => setNumeroSuivi(e.target.value)}
            className="w-full px-4 py-3 rounded-md border-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-2
             focus:ring-lime-500"
          />
          <button
            className=" bg-blue-700 hover: bg-blue-700 text-white font-semibold py-3 px-6 rounded-md"
            onClick={handleSuivreClick}
            disabled={loading} // Désactive le bouton pendant le chargement
          >
            {loading ? "Chargement..." : "Suivre"}
          </button>
        </div>
      </div>

      {/* Modale de suivi */}
     {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-80">
      {errorMessage ? (
        <>
          <h2 className="text-xl font-bold mb-4 text-red-600">Erreur</h2>
          <p className="mb-4">{errorMessage}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Statut de l'envoi</h2>
          <div className="flex items-center mb-4">
            {statut === "En attente" && <FaClock className="text-yellow-500 mr-3" />}
            {statut === "Annulé" && <FaClock className="text-red-500 mr-3" />}
            {statut === "En transit" && <FaShippingFast className="text-blue-500 mr-3" />}
            {statut === "Livré" && <FaCheckCircle className="text-green-500 mr-3" />}
            <p className="text-lg">{statut}</p>
          </div>
        </>
      )}
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-2"
        onClick={closeModal}
      >
        Fermer
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Banner;

