import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const [ isLoading] = useRole()
  const role =localStorage.getItem('userRole');
  if (isLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard' replace='true' />
}

AdminRoute.propTypes = {
  children: PropTypes.element,
}

export default AdminRoute