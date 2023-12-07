import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
// import useSWR from "swr";
import { DepartmentsService } from "services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Controller, useForm } from "react-hook-form";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";

function EditDepartment() {
  const router = useRouter();
  const { id } = router.query;
  const departmentValidationRules = formValidationRules.department;
  const departmentsService = new DepartmentsService();

  const { data: departmentsData } = useSWR(["DEPARTMENT_DETAILS", id], () =>
    departmentsService.departmentDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
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
    setActiveStatus(departmentsData?.IsActive);
  }, [departmentsData]);

  const departmentService = new DepartmentsService();

  // const [activeStatus, setActiveStatus] = useState(departmentsData?.IsActive ? 'active' : 'inactive');
  const [activeStatus, setActiveStatus] = useState(departmentsData?.IsActive);
  const onSubmit = (data) => {
    const {clientID} = getSessionVariables();
    const backendFormat = {
      name: data.name,
      description: data.description,
      code: data.code,
      isActive: activeStatus,
      clientID
    };

    departmentService
      .editDepartment(id, backendFormat)
      .then(() => {
        toast.success("Department Edited successfully");
        router.back();

        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div className="mt-4 configuration-add">
      <div
        className="title-sub"
        
      >
        All Departments
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="title"
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
              Department Name<span className="required">*</span>
            </Label>
            <Controller
              name="name"
              rules={departmentValidationRules.name}
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
              <span className="text-danger">
                {errors.name.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1 mt-1">
            <Label className="form-label" for="login-email">
              Department Code<span className="required">*</span>
            </Label>
            <Controller
              name="code"
              rules={departmentValidationRules.code}
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
              <span className="text-danger">
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
                checked={activeStatus}
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
                checked={!activeStatus}
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
