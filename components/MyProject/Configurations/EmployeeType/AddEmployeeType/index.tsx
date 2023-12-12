import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

function AddEmployeeType() {
  const router = useRouter();

  const onSubmit = async () => {
    try {
      // Your logic to save the form data
      toast.success("Employee type added successfully");
      router.push("/configurations/employee-type");
    } catch (error) {
      toast.error("Error adding Employee type");
      console.error(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="section mt-4">
        <div className="overflow-auto add-agents">
          <div
            className="text-black add-agents-header"
          >
            Employee Type
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black add-agents-subheader"
            >
              Add New  Employee Type
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
            className=" mt-2 d-flex flex-column add-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Employee Type<span className="text-danger">*</span></Label>
                  <Controller
                    name="EmployeeType"
                    rules={{ required: "Employee Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Employee Type"
                        invalid={errors.EmployeeType && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.EmployeeType && (
                    <span className="text-danger">
                      {errors.EmployeeType.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Employee Description<span className="text-danger">*</span></Label>
                  <Controller
                    name="EmployeeDescription"
                    rules={{ required: "Employee Description is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Employee Description"
                        invalid={errors.EmployeeDescription && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.EmployeeDescription && (
                    <span className="text-danger">
                      {errors.EmployeeDescription.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col>
                <div className="d-flex me-2 " style={{ gap: "20px" }}>
                  <Button
                    onClick={() => router.back()}
                    className="buttonStyle edit-buttons"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    className="buttonStyle1 edit-buttons"
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

export default AddEmployeeType;
