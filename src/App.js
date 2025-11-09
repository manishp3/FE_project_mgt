import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'
import { ToastContainer } from 'react-toastify'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./components/views/pages/login/Login'))
const Register = React.lazy(() => import('./components/views/pages/register/Register'))
const Forgot = React.lazy(() => import('./components/views/pages/forgot/Forgot'))
const Page404 = React.lazy(() => import('./components/views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./components/views/pages/page500/Page500'))
import VerifyOtp from './components/views/pages/forgot/VerifyOtp'

import ProtectedRoute from './components/ProtectedRoute'
import UnProtected from './components/UnProtected'

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* Public (Unprotected) routes */}
          <Route
            path="/login"
            element={
              <UnProtected>
                <Login />
              </UnProtected>
            }
          />
          <Route
            path="/register"
            element={
              <UnProtected>
                <Register />
              </UnProtected>
            }
          />
          <Route
            path="/forgotpassword"
            element={
              <UnProtected>
                <Forgot />
              </UnProtected>
            }
          />
          <Route
            path="/verifyOtp"
            element={
              <UnProtected>
                <VerifyOtp />
              </UnProtected>
            }
          />

          {/* Protected routes */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            }
          />

          {/* Optional redirect for root */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
