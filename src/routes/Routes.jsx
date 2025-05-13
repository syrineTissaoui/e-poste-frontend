import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SingUp'

import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'

import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'



import BookParcelForm from '../components/Form/BookParcelForm'

import AllParcels from '../pages/Dashboard/deliveryman/AllParcels'
import AdminRoute from './AdminRoute'


import AllDeliveryMan from '../pages/Dashboard/Admin/AllDeliveriMan'
import MyDeliveryList from '../pages/Dashboard/deliveryman/MyDeliveryList'
import MyReviews from '../pages/Dashboard/deliveryman/MyReviews'
import ParcelLocationPage from '../pages/Dashboard/deliveryman/ParcelLocationPage'
import UpdateParcelForm from '../components/Form/UpdateParcelForm'
import PayParcel from '../pages/Dashboard/Customer/Paiement-courrier'
import AcceuilClient from '../pages/Dashboard/Customer/acceuil-cleint'
import Historique from '../pages/Dashboard/Customer/historique'
import AcceuilLivreur from '../pages/Dashboard/deliveryman/acceuil-livreur'
import AcceuilSupport from '../pages/supportClient/acceuil-support'
import DemandeSupport from "../pages/supportClient/demande-support"
import LandingService from "../pages/nosService"
import Apropos from "../pages/a-propos"
import EnvoyerCourrier from '../pages/Dashboard/Customer/enoyer-courrier'
import EnvoyerColis from '../pages/Dashboard/Customer/envoyer-colis'
import GestionPaiements from '../pages/Dashboard/Admin/gestion-paiement'
import Contact from '../pages/contact'
import GestionCourrier from '../pages/Dashboard/Admin/gestion-courrier'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/NosServices',
        element: <LandingService />,
      },
      {
        path: '/APropos',
        element: <Apropos />,
      },
      {
        path: '/Contact',
        element: <Contact />,
      },
      


    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'Gestion-paiement',
        element: (<PrivateRoute>
          <GestionPaiements></GestionPaiements>
        </PrivateRoute>)
      },
      {
        path: 'Gestion-Courrier',
        element: (<PrivateRoute>
          <GestionCourrier></GestionCourrier>
        </PrivateRoute>)
      },
      
      {
        path: 'envoyer-courrier',
        element: (<PrivateRoute>
          <EnvoyerCourrier></EnvoyerCourrier>
        </PrivateRoute>)
      },
      {
        path: 'envoyer-colis',
        element: (<PrivateRoute>
          <EnvoyerColis></EnvoyerColis>
        </PrivateRoute>)
      },


     
      {
        path: 'acceuil-client',
        element: (
          <PrivateRoute>
            <AcceuilClient></AcceuilClient>
          </PrivateRoute>
        ),
        
      },
      {
        path: 'acceuil-livreur',
        element: (
          <PrivateRoute>
            <AcceuilLivreur></AcceuilLivreur>
          </PrivateRoute>
        ),
        
      },
      {
        path: 'acceuil-support',
        element: (
          <PrivateRoute>
            <AcceuilSupport></AcceuilSupport>
          </PrivateRoute>
        ),
        
      },{
        path: 'Demande-Support',
        element: (
          <PrivateRoute>
            <DemandeSupport></DemandeSupport>
          </PrivateRoute>
        ),
        
      },
      {
        path: 'historique',
        element: (
          <PrivateRoute>
            <Historique></Historique>
          </PrivateRoute>
        ),
        
      },
      {
        path : "paiement-courrier/:id",
        element: <PrivateRoute> <PayParcel></PayParcel> </PrivateRoute>
      },
      {
        path: 'updateParcel/:id',
        element: <PrivateRoute>
          <UpdateParcelForm></UpdateParcelForm>
        </PrivateRoute>,
      },

      {
        path: 'manage-users',
        element: (

          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>


        ),
      },
      {
        path: 'all-deliveryMan',
        element: (

          <PrivateRoute>
            <AdminRoute>
              <AllDeliveryMan></AllDeliveryMan>
            </AdminRoute>
          </PrivateRoute>


        ),
      },
      
      {
        path: 'allParcels',
        element: <PrivateRoute>
          <AdminRoute>
          <AllParcels></AllParcels>
          </AdminRoute>
        </PrivateRoute>
      },
      
      {
        path: 'myDelivery',
        element: <PrivateRoute>
          <MyDeliveryList></MyDeliveryList>
        </PrivateRoute>
      },
      {
        path: 'parcel-location/:id',
        element: <ParcelLocationPage></ParcelLocationPage>
      },
      {
        path: 'myReviews',
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      }

    ],
  },
])
