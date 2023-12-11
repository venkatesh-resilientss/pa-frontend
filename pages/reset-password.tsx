import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap-button-loader";
import { toast } from "react-toastify";

import { Eye } from "@styled-icons/bootstrap/Eye";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";

import { ForgotPasswordService } from "services";
import Footer from "@/components/login/Footer";

const forgotPassword = new ForgotPasswordService();

export default function ForgotPassword({ router }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showP, setShowP] = useState(false);

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
    setFocus("new_password");
    if (router.query.email) setValue("email", router.query.email);
    if (router.query.token) setValue("reset_token", router.query.token);
    if (
      router.isReady &&
      router.query &&
      (!router.query.email || !router.query.token)
    )
      window.location.href = `http://app.${process.env.NEXT_PUBLIC_REDIRECT}?reset=true`;
  }, [setFocus, router]);

  const formSubmit = async () => {
    try {
      setLoading(true);
      await forgotPassword.resetPassword({
        email: getValues("email"),
        new_password: getValues("new_password"),
        reset_token: getValues("reset_token"),
      });
      setLoading(false);
      toast.success("Password has been updated successfully");
      router.replace("/");
    } catch (e) {
      setLoading(false);
      toast.error(e?.error || e || "Error");
    }
  };

  return (
    <div className="d-flex h-100 m-0">
      <div className="d-none d-lg-block w-100 bg-reset">
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
          <p className="fw-bold f-24 f-almarai py-2 mt-5 mb-0">
            Reset Password
          </p>
          <p className="f-12 py-2 mb-0">
            Your new password will be your key to accessing your account.
            <br />
            Make it strong and memorable
          </p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="form-group mb-3">
              <label className="mt-2">
                New Password <span className="ms-1 text-danger">*</span>
              </label>
              <input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                {...register("new_password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                })}
                className={`form-control mt-2 p-3 f-14 ${
                  errors.new_password ? "is-invalid" : ""
                }`}
              />
              <i onClick={() => setShow(!show)}>
                {show ? <Eye className="eye" /> : <EyeSlash className="eye" />}
              </i>
              <div className="invalid-feedback">
                {errors.new_password && getValues("new_password")?.trim()
                  ? "Password must have at-least 8 characters with uppercase, lowercase, number & special characters included"
                  : "Password is required"}
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="mt-2">
                Confirm Password <span className="ms-1 text-danger">*</span>
              </label>
              <input
                type={showP ? "text" : "password"}
                placeholder="Re-enter Password"
                {...register("confirm_password", {
                  validate: (value) =>
                    value === getValues("new_password") ||
                    "Passwords do not match",
                })}
                className={`form-control mt-2 p-3 f-14 ${
                  errors.confirm_password ? "is-invalid" : ""
                }`}
              />
              <i onClick={() => setShowP(!showP)}>
                {showP ? <Eye className="eye" /> : <EyeSlash className="eye" />}
              </i>
              <div className="invalid-feedback">
                {errors.confirm_password && "Passwords do not match"}
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="w-100 px-4 py-3 lh-13"
              spinColor="#ffffff"
            >
              Reset Password
            </Button>
          </form>

          <hr />

          <Footer />
        </div>
      </div>
    </div>
  );
}
