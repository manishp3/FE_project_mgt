import { CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const [userData, setUserData] = useState(undefined)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('authUser'))
    console.log('Loaded user:', data)
    setUserData(data)
  }, [])

  // Still loading: don't redirect yet
  if (userData === undefined) {
    // return null // or show a loading spinner
    <div className='text-center mt-5'>
      <CSpinner color="primary" />
    </div>
  }

  // If no user found, redirect
  if (userData === null) {
    return <Navigate to="/login" replace />
  }

  // If user exists, render protected content
  return children
}

export default ProtectedRoute
