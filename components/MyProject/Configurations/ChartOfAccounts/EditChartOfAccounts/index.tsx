import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { COAAccountsService } from "services";
import { COAAccountyTypeOptions } from "@/constants/common";
import { formValidationRules } from "@/constants/common";
import { selectStyles } from "constants/common";
import Select from "react-select";
import { getSessionVariables } from "@/constants/function";
import AsyncSelect from "react-select/async";
import { hasPermission } from "@/commonFunctions/functions";
import { LoaderButton } from "@/components/Loaders";

function EditChartOfAccounts() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoader] = useState(false);
  const coaValidationRules = formValidationRules.chartofaccounts;
  const coaAccountsService = new COAAccountsService();
  const [initialcoaOptions, setInitialcoaOptions] = useState([]);
  const [editMode,setEditMode] = useState(false);
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );

  useEffect(() => {
    const fetchInitialcoaOptions = async () => {
      const { clientID, projectID } = getSessionVariables();
      try {
        const res = await coaAccountsService.getCoasAccounts(
          { clientID, projectID },
          {
            search: "",
            pageLimit: 25,
            offset: 0,
          }
        );
        const options = res?.result
          .filter((item) => item.IsActive)
          .filter((item) => item.ID != id)
          .map((item) => ({
            value: item.ID,
            label: `${item.Code} - ${item.Name}`,
          }));
        setInitialcoaOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialcoaOptions();
  }, []);

  const loadCoaOptions: any = async (inputValue, callback) => {
    const { clientID, projectID } = getSessionVariables();
    try {
      const res = await coaAccountsService.getCoasAccounts(
        { clientID, projectID },
        {
          search: inputValue.toString(),
          pageLimit: 25,
          offset: 0,
        }
      );
      const options = res?.result
        .filter((item) => item.IsActive)
        .filter((item) => item.ID != id)
        .map((item) => ({
          value: item.ID,
          label: `${item.Name} - ${item.Code}`,
        }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };
  const [postableActiveStatus, setPostableActiveStatus] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const [activeStatus, setActiveStatus] = useState(false);

  useEffect(() => {
    const fetchData = async (id: any) => {
      try {
        const response = await coaAccountsService.coaDetails(id);
        const data = response;
        /**Set form value */
        setValue("COAName", data.Name);
        setValue("COACode", data.Code);
        setValue("Description", data.Description);
        setValue(
          "AccountType",
          COAAccountyTypeOptions.find((item) => item.value === data.AccountType)
        ); /** Find and assign a/c to value */
        if (data.Parent)
          setValue("COAParent", {
            label: data.Parent.Name,
            id: data.Parent.ID,
          });
        setActiveStatus(data.IsActive);
        setPostableActiveStatus(data.Postable)
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


  const onSubmit = async (data) => {
    setLoader(true);
    try{
      const { clientID, projectID} = getSessionVariables();
      if( !clientID || !projectID){
        throw new Error('Client and Project not found');
      }
      const payload = {
        name: data.COAName,
        description: data.Description,
        IsActive: activeStatus,
        code: data.COACode,
        parentID: data.COAParent ? parseInt(data.COAParent) : null,
        accountType: data.AccountType.value,
        postable: postableActiveStatus,
        clientID,
        projectID,
      };
      await coaAccountsService.editCOA(id,payload);
      toast.success('COA updated successfully');
      router.push('/configurations/coaaccounts');
      reset();
      setLoader(false);
    }catch(error){
      setLoader(false);
      toast.error(error?.error || error?.Message || error?.message || 'Unable to edit COA');
    }
  };

  return (
    <div className="mt-4">
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
          Edit Chart Of Accounts
        </div>
        <div className="d-flex me-2 align-items-center" style={{ gap: "10px" }}>
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
        className=" mt-2 mb-4 d-flex flex-column"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">
              COA Name <span className="required">*</span>
            </Label>
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
                  disabled={!editMode}
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
            <Label className="form-lable-font">
              COA Code <span className="required">*</span>
            </Label>
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
                  disabled={!editMode}
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
              rules={coaValidationRules.parent}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadCoaOptions}
                  placeholder="Select COA Parent"
                  defaultOptions={initialcoaOptions}
                  styles={selectStyles}
                  isDisabled={!editMode}
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
            <Label className="form-lable-font">
              {" "}
              Account Type <span className="required">*</span>
            </Label>
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
                  isDisabled={!editMode}
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
                  disabled={!editMode}
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
            <Label className="form-lable-font">
              Postable <span className="required">*</span>
            </Label>
            <div className="d-flex gap-1">
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  id="ex1-active"
                  name="postable"
                  checked={postableActiveStatus}
                  onChange={() => {
                    setPostableActiveStatus(true);
                  }}
                  disabled={!editMode}
                />
                <div>Yes</div>
              </div>
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  id="ex1-active"
                  name="postable"
                  checked={!postableActiveStatus}
                  onChange={() => {
                    setPostableActiveStatus(false);
                  }}
                  disabled={!editMode}
                />
                <div>No</div>
              </div>
            </div>
          </div>
        </Col>
        <div className="d-flex flex-column mt-1">
          <Label className="form-lable-font">Status </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input
                style={{ fontSize: "12px", fontWeight: "400" }}
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
                checked={!activeStatus}
                id="ex1-inactive"
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

export default EditChartOfAccounts;
