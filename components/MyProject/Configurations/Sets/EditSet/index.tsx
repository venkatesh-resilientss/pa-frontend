import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SetsService } from "services";
import { toast } from "react-toastify";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";
import { getLabel } from "@/commonFunctions/common";
import { hasPermission } from "@/commonFunctions/functions";
import { LoaderButton } from "@/components/Loaders";
function EditSet() {
  const router = useRouter();
  const setsValidationRules = formValidationRules.sets;
  const setService = new SetsService();
  const { id } = router.query;
  const [editMode,setEditMode] = useState(false);
  const [isLoading,setLoader] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  useEffect(() => {
    const fetchData = async (id : any)=>{
      try{
        const response = await setService.setsDetails(id);
        const data = response;
        /**Set form values */
        setValue("setname", data?.Name);
        setValue("setcode", data?.Code);
        setValue("description", data?.Description);
        setActiveStatus(data.IsActive);
      }catch(error){
        toast.error(error?.message || error?.Message || error?.error || 'Unable to fetch data');
      }
    }
    const {id} = router.query;
    if(id)
      fetchData(id);
  }, [router.query]);

  

  const onSubmit = async (data) => {
    setLoader(true);
    try{
      const { clientID, projectID } = getSessionVariables();
      if( !clientID || !projectID){
        throw new Error('Client and Project not found');
      }
      const payload = {
        name: getLabel(data.setname),
        description: data.description,
        isActive: activeStatus,
        code: data.setcode,
        clientID,
        projectID,
      };
      await setService.editSet(id, payload);
      setLoader(false);
      toast.success("Set Edited successfully");
      router.push("/configurations/sets");
      reset();
    }catch(error){
      setLoader(false);
      toast.error(error?.error || error?.message || error?.Message || "Unable to update Set");
    }
  };

  return (
    <div className="mt-4">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Sets
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Edit Set
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
        className=" mt-2 d-flex flex-column"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <Col xl="4">
          <div className="mb-1">
            <Label>
              Set Name <span className="required">*</span>
            </Label>
            <Controller
              name="setname"
              rules={setsValidationRules.name}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Set Name"
                  invalid={errors.setname && true}
                  {...field}
                  disabled={!editMode}
                />
              )}
            />
            {errors.setname && (
              <span className="text-danger">
                {errors.setname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Set Code <span className="required">*</span>
            </Label>
            <Controller
              name="setcode"
              rules={setsValidationRules.code}
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Set Code"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  invalid={errors.setcode && true}
                  {...field}
                  disabled={!editMode}
                />
              )}
            />
            {errors.setcode && (
              <span className="text-danger">
                {errors.setcode.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Description
            </Label>
            <Controller
              name="description"
              rules={setsValidationRules.description}
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
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Status{" "}
          </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input
                type="radio"
                id="ex1-active"
                name="ex1"
                value="active"
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
                value="inactive"
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

export default EditSet;
