import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LocationsService } from "services";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";
import { getLabel } from "@/commonFunctions/common";
import { hasPermission } from "@/commonFunctions/functions";
import { LoaderButton } from "@/components/Loaders";
function EditLocation() {
  const router = useRouter();
  const locationValidationRules = formValidationRules.locations;
  const locationService = new LocationsService();
  const [editMode, setEditMode] = useState(false);
  const [isLoading,setLoader] = useState(false);
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
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
        const response = await locationService.locationDetails(id);
        const data = response;
        /**Set form values */
        setValue("locationname", response?.Name);
        setValue("locationcode", response?.Code);
        setValue("description", response?.Description);
        setActiveStatus(data.IsActive);
      } catch (error) {
        toast.error(
          error?.message ||
            error?.Message ||
            error?.error ||
            "Unable to fetch data"
        );
      }
    };
    const {id} = router.query;
    if(id)
      fetchData(id);
  }, [router.query]);

  const onSubmit = async(data) => {
    setLoader(true);
    const {id} = router.query;
    try{
      const { clientID, projectID} = getSessionVariables();
      if( !clientID || !projectID){
        throw new Error('Client and Project not found');
      }
      const payload = {
        name: getLabel(data.locationname),
        description: data.description,
        isActive: activeStatus,
        code: data.locationcode,
        clientID,
        projectID,
      };
      await locationService.editLocation(id,payload);
      toast.success("Location Edited successfully");
      router.push("/configurations/locations");
      reset();
      setLoader(false);
    }
    catch(error){
      setLoader(false);
      toast.error(error?.error || error?.Message || error?.message || 'Unable to update Location')
    }
  };

  return (
    <div className="mt-4 configuration-add">
      <div className="title-head">All Locations</div>

      <div className="d-flex justify-content-between">
        <div className="title">Edit Location</div>

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
            <Label className="form-label" for="login-email">
              Location Name <span className="required">*</span>
            </Label>
            <Controller
              name="locationname"
              rules={locationValidationRules.name}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Location Name"
                  invalid={errors.locationname && true}
                  {...field}
                  disabled={!editMode}
                />
              )}
            />

            {errors.locationname && (
              <span className="text-danger">
                {errors.locationname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Location Code <span className="required">*</span>
            </Label>
            <Controller
              name="locationcode"
              rules={locationValidationRules.code}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Location Code"
                  invalid={errors.locationcode && true}
                  {...field}
                  disabled={!editMode}
                />
              )}
            />
            {errors.locationcode && (
              <span className="text-danger">
                {errors.locationcode.message as React.ReactNode}
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
              control={control}
              rules={locationValidationRules.description}
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

export default EditLocation;
