import { MdOutlineDashboard } from "react-icons/md";            // Accueil livreur
import { FaTruckLoading } from "react-icons/fa";                // Gestion des livraisons
import { IoHomeOutline } from "react-icons/io5";                // Retour à l'accueil site
import { CgProfile } from "react-icons/cg";                     // Mon profil
import MenuItem from './MenuItem';

const SellerMenu = () => {
  return (
    <>
      <MenuItem icon={MdOutlineDashboard} label="Accueil" address="/dashboard/acceuil-livreur" />
      <MenuItem icon={CgProfile} label="Mon Profil" address="/dashboard/profile" />
      <MenuItem icon={FaTruckLoading} label="Gestion des Livraisons" address="/dashboard/myDelivery" />
      <MenuItem icon={IoHomeOutline} label="Retour à la page d'accueil" address="/" />
    </>
  );
};

export default SellerMenu;
