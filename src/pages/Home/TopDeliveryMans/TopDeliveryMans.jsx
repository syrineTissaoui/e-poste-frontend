import { useEffect, useState } from 'react';
import axios from "axios";
import { motion } from 'framer-motion'; // Import framer-motion
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import placeholder from '../../../assets/images/placeholder.jpg'
const TopDeliveryMans = () => {
    const [deliveryMen, setDeliveryMen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopDeliveryMen = async () => {
            try {
const response = await axios.get('http://localhost:5000/api/utilisateurs');  
const livreur = response.data.filter((user) => user.role === "livreur");

setDeliveryMen(livreur); // Assuming the backend returns top delivery men sorted by rating
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Failed to fetch delivery men');
            } finally {
                setLoading(false);
            }
        };

        fetchTopDeliveryMen();
    }, []);

    if (loading) {
        return  <LoadingSpinner></LoadingSpinner>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-10">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-36 ">
        <h2 className="text-5xl font-bold text-gray-600 mt-2 text-center">
        Nos meilleurs livreurs
        </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
      Rencontrez nos livreurs fiables et dévoués, garants de livraisons ponctuelles et d’un service irréprochable
      </p>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {deliveryMen.map((livreur) => (
          <motion.div
            key={livreur._id}
            className="bg-white rounded-lg shadow-md p-6 text-center border hover:shadow-xl transition"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img
  src={livreur.image ? `http://localhost:5000/uploads/${livreur.image}` : '/default-avatar.png'}
  alt={livreur.nom}
  className="rounded-full object-cover w-full h-auto"
/>
            <h3 className="text-xl font-semibold text-blue-800 mb-1">{livreur.nom}</h3>
            <p className="text-gray-500 mb-2">{livreur.email}</p>
            <p className="text-yellow-500 font-bold text-lg mb-1">
              ⭐ 
            </p>
            <p className="text-gray-600">📦 </p>
          </motion.div>
        ))}
      </div>
        </div>
    );
};

export default TopDeliveryMans;
