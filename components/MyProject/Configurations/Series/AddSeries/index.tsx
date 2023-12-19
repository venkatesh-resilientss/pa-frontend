import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { SeriesService } from "services";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";
import { getLabel } from "@/commonFunctions/common";
import { LoaderButton } from "@/components/Loaders";
import { useState } from "react";
function AddSeries() {
  const router = useRouter();
  const seriesValidationRules = formValidationRules.series;
  const seriesService = new SeriesService();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading,setLoader] = useState(false);
  const onSubmit = async (data) => {
    setLoader(true);
    try{
      const { clientID, projectID } = getSessionVariables();
      if( !clientID || !projectID){
        throw new Error('Client and Project not found');
      }
      const payload = {
        name: getLabel(data.seriesname),
        code: data.Seriescode,
        description: data.description,
        is_active: false,
        clientID,
        projectID,
      };
      await seriesService.createSeries(payload);
      setLoader(false);
      toast.success("Series added successfully");
      reset();
      router.back();
    }catch(error){
      setLoader(false);
      toast.error(error?.error || error?.message || error?.Message || "Unable to add Series");
    }
  };

  return (
    <>
      <div className="section mt-4">
        <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
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
              Add New Series
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
              <LoaderButton handleClick={handleSubmit(onSubmit)} buttonText={'Save'} isLoading={isLoading}/>
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
                <Label className="form-lable-font">
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
                <Label className="form-lable-font">
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
                <Label className="form-lable-font">Description</Label>
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
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddSeries;
