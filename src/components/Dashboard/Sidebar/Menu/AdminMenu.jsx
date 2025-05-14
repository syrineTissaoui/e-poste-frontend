import { MdOutlineDashboard } from "react-icons/md";          // Acceuil
import { FaBoxOpen, FaMailBulk } from "react-icons/fa";       // Colis / Courriers
import { FaUsersCog } from "react-icons/fa";                  // Utilisateurs
import { MdPayments } from "react-icons/md";                  // Paiements
import { RiMotorbikeLine } from "react-icons/ri";             // Livreurs
import { CgProfile } from "react-icons/cg";                   // Profil
import { IoHomeOutline } from "react-icons/io5";              // Accueil public
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={MdOutlineDashboard} label="Acceuil" address="/dashboard" />
      <MenuItem icon={FaBoxOpen} label="Gestion des Colis" address="/dashboard/allParcels" />
      <MenuItem icon={FaMailBulk} label="Gestion des Courriers" address="/dashboard/Gestion-Courrier" />
      <MenuItem icon={FaUsersCog} label="Gestion des Utilisateurs" address="/dashboard/manage-users" />
      <MenuItem icon={MdPayments} label="Gestion des Paiements" address="/dashboard/Gestion-paiement" />
      <MenuItem icon={RiMotorbikeLine} label="Gestion des Livreurs" address="/dashboard/all-deliveryMan" />
      <MenuItem icon={CgProfile} label="Mon Profile" address="/dashboard/profile" />
      <MenuItem icon={IoHomeOutline} label="Retour à la page d'accueil" address="/" />
    </>
  );
};

export default AdminMenu;
