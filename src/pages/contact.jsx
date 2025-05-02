import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-10">
      {/* Partie gauche : infos contact */}
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-blue-700">Contactez-nous</h2>
        <p className="text-gray-600 text-lg">
          Des questions ? Nous sommes là pour vous aider ! Contactez-nous par courriel, par téléphone ou venez nous voir à nos bureaux.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-blue-600" />
            <span>contact@e-poste.tn</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhone className="text-blue-600" />
            <span>+216 71 000 000</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-blue-600" />
            <span>1 Rue de la Liberté, Tunis</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook className="text-blue-700 text-2xl hover:text-blue-900" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin className="text-blue-700 text-2xl hover:text-blue-900" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="text-blue-700 text-2xl hover:text-blue-900" />
          </a>
        </div>
      </div>

      {/* Partie droite : formulaire */}
      <form className="lg:w-1/2 bg-white p-8 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input type="text" className="w-full px-3 py-2 border rounded-md bg-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded-md bg-gray-100" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Code Postal</label>
          <input type="text" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea className="w-full px-3 py-2 border rounded-md bg-gray-100" rows="4" required></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Joindre un fichier (PDF ou image)</label>
          <input type="file" accept="image/*,.pdf" className="mt-1" />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Envoyer le message
        </button>
      </form>
    </div>
  );
};

export default Contact;
