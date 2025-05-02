import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { Navigate } from 'react-router-dom'

const DeliveryManRoute = ({ children }) => {
  const [ isLoading] = useRole()
  const role =localStorage.getItem('userRole');

  if (isLoading) return <LoadingSpinner />
  if (role === 'livreur') return children
  return <Navigate to='/dashboard' replace='true' />
}

DeliveryManRoute.propTypes = {
  children: PropTypes.element,
}

export default DeliveryManRoute