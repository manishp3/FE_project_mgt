import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
  cilAccountLogout
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from '../layout/header/index'
import { GetApiCall } from '../ApiCall'
import { Button, Modal, ModalBody } from 'reactstrap'
import { ModalFooter } from 'react-bootstrap'

const AppHeader = () => {
  const [isOpenLogoutModal, setisOpenLogoutModal] = useState(false)
  const headerRef = useRef()
  const navigate = useNavigate()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const handleLogout = async () => {
    console.log("log of logout resposen start");

    const response = GetApiCall("logout")
    localStorage.removeItem("token")
    localStorage.removeItem("authUser")
    console.log("log of logout resposen::", response);
    navigate("/login")
    // window.location.reload(true)
  }

  return (
    <>
      <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
        <CContainer className="border-bottom px-4" fluid>
          <CHeaderToggler
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
            style={{ marginInlineStart: '-14px' }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderNav className="d-none d-md-flex">
            <CNavItem>
              <CNavLink to="/dashboard" as={NavLink}>
                Dashboard
              </CNavLink>
            </CNavItem>
            {/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
          </CHeaderNav>
          <CHeaderNav className="ms-auto">
            {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem> */}
            {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem> */}
            {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
          </CHeaderNav>
          <CHeaderNav>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            {/* <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
            <CNavItem >
              <CNavLink href="#" onClick={() => setisOpenLogoutModal(true)}>
                <CIcon title='Logout' icon={cilAccountLogout} size="lg" />
              </CNavLink>
            </CNavItem>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <CContainer className="px-4" fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
      <Modal isOpen={isOpenLogoutModal} toggle={() => setisOpenLogoutModal(false)}>
        <ModalBody style={{ textAlign: "center", padding: "30px" }}>
          {/* Warning SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="orange"
            className="bi bi-exclamation-triangle-fill mb-3"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.707c.89 0 1.438-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1-2.002 0 1 1 0 0 1 2.002 0z" />
          </svg>

          <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Are you sure you want Logout?
          </h5>


          <ModalFooter>
            {/* <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}> */}
            <Button className='btn btn-light' onClick={() => setisOpenLogoutModal(false)} >
              Cancel
            </Button>
            <Button className='btn btn-danger' onClick={handleLogout}>
              Logout
            </Button>
            {/* </div> */}
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  )
}

export default AppHeader
