import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { RiListOrdered } from "react-icons/ri";
import MenuItem from './MenuItem';
import { useState, useEffect } from 'react';
import BecomeSellerModal from '../../../Modal/BecomeSellerModal';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // Get user from backend
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const closeModal = () => setIsOpen(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Erreur récupération utilisateur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const requestHandle = async () => {
    try {
      const { data } = await axiosSecure.patch(`/users/${user.email}/role`, {
        role: 'deliveryMan',
      });
      toast.success('Demande envoyée avec succès !');
      setUser({ ...user, role: 'deliveryMan' });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Erreur lors de la demande');
    } finally {
      closeModal();
    }
  };

  if (isLoading) return null;

  return (
    <>
          <MenuItem icon={RiListOrdered} label='Acceuil' address='acceuil-client' />

      <MenuItem icon={BsFillBoxSeamFill} label='Evoyer un Colis' address='envoyer-colis' />
      <MenuItem icon={RiListOrdered} label='Historique' address='historique' />
      <MenuItem icon={RiListOrdered} label='Envoyer un Courrier' address='envoyer-courrier' />


      {user?.role === 'client' && (
        <button
          onClick={() => setIsOpen(true)}
          className='flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform text-gray-600 hover:bg-gray-300 hover:text-gray-700 cursor-pointer'
        >
          <VscGitPullRequestGoToChanges className='w-5 h-5' />
          <span className='mx-4 font-medium'>Request DeliveryMan</span>
        </button>
      )}

      <BecomeSellerModal requestHandle={requestHandle} closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default CustomerMenu;
