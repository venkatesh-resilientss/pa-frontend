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
// ** Demo Imports
import Image from "next/image";
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

  const handleDragStart = (e) => {
    e.preventDefault();
  };
  return (
    <div className="d-flex main-container-i overflow-hidden">
      <div className="d-flex w-100 h-100 justify-content-evenly">
        {/* left */}
        <div className="col-md-8 bg-tenantsignup text-center align-items-center justify-content-center">
          <Image onDragStart={handleDragStart}
            src={"/forgot1.svg"}
            alt="logo"
            className="img-fluid mt-5"
            width={400}
            height={600}
          />
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
            <Image
              src={"/forgot-password.svg"}
              alt="logo"
              className="img-fluid mt-3"
              width={50}
              height={40}
            />

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
                    className={`form-control mt-2 teamworkspaceplaceholder ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    style={{ width: "380px", height: "54px" }}
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
                    className="f-16 mt-2"
                    style={{
                      width: "380px",
                      height: "55px",
                      background: "#00AEEF",
                      border: "#00AEEF",
                      borderRadius: "12px",
                      fontSize: "16px",
                    }}
                  >
                    Reset Password
                  </Button>
                </div>
                <div className="mt-3" style={{ textAlign: "center" }}>
                  <Link
                    href="/"
                    style={{
                      textDecoration: "none",
                      color: "#030229",
                      fontSize: "16px",
                    }}
                  >
                    <small>Retun To Login</small>
                  </Link>
                </div>

                <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{
                    marginTop: "140px",
                    fontSize: "12px",
                    color: "#030229",
                  }}
                >
                  <p className="privacy-text">
                    If you need help, contact support
                  </p>
                  <p className="privacy-text">
                    Please email support or call{" "}
                    <a style={{ color: "#030229" }} href="tel:805-428-8024">
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
                  <a href="#" style={{ fontSize: "12px", color: "#030229" }}>
                    Terms & conditions
                  </a>{" "}
                  <a href="#" style={{ fontSize: "12px", color: "#030229" }}>
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
