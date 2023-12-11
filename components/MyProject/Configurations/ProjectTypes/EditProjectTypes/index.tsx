import { Button, Col,Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from 'react-select';

function EditProjectType() {
  const router = useRouter();
  const onSubmit = async () => {
    // Handle form submission logic here
    try {
      // Your logic to save the form data
      toast.success("Project Type Updated successfully");
      router.push("/configurations/project-type");
    } catch (error) {
      toast.error("Error adding Project Type");
      console.error(error);
    }
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
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
                    name="ProjectType"
                    rules={{ required: "Project Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        placeholder="Project Type"
                        invalid={errors.ProjectType && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.ProjectType && (
                    <span className="text-danger">
                      {errors.ProjectType.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Project Description<span className="text-danger">*</span></Label>
                  <Controller
                    name="ProjectDescription"
                    rules={{ required: "Project Description is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        placeholder="Project Description"
                        invalid={errors.ProjectDescription && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.ProjectDescription && (
                    <span className="text-danger">
                      {errors.ProjectDescription.message as React.ReactNode}
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
                  <Controller
                    name="Crew"
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
                    name="DGA"
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
                    name="Video Tape"
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
              />
              <div className="radio-text">Active</div>
            </div>
            <div className="d-flex gap-1">
              <input
                type="radio"
                className="custom-radio-input"
                name="ex1"
                id="ex1-inactive"
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
                    Save
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
