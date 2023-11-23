import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
// import useSWR from "swr";
import { DepartmentsService } from "services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { checkTenant } from "constants/function";

function EditDepartment() {
  const router = useRouter();
  const { id } = router.query;
  const departmentsService = new DepartmentsService();
   

  const { data: departmentsData } = useSWR(["DEPARTMENT_DETAILS", id], () =>
    departmentsService.departmentDetails(id)
  );
  const { mutate: userMutate } = useSWR("LIST_DEPARTMENTS", () =>
    departmentsService.getDepartments()
  );

  const [editedData, setEditedData] = useState(departmentsData);

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!departmentsData) return;

    departmentsData?.Name && setValue("name", departmentsData?.Name);
    departmentsData?.Code && setValue("code", departmentsData?.Code);

    departmentsData?.Description &&
      setValue("description", departmentsData?.Description);
  }),
    [departmentsData];

  const departmentService = new DepartmentsService();

  const { mutate: departmentMutate } = useSWR("LIST_DEPARTMENTS", () =>
    departmentService.getDepartments()
  );

  const [activeStatus, setActiveStatus] = useState(departmentsData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.name,
      description: data.description,
      is_active: activeStatus,
    };

    departmentService
      .editDepartment(id, backendFormat)
      .then((res) => {
        toast.success("Department Edited successfully");
        mutate(departmentMutate());
        router.back();

        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  const handleCheckboxChange = (value) => {
    setActiveStatus(value);
  };
  return (
    <div className="mt-4">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Departments
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Edit Department
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
            <Label className="form-label" for="login-email">
              Department Name
            </Label>
            <Controller
              name="name"
              rules={{ required: "Department Name is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Department Name"
                  invalid={errors.name && true}
                  {...field}
                />
              )}
            />
            {errors.name && (
              <span style={{ color: "red" }}>
                {errors.name.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1 mt-1">
            <Label className="form-label" for="login-email">
              Department Code
            </Label>
            <Controller
              name="code"
              rules={{ required: "Department Code is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                  placeholder="Department Code"
                  invalid={errors.code && true}
                  {...field}
                />
              )}
            />
            {errors.code && (
              <span style={{ color: "red" }}>
                {errors.code.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1 mt-1">
            <Label className="form-label" for="login-email">
              Description
            </Label>
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
          <Label className="text-black" style={{ fontWeight: "400" }}>
            Status{" "}
          </Label>
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

export default EditDepartment;
