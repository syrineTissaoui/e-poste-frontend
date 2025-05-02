import { Helmet } from 'react-helmet-async'
import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import useRole from '../../../hooks/useRole'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
const Statistics = () => {
  const role = localStorage.getItem('userRole')
  if(role === 'client') return <Navigate to='/dashboard/acceuil-client'></Navigate>
  if(role === 'livreur') return <Navigate to='/dashboard/myDelivery'></Navigate>
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === 'admin' && <AdminStatistics />}
    </div>
  )
}

export default Statistics
