import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useAuth} from '../Context/AuthContext'

function PrivateRoute() {
    // Retrieve authentication token from the AuthContext
    const { token } = useAuth();
  return (
     // If the user is authenticated (token exists), render the child routes (Outlet)
        // Otherwise, redirect the user to the login page
    token ? <Outlet/> : <Navigate to ="/login"/>
  )
}

export default PrivateRoute