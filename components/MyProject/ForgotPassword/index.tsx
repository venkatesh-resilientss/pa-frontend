// ** React Imports
import { useState } from "react";

// ** Next Import
import Link from "next/link";
import { Row, Col, Button } from "reactstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import Divider from '@mui/material/Divider';
// ** Demo Imports
import { Image } from "react-bootstrap";
import { ForgotPasswordService } from "services";

const forgotPassword = new ForgotPasswordService();

const ForgotPassword = () => {
  const validationEmailSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(validationEmailSchema),
  });
  // ** Vars
  const [email, setEmail] = useState("");

  const forgotSubmit = async (values: any) => {
    const payload: any = {
      email: email,
    };

    forgotPassword
      .forgotPassword(payload)
      .then((res: any) => {
        toast.success("Email has been sent to your registered email");
      })
      .catch((err) => {
        toast.error(err?.error);
      });
  };
  return (
    <div className="d-flex main-container-i overflow-hidden">
      <div className="d-flex w-100 h-100 justify-content-evenly">
        {/* left */}
        <div className="col-md-8 bg-tenantsignup text-center align-items-center justify-content-center">
          <Image
            src={"/ForgotSide.png"}
            alt="ForgotSide"
            className="img-fluid mt-5 forgotScreen1"
            fluid
            width={1150}
             
          />
          <div style={{position:'absolute',top:"20%",left:"50%",transform:'translate(-50%,-50%)',textAlign:'center',color:'#ffffff', marginLeft:'-400px',marginTop:'300px'}}>
          <div className="d-flex align-items-center justify-content-center">
            <div className="text-container text-center">
              <div className="d-flex align-items-start">
                <p className="intutive">INTUITIVE</p>
              </div>
              <div className="d-flex align-items-start">
                <p className="entertainment">ENTERTAINMENT</p>
              </div>
              <div className="d-flex align-items-start">
                <p className="software">SOFTWARE</p>
              </div>
            </div>
          </div>
  </div>
          {/* <div className="d-flex align-items-center justify-content-center">
            <div className="text-container text-center">
              <div className="d-flex align-items-start">
                <p className="intutive">INTUITIVE</p>
              </div>
              <div className="d-flex align-items-start">
                <p className="entertainment">ENTERTAINMENT</p>
              </div>
              <div className="d-flex align-items-start">
                <p className="software">SOFTWARE</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* right */}

        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column gap-3">
            <Image
              src={"/logo.svg"}
              alt="logo"
              className="img-fluid mt-2"
              width={112}
              height={43}
            />
            {/* <Image
              src={"/forgot-password.svg"}
              alt="logo"
              className="img-fluid mt-3"
              width={50}
              height={40}
            /> */}

            <p className="welcome-text mt-2">Forgot Password?</p>
            <p style={{ fontSize: "12px" }}>
              Please provide your email address to reset your password.
            </p>

            <div className="register-form" style={{ maxWidth: "421px" }}>
              <form onSubmit={handleSubmit(forgotSubmit)}>
                <div className="form-group mb-2">
                  <label className="mt-1 email-text">
                    Email
                    <span
                      className="ms-1"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter email address"
                    {...register("email")}
                    className={`form-control mt-2 teamworkspaceplaceholder forgotScreen2 ${
                      errors.email ? "is-invalid" : ""
                    }`}
                   
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <Button
                    type="submit"
                    // loading={loading}
                    className="f-16 mt-2 forgotScreen2"
                  >
                    Reset Password
                  </Button>
                </div>
                <div className="mt-3" style={{ textAlign: "center",marginTop:'30px' }}>
                  <Link
                    href="/"
                    className="forgotScreen3"
                  >
                    <small>Click Here To Login</small>
                  </Link>
                </div>
                <hr />
                <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{
                    marginTop: "50px",
                    fontSize: "12px",
                    color: "#656472",
                  }}
                >
                  <p className="privacy-text">
                    Have Questions or Suggestions?
                  </p>
                  <p className="privacy-text">
    Please{" "}
    <a style={{ color: "#030229", textDecoration: "underline", cursor: "pointer" }} href="mailto:support@example.com">
      email
    </a>{" "}
    support or call{" "}
    <a style={{ color: "#030229", textDecoration: "underline", cursor: "pointer" }} href="tel:805-428-8024">
      805-428-8024
    </a>
  </p>
                  <p className="privacy-text">
                    Powered by Resilient Software Solutions LLC
                  </p>
                </div>
                <div
                  className="d-flex justify-content-between"
                  style={{ marginTop: "10px", color: "#030229" }}
                >
                  <a href="#" style={{ fontSize: "12px", color: "#030229",textDecoration: "underline", cursor: "pointer",marginLeft:"90px" }}>
                    Terms & conditions
                  </a>{" "}
                  <span style={{ fontSize: "12px", color: "#030229" }}>|</span>
                  <a href="#" style={{ fontSize: "12px", color: "#030229",textDecoration: "underline", cursor: "pointer",marginRight:"100px" }}>
                    Privacy Policy
                  </a>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;

