
import { IoNotificationsOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import logo from '../../../assets/images/logo-dash.jpg'
import dayjs from 'dayjs';
import { FaBox, FaEnvelope, FaTruck } from 'react-icons/fa';

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const iconByType = {
  colis: <FaBox className="text-green-500 w-6 h-6" />,
  courrier: <FaEnvelope className="text-red-500 w-6 h-6" />,
  livreur: <FaTruck className="text-purple-500 w-6 h-6" />,
};
const AcceuilDashboard = () => {
  const [statData, setStatData] = useState([]);
  const [couriersData, setCouriersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activities, setActivities] = useState([]);
  const [activitiesClient, setActivitiesClient] = useState([]);
  const clientId = localStorage.getItem('userId'); // or use user ID if stored
  if (!clientId) return;
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/activities')
      .then(res => setActivities(res.data))
      .catch(err => console.error(err));
  }, []);
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/admin/recent-activities?clientId=${clientId}`)
      .then(res => setActivitiesClient(res.data))
      .catch(err => console.error(err));
  }, []);

  
  useEffect(() => {
    const fetchStats = async () => {
      try {
 

const { data: colis } = await axios.get(`http://localhost:5000/api/colis/get`, {
  params: { clientId }
});
const { data: courriers } = await axios.get(`http://localhost:5000/api/colis/get`, {
  params: { clientId }
});

       


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

  const colisEnTransit = statData.filter(c => c.statut === 'En transit').length || 0;
  const colisEnAttente = statData.filter(c => c.statut === 'En attente').length || 0;
  const colisLivré = statData.filter(c => c.statut === 'Livré').length || 0;

  


  return (
    <div className="mt-12">
      {/* Stat Cards */}
      <div className="bg-blue-200 text-black rounded-xl shadow-md mb-12 px-6 py-8">
  <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
    
    {/* Left Side - Text Content */}
    <div className="lg:w-2/3">
      <div className="text-left">
        <p className="text-4xl font-semibold">Bienvenue </p>
        <p className="text-4xl font-semibold">cher Client ,</p>
      </div>
      <div className="mt-6 text-left">
        <h4 className="text-xl font-semibold">
Suivez nos envois de maniére plus efficace        </h4>
        
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
        <div className="bg-blue-500 text-white rounded-xl shadow-md">
          <div className="p-4 text-left">
            <p className="text-2xl">En Transit </p>
            </div>
            <div className="p-4 text-left">
            <h4 className="text-2xl font-semibold">{colisEnTransit}</h4>
            </div>
        </div>

        {/* Couriers Envoyés */}
        <div className="bg-blue-400 text-black  rounded-xl shadow-md">
          <div className="p-4 text-left">
            <p className="text-2xl">Livrés</p>
            </div>
            <div className="p-4 text-left">
            <h4 className="text-2xl font-semibold">{colisLivré}</h4>
          </div>
        </div>

        {/* Clients */}
        <div className="bg-red-300 text-black rounded-xl shadow-md">
          <div className="p-4 text-left">
            <p className="text-2xl">En Attente</p>
            </div>
            <div className="p-4 text-left">
            <h4 className="text-2xl font-semibold">{ colisEnAttente}</h4> 
          </div>
        </div>

       
       
      </div>

      {/* Charts */}
      <div className="bg-[#edefff] p-4 rounded-xl mt-4">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Dernières activités</h2>
      <ul className="space-y-2">
        {activitiesClient.map((act, index) => (
          <li key={index} className="flex justify-between items-center bg-white rounded-lg shadow-sm px-4 py-3">
            <div className="flex items-center gap-3">
              {iconByType[act.type] || <FaBox />}
              <div>
                <p className="text-sm font-semibold">#{act.c._id}</p>
                <p className="text-xs text-gray-500">{dayjs(act.createdAt).fromNow()}</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              {act.statut}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AcceuilDashboard;
