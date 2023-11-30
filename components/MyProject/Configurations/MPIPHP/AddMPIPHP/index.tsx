import ReactSelect from "react-select";
import { Button, Col, Row ,Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { SeriesService } from "services";
import { checkTenant } from "constants/function";

function AddWCCodes() {
  const router = useRouter();
  const [tenantId, setTenantId] = useState("");
  const onSubmit = async (data) => {
    // Handle form submission logic here
    try {
      // Your logic to save the form data
      toast.success("Company added successfully");
      router.push("/configurations/company");
    } catch (error) {
      toast.error("Error adding company");
      console.error(error);
    }
  };
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="section mt-4">
        <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
          <div
            className="text-black"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
           MPIPHP Production Code
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black"
              style={{ fontSize: "32px", fontWeight: "600" }}
            >
              Add  MPIPHP Production Code
            </div>
            {/* <div className="d-flex me-2 " style={{ gap: "10px" }}>
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
            </div> */}
          </div>

          <hr style={{ height: "2px" }} />
          <Form
            style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
            className=" mt-2 d-flex flex-column"
            onClick={handleSubmit(onSubmit)}
          >
            <Row>
            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Project Type<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="ProjectType"
                  rules={{ required: "Project Type is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Project Type"
                      invalid={errors.ProjectType && true}
                      {...field}
                    />
                  )}
                />
                {errors.ProjectType && (
                  <span style={{ color: "red" }}>
                    {errors.ProjectType.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Project Description<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="Description"
                  rules={{ required: "Project Description is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Description"
                      invalid={errors.Description && true}
                      {...field}
                    />
                  )}
                />
                {errors.Description && (
                  <span style={{ color: "red" }}>
                    {errors.Description.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">UNION/GUILD<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="UNION"
                  rules={{ required: "UNION is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="UNION/GUILD"
                      invalid={errors.UNION && true}
                      {...field}
                    />
                  )}
                />
                {errors.UNION && (
                  <span style={{ color: "red" }}>
                    {errors.UNION.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">MPIPHP Production Code<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="MPIPHPProductionCode"
                  rules={{ required: "MPIPHP Production Code is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="MPIPHP Production Code"
                      invalid={errors.MPIPHPProductionCode && true}
                      {...field}
                    />
                  )}
                />
                {errors.MPIPHPProductionCode && (
                  <span style={{ color: "red" }}>
                    {errors.MPIPHPProductionCode.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col><div className="d-flex flex-column mt-1">
              <Label className="form-lable-font">Status </Label>
              <div className="d-flex gap-1">
                <div className="d-flex gap-1">
                  <input
                    type="radio"
                    id="ex1-active"
                    name="ex1"
                  />
                  <div>Active</div>
                </div>
                <div className="d-flex gap-1">
                  <input
                    type="radio"
                    name="ex1"
                    id="ex1-inactive"
                  />
                  <div>In-Active</div>
                </div>
              </div>
            </div>
            </Col>
            </Row>
            <Row style={{marginTop:'20px'}}>
              <Col>
                 <div className="d-flex me-2 " style={{ gap: "20px" }}>
              <Button
                onClick={() => router.back()}
               className="buttonStyle"
              >
                Cancel 
              </Button>
              <Button
                color="primary"
                className="buttonStyle1"
              >
                Save
              </Button>
            </div></Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddWCCodes;
