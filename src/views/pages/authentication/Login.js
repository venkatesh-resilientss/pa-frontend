// ** React Imports
import { useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
import _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

// ** Third Party Components
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import Logo from "@src/assets/MyImages/Logo.svg";
import {
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
} from "react-feather";

// ** Actions
import { handleLogin } from "@store/authentication";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";

// ** Utils
import { getHomeRouteForLoggedInUser } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { CgDanger } from "react-icons/cg";

const schema = yup.object().shape({
  username: yup.string().required("User Name is required"),
  password: yup.string().required("Password is required"),
});

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to Resilient. Now you
        can start to explore. Enjoy!
      </span>
    </div>
  </Fragment>
);

// const defaultValues = {
//   password: "admin",
//   loginEmail: "admin@demo.com",
// };

const Login = () => {
  // ** Hooks
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const history = useHistory();
  const ability = useContext(AbilityContext);
  const {
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/MyImages/Login2.svg`).default;

  const commonPermissions = [
    {
      action: "manage",
      subject: "all",
    },
  ];

  function defineAbility(data) {
    console.log("Access:::", data.token);
    let permissions = [];

    permissions = _.concat(permissions, commonPermissions);

    return permissions;
  }

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = { username: data.username, password: data.password };

    const loginUrl = `${process.env.REACT_APP_BACKEND_BASEURL}api/login`;

    if (Object.values(data).every((field) => field.length > 0)) {
      useJwt
        .login({ backendFormat: backendFormat, loginUrl: loginUrl })
        .then((res) => {
          if (res.err) {
            toast.errror(res.error);
          }
          const abilities = defineAbility(res.data);

          const data = {
            ...res.data,
            fullName: res?.data?.profile?.name,
            username: res?.data?.profile?.name,
            avatar: res?.data?.image,

            role: res?.data?.user_details?.is_admin ? "ADMIN" : "USER",
            ability: abilities,
            accessToken: res.data.token,
            refreshToken: res.data.refresh,
          };
          dispatch(handleLogin(data));
          ability.update(abilities);
          history.push(getHomeRouteForLoggedInUser(data.role));
        })
        .catch((err) => {
          toast.error("An error occurred during login.");
          console.log(err);
        });
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <div
      className="auth-wrapper auth-cover  "
      style={{ backgroundColor: "#283891" }}
    >
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img src={source} alt="Login Cover" style={{ height: "400px" }} />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <div className="d-flex">
              <img src={Logo} alt="Logo" />
            </div>

            <div
              className="text-black mt-2"
              style={{
                fontSize: "22px",
                fontWeight: "700",
                fontFamily: "Almarai",
              }}
            >
              Welcome to RSSL
            </div>

            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Tenant <span className="text-danger">*</span>
                </Label>
                <Controller
                  id="tenant"
                  name="tenant"
                  control={control}
                  render={({ field }) => (
                    <Input
                      disabled
                      // autoFocus
                      placeholder="client.rssl.io"
                      // invalid={errors.tenant && true}
                      // {...field}
                    />
                  )}
                />
              </div> */}
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  User Name <span className="text-danger">*</span>
                </Label>
                <Controller
                  id="username"
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      // {...register("firstName", {
                      //   required: true,
                      //   maxLength: 20,
                      // })}
                      autoFocus
                      placeholder="User Name"
                      invalid={errors.username && true}
                      {...field}
                    />
                  )}
                />
                <div
                  className="text-danger"
                  style={{ fontSize: "10px", marginTop: "4px" }}
                >
                  {errors.username?.message && (
                    <div>
                      <CgDanger /> {errors.username?.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password <span className="text-danger">*</span>
                  </Label>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                <div
                  className="text-danger"
                  style={{ fontSize: "10px", marginTop: "4px" }}
                >
                  {errors.password?.message && (
                    <div>
                      <CgDanger /> {errors.password?.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="my-auto">
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Button type="submit" color="primary">
                  Log in
                </Button>
              </div>
            </Form>
            <hr />

            <div
              className="text-info text-center"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Use single sign-on (SSO) instead{" "}
            </div>

            <div
              className="text-center w-100 d-flex flex-column mt-1"
              style={{ fontSize: "12px", fontWeight: "400", gap: "4px" }}
            >
              <div>If you need help, contact support</div>
              <div>Please email support or call 805-428-8024</div>
              <div>Powered by Resilient Software Solutions LLC</div>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
