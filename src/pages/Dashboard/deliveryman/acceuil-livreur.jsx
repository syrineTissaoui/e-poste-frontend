
import { IoNotificationsOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import logo from '../../../assets/images/logo-dash.jpg'
import dayjs from 'dayjs';
import { FaBox,FaMapMarkerAlt, FaEnvelope, FaTruck } from 'react-icons/fa';
import { MdCalendarToday } from 'react-icons/md';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const iconByType = {
  colis: <FaBox className="text-green-500 w-6 h-6" />,
  courrier: <FaEnvelope className="text-red-500 w-6 h-6" />,
  livreur: <FaTruck className="text-purple-500 w-6 h-6" />,
};
const AcceuilLivreur = () => {
  const [statData, setStatData] = useState([]);
  const [couriersData, setCouriersData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activities, setActivities] = useState([]);
  const [activitiesLivreur, setActivitiesLivreur] = useState([]);
  const livreurId = localStorage.getItem('userId'); // or use user ID if stored
  if (!livreurId) return;
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/activities')
      .then(res => setActivities(res.data))
      .catch(err => console.error(err));
  }, []);
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/admin/recent-activities-livreur?livreurId=${livreurId}`)
      .then(res => {
        setStats(res.data.stats);
        setActivitiesLivreur(res.data.recent);
      })
      .catch(err => console.error(err));
  }, []);

 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: colis } = await axios.get(`http://localhost:5000/api/colis/get-colis-livreur?livreurId=${livreurId}`);
        const { data: courriers } = await axios.get(`http://localhost:5000/api/courriers/?livreurId=${livreurId}`);
        
console.log('colis',colis)

        setStatData(colis);
        setCouriersData(courriers);
     
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  const deliveryManId = localStorage.getItem('userId');
  const colisEnAttente = statData.filter(c => c.statut === 'En attente' && c.Livreur === deliveryManId
  ).length ;
  const colisLivré = statData.filter(c => c.statut === 'Livré' && c.Livreur === deliveryManId
  ).length;
  const courrierEnAttente = couriersData.filter(
    c => c.statut === 'En attente' && c.Livreur === deliveryManId
  ).length;
    const courrierLivré = couriersData.filter(c => c.statut === 'Livré' && c.Livreur === deliveryManId
    ).length;
  

  const renderCards = (items) => (
    items.map((item) => (
      <div key={item._id} className="bg-indigo-100 mb-3 rounded-lg p-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="font-bold text-md mb-1">{item.type === 'colis' ? 'Récupération d’un colis' : 'Livraison d’un courrier'}</p>
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="mr-1 text-red-500" /> {item.adress}
            <MdCalendarToday className="ml-4 mr-1 text-pink-500" /> {item.createdAt || 'N/A'}
            <FaTruck className="ml-4 mr-1 text-yellow-500" /> N° de livraison : {item?.id}
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-gray-800 mr-2">{item.statut}</span>
          <span className="text-lg font-bold text-gray-400">&gt;</span>
        </div>
      </div>
    ))
  );

  return (
    <div className="mt-12">
      {/* Stat Cards */}
      <div className="bg-blue-200 text-black rounded-xl shadow-md mb-12 px-6 py-8">
  <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
    
    {/* Left Side - Text Content */}
    <div className="lg:w-2/3">
      <div className="text-left">
        <p className="text-4xl font-semibold">Bienvenue </p>
        <p className="text-4xl font-semibold">cher Livreur ,</p>
      </div>
      <div className="mt-6 text-left">
        <h4 className="text-xl font-semibold">
Pret pour une nouvelle tournée ?       </h4>
<h4 className="text-xl font-semibold">
Parcours tes livraisons , planifie ton itinéraire   </h4>
<h4 className="text-xl font-semibold">
et roule en toute tranquillité avec E-poste !  </h4>
      </div>
    </div>

    {/* Right Side - Logo */}
    <div className="">
      <img src={logo} alt="logo" width="350" className="object-contain rounded-xl border-4 border-white shadow-lg"/>
    </div>
  </div>
</div>

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Colis Envoyés */}
        <div className="bg-blue-500 text-blue-800 rounded-xl shadow-md">
          <div className="p-4 text-center">
            <p className="text-2xl">Colis Livrés </p>
            </div>
            <div className="p-4 text-center">
            <h4 className="text-2xl font-semibold">{colisLivré}</h4>
            </div>
        </div>

        {/* Couriers Envoyés */}
        <div className="bg-blue-400 text-blue-700  rounded-xl shadow-md">
          <div className="p-4 text-center">
            <p className="text-2xl">Colis en attente</p>
            </div>
            <div className="p-4 text-center">
            <h4 className="text-2xl font-semibold">{colisEnAttente}</h4>
          </div>
        </div>

        {/* Clients */}
        <div className="bg-yellow-400 text-yellow-600 rounded-xl shadow-md">
          <div className="p-4 text-center">
            <p className="text-2xl">Courriers livrés</p>
            </div>
            <div className="p-4 text-center">
            <h4 className="text-2xl font-semibold">{courrierLivré}</h4> 
          </div>
        </div>
        <div className="bg-yellow-200 text-yellow-600 rounded-xl shadow-md">
          <div className="p-4 text-center">
            <p className="text-2xl">Courriers en attente</p>
            </div>
            <div className="p-4 text-center">
            <h4 className="text-2xl font-semibold">{courrierEnAttente}</h4> 
          </div>
        </div>

       
       
      </div>

      {/* Charts */}

      <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Mes Colis et Courriers Assignés</h2>
      {renderCards(activitiesLivreur)}
      
      {activitiesLivreur.length === 0  && (
        <p className="text-center text-gray-500 py-6">Aucun colis ou courrier assigné</p>
      )}
    </div>
       
     
    </div>
  );
};

export default AcceuilLivreur;
