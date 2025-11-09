import React, { useEffect, useState } from "react";

import { GetApiCall, PostApiCall } from "../../../../ApiCall";
import { Modal, Button, Form, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";

import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEyedropper, cilLockLocked, cilUser } from '@coreui/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const navigate = useNavigate();

  // const [showForgot, setShowForgot] = useState(false);
  const [issignInDisabled, setissignInDisabled] = useState(false);

  const [signInError, setsignInError] = useState({
    emailEror: "",
    passwordError: "",
  });

  const [forDatasignin, setforDatasignIn] = useState({
    email: "",
    password: "",
  });


  const handleSignInChange = (e) => {
    console.log("handleSignInChange e::", e.target);

    const { name, value } = e.target;
    setforDatasignIn((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name == "email") {
      if (!value) {
        setsignInError((prev) => ({
          ...prev,
          emailEror: "Please Enter register Email",
        }));
      } else {
        setsignInError((prev) => ({
          ...prev,
          emailEror: "",
        }));
      }
    }
    if (name == "password") {
      if (!value) {
        setsignInError((prev) => ({
          ...prev,
          passwordError: "Please Enter Password",
        }));
      } else {
        setsignInError((prev) => ({
          ...prev,
          passwordError: "",
        }));
      }
    }
  };

  const [signInOtpMOdal, setsignInOtpMOdal] = useState(false);
  const handleSignIn = async () => {
    console.log("called on sigin");

    let valid = true;
    if (forDatasignin.email == "") {
      setsignInError((prev) => ({
        ...prev,
        emailEror: "Please Enter Email",
      }));
      valid = false;
    }
    if (forDatasignin.password == "") {
      setsignInError((prev) => ({
        ...prev,
        passwordError: "Please Enter Password",
      }));
      valid = false;
    }
    if (!valid) return 0;
    setissignInDisabled(true);
    const payload = {
      email: forDatasignin.email,
      password: forDatasignin.password,
    };

    try {
      const data = await PostApiCall("signin/", payload);
      console.log("log success sigin::", data);
      if (data.status_code == 401) {
        toast.error(data.msg)
      }
      else if (data.status_code == 404) {
        toast.error(data.msg)
      }
      else if (data.status_code == 200) {
        toast.success(data.msg)
        setOtp("");
        setissignInDisabled(false);
        setsignInOtpMOdal(true);
      }
    } catch (err) {
      console.log("Error singin::", err);
    } finally {
      setissignInDisabled(false);
    }
  };
  console.log("forDatasignin email check::", forDatasignin);
  // const [forgotUserMailIRef, setforgotUserMailIRef] = useState(0);
  const handleForgot = async () => {

    console.log("forDatasignin::", forDatasignin);

    if (forDatasignin.email == "") {
      setsignInError((pre) => ({
        ...pre,
        emailEror: 1,
      }));
      setissignInDisabled(true)
      // return 0;
    } else {
      try {
        const response = await PostApiCall("sendforgototp/", {
          email: forDatasignin.email,
        });
        console.log("log of resposen senfotp::", response);
        if (response.status_code == 404) {
          toast.error(response.msg)
        }
        else {
          navigate("/verifyOtp", { state: { mailRefId: response.email } })
        }
      } catch (error) {
        console.log("log of resposen error::", error);
      } finally {
        setOtp("");
        setissignInDisabled(false)
      }
    }

  };

  const [otp, setOtp] = useState("");
  const [isOpenChangePasswordModal, setisOpenChangePasswordModal] =
    useState(false);

  console.log("etnerd otp::", otp);


  const verifySignInOtp = async () => {
    // const response = await PostApiCall("verifyotp/", {
    const response = await PostApiCall("verifyotp/", {
      otp: otp,
    });
    console.log("handleveryfyOtp::", response);
    if (response.success == true) {
      setOtp("");
      localStorage.setItem("token", response.token);
      localStorage.setItem("authUser", JSON.stringify(response.user));
      navigate("/dashboard");
    }
  };
  const [changePwdFormdata, setchangePwdFormdata] = useState({
    cPassword: "",
    ccPassword: "",
  });
  const [changePwdFormdataError, setchangePwdFormdataError] = useState({
    cPasswordError: "",
    ccPasswordError: "",
  });

  const handleChangePasswordonChange = (e) => {
    const { name, value } = e.target;
    setchangePwdFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name == "cPassword") {
      if (!value) {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          cPasswordError: "Please Enter Password",
        }));
      } else {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          cPasswordError: "",
        }));
      }
    }
    if (name == "ccPassword") {
      if (!value) {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          ccPasswordError: "Please Enter Confirm Password",
        }));
      } else {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          ccPasswordError: "",
        }));
      }
    }
  };
  const handleChangePasswordonBlur = (e) => {
    const { name, value } = e.target;
    if (name == "cPassword") {
      if (!value) {
        setchangePwdFormdataError((prev) => ({
          ...prev,
          cPasswordError: "Please Enter Passowrd",
        }));
      }
    }
    if (name == "ccPassword") {
      if (!value) {
        setchangePwdFormdataError((prev) => ({
          ...prev,
          ccPasswordError: "Please Enter Confirm Passowrd",
        }));
      } else if (changePwdFormdata.cPassword != changePwdFormdata.ccPassword) {
        setchangePwdFormdataError((prev) => ({
          ...prev,
          ccPasswordError: "Confirm Passowrd must be same.",
        }));
      } else {
        setchangePwdFormdataError((pre) => ({
          ...pre,
          ccPasswordError: "",
        }));
      }
    }
  };

  const [isTypePassword, setisTypePassword] = useState(true)
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className={`mb-3 ${!signInError.emailEror && "isStar"}`}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="Email" className={`${signInError.emailEror && "is-invalid"}`} name="email" value={forDatasignin.email} onChange={handleSignInChange} />
                      {signInError.emailEror && <div className="invalid-feedback" style={{ display: 'block' }}>{signInError.emailEror}</div>}
                    </CInputGroup>
                    <CInputGroup className={`mb-3 ${!signInError.passwordError && "isStar"}`}>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={isTypePassword ? "password" : "text"}
                        placeholder="Password"
                        className={`${signInError.passwordError && "is-invalid"}`}
                        autoComplete="current-password"
                        name="password"
                        value={forDatasignin.password}
                        onChange={handleSignInChange}
                      />
                      <CInputGroupText style={{ cursor: "pointer" }}>

                        <FontAwesomeIcon onClick={() => setisTypePassword(!isTypePassword)} icon={isTypePassword ? faEyeSlash : faEye} />
                      </CInputGroupText>

                      {signInError.passwordError && <div className="invalid-feedback" style={{ display: 'block' }}>{signInError.passwordError}</div>}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" disabled={issignInDisabled}
                          onClick={handleSignIn}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton disabled={issignInDisabled} color="link" className="px-0"
                          onClick={handleForgot}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Manage your tasks efficiently with our smart Task Management System. Stay on top of deadlines, boost productivity, and collaborate effortlessly — all in one place.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        <Modal show={signInOtpMOdal} onHide={() => setsignInOtpMOdal(false)}>
          {/* <Modal show={true} onHide={() => setsignInOtpMOdal(false)}> */}
          <Modal.Header closeButton>
            <Modal.Title>SignIn OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={5}

                // isDisabled={true}
                renderSeparator={<span style={{ visibility: "hidden" }}>--</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{

                  width: "3rem",
                  height: "3rem",
                  margin: "0 0.4rem",
                  fontSize: "1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ced4da",
                  textAlign: "center",

                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setsignInOtpMOdal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={verifySignInOtp}>
              Verify OTP
            </Button>
          </Modal.Footer>
        </Modal>
      </CContainer>
    </div>
  )
}

export default Login
