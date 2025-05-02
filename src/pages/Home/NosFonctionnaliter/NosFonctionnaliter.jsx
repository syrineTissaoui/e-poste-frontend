import { FaShieldAlt, FaRocket, FaUsers } from "react-icons/fa";
import CountUp from "react-countup"; // Import react-countup for animation
import bg1 from "../../../assets/images/sécurité des envois.jpg"
import bg2 from "../../../assets/images/paiementsecurise.jpg" 
import bg3 from "../../../assets/images/livraison ultra rapide.jpg";
import fullBg from "../../../assets/images/arrier-plan.jpg";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const OurFeatures = () => {
  const axiosSecure = useAxiosSecure();
  const { data: statData, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data } = await axiosSecure('/admin-stat');
      return data;
    },
  });

  const { totalBookings, totalUsers, totalDelivery } = statData || {};

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className="py-24 px-6 bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${fullBg})` }}
    >
      <div className="bg-black bg-opacity-70"></div>

      <div className="max-w-screen-2xl mx-auto text-center z-10">
        <h2 className="text-5xl font-bold text-gray-600 mt-2">
          Nos Fonctionnalités
        </h2>

        <p className="mb-10 border-dotted border-b-8 border-transparent border-green-800 transition-all duration-500 pb-3">
          Découvrez E-poste : des livraisons rapides, sécurisées et un suivi simplifié pour vos colis et courriers.
        </p>
        <div className="divider"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Sécurité des envois */}
          <div
            className="bg-cover bg-center p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500 h-96"
            style={{ backgroundImage: `url(${bg1})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
            <div className="z-10 flex justify-center text-blue-600 text-4xl mb-4">
              <FaShieldAlt size={70} />
            </div>
            <h3 className="relative text-3xl font-semibold mb-2 text-white z-10">Sécurité des envois</h3>
            <p className="text-white z-10">
              À E-poste, nous assurons la sécurité de vos envois avec un suivi en temps réel et un emballage sécurisé.
            </p>
          </div>

          {/* Paiement sécurisé */}
          <div
            className="bg-cover bg-center p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500 h-96"
            style={{ backgroundImage: `url(${bg2})` }} 
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
            <div className="z-10 flex justify-center text-center text-blue-600 text-4xl mb-4">
              <FaUsers size={70} />
            </div>
            <h3 className="relative text-3xl font-semibold mb-2 text-white z-10">Paiement sécurisé</h3>
            <p className="text-white z-10">
              Profitez d'un paiement sécurisé sur E-poste, avec des transactions fiables et protégées pour chaque envoi.
            </p>
          </div>

          {/* Livraison ultra rapide */}
          <div
            className="bg-cover bg-center p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500 h-96"
            style={{ backgroundImage: `url(${bg3})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
            <div className="z-10 flex justify-center text-center text-blue-600 text-4xl mb-4">
              <FaRocket size={70} />
            </div>
            <h3 className="relative text-3xl font-semibold mb-2 text-white z-10">Livraison ultra rapide</h3>
            <p className="text-white z-10">
              Chez E-poste, nous garantissons une livraison rapide et fiable, pour que vos colis arrivent toujours à temps.
            </p>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;