import { useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap-button-loader";
import { toast } from "react-toastify";
import { ForgotPasswordService } from "services";

const forgotPassword = new ForgotPasswordService();

export default function ForgotPassword({ router }) {
  const [loading, setLoading] = useState(false);

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
    if (router.query.email) setValue("email", router.query.email);
  }, [setFocus, router]);

  const formSubmit = async () => {
    try {
      setLoading(true);
      await forgotPassword.forgotPassword({
        email: getValues("email"),
      });
      setLoading(false);
      toast.success("Email has been sent to your registered email");
      router.replace("/");
    } catch (e) {
      setLoading(false);
      toast.error(e?.error || e || "Error");
    }
  };

  return (
    <div className="d-flex h-100 m-0">
      <div className="d-none d-lg-block w-100 bg-forgot">
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
          <Image src="/logo.svg" alt="logo" className="img-fluid" width={110} />
          <p className="fw-bold f-24 f-almarai py-2 mt-5 mb-0">
            Forgot Password?
          </p>
          <p className="f-12 py-2 mb-0">
            Please provide your email address to reset your password.
          </p>
          <form onSubmit={handleSubmit(formSubmit)}>
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

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="w-100 px-4 py-3 lh-13"
              spinColor="#ffffff"
            >
              Reset Password
            </Button>
            <Link href="/" className="text-center float-start f-14 mt-3 w-100">
              Click Here To Login
            </Link>
          </form>

          <hr />

          <div className="text-center mt-auto f-12 clr-dblack">
            <p className="mt-3">If you need help, contact support</p>
            <p className="">
              Please&nbsp;
              <a href="mailto:support@example.com">
                <u className="fw-bold">email</u>
              </a>
              &nbsp;support or call &nbsp;
              <a href="tel:805-428-8024">
                <u className="fw-bold">805-428-8024</u>
              </a>
            </p>
            <p className="">Powered by Resilient Software Solutions LLC</p>

            <div className="d-flex justify-content-between my-2">
              <Link href="/">
                <u className="fw-bold">Terms & conditions</u>
              </Link>
              <Link href="/">
                <u className="fw-bold">Privacy Policy</u>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
