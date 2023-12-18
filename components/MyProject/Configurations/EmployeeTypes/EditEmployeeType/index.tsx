import { Button, Col, Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { EmployeetypesService } from "services";
import useSWR from "swr";
import { useEffect, useState } from "react";

function EditEmployeeType() {
  const router = useRouter();
  const { id } = router.query;
  const employeeTypesService = new EmployeetypesService();

  const fetchemployeetypeDetails = (id) => employeeTypesService.employeetypeDetails(id);

  const { data: employeeType } = useSWR(
    id ? ["EMPLOYEETYPE_DETAILS", id] : null,
    () => fetchemployeetypeDetails(id)
  );


  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const [activeStatus, setActiveStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!employeeType) return;
    employeeType?.Code && setValue("Code", employeeType?.Code);
    employeeType?.Description && setValue("Description", employeeType?.Description);
    setActiveStatus(employeeType?.IsActive);
  }, [employeeType]);





  // const onSubmit = async () => {
  //   // Handle form submission logic here
  //   try {
  //     // Your logic to save the form data
  //     toast.success("Employee Type Updated successfully");
  //     router.push("/configurations/project-type");
  //     reset();
  //   } catch (error) {
  //     toast.error("Error adding Employee Type");
  //     console.error(error);
  //     reset();

  //   }
  // };

  const onSubmit = (data) => {
    if (isSaving) return
    data.IsActive = activeStatus
    setIsSaving(true)
    employeeTypesService
      .editEmployeetype(id, data)
      .then(() => {
        setIsSaving(false)
        toast.success("Employee Type Edited successfully");
        // mutate(employeeTypeMutate());
        router.push("/configurations/employee-type");
        reset();
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error);
      });
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
              Edit Employee Type
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
                    name="Code"
                    rules={{ required: "Employee Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Employee Type"
                        invalid={errors.Code && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.Code && (
                    <span className="text-danger">
                      {errors.Code.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Employee Description<span className="text-danger">*</span></Label>
                  <Controller
                    name="Description"
                    rules={{ required: "Employee Description is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Employee Description"
                        invalid={errors.Description && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.Description && (
                    <span className="text-danger">
                      {errors.Description.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-flex flex-column mt-1">
                  <Label className="form-lable-font">Status </Label>
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
                      <div className="radio-text">Active</div>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        type="radio"
                        className="custom-radio-input"
                        name="ex1"
                        id="ex1-inactive"
                        checked={!activeStatus}
                        onChange={() => {
                          setActiveStatus(false);
                        }}
                      />
                      <div className="radio-text">In-Active</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditEmployeeType;
