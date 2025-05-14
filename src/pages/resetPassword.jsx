// src/pages/ResetPassword.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams(); // récupère le token de l'URL
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return toast.error("Les mots de passe ne correspondent pas.");
    }

    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
      toast.success("Mot de passe réinitialisé !");
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error("Lien invalide ou expiré.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Réinitialiser le mot de passe</h2>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full border border-gray-300 p-3 rounded mb-4"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="w-full border border-gray-300 p-3 rounded mb-4"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded"
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
