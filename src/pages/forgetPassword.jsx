// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      toast.success("Lien de réinitialisation envoyé par email.");
      setSent(true);
    } catch (error) {
      console.error(error);
      toast.error("Erreur : impossible d'envoyer l'email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Mot de passe oublié</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Entrez votre email pour recevoir un lien de réinitialisation.
        </p>
        <input
          type="email"
          required
          placeholder="Votre email"
          className="w-full border border-gray-300 p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded"
        >
          Envoyer
        </button>
        {sent && (
          <p className="text-green-600 mt-4 text-center">
            📩 Email envoyé ! Vérifiez votre boîte de réception.
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
