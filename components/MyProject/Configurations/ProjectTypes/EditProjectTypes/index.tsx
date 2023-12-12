import { Button, Col,Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from 'react-select';
import { ProjectTypesService } from "services";
import useSWR, { mutate }  from "swr";
import { useEffect, useState } from "react";

function EditProjectType() {
  const router = useRouter();
  const { id } = router.query;
  const fetchprojecttypeDetails = (id) => projectTypesService.projecttypeDetails(id);

  const { data: projectType } = useSWR(
    id ? ["PROJECTTYPE_DETAILS", id] : null,
    () => fetchprojecttypeDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const [activeStatus, setActiveStatus] = useState(false);
  const [activeCrew, setActiveCrew] = useState(false);
  const [activeDGA, setActiveDGA] = useState(false);
  const [activevideoTape, setActivevideoTape] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!projectType) return;
    projectType?.Name && setValue("Name", projectType?.Name);
    projectType?.Code && setValue("Code", projectType?.Code);
    projectType?.Description && setValue("Description", projectType?.Description);
    projectType?.ProjectCategory && setValue("ProjectCategory", {label: projectType?.ProjectCategory, value: projectType?.ProjectCategory});
    projectType?.Crew && setValue("Crew", projectType?.Crew);
    projectType?.DGA && setValue("DGA", projectType?.DGA);
    projectType?.VideoTape && setValue("VideoTape", projectType?.VideoTape);
    setActiveStatus(projectType?.IsActive);
    setActiveCrew(projectType?.Crew);
    setActiveDGA(projectType?.DGA);
    setActivevideoTape(projectType?.VideoTape);
  }, [projectType]);

  const projectTypesService = new ProjectTypesService();

  const { mutate: projectTypeMutate } = useSWR("LIST_PROJECTTYPES", () =>
  projectTypesService.getProjecttypes()
  );

  const onSubmit = (data) => {
    if (isSaving) return
    data.ProjectCategory = data.ProjectCategory.value
    data.Crew = activeCrew
    data.DGA = activeDGA
    data.VideoTape = activevideoTape
    data.IsActive = activeStatus
    setIsSaving(true)
    projectTypesService
      .editProjecttype(id, data)
      .then(() => {
        setIsSaving(false)
        toast.success("Project Type Edited successfully");
        mutate(projectTypeMutate());
        router.push("/configurations/project-type");
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
            Project Type
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black add-agents-subheader"
            >
              Edit Project Type
            </div>
            {/* <div className="d-flex me-2 " style={{ gap: "10px" }}>
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
            </div> */}
          </div>

          <hr style={{ height: "2px" }} />
          <Form
            className=" mt-2 d-flex flex-column add-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Project Type<span className="text-danger">*</span></Label>
                  <Controller
                    name="Name"
                    rules={{ required: "Project Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        placeholder="Project Type"
                        invalid={errors.Name && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.Name && (
                    <span className="text-danger">
                      {errors.Name.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Project Code<span className="text-danger">*</span></Label>
                  <Controller
                    name="Code"
                    rules={{ required: "Project Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        placeholder="Project Type"
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
                  <Label className="form-lable-font">Project Description<span className="text-danger">*</span></Label>
                  <Controller
                    name="Description"
                    rules={{ required: "Project Description is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        placeholder="Project Description"
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
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Project Category<span className="text-danger">*</span></Label>
                  <Controller
                    name="ProjectCategory"
                    control={control}
                    rules={{ required: 'Project Category is required' }}
                    render={({ field }) => (
                      <>
                        <Select
                          className={`selectField ${errors.ProjectCategory ? 'errorBorder' : ''}`}
                          value={field.value}
                          onChange={(selectedOption) => field.onChange(selectedOption)}
                          options={[
                            { value: 'TH', label: 'TH' },
                            { value: 'COM', label: 'COM' },
                          ]}
                        />
                        {errors.ProjectCategory && (
                          <span className="text-danger">
                            {errors.ProjectCategory.message as React.ReactNode}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </Col>

            </Row>
            <Row>
            <Col xl="4">
                <div className="mb-1">
                      <Input
                      type="checkbox"
                        className="p-2 checkBocMargin"
                        checked={activeCrew}
                        onChange={() => {
                          setActiveCrew(!activeCrew);
                        }}
                        placeholder="Crew"
                      />
                  <Label className="form-lable-font">Crew</Label>
                </div>
              </Col>
            <Col xl="4">
                <div className="mb-1">
                <Input
                      type="checkbox"
                      checked={activeDGA}
                      onChange={() => {
                        setActiveDGA(!activeDGA);
                      }}
                        className="p-2 checkBocMargin"
                        placeholder="DGA"
                      />
                  <Label className="form-lable-font">DGA</Label>
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  {/* <Controller
                    name="VideoTape"
                    control={control}
                    render={({ field }) => (
                      
                    )}
                  /> */}
                  <Input
                      type="checkbox"
                        className="p-2 checkBocMargin"
                        checked={activevideoTape}
                        onChange={() => {
                          setActivevideoTape(!activevideoTape);
                        }}
                        placeholder="Video Tape"
                      />
                  <Label className="form-lable-font">Video Tape</Label>
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
            <Row style={{ marginTop: '20px' }}>
              <Col>
                <div className="d-flex me-2 " style={{ gap: "20px" }}>
                  <Button
                    onClick={() => router.back()}
                    className="buttonStyle edit-buttons"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    className="buttonStyle1 edit-buttons"
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </div></Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditProjectType;
