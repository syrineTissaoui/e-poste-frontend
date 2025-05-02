import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import coverImg from '../../../assets/images/coverProfile.jpg';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = {
      displayName: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      role: localStorage.getItem('userRole'),
      uid: localStorage.getItem('userId'),
      photoURL: localStorage.getItem('userPhoto') || '',
      phone: localStorage.getItem('userPhone') || 'Not provided'
    };

    if (storedUser.email) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const handleUpdate = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Mettre à jour le profil',
      html:
        '<input id="swal-name" class="swal2-input" placeholder="Nom complet">' +
        '<input id="swal-phone" class="swal2-input" placeholder="Téléphone">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Mettre à jour',
      preConfirm: () => {
        return {
          nom: document.getElementById('swal-name').value,
          phone: document.getElementById('swal-phone').value
        };
      }
    });

    if (formValues) {
      try {
        await axios.put(`http://localhost:5000/api/utilisateurs/${user.uid}`, {
          nom: formValues.nom,
          phone: formValues.phone
        });

        localStorage.setItem('userName', formValues.nom);
        localStorage.setItem('userPhone', formValues.phone);
        setUser({ ...user, displayName: formValues.nom, phone: formValues.phone });
        toast.success('Profil mis à jour avec succès');
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la mise à jour du profil");
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!user) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500 text-xl">Aucun utilisateur connecté</p>
    </div>
  );

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl'>
        <div className='relative'>
          <img
            alt='cover photo'
            src={coverImg}
            className='w-full h-40 object-cover'
          />
          <div className='absolute inset-0 bg-black bg-opacity-30'></div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <img
              alt='profile'
              src={user.photoURL ? `http://localhost:5000/uploads/${user.photoURL}`: 'https://via.placeholder.com/150'}
              className='mx-auto object-cover rounded-full h-24 w-24 border-4 border-white'
            />
          </div>
        </div>
        <div className='text-center mt-6 p-6'>
          <p className='text-sm btn bg-green-500 rounded-full text-white mb-1'>{user.role}</p>
          <h2 className='text-xl font-semibold text-gray-800'>{user.displayName}</h2>
          <p className='text-gray-600'>{user.email}</p>
          <p className='text-gray-400 text-sm mt-2'>User ID: {user.uid}</p>
          <div className='flex justify-center mt-6'>
            <button 
              onClick={handleUpdate}
              className='bg-lime-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-lime-600'>
              Update Profile
            </button>
          </div>
        </div>
        <div className='border-t border-gray-200 p-4'>
          <h3 className='text-gray-700 font-medium mb-2'>Additional Details</h3>
          <div className='flex justify-between items-center text-sm'>
            <div>
              <p className='text-gray-500'>Role :</p>
              <p className='text-gray-800 font-medium'>{user.role}</p>
            </div>
            <div>
              <p className='text-gray-500'>Phone :</p>
              <p className='text-gray-800 font-medium'>{user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
