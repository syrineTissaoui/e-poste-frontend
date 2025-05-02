import { FaTruck, FaGlobe, FaMapMarkedAlt, FaBoxes, FaHome, FaMapMarkerAlt, FaShippingFast, FaBoxOpen, FaQuestionCircle, FaCheckCircle, FaClock, FaHeadset, FaDollarSign } from 'react-icons/fa';
import logo from "../assets/images/services.jpg"
const services = [
  {
    title: "Livraison le jour même",
    desc: "Livraison urgente en ville. Recevez votre colis le jour même.",
    icon: <FaTruck className="text-yellow-500 text-3xl" />,
  },
  {
    title: "Expédition express",
    desc: "Expédition rapide et sécurisée dans tout le pays avec une garantie de 24 à 48 heures.",
    icon: <FaShippingFast className="text-yellow-500 text-3xl" />,
  },
  {
    title: "Expédition internationale",
    desc: "Livraison mondiale avec suivi en temps réel et dédouanement.",
    icon: <FaGlobe className="text-yellow-500 text-3xl" />,
  },
  {
    title: "Suivi des colis en direct",
    desc: "Suivez votre colis en temps réel grâce à notre système de suivi avancé.",
    icon: <FaMapMarkedAlt className="text-yellow-500 text-3xl" />,
  },
  {
    title: "Expédition en vrac et commerciale",
    desc: "Solutions abordables pour les entreprises avec des remises sur volume.",
    icon: <FaBoxes className="text-yellow-500 text-3xl" />,
  },
  {
    title: "Ramassage à domicile",
    desc: "Nous récupérons votre colis à votre emplacement pour une expédition sans tracas.",
    icon: <FaHome className="text-yellow-500 text-3xl" />,
  },
];

const steps = [
  {
    title: "1. Réservez un ramassage",
    desc: "Planifiez un ramassage depuis votre domicile ou bureau via notre application ou site Web.",
    icon: <FaMapMarkerAlt className="text-blue-600 text-3xl" />,
  },
  {
    title: "2. Nous le collectons",
    desc: "Notre coursier arrivera à l'heure prévue pour récupérer votre colis.",
    icon: <FaBoxOpen className="text-blue-600 text-3xl" />,
  },
  {
    title: "3. Suivez votre envoi",
    desc: "Utilisez notre système de suivi pour suivre votre colis en temps réel.",
    icon: <FaGlobe className="text-blue-600 text-3xl" />,
  },
  {
    title: "4. Livraison à votre porte",
    desc: "Votre colis arrive à destination, rapidement et en toute sécurité.",
    icon: <FaShippingFast className="text-blue-600 text-3xl" />,
  },
];

const LandingService = () => {
  return (
    <div className="px-6 py-10 space-y-16 bg-gray-50">
        
      {/* Hero */}
  <div
            className="bg-cover bg-center  flex flex-col  items-center justify-between bg-gradient-to-b from-pink-200 to-white px-15 py-12" 
            style={{ backgroundImage: `url(${logo})` }}
        >       
         <h1 className="text-4xl md:text-6xl font-bold text-blue-900">Nos services de messagerie</h1>
        <p className="mt-4 text-lg text-gray-600">
          Livraison de colis rapide, sécurisée et fiable pour les entreprises et les particuliers.
          Expédiez localement et à l'international en toute confiance.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="mb-4 items-center">{service.icon}</div>
            <h3 className="text-lg font-bold">{service.title}</h3>
            <p className="text-sm mt-2 text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Section: Comment ça marche */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-10">Comment ça marche</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg text-center">
              <div className="mb-4">{step.icon}</div>
              <h4 className="font-semibold text-lg">{step.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pourquoi choisir */}
      <div className="bg-gray-100 p-6 text-center rounded-lg space-y-4 mt-12">
        <h2 className="text-2xl font-bold">Pourquoi choisir Courier-Z ?</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-4">
          <div className="flex items-center gap-2">
            <FaDollarSign className="text-yellow-500" />
            <span>Tarifs abordables et sans frais cachés</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeadset className="text-yellow-500" />
            <span>Assistance clientèle 24h/24 et 7j/7</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkedAlt className="text-yellow-500" />
            <span>Suivi et mises à jour en temps réel</span>
          </div>
        </div>
      </div>

      {/* Support CTA */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold text-blue-800">Besoin d'aide?</h3>
        <p className="text-gray-600 mt-2">
          Contactez notre service client pour toute question ou assistance concernant l'expédition.
        </p>
        <button className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-semibold shadow">
          Contactez-nous
        </button>
      </div>
    </div>
  );
};

export default LandingService;
