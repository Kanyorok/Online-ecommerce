import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ProtectedRoute = () => {
  
    const {isAuthenticated, user } = useSelector(state => state.auth)
  
  return isAuthenticated && user ? <Outlet/> : <Navigate to='/login'/>
}

export default ProtectedRoute