import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { ProjectTypesService } from "services";
import { toast } from "react-toastify";
import { useState } from "react";

function AddProjectType() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const projectTypesService = new ProjectTypesService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if(isSaving) return
    data.projectCategory = data.projectCategory.value
    setIsSaving(true)

    projectTypesService
      .createProjecttype(data)
      .then(() => {
        setIsSaving(false)
        toast.success("Project Type added successfully");
        router.push("/configurations/project-type");
        reset();
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error || error?.Message || 'Unable to update Project Type');
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
              Add New Project Type
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
                    name="name"
                    rules={{ required: "Project Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        placeholder="Project Type"
                        invalid={errors.name && true}
                        {...field}
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
                <div className="mb-1">
                  <Label className="form-lable-font">Project Code<span className="text-danger">*</span></Label>
                  <Controller
                    name="code"
                    rules={{ required: "Project Code is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        placeholder="Project Code"
                        invalid={errors.code && true}
                        {...field}
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
                <div className="mb-1">
                  <Label className="form-lable-font">Project Description<span className="text-danger">*</span></Label>
                  <Controller
                    name="description"
                    rules={{ required: "Project Description is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        placeholder="Project Description"
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
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Project Category<span className="text-danger">*</span></Label>
                  <Controller
                    name="projectCategory"
                    control={control}
                    rules={{ required: 'Project Category is required' }}
                    render={({ field }) => (
                      <>
                        <Select
                          className={`selectField ${errors.projectCategory ? 'errorBorder' : ''}`}
                          value={field.value}
                          onChange={(selectedOption) => field.onChange(selectedOption)}
                          options={[
                            { value: 'TH', label: 'TH' },
                            { value: 'COM', label: 'COM' },
                          ]}
                        />
                        {errors.projectCategory && (
                          <span className="text-danger">
                            {errors.projectCategory.message as React.ReactNode}
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
                  <Controller
                    name="crew"
                    control={control}
                    render={({ field }) => (
                      <Input
                      type="checkbox"
                        className="p-2 me-2"
                        placeholder="Crew"
                        {...field}
                      />
                    )}
                  />
                  <Label className="form-lable-font">Crew</Label>
                </div>
              </Col>
            <Col xl="4">
                <div className="mb-1">
                  <Controller
                    name="dga"
                    control={control}
                    render={({ field }) => (
                      <Input
                      type="checkbox"
                        className="p-2 me-2"
                        placeholder="DGA"
                        {...field}
                      />
                    )}
                    
                  />
                  <Label className="form-lable-font">DGA</Label>
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Controller
                    name="videoTape"
                    control={control}
                    render={({ field }) => (
                      <Input
                      type="checkbox"
                        className="p-2 me-2"
                        placeholder="Video Tape"
                        {...field}
                      />
                    )}
                  />
                  <Label className="form-lable-font">Video Tape</Label>
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

export default AddProjectType;
