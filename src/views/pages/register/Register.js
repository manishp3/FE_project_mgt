import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilImage, cilLockLocked, cilUser } from '@coreui/icons'
import { PostApiCall } from '../../../ApiCall'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faBriefcase } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const navigate = useNavigate()
  const [isTypePassword, setisTypePassword] = useState(true)
  const [forDatasignUp, setforDatasignUp] = useState({
    userName: "",
    email: "",
    password: "",
    image: null,
    role: ""
  });
  const [issignUpDisabled, setissignUpDisabled] = useState(false);
  const [signUpError, setsignUpError] = useState({
    userNameError: 0,
    emailEror: 0,
    passwordError: 0,
    imageError: 0,
    roleError: 0,
  });
  const handleSignUp = async () => {
    let valid = true;
    if (forDatasignUp.userName == "") {
      setsignUpError((prev) => ({
        ...prev,
        userNameError: 1,
      }));
      valid = false;
    }
    if (forDatasignUp.email == "") {
      setsignUpError((prev) => ({
        ...prev,
        emailEror: 1,
      }));
      valid = false;
    }
    if (forDatasignUp.password == "") {
      setsignUpError((prev) => ({
        ...prev,
        passwordError: 1,
      }));
      valid = false;
    }
    if (forDatasignUp.image == null) {
      setsignUpError((prev) => ({
        ...prev,
        imageError: 1,
      }));
      valid = false;
    }
    if (forDatasignUp.role == "") {
      setsignUpError((prev) => ({
        ...prev,
        roleError: 1,
      }));
      valid = false;
    }
    if (!valid) return 0;
    setissignUpDisabled(true);
    const formData = new FormData()
    // const payload = {
    //   username: forDatasignUp.userName,
    //   email: forDatasignUp.email,
    //   password: forDatasignUp.password,
    //   image: forDatasignUp.image
    // };
    formData.append("username", forDatasignUp.userName);
    formData.append("email", forDatasignUp.email);
    formData.append("password", forDatasignUp.password);
    formData.append("image", forDatasignUp.image);
    // };
    // try {
    const data = await PostApiCall("signup/", formData);
    console.log("log signupdate::", data);
    if (data.success == true) {
      navigate("/login");
      toast.success(data.msg);
      setissignUpDisabled(false);
    }
    else {
      toast.error(data.msg);
    }
    // } catch (err) {
    // } finally {
    //   setissignUpDisabled(false);
    // }
  };
  console.log("forDatasignUp erro :", forDatasignUp);
  const handleSignUpChange = (e) => {
    console.log("handleSignUpChange e::", e.target);
    const { name, value } = e.target;
    if (name == "image") {
      setforDatasignUp((prevData) => ({
        ...prevData,
        image: e.target.files[0],
      }));
    }
    else {

      setforDatasignUp((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    if (name == "userName") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          userNameError: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          userNameError: 0,
        }));
      }
    }
    if (name == "role") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          roleError: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          userNameError: 0,
        }));
      }
    }
    if (name == "email") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          emailEror: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          emailEror: 0,
        }));
      }
    }
    if (name == "image") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          imageError: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          emailEror: 0,
        }));
      }
    }
    if (name == "password") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          passwordError: 1,
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          passwordError: 0,
        }));
      }
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3 isStar">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput name="userName" placeholder="Username" autoComplete="username" value={forDatasignUp.userName}
                      onChange={handleSignUpChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3 isStar">
                    <CInputGroupText >@</CInputGroupText>
                    <CFormInput placeholder="Email" name="email" autoComplete="email" value={forDatasignUp.email}
                      onChange={handleSignUpChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3 isStar">
                    <CInputGroupText>
                      <FontAwesomeIcon icon={faBriefcase} />
                      {/* <CIcon icon={cilUser} /> */}
                    </CInputGroupText>
                    <CFormInput placeholder="your role like dev.." name="role" autoComplete="role" value={forDatasignUp.role}
                      onChange={handleSignUpChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3 isStar">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={isTypePassword ? "password" : "text"}
                      name="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={forDatasignUp.password}
                      onChange={handleSignUpChange}
                    />
                    <CInputGroupText style={{ cursor: "pointer" }}>

                      <FontAwesomeIcon onClick={() => setisTypePassword(!isTypePassword)} icon={isTypePassword ? faEyeSlash : faEye} />
                    </CInputGroupText>
                  </CInputGroup>
                  <CInputGroup className="mb-3 isStar">
                    <CInputGroupText>
                      <CIcon icon={cilImage} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      name="image"
                      placeholder="Profile image"
                      // autoComplete="new-password"
                      // value={forDatasignUp.image}
                      onChange={handleSignUpChange}
                    />

                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" onClick={handleSignUp}>Create Account</CButton>
                  </div>
                </CForm>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Link to='/login'>
                    return to Login?
                  </Link>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
