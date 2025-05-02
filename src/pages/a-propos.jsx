import React, { useState } from 'react';
import { FaShippingFast, FaShieldAlt, FaMapMarkerAlt } from 'react-icons/fa';
import deliveryImg from '../assets/images/aprposdenos1.gif';

const faqs = [
  { question: 'Quelle est la rapidité de livraison ?', answer: 'Ultra-rapide, toujours à temps.' },
  { question: 'Mon colis est-il sécurisé ?', answer: 'Oui, nous garantissons une sécurité maximale.' },
  { question: 'Quels domaines couvrez-vous ?', answer: 'Nous couvrons toutes les zones selon disponibilité.' },
  { question: 'Mon colis est-il en sécurité pendant le transport ?', answer: 'Oui, tous les colis sont suivis.' },
  { question: 'Puis-je suivre mon colis en temps réel ?', answer: 'Oui, avec notre système de suivi en direct.' }
];

const Apropos = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-6 py-10 space-y-16 bg-gray-50">

      {/* À propos */}
      <section className="about text-center py-10">
        <h2 className="text-6xl font-bold mb-4">À propos de nous</h2>
        <p className="text-xl  max-w-3xl mx-auto text-gray-600">
        Nous transformons la livraison de colis grâce à la rapidité, la sécurité et un suivi fluide. Nous croyons en une livraison sans tracas qui répond aux exigences du monde moderne.        </p>
      </section>
      <section className="mission py-10 flex flex-col md:flex-row items-center gap-6">
        <img src={deliveryImg} className="w-1/2" alt="Mission illustration" />
        <div>
          <h2 className="text-4xl font-bold">Offrir l'excellence</h2>
          <p className="text-xl text-gray-700 mt-2">
          Notre système de gestion des colis est conçu pour simplifier et accélérer le processus de livraison. </p>
          <p className="text-xl text-gray-700 mt-2">
           Que vous envoyiez un petit colis ou un envoi volumineux, nous vous garantissons une livraison fluide,  </p>
           <p className="text-xl text-gray-700 mt-2">
           sécurisée et rapide . </p>
           <p className="text-xl text-gray-700 mt-2">
Bénéficiant d' un suivi innovant en temps réel , </p>
<p className="text-xl text-gray-700 mt-2">
 d'un réseau de livraison professionnel et d'une plateforme facile à utiliser, </p>
 <p className="text-xl text-gray-700 mt-2">
  nous connectons les expéditeurs à des professionnels de la livraison de confiance.      </p>
        </div>
      </section>
      {/* Pourquoi nous choisir */}
      <section className="advantages py-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Pourquoi nous choisir ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="p-6 shadow-md rounded bg-white">
            <FaShippingFast className="text-4xl text-blue-600 mb-2 mx-auto" />
            <h3 className="text-xl font-bold">Livraison ultra-rapide</h3>
            <p>Nous garantissons que vos colis arrivent à temps, à chaque fois, grâce à notre logistique optimisée.</p>
          </div>
          <div className="p-6 shadow-md rounded bg-white">
            <FaShieldAlt className="text-4xl text-green-600 mb-2 mx-auto" />
            <h3 className="text-xl font-bold">Manipulation sécurisée</h3>
            <p>VVos colis sont traités avec soin et précision, vous assurant une sécurité maximale.

</p>
          </div>
          <div className="p-6 shadow-md rounded bg-white">
            <FaMapMarkerAlt className="text-4xl text-purple-600 mb-2 mx-auto" />
            <h3 className="text-xl font-bold">Suivi en temps réel</h3>
            <p>Restez informé grâce à notre suivi de colis en temps réel, garantissant une transparence totale.</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission py-10 flex flex-col md:flex-row items-center gap-6">
        <img src={deliveryImg} className="w-1/2" alt="Mission illustration" />
        <div>
          <h2 className="text-4xl font-bold">Notre mission</h2>
          <p className="text-xl text-gray-700 mt-2">
          Notre objectif est de révolutionner le secteur de la logistique </p>
          <p className="text-xl text-gray-700 mt-2">
           en proposant un système de gestion des colis fluide,  </p>
           <p className="text-xl text-gray-700 mt-2">
           transparent et efficace . Notre objectif est de  </p>
           <p className="text-xl text-gray-700 mt-2">
           rapprocher les expéditeurs et les livreurs, afin que chaque  </p>
           <p className="text-xl text-gray-700 mt-2">
           colis arrive à destination en toute sécurité.          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">❓ Questions fréquemment posées</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded shadow p-4">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left font-medium flex justify-between"
              >
                {faq.question}
                <span>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

    </div>
    
  );
};

export default Apropos;
