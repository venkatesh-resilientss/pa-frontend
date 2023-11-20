// ** React Imports
import { useState, useEffect } from "react";

// ** Next Import
import Link from "next/link";
import { Row, Col, Button } from "reactstrap";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Eye } from "@styled-icons/bootstrap/Eye";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";
// ** Demo Imports
import Image from "next/image";
import AuthService from "services/auth.service";
import { useFormik, FormikErrors } from "formik";

const authService = new AuthService();

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [enable, setEnable] = useState(false);

  const router = useRouter();
  const { token, email } = router.query;

  console.log(router.query);

  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };
  const toggleConfirmPasswordVisiblity = () => {
    setShowConfirmPassword(showConfirmPassword ? false : true);
  };

  const ResetPassValidation = (values: any): any => {
    const errors: FormikErrors<any> = {};
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!values.new_password) {
      errors.new_password = "This field is required";
    } else if (!strongRegex.test(values.new_password)) {
      errors.new_password =
        "Password must have at-least 8 characters with uppercase, lowercase, number & special characters included";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "This field is required";
    } else if (values.new_password !== values.confirm_password) {
      errors.confirm_password = "Confirm password does not match with password";
    }

    return errors;
  };

  // formik
  const formik: any = useFormik({
    initialValues: {
      new_password: "",
      email: email,
      reset_token: token,
    },
    validateOnChange: false,
    validate: ResetPassValidation,
    onSubmit: async (values: any) => {
      const payload: any = {
        new_password: values.new_password,
        email: email,
        reset_token: token,
      };
      authService
        .resetPassword(payload)
        .then(() => {
          toast.success("Password has been updated successfully", {
            autoClose: 3000,
          });
          setEnable(true);
        })
        .catch((err) => {
          toast.error(err?.error);
          setEnable(false);
        });
    },
  });
  useEffect(() => {
    if (token && email) {
      formik.values.token = token;
      formik.values.email = email;
    }
  });

  return (
    <div className="d-flex main-container-i overflow-hidden">
      <div className="d-flex w-100 h-100 justify-content-evenly">
        {/* left */}
        <div className="col-md-8 bg-tenantsignup text-center align-items-center justify-content-center">
          <Image
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
              className="img-fluid"
              width={112}
              height={43}
            />
            <Image
              src={"/forgot-password.svg"}
              alt="logo"
              className="img-fluid mt-2"
              width={50}
              height={40}
            />

            <p className="welcome-text mt-2">Reset Password</p>
            <p style={{ fontSize: "12px" }} className="mb-0">
              Your new password will be your key to accessing your account.
              <br />
              Make it strong and memorable
            </p>
            {/* <p style={{ fontSize: "12px" }} className="mt-0">
            </p> */}

            <div className="register-form" style={{ maxWidth: "380px" }}>
              <div>
                <Form.Group>
                  <label className="email-text mt-1 f-16">
                    New Password
                    <span
                      className="ms-1"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      *
                    </span>
                  </label>
                  <Form.Control
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    name="new_password"
                    placeholder="at least 8 characters"
                    className="f-14 mt-2 teamworkspaceformpassword"
                    value={formik.values.new_password}
                    onChange={formik.handleChange("new_password")}
                    isInvalid={formik.errors.new_password}
                    style={{ height: "54px", color: "#626873" }}
                  />
                  <i onClick={togglePasswordVisiblity}>
                    {showPassword ? (
                      <Eye
                        width="20"
                        height="20"
                        className="tenanterror-icon-fpwd"
                      />
                    ) : (
                      <EyeSlash
                        width="20"
                        height="20"
                        className="tenanterror-icon-fpwd"
                      />
                    )}
                  </i>

                  {formik.errors.new_password ? (
                    <Form.Control.Feedback type="invalid">
                      <div className="error-message">
                        {formik.errors.new_password}
                      </div>
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div>
                <Form.Group>
                  <label className="email-text mt-2 f-16">
                    Confirm Password
                    <span
                      className="ms-1"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      *
                    </span>
                  </label>

                  <Form.Control
                    autoComplete="off"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    placeholder="re-enter password"
                    className="f-14 mt-2 teamworkspaceformpassword"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange("confirm_password")}
                    isInvalid={formik.errors.confirm_password}
                    style={{ height: "54px", color: "#626873" }}
                  />
                  <i onClick={toggleConfirmPasswordVisiblity}>
                    {showConfirmPassword ? (
                      <Eye
                        width="20"
                        height="20"
                        className="tenanterror-icon-fpwd"
                      />
                    ) : (
                      <EyeSlash
                        width="20"
                        height="20"
                        className="tenanterror-icon-fpwd"
                      />
                    )}
                  </i>
                  {formik.errors.confirm_password ? (
                    <Form.Control.Feedback type="invalid">
                      <div className="error-message">
                        {formik.errors.confirm_password}
                      </div>
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
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
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Reset Password
                </Button>
              </div>

              {enable === true ? (
                <div className="d-flex flex-row">
                  <img
                    className="mt-4 ms-2"
                    style={{ width: "23px" }}
                    src="/successRight.svg"
                  ></img>

                  <p className="mt-4 ms-2">
                    <span style={{ fontSize: "13px" }}>
                      Password successfully updated. You can now
                    </span>
                    <span
                      style={{ fontSize: "13px" }}
                      className="fw-bold ms-1 cursor-pointer"
                      onClick={() => router.push("/")}
                    >
                      login
                    </span>
                  </p>
                </div>
              ) : null}

              <div
                className="d-flex flex-column mt-4 align-items-center justify-content-center"
                style={{
                  fontSize: "12px",
                  color: "#030229",
                }}
              >
                <p className="privacy-text">
                  If you need help, contact support
                </p>
                <p className="privacy-text">
                  Please email support or call #805-428-8024
                </p>
                <p className="privacy-text">
                  Powered by Resilient Software Solutions LLC
                </p>
              </div>
              <Row style={{ marginTop: "10px", color: "#030229" }}>
                <Col style={{ marginLeft: "10px" }}>
                  <p style={{ fontSize: "12px" }}>#Terms & conditions</p>
                </Col>
                <Col style={{ fontSize: "12px", marginLeft: "30%" }}>
                  #Privacy Policy
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
