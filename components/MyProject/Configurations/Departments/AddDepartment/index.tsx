import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { DepartmentsService } from "services";
import { toast } from "react-toastify";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";

function AddDepartment() {
  const router = useRouter();
  const departmentValidationRules = formValidationRules.department;
  const departmentService = new DepartmentsService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const {clientID} = getSessionVariables();
    const backendFormat = {
      name: data.departmentname,
      code: data.departmentcode,
      description: data.description,
      clientID
    };

    departmentService
      .createDepartment(backendFormat)
      .then(() => {
        toast.success("Department Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || 'Unable to add Department');
      });
  };
  
  return (
    <div className="mt-4 configuration-add">
      <p className="title-head">All Departments</p>

      <div className="d-flex justify-content-between">
        <div className="title">Add New Department</div>
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
          <div className="mb-1 mt-1">
            <Label className="form-lable-font">
              Department Name<span className="required">*</span>
            </Label>
            <Controller
              name="departmentname"
              rules={departmentValidationRules.name}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Department Name"
                  invalid={errors.departmentname && true}
                  {...field}
                />
              )}
            />
            {errors.departmentname && (
              <span className="text-danger">
                {errors.departmentname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1 mt-1">
            <Label className="form-lable-font">
              Department Code<span className="required">*</span>
            </Label>
            <Controller
              name="departmentcode"
              rules={departmentValidationRules.code}
              control={control}
              render={({ field }) => (
                <Input
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                  placeholder="Department Code"
                  invalid={errors.departmentcode && true}
                  {...field}
                />
              )}
            />
            {errors.departmentcode && (
              <span className="text-danger">
                {errors.departmentcode.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1 mt-1">
            <Label className="form-lable-font">Description</Label>
            <Controller
              name="description"
              control={control}
              rules={departmentValidationRules.description}
              render={({ field }) => (
                <Input
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    height: "81px",
                  }}
                  placeholder="Description"
                  type="textarea"
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

        {/* <div className="d-flex flex-column mt-1">
          <Label className="form-lable-font">Status </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input
                className="custom-radio-input"
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
        </div> */}
      </Form>
    </div>
  );
}

export default AddDepartment;
