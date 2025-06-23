import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

import { Button, Card, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'

const AppHeaderDropdown = () => {

  const [isOpenProfiel, setisOpenProfiel] = useState(false)
  const [authUser, setauthUser] = useState({})
  console.log("authUser::", authUser);

  useEffect(() => {
    setauthUser(JSON.parse(localStorage.getItem("authUser")))
  }, [])

  const handleOpenProfileCard = () => {
    console.log("caleld");
    setisOpenProfiel(true)
  }
  const handleUpdateProfile = () => {
    console.log("");

  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem onClick={handleOpenProfileCard}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader> */}

        {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider /> */}
        <Modal isOpen={true} toggle={() => setisOpenProfiel(false)}>
          <ModalHeader toggle={() => setisOpenProfiel(false)}>Profile</ModalHeader>
          <ModalBody>
            <Card style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Row>
                <div>
                  <img style={{
                    display: "flex",
                    height: "200px",
                    width: "200px",
                    border: "1px solid gray",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }} src={`${import.meta.env.VITE_API_URL_IMAGE}${authUser?.image}`} alt="user profile"/>
                </div>
              </Row>

              <Row style={{ padding: "10px" }}>
                {true && authUser?.username}
              </Row>

              <Row style={{ padding: "10px" }}>
                {true && authUser?.email}
              </Row>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button className='btn btn-danger' onClick={() => setisOpenProfiel(false)}>Cancel</Button>
            <Button className='btn btn-success' onClick={handleUpdateProfile}>Save</Button>
            <Button className='btn btn-warning'>Log out</Button>
          </ModalFooter>
        </Modal>

      </CDropdownMenu>
    </CDropdown >
  )
}

export default AppHeaderDropdown
