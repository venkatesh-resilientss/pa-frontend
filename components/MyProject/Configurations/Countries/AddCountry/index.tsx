import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { CountryService } from "services";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { formValidationRules } from "@/constants/common";
function AddCountry() {
  const router = useRouter();
  const countryValidations = formValidationRules.countries;
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
      description : data.description,
      code : data.countrycode,
    };

    countryService
      .createCountry(backendFormat)
      .then(() => {
        toast.success("Country Added successfully");
        router.back();
        reset();
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || 'Unable to add Country');
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
                <Label className="form-lable-font">Country Name <span className="required">*</span></Label>
                <Controller
                  name="countryname"
                  control={control}
                  rules={countryValidations.name}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Country Name"
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
            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Country Code <span className="required">*</span></Label>
                <Controller
                  name="countrycode"
                  control={control}
                  rules={countryValidations.code}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Country Code"
                      invalid={errors.countrycode && true}
                      {...field}
                    />
                  )}
                />
                {errors.countrycode && (
                  <span style={{ color: "red" }}>
                    {errors.countrycode.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font">Description</Label>
              <Controller
                name="description"
                control={control}
                rules={countryValidations.description}
                render={({ field }) => (
                  <Input
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      height: "81px",
                    }}
                    placeholder="Description"
                    invalid={errors.description && true}
                    {...field}
                    type="textarea"
                  />
                )}
              />
              {errors.description && (
                <span style={{ color: "red" }}>
                  {errors.description.message as React.ReactNode}
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
