import { MdOutlineDashboard } from "react-icons/md";           // Accueil client
import { FaBoxOpen, FaEnvelopeOpenText, FaHistory } from "react-icons/fa"; // Colis, Courrier, Historique
import { IoHomeOutline } from "react-icons/io5";               // Retour accueil public
import { CgProfile } from "react-icons/cg";                    // Profil
import MenuItem from './MenuItem';
import { useState, useEffect } from 'react';
import BecomeSellerModal from '../../../Modal/BecomeSellerModal';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import axios from 'axios';

const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
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
      <MenuItem icon={MdOutlineDashboard} label="Acceuil" address="/dashboard/acceuil-client" />
      <MenuItem icon={FaBoxOpen} label="Envoyer un Colis" address="/dashboard/envoyer-colis" />
      <MenuItem icon={FaHistory} label="Historique" address="/dashboard/historique" />
      <MenuItem icon={FaEnvelopeOpenText} label="Envoyer un Courrier" address="/dashboard/envoyer-courrier" />
      <MenuItem icon={CgProfile} label="Mon Profile" address="/dashboard/profile" />
      <MenuItem icon={IoHomeOutline} label="Retour à la page d'accueil" address="/" />

      <BecomeSellerModal requestHandle={requestHandle} closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default CustomerMenu;
