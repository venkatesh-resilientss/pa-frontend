const baseUrl = process.env.REACT_APP_BACKEND_BASEURL;

// ** Auth Endpoints
export default {
  loginEndpoint: `${process.env.REACT_APP_BACKEND_BASEURL}api/login/`,
  registerEndpoint: "/jwt/register",
  // registerEndpoint: `${process.env.REACT_APP_BACKEND_BASEURL}website/user-registration/`,
  refreshEndpoint: `${baseUrl}api/login/`,
  logoutEndpoint: "/jwt/logout",
  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
};
