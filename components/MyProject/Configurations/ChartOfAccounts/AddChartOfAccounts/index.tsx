import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { COAAccountsService } from "services";
import { formValidationRules } from "@/constants/common";
import Select from "react-select";
import { selectStyles } from "constants/common";
import { useState } from "react";
import { COAAccountyTypeOptions } from "@/constants/common";
import useSWR from "swr";
function AddChartOfAccounts() {
  const router = useRouter();
  const coaValidationRules = formValidationRules.chartofaccounts;
  const coaAccountsService = new COAAccountsService();
  
  const {data : COAData} = useSWR("LIST_COA",()=>coaAccountsService.getCoasAccounts());
  const COASelectOptions = COAData?.result.map((account)=>{
    return {
      value : account.ID,
      label : `${account.Code}-${account.Name}`
    }
  })

  const [postableActiveStatus,setPostableActiveStatus] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const backendFormat = {
      name: data.COAName,
      code: data.COACode,
      parentID: parseInt(data.COAParent),
      IsActive: false,
      description: data.Description,
      type: data.AccountType,
      postable : postableActiveStatus
    };

    coaAccountsService
      .createCOA(backendFormat)
      .then(() => {
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
      <div className="">
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
              <Label className="form-lable-font">COA Name <span className="required">*</span></Label>
              <Controller
                name="COAName"
                rules={coaValidationRules.name}
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
                <span className="text-danger">
                  {errors.COAName.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font">COA Code <span className="required">*</span></Label>
              <Controller
                name="COACode"
                rules={coaValidationRules.code}
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
                <span className="text-danger">
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
                rules={coaValidationRules.parent}
                render={({ field }) => (
                  <Select
                  {...field}
                  options={COASelectOptions}
                  placeholder="Select an option"
                  styles={selectStyles}/>
                )}
              />
              {errors.COAParent && (
                <span className="text-danger">
                  {errors.COAParent.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font"> Account Type <span className="required">*</span></Label>
              <Controller
                name="AccountType"
                rules={coaValidationRules.accountType}
                control={control}
                render={({ field }) => (
                  <Select
                  {...field}
                  options={COAAccountyTypeOptions}
                  placeholder="Select an option"
                  styles={selectStyles}
                />
                )}
              />
              {errors.AccountType && (
                <span className="text-danger">
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
                rules={coaValidationRules.description}
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
                <span className="text-danger">
                  {errors.Description.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="4">
            <div className="d-flex flex-column mt-1">
              <Label className="form-lable-font">Postable <span className="required">*</span></Label>
              <div className="d-flex gap-1">
                <div className="d-flex gap-1">
                  <input
                    type="radio"
                    id="ex1-active"
                    name="ex1"
                    checked={postableActiveStatus}
                    onChange={() => {
                      setPostableActiveStatus(true);
                    }}
                  />
                  <div>Yes</div>
                </div>
                <div className="d-flex gap-1">
                  <input
                    type="radio"
                    id="ex1-active"
                    name="ex1"
                    checked={!postableActiveStatus}
                    onChange={() => {
                      setPostableActiveStatus(false);
                    }}
                  />
                  <div>No</div>
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
