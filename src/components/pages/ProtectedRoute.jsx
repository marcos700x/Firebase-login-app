import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {

    const { currentUser, loading } = useAuth()

    if(loading) return(
        <div className="container-loading">
    <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
        </div>
  )
  if(currentUser && !currentUser.emailVerified) return <Navigate to={'/verify'}/>
  if(!currentUser) return <Navigate to={'/login'}/>
  return <> { children } </> 
}

export default ProtectedRoute