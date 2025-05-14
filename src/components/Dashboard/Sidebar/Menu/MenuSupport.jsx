import { MdOutlineDashboard } from "react-icons/md";            // Accueil Support
import { FaHeadset } from "react-icons/fa";                     // Demandes de support
import { IoHomeOutline } from "react-icons/io5";                // Retour accueil site
import { CgProfile } from "react-icons/cg";                     // Mon profil
import MenuItem from './MenuItem';

const SupportMenu = () => {
  return (
    <>
      <MenuItem icon={MdOutlineDashboard} label="Accueil" address="/dashboard/acceuil-support" />
      <MenuItem icon={CgProfile} label="Mon Profil" address="/dashboard/profile" />
      <MenuItem icon={FaHeadset} label="Demandes de Support" address="/dashboard/Demande-Support" />
      <MenuItem icon={IoHomeOutline} label="Retour à la page d'accueil" address="/" />
    </>
  );
};

export default SupportMenu;
