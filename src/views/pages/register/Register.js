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
    userNameError: "",
    emailEror: "",
    passwordError: "",
    imageError: "",
    roleError: "",
  });
  console.log("vaidation for data checkout::1", forDatasignUp);
  console.log("vaidation for data checkout::2", signUpError);

  const validateForm = () => {
    let valid = true;
    console.log("vaidation for data checkout:: start");

    if (forDatasignUp.userName == "") {
      console.log("vaidation for data checkout:: 3");

      setsignUpError((prev) => ({
        ...prev,
        userNameError: "Please Enter username",
      }));
      valid = false;
    }
    if (forDatasignUp.email == "") {
      setsignUpError((prev) => ({
        ...prev,
        emailEror: "Please enter email",
      }));
      valid = false;
    }
    if (forDatasignUp.password == "") {
      setsignUpError((prev) => ({
        ...prev,
        passwordError: "Please enter password",
      }));
      valid = false;
    }
    if (forDatasignUp.image == null) {
      setsignUpError((prev) => ({
        ...prev,
        imageError: "Please select profile image",
      }));
      valid = false;
    }
    if (forDatasignUp.role == "") {
      setsignUpError((prev) => ({
        ...prev,
        roleError: "Please enter your position",
      }));
      valid = false;
    }
    if (!valid) { return false; }
    else {
      return true;
    }
  }
  const handleSignUp = async () => {
    const isvalid = validateForm()
    console.log("vaidation for data checkout:: handleSignUp", isvalid);

    if (!isvalid) { return 0; }

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
    formData.append("role", forDatasignUp.role);
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
          userNameError: "Please Enter username",
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          userNameError: "",
        }));
      }
    }
    if (name == "role") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          roleError: "Please enter your position",
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          roleError: "",
        }));
      }
    }
    if (name == "email") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          emailEror: "Please enter email",
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          emailEror: "",
        }));
      }
    }
    if (name == "image") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          imageError: "Please Enter image",
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          imageError: "",
        }));
      }
    }
    if (name == "password") {
      if (!value) {
        setsignUpError((pre) => ({
          ...pre,
          passwordError: "Please enter password",
        }));
      } else {
        setsignUpError((pre) => ({
          ...pre,
          passwordError: "",
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
                  <CInputGroup className={`mb-3 ${!signUpError.userNameError && "isStar"}`}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput name="userName" className={`${signUpError.userNameError && "is-invalid"}`} placeholder="Username" autoComplete="username" value={forDatasignUp.userName}
                      onChange={handleSignUpChange}
                    />
                    {signUpError.userNameError && <div className="invalid-feedback" style={{ display: 'block' }}>{signUpError.userNameError}</div>}
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${!signUpError.emailEror && "isStar"}`}>
                    <CInputGroupText >@</CInputGroupText>
                    <CFormInput placeholder="Email" name="email" autoComplete="email" className={`${signUpError.emailEror && "is-invalid"}`} value={forDatasignUp.email}
                      onChange={handleSignUpChange}
                    />
                    {signUpError.emailEror && <div className="invalid-feedback" style={{ display: 'block' }}>{signUpError.emailEror}</div>}
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${!signUpError.roleError && "isStar"}`}>
                    <CInputGroupText>
                      <FontAwesomeIcon icon={faBriefcase} />
                      {/* <CIcon icon={cilUser} /> */}
                    </CInputGroupText>
                    <CFormInput placeholder="your role like dev.." className={`${signUpError.roleError && "is-invalid"}`} name="role" autoComplete="role" value={forDatasignUp.role}
                      onChange={handleSignUpChange}
                    />
                    {signUpError.roleError && <div className="invalid-feedback" style={{ display: 'block' }}>{signUpError.roleError}</div>}
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${!signUpError.passwordError && "isStar"}`}>
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={isTypePassword ? "password" : "text"}
                      name="password"
                      className={`${signUpError.passwordError && "is-invalid"}`}
                      placeholder="Password"
                      autoComplete="new-password"
                      value={forDatasignUp.password}
                      onChange={handleSignUpChange}
                    />
                    <CInputGroupText style={{ cursor: "pointer" }}>

                      <FontAwesomeIcon onClick={() => setisTypePassword(!isTypePassword)} icon={isTypePassword ? faEyeSlash : faEye} />
                    </CInputGroupText>
                    {signUpError.passwordError && <div className="invalid-feedback" style={{ display: 'block' }}>{signUpError.passwordError}</div>}
                  </CInputGroup>
                  <CInputGroup className={`mb-3 ${!signUpError.imageError && "isStar"}`}>
                    <CInputGroupText>
                      <CIcon icon={cilImage} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      name="image"
                      className={`${signUpError.imageError && "is-invalid"}`}
                      placeholder="Profile image"
                      // autoComplete="new-password"
                      // value={forDatasignUp.image}
                      onChange={handleSignUpChange}
                    />
                    {signUpError.imageError && <div className="invalid-feedback" style={{ display: 'block' }}>{signUpError.imageError}</div>}
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
