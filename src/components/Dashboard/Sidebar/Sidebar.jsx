import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../../assets/images/logo-1.png';
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import {  AiOutlineLogout } from 'react-icons/ai';
import SupportMenu from './Menu/MenuSupport';
import AdminMenu from './Menu/AdminMenu';
import SellerMenu from './Menu/SellerMenu';
import CustomerMenu from './Menu/CustomerMenu';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setActive(!isActive);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Déconnexion réussie');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("---------",res.data.role);
        
        setUser(res.data);
        setRole(res.data.role);
      } catch (err) {
        console.error('Error fetching user:', err);
        toast.error("Échec de récupération de l'utilisateur.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      

      <div className={`rounded-xl z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-blue-700 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive ? 'translate-x-0' : '-translate-x-full '} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
       
          <div className="hidden md:flex flex-col items-center shadow-lg p-4">
            <img className=" rounded-full" src={logo} width="120"alt="User" />
            
       

            <nav>
              {role === 'client' && <CustomerMenu />}
              {role === 'livreur' && <SellerMenu />}
              {role === 'admin' && <AdminMenu />}
              {role === 'support-client' && <SupportMenu />}
            </nav>
          
        
        <div>
         
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-gray-300 hover:text-gray-800 rounded-xl"
          >
            <AiOutlineLogout className="w-5 h-5" />
            <span className="mx-4 font-medium text-white">Déconnecter</span>
          </button>

        
        </div>
      </div>

      {isActive && (
        <div onClick={handleToggle} className="fixed inset-0 bg-black opacity-50 md:hidden" />
      )}
    </>
  );
};

export default Sidebar;
