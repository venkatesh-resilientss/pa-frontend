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
import { getLabel } from "@/commonFunctions/common";
import { hasPermission } from "@/commonFunctions/functions";
import { LoaderButton } from "@/components/Loaders";

function EditDepartment() {
  const router = useRouter();
  const departmentValidationRules = formValidationRules.department;
  const departmentsService = new DepartmentsService();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const departmentService = new DepartmentsService();
  const [activeStatus, setActiveStatus] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  const onSubmit = async (data) => {
    setLoader(true);
    const { id } = router.query;
    try {
      const { clientID } = getSessionVariables();
      const payload = {
        name: getLabel(data.name),
        description: data.description,
        code: data.code,
        isActive: activeStatus,
        clientID,
      };
      await departmentService.editDepartment(id, payload);
      setLoader(false);
      toast.success("Department updated successfully");
      reset();
      router.push("/configurations/departments");
    } catch (error) {
      setLoader(false);
      toast.error(
        error?.error ||
          error?.message ||
          error?.Message ||
          "Unable to update Department"
      );
    }
  };

  useEffect(() => {
    const fetchData = async (id: any) => {
      try {
        const response = await departmentService.departmentDetails(id);
        const data = response;
        /**Set form value */
        setValue("name", data?.Name);
        setValue("code", data?.Code);
        setValue("description", data?.Description);
        setActiveStatus(data?.IsActive);
      } catch (error) {
        toast.error(
          error?.message ||
            error?.Message ||
            error?.error ||
            "Unable to fetch data"
        );
      }
    };
    const { id } = router.query;
    if (id) fetchData(id);
  }, [router.query]);
  return (
    <div className="mt-4 configuration-add">
      <div className="title-sub">All Departments</div>

      <div className="d-flex justify-content-between">
        <div className="title">Edit Department</div>
        <div className="d-flex me-2 align-items-center" style={{ gap: "10px" }}>
          <Button
            onClick={() => router.push("/configurations/departments")}
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
          {hasEditConfigurationPermission && (
            <LoaderButton
              buttonText={editMode ? "Save" : "Edit"}
              isLoading={isLoading}
              handleClick={() => {
                if (!editMode) {
                  setEditMode(true);
                  return;
                }
                handleSubmit(onSubmit)();
              }}
            />
          )}
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
                  disabled={!editMode}
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
                  disabled={!editMode}
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
                  disabled={!editMode}
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
                type="radio"
                id="ex1-active"
                name="ex1"
                checked={activeStatus}
                onChange={() => {
                  setActiveStatus(true);
                }}
                disabled={!editMode}
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
                disabled={!editMode}
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
