import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import logo from '../../../assets/images/logo-1.png';
const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* LOGO / DESCRIPTION */}
        <div>
          <img src={logo} alt="e-Poste Logo" className="w-24 mb-3" />
          <p className="text-sm text-gray-300">
            e-Poste, votre solution rapide et fiable pour envoyer et suivre vos colis et courriers partout en Tunisie.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Nos services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>📦 Envoi de colis</li>
            <li>✉️ Envoi de courriers</li>
            <li>📍 Suivi en temps réel</li>
            <li>🚚 Livraison à domicile</li>
          </ul>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="text-lg font-semibold mb-3">E-Poste</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/">🏠 Accueil</Link></li>
            <li><Link to="/NosServices">🛠️ Services</Link></li>
            <li><Link to="/APropos">📘 À propos</Link></li>
            <li><Link to="/Contact">📩 Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT + RÉSEAUX */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-300 mb-1">📍 13 Rue Hedi Nouira, Tunis</p>
          <p className="text-sm text-gray-300 mb-1">📞 +216 71 839 000</p>
          <p className="text-sm text-gray-300 mb-3">✉️ contact@e-poste.tn</p>

          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-white hover:text-blue-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-white hover:text-blue-400" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="text-white hover:text-blue-400" />
            </a>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-400 mt-10 text-sm">
        &copy; {new Date().getFullYear()} e-Poste. Tous droits réservés.
      </div>
    </footer>
  )
}

export default Footer
