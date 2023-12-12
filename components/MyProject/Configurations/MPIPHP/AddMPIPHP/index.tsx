import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";

function AddMPIPHPCodes() {
  const router = useRouter();
  const onSubmit = async () => {
    // Handle form submission logic here
    try {
      // Your logic to save the form data
      toast.success("MPIPHP Code added successfully");
      router.push("/configurations/MPIPHP");
    } catch (error) {
      toast.error("Error adding MPIPHP code");
      console.error(error);
    }
  };
  const options = [
    { value: 0, label: "Goranboy" },
    { value: 1, label: "Safikurd" },
    { value: 2, label: "Baku" },
    { value: 4, label: "Shusha" },
    { value: 5, label: "Agdam" },
  ];
  const {
    control,
    handleSubmit,
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
                  <Label className="form-lable-font">Project Type<span className="text-danger">*</span></Label>
                  <Controller
                    name="ProjectType"
                    rules={{ required: "Project Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="inputFeild"
                        placeholder="Project Type"
                        options={options}
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
                  <Label className="form-lable-font">Project Description</Label>
                  <Controller
                    name="Description"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Description"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">UNION/GUILD</Label>
                  <Controller
                    name="UNION"
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="inputFeild"
                        placeholder="UNION/GUILD"
                        options={options}
                        {...field}

                      />
                    )}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">MPIPHP Production Code<span className="text-danger">*</span></Label>
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
                      checked={true}
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
            <Row style={{ marginTop: '20px' }}>
              <Col>
                <div className="d-flex me-2 " style={{ gap: "20px" }}>
                  <Button
                    onClick={() => router.back()}
                    className="buttonStyle buttons-width"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    className="buttonStyle1 buttons-width"
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

export default AddMPIPHPCodes;
