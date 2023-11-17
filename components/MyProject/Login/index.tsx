// ** React Imports
import { useState, ReactNode } from "react";

// ** Next Imports
import Link from "next/link";
import { AiOutlineLock } from "react-icons/ai";
import { Row, Col, Button } from "reactstrap";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// ** Layout Import
import { Info } from "react-feather";
import { useRouter } from "next/router";
import Image from "next/image";

const source = require("assets/MyImages/Login2.svg");
const Logo = require("assets/MyImages/productionLogo.svg");

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  tenant: yup.string().min(3).required(),
});

const defaultValues = {
  password: "admin",
  email: "admin@vuexy.com",
  tenant: "tenant",
};

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(() => FaRegEyeSlash);
  const [Error, SetErrors] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // ** Hooks
  const router = useRouter();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const iconProps = {
    size: 16,
    color: "#000000",
  };

  //   const onSubmit = (data: FormData) => {
  //     const { email, password } = data
  //     console.log(email, password, 'sjkajhkjh', data)
  //     if (!email || !password) {
  //       SetErrors(true)
  //     } else {
  //       auth.login({ email, password, rememberMe }, () => {
  //         setError('email', {
  //           type: 'manual',
  //           message: 'Email or Password is invalid'
  //         })
  //       })
  //     }
  //   }
  console.log(Error, "Error");

  const handleToggle = () => {
    if (type === "password") {
      setIcon(FaRegEye);
      setType("text");
    } else {
      setIcon(FaRegEyeSlash);
      setType("password");
    }
  };
  return (
    <div className="overflow-hidden">
      <Row className="auth-inner ">
        <Col
          className="d-none d-lg-flex p-6"
          lg="7"
          sm="12"
          style={{
            backgroundColor: "#283891",
            minHeight: "100vh",
            // overflowY: 'hidden'
          }}
        >
          <div className="d-lg-flex">
            <Image
              src={source}
              alt="Login Cover"
              style={{ height: "599px", marginTop: "100px" }}
            />
          </div>
        </Col>
        <Col
          className="d-flex auth-bg p-lg-5"
          lg="5"
          sm="12"
          style={{ marginTop: "-10px" }}
        >
          <Col
            className="w-[1372px] h-[1500px] left-2228 gap-63.38"
            sm="8"
            md="6"
            lg="12"
          >
            <div className="w-full h-[1500px] p-[78px,103.94px,78px,103.94px] justify-between">
              <div className="w-[283.94px] h-[107.34px]">
                <Image src={Logo} alt="Logo" />
              </div>
              <div className="w-[963.38px] h-[562.42px] gap-91.27">
                <p
                  className="w-530 h-71 font-Almarai text-64 font-bold leading-71 tracking-0 text-left"
                  style={{
                    marginTop: "30px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000000",
                  }}
                >
                  Welcome To RSSL
                </p>
                <div className="w-[963.38px] h-[400.15px] gap-40.56">
                  <div className="w-full h-[220.15px] gap-30.42">
                    <div
                      className="font-Segoe-UI text-41 font-normal leading-54 tracking-0 text-left"
                      style={{ color: "#030229" }}
                    >
                      Tenant{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </div>
                    <div className="w-full h-[135.73px] p-[44.37px,30.42px,44.37px,50.7px] rounded-25.35 gap-25.35">
                      <form
                        autoComplete="off"
                        //   onSubmit={handleSubmit(onSubmit)}
                        className="auth-login-form mt-2"
                      >
                        <div>
                          <Controller
                            name="tenant"
                            control={control}
                            rules={{ required: "tenant is required" }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                autoComplete="off"
                                id="tenant"
                                // ref={emailRef}
                                placeholder="Enter tenant adrress"
                                style={{
                                  backgroundColor: "#F7F7F8",
                                  width: "85%",
                                  border: "none",
                                  outline: "none",
                                  borderColor: "transparent !important",
                                }}
                                className="w-80 p-3 border border-gray-300 rounded"
                                // onChange={() => clearErrors('tenant')}
                              />
                            )}
                          />
                          {Error === true ? (
                            <div className="d-flex justify-center">
                              <Info
                                size={14}
                                style={{
                                  color: "red",
                                  marginRight: "5px",
                                  marginTop: "5px",
                                }}
                              />
                              <p style={{ color: "red", fontWeight: 500 }}>
                                Email is required
                              </p>
                            </div>
                          ) : null}
                        </div>
                        <div
                          className="font-Segoe-UI text-41 font-normal leading-54 tracking-0 text-left mt-3 p-2"
                          style={{ color: "#030229" }}
                        >
                          Email{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </div>
                        <div>
                          <Controller
                            name="email"
                            control={control}
                            rules={{ required: "email is required" }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                autoComplete="off"
                                id="email"
                                // ref={emailRef}
                                placeholder="Enter email adrress"
                                style={{
                                  backgroundColor: "#F7F7F8",
                                  width: "85%",
                                  outline: "none",
                                  borderColor: "transparent !important",
                                }}
                                className="w-80 p-3 border border-gray-300 rounded"
                                // onChange={() => clearErrors('email')}
                              />
                            )}
                          />
                        </div>
                        <div
                          className="font-Segoe-UI text-41 font-normal leading-54 tracking-0 text-left mt-3 p-2"
                          style={{ color: "#030229" }}
                        >
                          Password{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </div>
                        <div>
                          <div className="mb-4 flex">
                            <input
                              type={type}
                              id="password"
                              name="password"
                              placeholder="Password"
                              value={password}
                              // ref={passwordRef}
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="current-password"
                              style={{
                                backgroundColor: "#F7F7F8",
                                width: "85%",
                                outline: "none",
                                borderColor: "transparent !important",
                              }}
                              className="w-80 p-3 border border-gray-300 rounded"
                            />
                            <span
                              className="flex justify-around items-center"
                              style={{ marginLeft: "-40px" }}
                              onClick={handleToggle}
                            >
                              {icon(iconProps)}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            {" "}
                            <Link
                              href="/forgot-password"
                              style={{
                                textDecoration: "none",
                                color: "#030229",
                                fontSize: "20px",
                              }}
                            >
                              <small>Forgot Password?</small>
                            </Link>
                          </div>
                          <Button
                            type="submit"
                            color="primary"
                            style={{
                              width: "140px",
                              marginRight: "80px",
                              height: "60px",
                              fontSize: "18px",
                              background: " #00AEEF",
                              border: "none",
                            }}
                          >
                            Log in
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <hr style={{ marginTop: "30px", width: "85%" }} />
                  <div className="flex items-center justify-start">
                    <Button
                      className="flex p-3 border"
                      color="info"
                      style={{
                        backgroundColor: "#EAF7FC",
                        width: "85%",
                        border: "#C6C6C6",
                      }}
                      onClick={() => router.push(`/singlesignon`)}
                    >
                      <div className="flex items-center">
                        <AiOutlineLock
                          size={18}
                          style={{ color: "#A8A8A8", marginLeft: "25px" }}
                        />
                        <span
                          className="text-41 font-normal leading-54 tracking-0 text-left"
                          style={{
                            marginTop: "-4px",
                            marginLeft: "15px",
                            textAlign: "center",
                            color: "#030229",
                            fontWeight: 400,
                          }}
                        >
                          Use single sign-on (SSO) instead
                        </span>
                      </div>
                    </Button>
                  </div>
                </div>
                <div
                  className="d-flex flex-column mt-5"
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    gap: "4px",
                    marginLeft: "25%",
                    color: "#030229",
                  }}
                >
                  <div style={{ marginLeft: "22px", fontWeight: "500" }}>
                    If you need help, contact support
                  </div>
                  <div>
                    Please email support or call{" "}
                    <a style={{ color: "#030229" }} href="tel:805-428-8024">
                      805-428-8024
                    </a>{" "}
                  </div>
                  <div>Powered by Resilient Software Solutions LLC</div>
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
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

LoginPage.guestGuard = true;

export default LoginPage;
