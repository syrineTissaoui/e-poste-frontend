
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineRateReview } from "react-icons/md";
import MenuItem from './MenuItem'
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const SupportMenu = () => {
  return (
    <>
      <MenuItem icon={IoHomeOutline} label="Acceuil" address="/dashboard/acceuil-support" />
      <MenuItem icon={CgProfile} label=" Mon Profile" address="/dashboard/profile" />
      <MenuItem icon={TbTruckDelivery} label='Demandes de Support' address='Demande-Support' />
      <MenuItem
        icon={MdOutlineRateReview}
        label='Retour a la page d`acceuil'
        address='/'
      />
    
      
    </>
  )
}

export default SupportMenu
