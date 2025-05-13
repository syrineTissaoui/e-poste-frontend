import { CiBoxList } from "react-icons/ci";
import { FaUsersGear } from "react-icons/fa6";
import { MdDirectionsBike } from "react-icons/md";
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label='Acceuil' address='/dashboard'/>
      <MenuItem icon={CiBoxList} label='Gestion des Colis' address='/dashboard/allParcels'/>
      <MenuItem icon={CiBoxList} label='Gestion des Courriers' address='/dashboard/Gestion-Courrier'/>
      <MenuItem icon={FaUsersGear} label='Gestion des Utilisateurs' address='/dashboard/manage-users'/>
      <MenuItem icon={FaUsersGear} label='Gestion des Paiements' address='/dashboard/Gestion-paiement'/>

      <MenuItem icon={MdDirectionsBike} label='Gestion des Livreurs' address='/dashboard/all-deliveryMan'/>
      <MenuItem icon={CgProfile} label=" Mon Profile" address="/dashboard/profile"/>
      <MenuItem icon={IoHomeOutline} label="Retour a la page d'acceuil" address="/"/>

    </>
  )
}

export default AdminMenu
