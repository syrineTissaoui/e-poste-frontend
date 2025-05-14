import Container from '../Container';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatarImg from '../../../assets/images/placeholder.jpg';
import logo from '../../../assets/images/logo-1.png';
import Lottie from 'lottie-react';
import menuAnimation from '../../../assets/lottie/menu.json';
import toast from 'react-hot-toast';
import { getDashboardHomeByRole } from '../../../routes/rolesRedirect'; // adapte le chemin selon ton arborescence
import { BsBellFill, BsBellSlashFill } from "react-icons/bs";
import axios from 'axios';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(true);
const [emailNotification, setEmailNotification] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const storedUser = {
      displayName: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      role: localStorage.getItem('userRole'),
    };
    if (storedUser.displayName) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  

    const fetchPreferences = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/utilisateurs/${userId}`);
        setEnabled(res.data.notificationPreferences.email); // ou email si tu préfères
      } catch (err) {
        console.error(err);
      }
    };
    fetchPreferences();
  }, []);

 const toggleNotification = async () => {
    try {
      const updatedValue = !enabled;
      setEnabled(updatedValue);

      await axios.put(`http://localhost:5000/api/utilisateurs/${userId}/preferences`, {
        email: updatedValue,
      });

      toast.success(updatedValue ? "Notifications activées" : "Notifications désactivées");
    } catch (err) {
      console.error(err);
      toast.error("Erreur de mise à jour des notifications");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userStatus');
    toast.success('Déconnexion réussie');
    navigate('/login');
    setUser(null);
  };
const handlePreferencesChange = async () => {
  await axios.put(`http://localhost:5000/api/users/${userId}/preferences`, {
    email: emailNotification,
    push: pushNotification,
  });
  toast.success("Préférences mises à jour");
};

  return (
    <div className="fixed w-full bg-blue-700 z-10 shadow-sm">
      <div className="border-b-[1px] border-gray-500">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Link to="/">
              <img src={logo} alt="logo" width="100" />
            </Link>

            <div className="hidden md:flex gap-6">
              <Link to="/" className="text-white hover:text-black transition font-semibold">Acceuil</Link>
              <Link to="/Apropos" className="text-white hover:text-black transition font-semibold">A propos</Link>
             
              <Link to="/NosServices" className="text-white hover:text-black transition font-semibold">Nos Services</Link>
              <Link to="/Contact" className="text-white hover:text-black transition font-semibold">Contact</Link>

            </div>

            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded--2xl cursor-pointer hover:shadow-md transition"
                >
                  <div className='w-10 h-10'>
                    <Lottie animationData={menuAnimation} loop={true} />
                  </div>
                  <div className="hidden md:block">
                    <img
                      className="rounded-full"
                      src={avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-blue-700 overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {user ? (
                      <>
                        <div className='bg-blue-700'>
                          <h2 className='pl-4 pt-5'>Hello ! <span className='text-blue-50'>{user.displayName}</span></h2>
                          <div className="divider"></div>
                        </div>
                      {user?.role === "client" ? (
  <Link
    to={getDashboardHomeByRole(user.role)}
    className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-200 transition font-semibold"
  >
    <div
      className="cursor-pointer text-xl text-yellow-200 hover:text-yellow-400 transition"
      onClick={(e) => {
        e.preventDefault(); // évite la redirection si on clique sur la cloche
        toggleNotification();
      }}
      title={enabled ? "Notifications activées" : "Notifications désactivées"}
    >
      {enabled ? <BsBellFill /> : <BsBellSlashFill />}
    </div>
    Dashboard
  </Link>
) : (
  <Link
    to={getDashboardHomeByRole(user.role)}
    className="px-4 py-2 hover:bg-neutral-200 transition font-semibold"
  >
    Dashboard
  </Link>
)}

                        <div
                          onClick={handleLogout}
                          className="px-4 py-3 hover:bg-neutral-200 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='bg-blue-700'>
                          <h2 className='px-4 pt-4'>Please login or sign up</h2>
                        </div>
                        <Link to="/login" className="px-4 py-3 hover:bg-neutral-200 transition font-semibold">Login</Link>
                        <Link to="/signup" className="px-4 py-3 hover:bg-neutral-200 transition font-semibold">Sign Up</Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
