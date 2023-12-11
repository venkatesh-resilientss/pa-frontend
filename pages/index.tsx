import { useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap-button-loader";
import { AiOutlineLock } from "react-icons/ai";
import { Eye } from "@styled-icons/bootstrap/Eye";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";
import { signIn, signOut, useSession } from "next-auth/client";
import { toast } from "react-toastify";
import cookie from "js-cookie";

import Footer from "@/components/login/Footer";
import { Session as NextAuthSession } from "next-auth";
import { AuthService } from "services";

const authService = new AuthService();

export default function Home({ router }) {
  const [session] = useSession();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
    setFocus,
  }: any = useForm();
  const { errors } = formState;

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

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
            .then((resp: any) => {
              cookie.remove("session");
              window.location.href = `http://${resp.Slug}.${process.env.NEXT_PUBLIC_REDIRECT}/dashboard/?accessToken=${response?.token}`;
            })
            .catch((e: any) => {
              toast.error(e?.error || e || "Error");
            });
        })
        .catch((e: any) => {
          toast.error(e?.error || e || "Error during Okta user login");
        });
    }
  }, [session]);

  const formSubmit = async () => {
    try {
      setLoading(true);
      if (!getValues("tenant")) {
        const resp = await authService.checkTenant({
          email: getValues("email"),
        });
        setLoading(false);
        setValue("tenant", resp.Slug);
        setTimeout(() => setFocus("password"), 500);
      } else {
        const resp = await authService.userSignIn({
          email: getValues("email"),
          password: getValues("password"),
        });
        authService.authenticateUser(resp?.token);
        window.location.href = `http://${
          resp?.isStaffUser ? "app" : getValues("tenant")
        }.${process.env.NEXT_PUBLIC_REDIRECT}/dashboard/?accessToken=${
          resp?.token
        }`;
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e?.error || e || "Error");
    }
  };

  if (router?.query?.accessToken) return <></>;

  return (
    <div className="d-flex h-100 m-0">
      <div className="d-none d-lg-block w-100 bg-login">
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <div>
            <p className="intuitive">INTUITIVE</p>
            <p className="entertainment">ENTERTAINMENT</p>
            <p className="software">SOFTWARE</p>
          </div>
        </div>
      </div>
      <div className="overflow-auto p-3 p-sm-5 w-100 login-card">
        <div className="d-flex flex-column mx-auto h-100">
          <Image
            src="/logo.svg"
            alt="logo"
            className="img-fluid mt-auto"
            width={110}
          />
          <p className="fw-bold f-24 f-almarai py-2 mt-5 mb-4">
            Welcome to RSSL
          </p>
          <form onSubmit={handleSubmit(formSubmit)}>
            {getValues("tenant") && (
              <div className="form-group mb-3">
                <label className="mt-2">
                  Tenant <span className="ms-1 text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Tenant"
                  className="form-control mt-2 p-3 f-14"
                  value={
                    getValues("tenant")
                      ? `${getValues("tenant")}.${
                          process.env.NEXT_PUBLIC_REDIRECT
                        }`
                      : ""
                  }
                  disabled={true}
                />
              </div>
            )}

            <div className="form-group mb-3">
              <label className="mt-2">
                Email <span className="ms-1 text-danger">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email", {
                  required: true,
                  //  eslint-disable-next-line
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                })}
                className={`form-control mt-2 p-3 f-14 ${
                  errors.email ? "is-invalid" : ""
                }`}
                disabled={getValues("tenant") ? true : false}
              />
              <div className="invalid-feedback">
                {errors.email &&
                  `Email is ${
                    getValues("email")?.trim() ? "invalid" : "required"
                  }`}
              </div>
            </div>

            {getValues("tenant") && (
              <div className="form-group mb-3">
                <label className="mt-2">
                  Password <span className="ms-1 text-danger">*</span>
                </label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                  {...register("password", { required: true })}
                  className={`form-control mt-2 p-3 f-14 ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                <i onClick={() => setShow(!show)}>
                  {show ? (
                    <Eye className="eye" />
                  ) : (
                    <EyeSlash className="eye" />
                  )}
                </i>
                <div className="invalid-feedback">
                  {errors.password && "Password is required"}
                </div>
              </div>
            )}

            {getValues("tenant") ? (
              <div className="d-flex align-items-center justify-content-between mt-4">
                <Link href={`/forgot-password/?email=${getValues("email")}`}>
                  Forgot Password
                </Link>
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="px-4 py-3 lh-13"
                  spinColor="#ffffff"
                >
                  Login
                </Button>
              </div>
            ) : (
              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                className="w-100 px-4 py-3 lh-13"
                spinColor="#ffffff"
              >
                Continue
              </Button>
            )}
          </form>

          <hr />

          <div className="">
            {!session && (
              <Button className="btn-sso p-3 lh-13 w-100">
                <AiOutlineLock size={16} className="clr-lgrey" />
                <span
                  onClick={() => {
                    if (session) signOut();
                    else signIn();
                  }}
                  className="ms-2"
                >
                  Use single sign-on (SSO) instead
                </span>
              </Button>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
