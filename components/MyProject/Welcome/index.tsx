import { Button } from "reactstrap";
import { useState, useEffect } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Image } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Eye } from "@styled-icons/bootstrap/Eye";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthService } from "services";
import { toast } from "react-toastify";
import { signIn, signOut, useSession } from "next-auth/client";
import { Session as NextAuthSession } from "next-auth";
import { Spinner } from "reactstrap";

const authService = new AuthService();

const Welcome = () => {
  const [loading, setLoading] = useState(false);
  const [singleinput, setSingleinput] = useState(true);
  const [multiinput, setMultiinput] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [tenantName, setTenantName] = useState("");
  const [tenantSlug, setTenantSlug] = useState("");

  const [session] = useSession();

  useEffect(() => {
    if (session && session.user) {
      const oktaUserDetails = session as NextAuthSession;

      const tokenPayload = {
        token: oktaUserDetails.accessToken as string,
      };

      const oktaEMail = oktaUserDetails.user.email;

      // Call the oktaUserLogin method with the modified payload
      authService
        .oktaUserLogin(JSON.stringify(tokenPayload))
        .then((response) => {
          authService
            .checkTenant({ email: oktaEMail })
            .then(() => {
              // window.location.href = `http://${res.Name}.lvh.me:3000/?accessToken=${response.token}`;

              // for live url
              window.location.href = `http://${tenantName}.devpa.resilientss.com/?accessToken=${response.token}`;
            })
            .catch((err: any) => {
              toast.error(err?.error);
            });
        })
        .catch((error) => {
          console.error("Error during Okta user login:", error);
          // Handle errors if any
        });
    } else {
      // Handle the case where session or user is undefined
      // console.log("User details not available");
    }
  }, [session]);

  const handleButtonClick: any = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid")
      .test(
        "valid-email",
        "Email must contain @ and end with .com",
        (value) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
      ),
    password: Yup.string().required("Password is required"),
  });

  const validationEmailSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid")
      .test(
        "valid-email",
        "Email must contain @ and end with .com",
        (value) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(
      singleinput ? validationEmailSchema : validationSchema
    ),
  });

  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };

  useEffect(() => {
    const token: any = router.query.accessToken;
    if (token) {
      authService.authenticateUser(token);
      router.push("/dashboard");
    }
  }, [router.query.accessToken]);

  const formSubmit = async (values: any) => {
    const payload: any = {
      email: email,
      password: values.password,
    };

    authService
      .userSignIn(payload)
      .then((res: any) => {
        //for local
        //  window.location.href = `http://${tenantName}.lvh.me:3000/?accessToken=${res?.token}`;
        // for live url
        window.location.href = `http://${tenantName}.devpa.resilientss.com/?accessToken=${res?.token}`;
      })
      .catch((err) => {
        toast.error(err.error);
        setLoading(false);
      });
  };

  const signInSubmit = async () => {
    setLoading(true);
    authService
      .checkTenant({ email })
      .then((res) => {
        setLoading(false);
        setTenantName(res.Name);
        setTenantSlug(res.Slug);
        setSingleinput(false);
        setMultiinput(true);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err?.error);
      });
  };

  return (
    <div className="d-flex main-container-i overflow-hidden">
      <div className="d-flex w-100 h-100 justify-content-evenly">
        {/* left */}
        <div className="col-md-8 bg-tenantsignup text-center align-items-center justify-content-center">
          <div>
            <Image
              src={"/SideImage.png"}
              alt="logo"
              className="img-fluid mt-5"
              // width={400}
              fluid
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#ffffff",
              marginLeft: "-400px",
              marginTop: "300px",
            }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <div className="text-container text-center">
                <div className="d-flex align-items-start">
                  <p className="intuitive">INTUITIVE</p>
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
        </div>

        {/* right */}
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          {singleinput && (
            <div className="d-flex flex-column gap-3">
              <Image
                src={"/logo.svg"}
                alt="logo"
                className="img-fluid mt-4"
                width={112}
                height={43}
              />
              <p className="welcome-text mt-5">Welcome to RSSL</p>
              <div className="register-form" style={{ maxWidth: "421px" }}>
                <form onSubmit={handleSubmit(signInSubmit)}>
                  <div className="form-group mb-2">
                    <label className="mt-2 email-text">
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

                  <div className="d-flex justify-content-end mt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="f-16 mt-2"
                      style={{
                        width: "380px",
                        height: "55px",
                        background: "#283891",
                        border: "#00AEEF",
                        borderRadius: "12px",
                        fontSize: "16px",
                      }}
                    >
                      {loading ? (
                        <Spinner
                          animation="border"
                          role="status"
                          size="sm"
                          style={{ marginRight: "5px" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </div>

                  <hr
                    className="mb-0"
                    style={{
                      width: "380px",
                      border: "0.5px solid #D7D7D7",
                    }}
                  />

                  {/* <div className="d-flex items-center justify-start" >
                    <Button
                      className="flex p-3 mt-3 border"
                      style={{
                        backgroundColor: "#EAF7FC",
                        width: "380px",
                        height: "55px",
                        border: "#C6C6C6",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="d-flex flex-row text-centerhttps://example.com/profile-image.jpg align-items-center justify-content-center">
                        <AiOutlineLock size={18} style={{ color: "#A8A8A8" }} />
                        <span  onClick={handleButtonClick}
                          className="ms-2"
                          style={{
                            color: "#030229",
                            fontWeight: 400,
                          }}
                        >
                         {session ? "Okta Logout" : "Use single sign-on (SSO) instead"}
                        </span>
                      </div>

                      
                    </Button>
                  </div> */}

                  <div className="d-flex items-center justify-start">
                    {!session && (
                      <Button
                        className="flex p-3 mt-3 border"
                        style={{
                          backgroundColor: "#EAF7FC",
                          width: "380px",
                          height: "55px",
                          border: "#C6C6C6",
                          borderRadius: "10px",
                        }}
                      >
                        <div className="d-flex flex-row text-center align-items-center justify-content-center">
                          <AiOutlineLock
                            size={18}
                            style={{ color: "#A8A8A8" }}
                          />
                          <span
                            onClick={handleButtonClick}
                            className="ms-2"
                            style={{
                              color: "#030229",
                              fontWeight: 400,
                            }}
                          >
                            Use single sign-on (SSO) instead
                          </span>
                        </div>
                      </Button>
                    )}
                  </div>

                  {/* <form className="d-flex mt-4" >
                    <button className={session ? "btn btn-secondary" : "btn btn-primary"} onClick={handleButtonClick}>
                      {session ? "Okta Logout" : "Use single sign-on (SSO) instead"}
                    </button>
                  </form> */}
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
                      <a
                        style={{
                          color: "#030229",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        href="mailto:support@example.com"
                      >
                        email
                      </a>{" "}
                      support or call{" "}
                      <a
                        style={{
                          color: "#030229",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        href="tel:805-428-8024"
                      >
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
                    <a
                      href="#"
                      style={{
                        fontSize: "12px",
                        color: "#030229",
                        textDecoration: "underline",
                        cursor: "pointer",
                        marginLeft: "90px",
                      }}
                    >
                      Terms & conditions
                    </a>{" "}
                    <span style={{ fontSize: "12px", color: "#030229" }}>
                      |
                    </span>
                    <a
                      href="#"
                      style={{
                        fontSize: "12px",
                        color: "#030229",
                        textDecoration: "underline",
                        cursor: "pointer",
                        marginRight: "100px",
                      }}
                    >
                      Privacy Policy
                    </a>{" "}
                  </div>
                </form>
              </div>
            </div>
          )}

          {multiinput && (
            <div className="d-flex flex-column gap-3">
              <Image
                src={"/logo.svg"}
                alt="logo"
                className="img-fluid mt-4s"
                width={112}
                height={43}
              />
              <p className="welcome-text mt-3">Welcome to RSSL</p>

              <div className="register-form" style={{ maxWidth: "421px" }}>
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="form-group mb-2">
                    <label className="mt-2 email-text f-16">Tenant</label>
                    <input
                      type="text"
                      disabled
                      placeholder={tenantSlug}
                      // {...register("workspacename")}
                      className="form-control mt-2 teamworkspaceplaceholder1"
                      style={{ height: "54px" }}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label className="mt-2 email-text">
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
                      disabled
                      placeholder={email}
                      // {...register("email")}
                      className="form-control mt-2 teamworkspaceplaceholder1"
                      style={{ height: "54px" }}
                      // onChange={(e: any) => {
                      //   setEmail(e.target.value);
                      //   sessionStorage.setItem("email", e.target.value);
                      // }}
                    />
                    {/* <div className="invalid-feedback">{errors.email?.message}</div> */}
                  </div>

                  <div className="form-group mb-2">
                    <label className="email-text mt-2 f-16">
                      Password
                      <span
                        className="ms-1"
                        style={{ color: "red", fontWeight: "bold" }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password")}
                      className={`form-control mt-2 teamworkspaceformpassword ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      style={{ color: "#626873", height: "54px" }}
                    />
                    <i onClick={togglePasswordVisiblity}>
                      {showPassword ? (
                        <Eye
                          width="20"
                          height="20"
                          className="tenanterror-icon"
                        />
                      ) : (
                        <EyeSlash
                          width="20"
                          height="20"
                          className="tenanterror-icon"
                        />
                      )}
                    </i>
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-between mt-4"
                    style={{ width: "421px", height: "48px" }}
                  >
                    <Link href={`/forgot-password`}>
                      <h4 className="tenantteamforgotpass mb-0">
                        Forgot password?
                      </h4>
                    </Link>
                    {/* <Button
                      type="submit"
                      // loading={loading}
                      className="f-16 mt-2"
                      style={{
                        width: "134px",
                        height: "55px",
                        background: "#00AEEF",
                        border: "#00AEEF",
                        fontSize: "16px",
                      }}
                    >
                      Login
                    </Button> */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="f-16 mt-2"
                      style={{
                        width: "134px",
                        height: "55px",
                        background: "#00AEEF",
                        border: "#00AEEF",
                        borderRadius: "12px",
                        fontSize: "16px",
                      }}
                    >
                      {loading ? (
                        <Spinner
                          animation="border"
                          role="status"
                          size="sm"
                          style={{ marginRight: "5px" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>

                  <hr
                    className="mb-0"
                    style={{
                      border: "0.5px solid #D7D7D7",
                    }}
                  />

                  <div className="d-flex items-center justify-start">
                    <Button
                      className="p-3 mt-3"
                      style={{
                        backgroundColor: "#EAF7FC",
                        height: "55px",
                        width: "421px",
                        border: "#C6C6C6",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="d-flex flex-row text-center align-items-center justify-content-center">
                        <AiOutlineLock size={18} style={{ color: "#A8A8A8" }} />
                        <span
                          className="ms-2"
                          style={{
                            color: "#030229",
                            fontWeight: 400,
                          }}
                        >
                          Use single sign-on (SSO) instead
                        </span>
                      </div>
                    </Button>
                  </div>
                  <div
                    className="d-flex mt-4 flex-column align-items-center justify-content-center"
                    style={{
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
                      </a>{" "}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
