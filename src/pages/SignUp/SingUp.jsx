import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GiSpinningSword } from "react-icons/gi";
import logo from '../../assets/images/connexion.png'

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const nom = form.nom.value;
    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone.value;
    const codePostal = form.codePostal.value;
    const image = form.image.files[0];

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('codePostal', codePostal);
    formData.append('image', image);

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Inscription réussie !');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Échec de l’inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-full max-w-6xl">
        
        {/* Left side */}
        <div className="w-1/2 bg-white p-10 text-left">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">S'inscrire a </h2>
          <h3 className="text-2xl font-semibold text-blue-600">E-Poste</h3>
          <img
            src={logo}
            alt="Signup illustration"
            className="mt-12"
          />
        </div>

        {/* Right side */}
        <div className="w-1/2 flex flex-col justify-center">
          <h3 className="text-yellow-500 text-xl mb-6 font-semibold text-center">Rejoingdre e-poste</h3>
          <form onSubmit={handleSubmit} className="space-y-4">

            <input name="nom" type="text" required placeholder="Nom complet"
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-300" />

            <input name="email" type="email" required placeholder="Email"
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-300" />

            <input name="password" type="password" required placeholder="Mot de passe"
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-300" />

            <input name="phone" type="text" required placeholder="Téléphone"
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-300" />

            <input name="codePostal" type="text" required placeholder="Code postal"
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-300" />

           

            <input name="image" type="file" accept="image/*"
              className="w-full bg-white border border-gray-300 p-2 rounded-md" />

            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white w-full py-3 rounded-md font-semibold"
            >
              {loading ? <GiSpinningSword className="animate-spin m-auto" /> : 'Créer un compte'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Connectez-vous</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
