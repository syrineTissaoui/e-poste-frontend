import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Create User (Signup)
  const createUser = async (email, password) => {
    setLoading(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        email,
        password,
      })
      setUser(res.data.user)
      return res.data
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Login
  const signIn = async (email, password) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      setUser(res.data.user)
      return res.data
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logOut = async () => {
    setLoading(true)
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        withCredentials: true,
      })
      setUser(null)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Optional: Update Profile (only if you have such an endpoint)
  const updateUserProfile = async (name, photo, phone) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/profile`,
        { name, photo, phone },
        { withCredentials: true }
      )
      setUser(res.data.user)
    } catch (error) {
      throw error
    }
  }

  // On load, check if user is logged in (optional)
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          withCredentials: true,
        })
        setUser(res.data.user)
      } catch (e) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
