import { useState } from 'react';
import axios from "axios";
import modeleCourriers from '../../../components/Shared/model/modelCourriers';
import { useEffect } from 'react';
export default function EnvoyerCourrier() {
  const [step, setStep] = useState(1);
  const [contenu, setContenu] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const [formData, setFormData] = useState({
    expediteurNom: '',
    expediteurNum: '',
    expediteurEmail: '',
    expediteurTel: '',
    codePostal: '',
    destinataireNom: '',
    destinataireNum: '',
    destinataireAdresse: '',
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [montant, setMontant] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleModelSelect = (model) => {
    setSelectedModel(model.id);
    setContenu(model.contenu);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnvoyerCourrier = async () => {
    const client_id = localStorage.getItem("userId");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/courriers/envoyer", {
        contenu,
        ...formData,
        client_id , 
        montant,
      });
      console.log("montant",montant);
      
      setConfirmationMessage("✅ Envoi du courrier confirmé !");
      setContenu('');
      setFormData({
        expediteurNom: '',
        expediteurNum: '',
        expediteurEmail: '',
        expediteurTel: '',
        codePostal: '',
        destinataireNom: '',
        destinataireNum: '',
        destinataireAdresse: '',
      });
      setStep(1);
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setMontant("");
    } catch (error) {
      console.error(error);
      setConfirmationMessage("❌ Échec de l'envoi du courrier. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const nombrePages = Math.ceil(contenu.length / 1800) || 1;
    setMontant(nombrePages * 2);
  }, [contenu]);
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Envoyer un courrier</h1>
          <p className="text-gray-600">Vous pouvez personnaliser votre courrier ou choisir un modèle prédéfini :</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {modeleCourriers.map((model) => (
              <div
                key={model.id}
                onClick={() => handleModelSelect(model)}
                className={`cursor-pointer border-2 p-4 text-center font-medium rounded shadow ${
                  selectedModel === model.id ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                {model.titre}
              </div>
            ))}
          </div>

          <div className="bg-blue-50 mt-6 p-4 rounded shadow">
            <h2 className="text-xl font-bold text-blue-800">Contenu du courrier</h2>
            <textarea
              placeholder="Écrivez ici le contenu de votre courrier..."
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              className="h-40 w-full border rounded p-2 mt-2"
            />
            <div className="flex justify-between mt-4">
              <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded">Annuler</button>
              <button onClick={() => setStep(2)} className="px-4 py-2 bg-yellow-400 text-white rounded">Suivant</button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-yellow-50 p-4 rounded shadow">
          <h1 className="text-2xl font-bold text-yellow-900">Informations d'expédition</h1>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {Object.entries(formData).map(([name, value]) => (
              <input
                key={name}
                name={name}
                placeholder={name.replace(/([A-Z])/g, ' $1')}
                value={value}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(1)} className="px-4 py-2 border rounded">Retour</button>
            <button onClick={() => setStep(3)} className="px-4 py-2 bg-blue-500 text-white rounded">Continuer</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-blue-100 p-4 rounded shadow">
          <h1 className="text-2xl font-bold text-blue-900">Résumé et paiement</h1>
          <p><strong>Nom destinataire:</strong> {formData.destinataireNom}</p>
          <p><strong>Nombre de pages:</strong> {Math.ceil(contenu.length / 1800) || 1} page(s)</p>
          <p><strong>montant a payer:</strong> { 2 * Math.ceil(contenu.length / 1800) || 1} DT</p>


          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(2)} className="px-4 py-2 border rounded">Retour</button>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-4 py-2 bg-green-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "Confirmer l'envoi"}
            </button>
          </div>
        </div>
      )}

      {/* ✅ Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Informations de paiement</h2>
            <input
              type="text"
              placeholder="Numéro de carte"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-2 border mb-3 rounded"
            />
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full p-2 border mb-3 rounded"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full p-2 border mb-3 rounded"
            />
             <input
              type="text"
              
              value={ montant } DT
              onChange={(e) => setMontant(e.target.value)}
              className="w-full p-2 border mb-3 rounded"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowPaymentModal(false)} className="px-4 py-2 border rounded">Annuler</button>
              <button
                onClick={() => {
                  if (!cardNumber || !expiry || !cvv ) {
                    alert("Veuillez remplir toutes les informations de carte.");
                    return;
                  }
                  setShowPaymentModal(false);
                  handleEnvoyerCourrier();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Valider le paiement
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmationMessage && (
        <div className="mt-6 text-center text-xl font-bold text-green-600">{confirmationMessage}</div>
      )}
    </div>
  );
}
