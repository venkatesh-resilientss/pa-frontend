// ** React Imports
import { Link, Redirect } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import Logo from "@src/assets/MyImages/Logo.svg";
import Lock from "@src/assets/MyImages/Lock.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { toast } from "react-toastify";
import { CgDanger } from "react-icons/cg";
import { ForgotPasswordService } from "@src/services";

const ForgotPassword = () => {
  // ** Hooks
  const { skin } = useSkin();

  const illustration =
      skin === "dark"
        ? "forgot-password-v2-dark.svg"
        : "forgot-password-v2.svg",
    source = require(`@src/assets/MyImages/forgetPasswordImage.svg`).default;

  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
  });

  const {
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const backendFormat = { email: data.email };

    console.log("back", backendFormat);

    ForgotPasswordService.create(backendFormat)
      .then((res) => {
        toast.success("Reset Link Sent To Email successfully");
        resetForm();
      })
      .catch((error) => {
        console.log("ERROR", error);
        toast.error(error.error);
      });
  };

  if (!isUserLoggedIn()) {
    return (
      <div
        className="auth-wrapper auth-cover"
        style={{ backgroundColor: "#283891" }}
      >
        <Row className="auth-inner m-0">
          <Col
            className="d-none d-lg-flex align-items-center p-5"
            lg="8"
            sm="12"
          >
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img className="img-fluid" src={source} alt="Login Cover" />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <div className="d-flex justify-content-center">
                <img src={Logo} alt="Logo" />
              </div>

              <div className="d-flex justify-content-center my-2">
                <img src={Lock} alt="Logo" />
              </div>
              <div
                className="text-black text-center"
                style={{ fontSize: "22px", fontWeight: "600" }}
              >
                Forget Password?
              </div>
              <CardText className="mb-2 text-center text-black">
                Please enter the email your used when signing up to receive
                reset instructions.
              </CardText>
              <Form
                className="auth-forgot-password-form mt-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Email
                  </Label>

                  <Controller
                    id="email"
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                        {...field}
                        autoFocus
                      />
                    )}
                  />

                  <div
                    className="text-danger"
                    style={{ fontSize: "10px", marginTop: "4px" }}
                  >
                    {errors.email?.message && (
                      <div>
                        <CgDanger /> {errors.email?.message}
                      </div>
                    )}
                  </div>
                </div>
                <Button color="primary" block>
                  Send reset link
                </Button>
              </Form>
              <p className="text-center mt-2">
                <Link to="/login">
                  <ChevronLeft className="rotate-rtl me-25" size={14} />
                  <span className="align-middle">Return to login</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default ForgotPassword;
