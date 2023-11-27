// ** React Imports
import { ReactNode } from "react";
import Link from "next/link";
import { Row, Col, Button } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
const SingleOnFrame = require("assets/MyImages/ssoframe.svg");
const Logo = require("assets/MyImages/productionLogo.svg");
const SSOLogo = require("assets/MyImages/ssoLogo.svg");

const Singlesignon = () => {
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues,
    mode: "onBlur",
    // resolver: yupResolver(schema)
  });

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
          }}
        >
          <div className="d-lg-flex">
            <Image
              src={SingleOnFrame}
              alt="Login Cover"
              style={{ height: "599px", marginTop: "100px" }}
            />
          </div>
        </Col>

        <Col
          className="d-flex auth-bg p-lg-5 pl-2"
          lg="5"
          sm="12"
          style={{ marginTop: "-35px" }}
        >
          <Col className="p-4" sm="8" md="6" lg="12">
            <div className="w-full h-[1500px] p-[78px,103.94px,78px,103.94px] justify-between">
              <div className="w-[283.94px] h-[107.34px]">
                <Image src={Logo} alt="Logo" />
              </div>
              <div>
                <Image
                  src={SSOLogo}
                  alt="Logo"
                  style={{ height: "60px", width: "60px", marginTop: "35px" }}
                />
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
                  Single sign-on
                </p>

                <div className="w-[963.38px] h-[400.15px] gap-40.56">
                  <div className="w-full h-[220.15px] gap-30.42">
                    <div
                      className="font-Segoe-UI text-41 font-normal leading-54 tracking-0 text-left"
                      style={{ color: "#030229" }}
                    ></div>
                    <div className="w-full h-[135.73px] p-[44.37px,30.42px,44.37px,50.7px] rounded-25.35 gap-25.35">
                      <form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => e.preventDefault()}
                        className="auth-login-form mt-2"
                      >
                        <div
                          className="font-Segoe-UI text-41 font-normal leading-54 tracking-0 text-left mt-2"
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
                                  marginTop: "10px",
                                  outline: "none",
                                  borderColor: "transparent !important",
                                }}
                                className="w-80 p-3 border border-gray-300 rounded"
                                // onChange={() => clearErrors('email')}
                              />
                            )}
                          />
                        </div>

                        <div className="mt-3">
                          <Button
                            type="submit"
                            color="primary"
                            style={{
                              width: "85%",
                              marginRight: "80px",
                              height: "60px",
                              fontSize: "21px",
                              background: " #00AEEF",
                              border: "none",
                            }}
                          >
                            <span
                              style={{ color: "#FFFFFF", fontWeight: 300 }}
                              className="font-segoe-ui text-51 font-normal leading-67 tracking-normal text-left"
                            >
                              Submit
                            </span>
                          </Button>
                        </div>
                        <div
                          style={{
                            marginTop: "30px",
                            textAlign: "center",
                            marginLeft: "-40px",
                          }}
                        >
                          <Link
                            href="/welcome"
                            style={{
                              textDecoration: "none",
                              color: "#030229",
                              fontSize: "20px",
                            }}
                          >
                            <small>Login with password</small>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex flex-column"
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    gap: "4px",
                    marginLeft: "25%",
                    color: "#030229",
                    marginTop: "150px",
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

export default Singlesignon;
