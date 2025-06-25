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

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { PatchApiCall, PostApiCall } from '../../ApiCall'
import { toast } from 'react-toastify'

const AppHeaderDropdown = () => {

  const [isOpenProfiel, setisOpenProfiel] = useState(false)
  const [authUser, setauthUser] = useState({})
  const [EditableData, setEditableData] = useState({})
  const [selectedFile, setselectedFile] = useState(null)

  useEffect(() => {
    console.log("authUser useEffect::", authUser);
    const localData = JSON.parse(localStorage.getItem("authUser"))
    setauthUser(localData)
    setEditableData({ username: localData.username, email: localData.email })
  }, [isOpenProfiel])

  const handleOpenProfileCard = () => {
    console.log("caleld");
    setisOpenProfiel(true)
  }
  const handleUpdateProfile = async () => {
    console.log("");
    const formData = new FormData()
    formData.append('username', EditableData.username)
    formData.append('email', EditableData.email)
    formData.append('image', selectedFile)
    const uResponse = await PatchApiCall(`update-user/${authUser?._id}`, formData)
    console.log("response of edit user::", uResponse);
    if (uResponse.success == true) {
      setisOpenProfiel(false)
      localStorage.setItem("authUser", JSON.stringify(uResponse.update_user))
    }
  }

  const handleFileChange = (e) => {
    setselectedFile(e.target.files[0])
  }
  const [isOpenChangePwdModal, setisOpenChangePwdModal] = useState(false)
  const [chagepwdData, setchagepwdData] = useState({
    oldpassword: "",
    newpassword: ""
  })
  const toggleChangePassword = () => {
    setchagepwdData({
      oldpassword: "",
      newpassword: ""

    })
    setisOpenChangePwdModal(!isOpenChangePwdModal)
  }
  const handlePasswordonChange = (e) => {
    const { name, value } = e.target;
    setchagepwdData((pre) => ({
      ...pre,
      [name]: value
    }))
  }

  console.log("change-password:: chagepwdData", chagepwdData);
  const handleChangePassword = async () => {
    console.log("change-password:: functino called", chagepwdData);
    let valid = true
    if (!chagepwdData.oldpassword) {
      valid = false
    }
    if (!chagepwdData.newpassword) {
      valid = false
    }
    if (!valid) return 0;
    const payload = {
      oldPassword: chagepwdData.oldpassword,
      newPassword: chagepwdData.newpassword,
      id: authUser._id
    }
    const udata = await PostApiCall("change-password", payload)
    console.log("change-password::", udata);
    if (udata.success == true) {
      localStorage.setItem('authUser', JSON.stringify(udata.update_user))
      localStorage.setItem('token', udata.token)
      toast.success(udata.msg)
      setisOpenChangePwdModal(false)
    }
    else {
      toast.error("Somethin wrong in change password ")
    }
    setchagepwdData({
      oldpassword: "",
      newpassword: ""

    })
    setisOpenChangePwdModal(false)
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" title="Profile" className="py-0 pe-0" caret={false}>
        {/* <CAvatar src={authUser.image ? authUser?.image : avatar8} size="md" /> */}
        <img src={authUser.image ? import.meta.env.VITE_API_URL_USER + authUser?.image : avatar8} width="30px" height="30px" style={{ borderRadius: "50%" }} />
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

        <Modal isOpen={isOpenProfiel} toggle={() => setisOpenProfiel(false)}>
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
                  }} src={selectedFile ? URL.createObjectURL(selectedFile) : `${import.meta.env.VITE_API_URL_USER}${authUser?.image}`} alt="Select profile image" />
                  <FontAwesomeIcon icon={faCamera} onClick={() => document.getElementById("image-upload").click()} style={{
                    position: "absolute",
                    fontSize: "26px",
                    top: "151px",
                    right: "142px",
                  }} />
                  <input type='file' id='image-upload' style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange} />
                </div>
              </Row>

              <Row style={{ padding: "10px" }}>
                <input type='text' style={{ outline: "none" }} value={EditableData?.username} onChange={(e) => setEditableData({ ...EditableData, username: e.target.value })} />
                {/* {true && authUser?.username} */}
              </Row>

              <Row style={{ padding: "10px" }}>
                <input type='email' disabled value={EditableData?.email} onChange={(e) => setEditableData({ ...EditableData, email: e.target.value })} />
                {/* {true && authUser?.email} */}
              </Row>
              {/* <Row> */}
              <div style={{
                alignSelf: "flex-end",
                marginRight: "5px",
                textDecoration: "underline",
                color: "#3d3dc5",
                cursor: "pointer"
              }}>
                <p onClick={() => setisOpenChangePwdModal(true)}>Change Password?</p>

              </div>
              {/* </Row> */}
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button className='btn btn-danger' onClick={() => setisOpenProfiel(false)}>Cancel</Button>
            <Button className='btn btn-success' onClick={handleUpdateProfile}>Save</Button>
            {/* <Button onClick={} className='btn btn-warning'>Log out</Button> */}
          </ModalFooter>
        </Modal>

        <Modal isOpen={isOpenChangePwdModal} toggle={toggleChangePassword}>
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <input placeholder='Enter Old Password' type='text' value={chagepwdData.oldpassword} name="oldpassword" onChange={(e) => handlePasswordonChange(e)} />
              </Col>
              <Col>
                <input placeholder='Enter New Password' type='text' value={chagepwdData.newpassword} name="newpassword" onChange={(e) => handlePasswordonChange(e)} />

              </Col>

              {/* </Row>
            <Row> */}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button className='btn btn-danger' onClick={toggleChangePassword}>Cancel</Button>
            <Button className='btn btn-success' onClick={handleChangePassword}>Change</Button>
          </ModalFooter>
        </Modal>
      </CDropdownMenu>
    </CDropdown >
  )
}

export default AppHeaderDropdown
