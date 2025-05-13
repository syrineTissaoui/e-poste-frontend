import bannerBg from '../../../assets/images/accueil.jpg';

import React, { useState } from "react";
import axios from "axios"; // Importer Axios

import { FaClock, FaShippingFast, FaCheckCircle } from "react-icons/fa"; 

const Banner = () => {
  const [numeroSuivi, setNumeroSuivi] = useState("");
  const [statut, setStatut] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [loading, setLoading] = useState(false); 

  // Fonction pour faire l'appel API réel
  const handleSuivreClick = async () => {
    if (!numeroSuivi) {
      return alert("Veuillez saisir un numéro de suivi.");
    }

    setLoading(true); 
    try {
      // Remplace l'URL ci-dessous par l'URL de ton API réelle
      const response = await axios.get(`http://localhost:5000/api/colis/${numeroSuivi}`);

      if (response.data) {
        const { statut } = response.data; 
        setStatut(statut);
        setIsModalOpen(true); 
      } else {
        alert("Numéro de suivi invalide ou non trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors du suivi", error);
      alert("Erreur lors de la récupération du statut. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false); 
    }
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
    setStatut(null);
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
            <h2 className="text-xl font-bold mb-4">Statut de l'envoi</h2>
            <div className="flex items-center mb-4">
              {statut === "En attente" && <FaClock className="text-yellow-500 mr-3" />}
        {statut === "Annulé" && <FaClock className="text-red-500 mr-3" />}

              {statut === "En transit" && <FaShippingFast className="text-blue-500 mr-3" />}
              {statut === "Livré" && <FaCheckCircle className="text-green-500 mr-3" />}
              <p className="text-lg">{statut}</p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
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

