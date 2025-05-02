
import { IoNotificationsOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import logo from '../../../assets/images/logo-dash.jpg'

const AdminStatistics = () => {
  const [statData, setStatData] = useState([]);
  const [couriersData, setCouriersData] = useState([]);
  const [clinetsData, setClientsData] = useState([]);
  const [livreurData, setLivreurData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/activities')
      .then(res => setActivities(res.data))
      .catch(err => console.error(err));
  }, []);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: colis } = await axios.get('http://localhost:5000/api/colis');
        const { data: courriers } = await axios.get('http://localhost:5000/api/courriers');
        const { data: clients } = await axios.get('http://localhost:5000/api/utilisateurs/get-clients');
        const { data: livreurs } = await axios.get('http://localhost:5000/api/utilisateurs/get-livreurs');


        setStatData(colis);
        setCouriersData(courriers);
        setClientsData(clients);
        setLivreurData(livreurs)
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

  const colisCount = statData.length || 0;
  const courierCount = couriersData.length || 0;
  const clientsCount = clinetsData.length || 0;
  const livreursCount = livreurData.length || 0; 

  const salesData = {
    series: [{ name: 'bookings', data: [30, 40, 35, 50, 49, 60, 70] }],
    options: {
      chart: { type: 'bar', height: 350 },
      plotOptions: { bar: { borderRadius: 4, horizontal: false } },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
      title: { text: 'Sales Data', align: 'center' },
    },
  };

  const usageData = {
    series: [{ name: 'App Usage', data: [10, 15, 25, 30, 40, 55, 60] }],
    options: {
      chart: { type: 'line', height: 350 },
      stroke: { width: 3, curve: 'smooth' },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
      title: { text: 'App Usage', align: 'center' },
    },
  };

  return (
    <div className="mt-12">
      {/* Stat Cards */}
      <div className="bg-blue-200 text-black rounded-xl shadow-md mb-12 px-6 py-8">
  <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
    
    {/* Left Side - Text Content */}
    <div className="lg:w-2/3">
      <div className="text-left">
        <p className="text-4xl font-semibold">Bienvenue sur votre</p>
        <p className="text-4xl font-semibold">Espace</p>
        <p className="text-4xl font-semibold">d'administration</p>
      </div>
      <div className="mt-6 text-left">
        <h4 className="text-xl font-semibold">
          Gérez efficacement les colis, courriers,
           paiements et livreurs depuis une seule interface centralisée.
        </h4>
        <h4 className="text-xl font-semibold mt-2">
          Tous les indicateurs sont à jour.
        </h4>
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
        <div className="bg-green-300 text-emerald-600 rounded-xl shadow-md">
          <div className="p-4 text-left">
            <p className="text-2xl">Colis </p>
            <p className="text-2xl"> Envoyés</p>
            </div>
            <div className="p-4 text-center">
            <h4 className="text-2xl font-semibold">{colisCount}</h4>
            </div>
        </div>

        {/* Couriers Envoyés */}
        <div className="bg-green-300 text-emerald-600  rounded-xl shadow-md">
          <div className="p-4 text-left">
            <p className="text-2xl">Couriers</p>
            <p className="text-2xl"> Envoyés</p>
            </div>
            <div className="p-4 text-center">
            <h4 className="text-2xl font-semibold">{courierCount}</h4>
          </div>
        </div>

        {/* Clients */}
        <div className="bg-yellow-200 text-yellow-600 rounded-xl shadow-md">
          <div className="p-4 text-center">
            <p className="text-2xl">Clients</p>
            </div>
            <div className="p-4 text-center">
            <h4 className="text-2xl font-semibold">{clientsCount}</h4> {/* Example static count or replace with real data */}
          </div>
        </div>

        {/* Livreurs */}
        <div className="bg-yellow-200 text-yellow-600 rounded-xl shadow-md">
          <div className="p-4 text-center">
            <p className="text-2xl">Livreurs</p>
            </div>
            <div className="p-4 text-center">
            <h4 className="text-2xl font-semibold">{livreursCount}</h4> {/* Example static count or replace with real data */}
          </div>
        </div>
       
      </div>

      {/* Charts */}
      <div className="mt-12">
      <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-indigo-900 mb-4">Dernières activités</h2>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <li key={index} className="bg-blue-100 rounded-lg px-4 py-3 flex justify-between items-center">
            <div className="flex items-start space-x-3">
              <IoNotificationsOutline className="text-green-600 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-800 font-medium">{activity.message} — <span className="text-gray-600">{activity.date}</span></p>
                <p className="text-xs text-gray-500">{activity.timeAgo}</p>
              </div>
            </div>
            <a href="#" className="text-sm text-blue-700 hover:underline">En savoir plus</a>
          </li>
        ))}
      </ul>
    </div>
</div>
    </div>
  );
};

export default AdminStatistics;
