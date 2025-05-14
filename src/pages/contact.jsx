import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaFacebook, FaLinkedin, FaTwitter
} from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ nom: '', message: '' });

  const userId = localStorage.getItem('userId'); // l'utilisateur connecté

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) return toast.error("Vous devez être connecté pour envoyer un ticket");

    try {
      await axios.post('http://localhost:5000/api/tickets', {
        sujet: form.nom,
        description: form.message,
        utilisateur: userId
      });

      toast.success("Votre demande a été envoyée avec succès !");
      setForm({ nom: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi du ticket.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-10">
      {/* Informations de contact */}
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-blue-700">Contactez-nous</h2>
        <p className="text-gray-600 text-lg">
          Des questions ? Contactez notre support client.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-blue-600" />
            <span>contact@e-poste.tn</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhone className="text-blue-600" />
            <span>+216 71 000 000</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-blue-600" />
            <span>1 Rue de la Liberté, Tunis</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <a href="#"><FaFacebook className="text-blue-700 text-2xl hover:text-blue-900" /></a>
          <a href="#"><FaLinkedin className="text-blue-700 text-2xl hover:text-blue-900" /></a>
          <a href="#"><FaTwitter className="text-blue-700 text-2xl hover:text-blue-900" /></a>
        </div>
      </div>

      {/* Formulaire de contact -> Ticket */}
      <form onSubmit={handleSubmit} className="lg:w-1/2 bg-white p-8 rounded-lg shadow space-y-4">
       <div>
          
          <label className="block text-sm font-medium">Nom </label>
          <input
            name="nom"
            type="text"
            required
           
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>
        <div>
          
          <label className="block text-sm font-medium">Code Postal </label>
          <input
            name="codePostal"
            type="text"
            required
           
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>
        
        <div>
          
          <label className="block text-sm font-medium">Nom du sujet</label>
          <input
            name="nom"
            type="text"
            required
            value={form.nom}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            rows="5"
            required
            value={form.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
          Envoyer le message
        </button>
      </form>
    </div>
  );
};

export default Contact;
