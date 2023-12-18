import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { EmployeetypesService } from "services";
import { useState } from "react";
function AddEmployeeType() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const employeeTypesService = new EmployeetypesService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if(isSaving) return
    setIsSaving(true)
    try {
      employeeTypesService
      .createEmployeetype(data)
      .then(() => {
        setIsSaving(false)
        toast.success("Employee Type added successfully");
        router.push("/configurations/employee-type");
        reset();
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error);
      });
    } catch (error) {
      toast.error("Error adding Employee type");
      console.error(error);
    }
  };

 
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
            className=" mt-2 d-flex flex-column add-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Employee Type<span className="text-danger">*</span></Label>
                  <Controller
                    name="code"
                    rules={{ required: "Employee Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Employee Type"
                        invalid={errors.code && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.code && (
                    <span className="text-danger">
                      {errors.code.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Employee Description<span className="text-danger">*</span></Label>
                  <Controller
                    name="description"
                    rules={{ required: "Employee Description is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Employee Description"
                        invalid={errors.description && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.description && (
                    <span className="text-danger">
                      {errors.description.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddEmployeeType;
