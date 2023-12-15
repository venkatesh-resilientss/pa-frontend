import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SeriesService } from "services";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";
import { getLabel } from "@/commonFunctions/common";
import { hasPermission } from "@/commonFunctions/functions";
import { LoaderButton } from "@/components/Loaders";
function EditSeries() {
  const router = useRouter();
  const seriesValidationRules = formValidationRules.series;
  const [editMode,setEditMode] = useState(false);
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
  const [isLoading,setLoader] = useState(false);
  useEffect(() => {
    const fetchData = async (id : any)=>{
      try{
        const response = await seriesService.seriesDetails(id);
        const data = response;
        /**Set form values */
        setValue('seriesname',data.Name);
        setValue('Seriescode',data.Code);
        setValue('description',data.Description);
        setActiveStatus(data.IsActive);
      }catch(error){
        toast.error(error?.message || error?.Message || error?.error || 'Unable to fetch data');
      }
    }
    const {id} = router.query;
    if(id)
      fetchData(id);
  }, [router.query]);

  const seriesService = new SeriesService();

  const [activeStatus, setActiveStatus] = useState(false);

  const onSubmit = async(data) => {
    setLoader(true);
    const {id} = router.query;
    try{
      const { clientID, projectID } = getSessionVariables();
      if( !clientID || !projectID){
        throw new Error('Client and Project not found');
      }
      const payload = {
        name: getLabel(data.seriesname),
        code: data.Seriescode,
        description: data.description,
        IsActive: false,
        clientID,
        projectID,
      };
      await seriesService.editSeries(id,payload);
      setLoader(false);
      toast.success("Series updated successfully");
      reset();
      router.push('/configurations/series');
    }catch(error){
      setLoader(false);
      toast.error(error?.error || error?.message || error?.Message || "Unable to update Series");
    }
  };

  return (
    <>
      <div className="overflow-auto mt-4">
        <div
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          All Series
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="text-black"
            style={{ fontSize: "32px", fontWeight: "600" }}
          >
            Edit Series
          </div>
          <div className="d-flex me-2 align-items-center" style={{ gap: "10px" }}>
            <Button
              onClick={() => router.push('/configurations/series')}
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
            <div className="mb-1">
              <Label className="form-label" for="login-email">
                Series Name <span className="required">*</span>
              </Label>
              <Controller
                name="seriesname"
                rules={seriesValidationRules.name}
                control={control}
                render={({ field }) => (
                  <Input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    placeholder="Series Name"
                    invalid={errors.seriesname && true}
                    {...field}
                    disabled={!editMode}
                  />
                )}
              />
              {errors.seriesname && (
                <span className="text-danger">
                  {errors.seriesname.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label className="form-label" for="login-email">
                Series Code <span className="required">*</span>
              </Label>
              <Controller
                name="Seriescode"
                rules={seriesValidationRules.code}
                control={control}
                render={({ field }) => (
                  <Input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    placeholder="Series Code"
                    invalid={errors.Seriescode && true}
                    {...field}
                    disabled={!editMode}
                  />
                )}
              />
              {errors.Seriescode && (
                <span className="text-danger">
                  {errors.Seriescode.message as React.ReactNode}
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
                rules={seriesValidationRules.description}
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
            <Label className="text-black">Status </Label>
            <div className="d-flex gap-1">
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  id="ex1-active"
                  name="ex1"
                  checked={activeStatus}
                  disabled={!editMode}
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
                  disabled={!editMode}
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
    </>
  );
}

export default EditSeries;
