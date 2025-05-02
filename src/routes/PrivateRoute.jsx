import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const location = useLocation()

  // Check if token exists in localStorage (user is considered authenticated)
  const token = localStorage.getItem('token')

  if (token) {
    return children
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
}

export default PrivateRoute
