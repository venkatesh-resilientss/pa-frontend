import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { COAAccountsService } from "services";
import { checkTenant } from "constants/function";

function AddChartOfAccounts() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState(false);
   
  const coaAccountsService = new COAAccountsService();

  const {
    control,
    setError,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "data");

    let backendFormat;

    backendFormat = {
      name: data.COAName,
      code: data.COACode,
      parent: data.COAParent,
      IsActive: activeStatus,
    };

    coaAccountsService
      .coaDetails(backendFormat)
      .then((res) => {
        toast.success("COA Added successfully");
        router.back();

        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div className="section mt-4">
      <div className="overflow-auto">
        <div
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          All Chart Of Accounts
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="text-black"
            style={{ fontSize: "32px", fontWeight: "600" }}
          >
            Add New Chart Of Accounts
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
          {" "}
          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font">COA Name</Label>
              <Controller
                name="COAName"
                rules={{ required: "COA Name  is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="COA Name"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    invalid={errors.COAName && true}
                    {...field}
                  />
                )}
              />
              {errors.COAName && (
                <span style={{ color: "red" }}>
                  {errors.COAName.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font">COA Code</Label>
              <Controller
                name="COACode"
                rules={{ required: "COA Code  is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="COA Code"
                    invalid={errors.COACode && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              {errors.COACode && (
                <span style={{ color: "red" }}>
                  {errors.COACode.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font">COA Parent</Label>
              <Controller
                name="COAParent"
                control={control}
                rules={{ required: "COA Parent  is required" }}
                render={({ field }) => (
                  <Input
                    placeholder="COA Parent"
                    invalid={errors.COAParent && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              {errors.COAParent && (
                <span style={{ color: "red" }}>
                  {errors.COAParent.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font"> Account Type</Label>
              <Controller
                name="AccountType"
                rules={{ required: "Account Type Name  is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="AccountType"
                    invalid={errors.AccountType && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              {errors.AccountType && (
                <span style={{ color: "red" }}>
                  {errors.AccountType.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font"> Description</Label>
              <Controller
                name="Description"
                rules={{ required: "Description  is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    type="textarea"
                    placeholder="Description"
                    invalid={errors.Description && true}
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      height: "81px",
                    }}
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
            <div className="d-flex flex-column mt-1">
              <Label className="form-lable-font">Postable </Label>
              <div className="d-flex gap-1">
                <div className="d-flex gap-1">
                  <input
                    type="radio"
                    id="ex1-active"
                    name="ex1"
                    onChange={() => {
                      setActiveStatus(true);
                    }}
                  />
                  <div>Yes</div>
                </div>
                <div className="d-flex gap-1">
                  <input
                    type="radio"
                    id="ex1-active"
                    name="ex1"
                    onChange={() => {
                      setActiveStatus(false);
                    }}
                  />
                  <div>No</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="d-flex flex-column mt-1">
              <Label className="form-lable-font">Status </Label>
              <div className="d-flex gap-1">
                <div className="d-flex gap-1">
                  <input type="radio" />
                  <div>Active</div>
                </div>
                <div className="d-flex gap-1">
                  <input type="radio" />
                  <div>In-Active</div>
                </div>
              </div>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
}

export default AddChartOfAccounts;
