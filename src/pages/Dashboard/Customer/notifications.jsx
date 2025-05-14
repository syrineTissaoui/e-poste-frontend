import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io('http://localhost:5000'); 

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [emailNotification, setEmailNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les notifications existantes
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur de récupération des notifications", error);
        setLoading(false);
      }
    };

    fetchNotifications();

    // Écouter les nouvelles notifications en temps réel via WebSocket
    socket.on('newNotification', (newNotification) => {
      console.log('Nouvelle notification reçue:', newNotification);
      setNotifications(prev => [newNotification, ...prev]); // Ajout de la notification en haut de la liste
    });

    // Nettoyer le socket à la destruction du composant
    return () => {
      socket.off('newNotification');
    };
  }, []);

  const handleMarkAsRead = async (id) => {
    await axios.put(`http://localhost:5000/api/notifications/${id}`);
    setNotifications(notifications.map(notification =>
      notification._id === id ? { ...notification, statut: "Lu" } : notification
    ));
  };

  const handlePreferencesChange = async () => {
    await axios.put('http://localhost:5000/api/notifications/preferences', {
      emailNotification,
      smsNotification,
      pushNotification,
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredNotifications = notifications.filter(notification =>
      notification.titre.toLowerCase().includes(query) ||
      notification.description.toLowerCase().includes(query)
    );
    setNotifications(filteredNotifications);
  };

  const handleMarkAllAsRead = async () => {
    await Promise.all(notifications.map(notification => 
      axios.put(`http://localhost:5000/api/notifications/${notification._id}`)
    ));
    setNotifications(notifications.map(notification => ({ ...notification, statut: "Lu" })));
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="notifications-container p-4">
      <h2 className="text-xl font-bold">Notifications</h2>

      {/* Préférences de notifications */}
      <div className="preferences mt-6">
        <h3 className="text-lg font-semibold">Préférences de notifications</h3>
        <div className="flex items-center">
          <input type="checkbox" checked={emailNotification} onChange={() => setEmailNotification(!emailNotification)} />
          <label>Email</label>
        </div>
      
        <div className="flex items-center">
          <input type="checkbox" checked={pushNotification} onChange={() => setPushNotification(!pushNotification)} />
          <label>Push Notification</label>
        </div>
        <button onClick={handlePreferencesChange}>Sauvegarder</button>
      </div>

      {/* Recherche */}
      <input 
        type="text" 
        placeholder="Rechercher une notification..." 
        onChange={handleSearch} 
        className="mt-4 p-2 border-2 rounded-md"
      />

      {/* Notifications */}
      <div className="notifications-list mt-6">
        {notifications.map(notification => (
          <div key={notification._id} className={`notification-item p-4 mb-2 border ${notification.statut === "Lu" ? "bg-gray-200" : "bg-white"}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{notification.titre}</h3>
              <span className="text-sm text-gray-500">{new Date(notification.date).toLocaleString()}</span>
            </div>
            <p className="mt-2">{notification.description}</p>
            <button
              className="mt-2 text-blue-500"
              onClick={() => handleMarkAsRead(notification._id)}
            >
              Marquer comme lu
            </button>
          </div>
        ))}
      </div>

      {/* Marquer toutes les notifications comme lues */}
      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded" onClick={handleMarkAllAsRead}>
        Tout marquer comme lu
      </button>
    </div>
  );
};

export default Notifications;
