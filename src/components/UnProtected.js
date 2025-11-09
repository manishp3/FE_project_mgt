import { CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const UnProtected = ({ children }) => {
  const [UserData, setUserData] = useState(undefined)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("authUser"))
    setUserData(data)
  }, [])

  // till the getting of data show fallback UI
  if (UserData === undefined) {

    return (
      <div className='text-center mt-5'>
        <CSpinner color="primary" />
      </div>
    )
  }
  if (UserData !== null) {
    return <Navigate to='/dashboard' replace />
  }


  return children;

}

export default UnProtected
