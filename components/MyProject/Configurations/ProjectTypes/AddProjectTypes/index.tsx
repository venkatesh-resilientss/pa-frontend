import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { toast } from "react-toastify";
function AddProjectType() {
  const router = useRouter();
  const onSubmit = async () => {
    try {
      // Your logic to save the form data
      toast.success("Project Type added successfully");
      router.push("/configurations/project-type");
    } catch (error) {
      toast.error("Error adding Project Type");
      console.error(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
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
                    name="ProjectType"
                    rules={{ required: "Project Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
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
                        className="inputFeild"
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
                  <Label className="form-lable-font">Crew</Label>
                  <Controller
                    name="crew"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          className="selectField"
                          value={field.value}
                          onChange={(selectedOption) => field.onChange(selectedOption)}
                          options={[
                            { value: true, label: 'True' },
                            { value: false, label: 'False' },
                          ]}
                        />
                      </>
                    )}
                  />
                </div>
              </Col>

            </Row>
            <Row>
            <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">DGA</Label>
                  <Controller
                    name="DGA"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          className="selectField"
                          value={field.value}
                          onChange={(selectedOption) => field.onChange(selectedOption)}
                          options={[
                            { value: true, label: 'True' },
                            { value: false, label: 'False' },
                          ]}
                        />
                      </>
                    )}
                  />
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Video Tape</Label>
                  <Controller
                    name="VideoTape"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Select
                          className="selectField"
                          value={field.value}
                          onChange={(selectedOption) => field.onChange(selectedOption)}
                          options={[
                            { value: true, label: 'True' },
                            { value: false, label: 'False' },
                          ]}
                        />
                      </>
                    )}
                  />
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

export default AddProjectType;
