import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { CountryService } from "services";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

function AddCountry() {
  const router = useRouter();

  const {
    control,
    setError,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [activeStatus, setActiveStatus] = useState(false);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.countryname,
      is_active: activeStatus,
    };

    CountryService.create(backendFormat)
      .then((res) => {
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
                  <span style={{ color: "red" }}>
                    {errors.countryname.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <div className="d-flex flex-column mt-1">
              <Label className="form-lable-font">Status </Label>
              <div className="d-flex gap-1">
                <div className="d-flex gap-1">
                  <input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    type="radio"
                    id="ex1-active"
                    name="ex1"
                    onChange={() => {
                      setActiveStatus(true);
                    }}
                  />
                  <div>Active</div>
                </div>
                <div className="d-flex gap-1">
                  <input
                    type="radio"
                    name="ex1"
                    id="ex1-inactive"
                    onChange={() => {
                      setActiveStatus(false);
                    }}
                  />
                  <div>In-Active</div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddCountry;
