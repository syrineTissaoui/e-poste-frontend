import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../../../components/Shared/Container';
import { Helmet } from 'react-helmet-async';
import Heading from '../../../components/Shared/Heading';
import Button from '../../../components/Shared/Button/Button';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import { ImCross } from 'react-icons/im';

const GestionCourrier = () => {
    const { user } = useAuth(); 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [deliveryManID, setDeliveryManID] = useState('');
    const [approximateDeliveryDate, setApproximateDeliveryDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deliveryMen, setDeliveryMen] = useState([]); 
    const [error, setError] = useState(null);

    
    const { data: parcels = [], isLoading, refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/colis`);
            return data;
        },
    });

    
    useEffect(() => {
        const fetchDeliveryMen = async () => {
            try {
                const response = await axios(`${import.meta.env.VITE_API_URL}/utilisateurs`); 
                
                const deliveryMenList = response.data.filter(user => user.role === 'livreur');
                setDeliveryMen(deliveryMenList);
            } catch (error) {
                console.error('Error fetching delivery men:', error);
            }
        };

        fetchDeliveryMen();
    }, []);

    const openModal = (parcel) => {
        setSelectedParcel(parcel);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleAssignDeliveryMan = async () => {
        if (!deliveryManID || !approximateDeliveryDate) return;
    
        
        const selectedDeliveryMan = deliveryMen.find(deliveryMan => deliveryMan._id === deliveryManID);
    
        if (!selectedDeliveryMan) {
            setError('Delivery man not found.');
            return;
        }
    
       
        const payload = {
            parcelID: selectedParcel._id,
            id_colis: selectedParcel.id_colis,
            parcelType: selectedParcel.contenu,
            senderName: selectedParcel.expediteur,
            senderEmail: selectedParcel.senderEmail,
            senderPhone: selectedParcel.phone,
            receiverName: selectedParcel.destinataire,
            deliveryAddress: selectedParcel.adresseDestinataire,
            status: selectedParcel.status,
            weight: selectedParcel.poids,
            cost: selectedParcel.prix,
            requestedDeliveryDate: selectedParcel.dateEnvoi,
        };
    
       
        console.log("Sending request with payload:", payload);
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/assign-parcel`, payload);
    
           
            console.log("Response from server:", response);
    
            await axios.patch(`${import.meta.env.VITE_API_URL}/parcels/${selectedParcel._id}`, {
                deliveryManID,
                deliveryManEmail: selectedDeliveryMan.email,
                approximateDeliveryDate,
                status: "on the way",
            });
    
            refetch();
            closeModal();
        } catch (error) {
            setError('Error assigning DeliveryMan. Please try again.');
            console.error('Error assigning DeliveryMan', error.response ? error.response.data : error);
        } finally {
            setIsSubmitting(false);
        }
    };
    


    if (isLoading) return <LoadingSpinner />;

    return (
        <Container>
            <Helmet>
                <title>Tous Les Couriers</title>
            </Helmet>
            <div className="mx-auto w-full">
                <Heading title="Tous Les Colis"  />
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className=' bg-yellow-200 '>
                               <th className="px-4 py-2 border-b text-left ">id_Colis</th>
                                <th className="px-4 py-2 border-b text-left">Nom expediteur</th>
                                <th className="px-4 py-2 border-b text-left">Nom destinataire</th>
                                <th className="px-4 py-2 border-b text-left">date Recuperation</th>
                                <th className="px-4 py-2 border-b text-left">Heure Recupation</th>
                                <th className="px-4 py-2 border-b text-left">date Envoi</th>
                                <th className="px-4 py-2 border-b text-left">prix</th>
                                <th className="px-4 py-2 border-b text-left">statut</th>

                                <th className="px-4 py-2 border-b text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => {
                                const { _id,id_colis, expediteur, destinataire, heureRecuperation,dateRecuperation ,dateEnvoi, prix, statut } = parcel;

                                return (
                                    <tr key={_id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b">{id_colis}</td>
                                        <td className="px-4 py-2 border-b">{expediteur}</td>
                                        <td className="px-4 py-2 border-b">{destinataire}</td>
                                        <td className="px-4 py-2 border-b">{dateRecuperation}</td>

                                        <td className="px-4 py-2 border-b">{heureRecuperation}</td>
                                        <td className="px-4 py-2 border-b">{dateEnvoi}</td>
                                        <td className="px-4 py-2 border-b">{prix}$</td>
                                        
                                        <td className="px-4 py-2 border-b">{statut}</td>
                                        <td className="px-4 py-2 border-b">
                                            <Button
                                                disabled={statut === 'En attente' || statut === 'Livré' || statut === 'En Transit' || !user}
                                                onClick={() => openModal(parcel)}
                                                label={
                                                    statut === 'En attente' || statut === 'Livré' || statut === 'En Transit'
                                                        ? `${statut.charAt(0).toUpperCase() + statut.slice(1)}`
                                                        : 'Manage Parcel'
                                                }
                                            />



                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="w-96 bg-white rounded-lg shadow-lg p-6 relative">
                            <button
                                className="absolute top-2 right-4 p-4 text-xl text-gray-500 hover:text-red-600"
                                onClick={closeModal}
                            >
                                <ImCross />
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Assign Deliveryman</h2>
                            <div className="mb-4">
                                <label className="block">Select Delivery Man</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-md"
                                    value={deliveryManID}
                                    onChange={(e) => setDeliveryManID(e.target.value)}
                                >
                                    <option value="">-- Select Delivery Man --</option>
                                    {deliveryMen.map((deliveryMan) => (
                                        <option key={deliveryMan._id} value={deliveryMan._id}>
                                            {deliveryMan.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block">Approximate Delivery Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded-md"
                                    value={approximateDeliveryDate}
                                    onChange={(e) => setApproximateDeliveryDate(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <Button
                                label={isSubmitting ? 'Assigning...' : 'Assign Delivery Man'}
                                onClick={handleAssignDeliveryMan}
                                disabled={isSubmitting || !deliveryManID || !approximateDeliveryDate}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default GestionCourrier;
