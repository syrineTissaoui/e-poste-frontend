import { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';
import logo from '../../assets/images/connexion.png'
import { GiSpinningSword } from 'react-icons/gi';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  if (loading) return <div className="text-center mt-40">Chargement...</div>;
  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, utilisateur } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', utilisateur.id);
      localStorage.setItem('userName', utilisateur.nom);
      localStorage.setItem('userEmail', utilisateur.email);
      localStorage.setItem('userRole', utilisateur.role);

      setUser(utilisateur);
      toast.success('Connexion réussie');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Échec de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-full max-w-6xl ">
        
        <div className="w-1/2 bg-white p-10 text-left">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Se connecter à</h2>
          <h3 className="text-2xl font-semibold text-blue-600">E-Poste</h3>
          <img
            src={logo} // Replace with your illustration path
            alt="login illustration"
            className="mt-12"
          />
        </div>

        {/* Right: Form */}
        <div className="w-1/2  p-10 flex flex-col justify-center">
          <h3 className="text-yellow-500 text-xl mb-6 font-semibold text-center">Accéder à votre compte</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Entrez votre e-mail"
              required
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
              className="w-full px-4 py-3 rounded-md bg-white border border-gray-300"
            />
            <div className="text-right text-sm text-gray-600 hover:underline cursor-pointer">
              Mot de passe oublié ?
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-white w-full py-2 rounded-md font-semibold"
              >
                {loading ? <GiSpinningSword className="animate-spin m-auto" /> : 'Se connecter'}
              </button>
              <button
                type="reset"
                className="bg-yellow-400 hover:bg-yellow-500 text-white w-full py-2 rounded-md font-semibold"
              >
                Annuler
              </button>
            </div>
          </form>
           <p className="px-6 text-sm text-center text-gray-400">
                    ACréer un compte?{' '}
                    <Link to="/signup" className="hover:underline hover:text-lime-500 text-gray-600">
                    signup
                    </Link>
                    .
                  </p>

          <div className="text-center mt-6 text-sm text-gray-500">ou continuer avec</div>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="text-blue-600"><FaFacebookF size={24} /></button>
            <button><FaApple size={24} /></button>
            <button><FcGoogle size={24} /></button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
