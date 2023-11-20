import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { DepartmentsService } from "services";
import { toast } from "react-toastify";
import { useState } from "react";

function AddDepartment() {
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
    let backendFormat = {};

    backendFormat = {
      name: data.departmentname,
      code: data.departmentcode,
      description: data.description,
      isActive: activeStatus,
    };

    DepartmentsService.create(backendFormat)
      .then((res) => {
        toast.success("Department Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div>
      <div
        className="text-black mt-4"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Departments
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Add New Department
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
          <div className="mb-1 mt-1">
            <Label className="form-lable-font">Department Name</Label>
            <Controller
              name="departmentname"
              rules={{ required: "Department Name is required" }}
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
              <span style={{ color: "red" }}>
                {errors.departmentname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1 mt-1">
            <Label className="form-lable-font">Department Code</Label>
            <Controller
              name="departmentcode"
              rules={{ required: "Department Code is required" }}
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
              <span style={{ color: "red" }}>
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
              rules={{ required: "Description is required" }}
              control={control}
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
              <span style={{ color: "red" }}>
                {errors.description.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>

        <div className="d-flex flex-column mt-1">
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
        </div>
      </Form>
    </div>
  );
}

export default AddDepartment;
