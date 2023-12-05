import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { CountryService } from "services";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

function AddCountry() {
  const router = useRouter();

  const countryService = new CountryService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const backendFormat = {
      name: data.countryname,
      is_active: false,
    };

    countryService
      .createCountry(backendFormat)
      .then(() => {
        toast.success("Country Added successfully");
        router.back();
        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <>
      <div className="section mt-4">
        <div className="overflow-auto">
          <div
            className="text-black"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            All Countries
          </div>
          <div className="d-flex justify-content-between">
            <div
              className="text-black"
              style={{ fontSize: "32px", fontWeight: "600" }}
            >
              Add Country
            </div>
            <div className="d-flex me-2 " style={{ gap: "10px" }}>
              <Button
                onClick={() => router.back()}
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  height: "34px",
                  backgroundColor: "transparent",
                  color: "#2D2C2C",
                  border: "none",
                }}
              >
                Dismiss
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                color="primary"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  height: "34px",
                }}
              >
                Save
              </Button>
            </div>
          </div>
          <hr style={{ height: "2px" }} />
          <Form
            style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
            className=" mt-2 d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Country name</Label>
                <Controller
                  name="countryname"
                  control={control}
                  rules={{ required: "Country Name  is required" }}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Country name"
                      invalid={errors.countryname && true}
                      {...field}
                    />
                  )}
                />
                {errors.countryname && (
                  <span className="text-danger">
                    {errors.countryname.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddCountry;
