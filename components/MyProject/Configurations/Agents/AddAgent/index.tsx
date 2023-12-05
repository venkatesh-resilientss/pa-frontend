import { Button, Col, Row ,Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

function AddAgent() {
  const router = useRouter();
  const onSubmit = async () => {
    try {
      // Your logic to save the form data
      toast.success("Agent added successfully");
      router.push("/configurations/agent");
    } catch (error) {
      toast.error("Error adding company");
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
            Agents
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black add-agents-subheader"
            >
              Add New Agent
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
                <Label className="form-lable-font">Agency Name<span className="text-danger">*</span></Label>
                <Controller
                  name="AgencyName"
                  rules={{ required: "Agency Name is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Agency Name"
                      invalid={errors.AgencyName && true}
                      {...field}
                    />
                  )}
                />
                {errors.AgencyName && (
                  <span className="text-danger">
                    {errors.AgencyName.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Agency Code<span className="text-danger">*</span></Label>
                <Controller
                  name="AgencyCode"
                  rules={{ required: "Agency Code is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Agency Code"
                      invalid={errors.AgencyCode && true}
                      {...field}
                    />
                  )}
                />
                {errors.AgencyCode && (
                  <span className="text-danger">
                    {errors.AgencyCode.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Agency Address<span className="text-danger">*</span></Label>
                <Controller
                  name="AgencyAddress"
                  rules={{ required: "Agency Address is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Agency Address"
                      invalid={errors.AgencyAddress && true}
                      {...field}
                    />
                  )}
                />
                {errors.AgencyAddress && (
                  <span className="text-danger">
                    {errors.AgencyAddress.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
           
            </Row>
            <Row>
            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Agent Name<span className="text-danger">*</span></Label>
                <Controller
                  name="Agentsname"
                  rules={{ required: "Agent's Name is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Agent's Name"
                      invalid={errors.Agentsname && true}
                      {...field}
                    />
                  )}
                />
                {errors.Agentsname && (
                  <span className="text-danger">
                    {errors.Agentsname.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
              <Col><div className="d-flex flex-column mt-1">
              <Label className="form-lable-font">Status </Label>
              <div className="d-flex gap-1">
                <div className="d-flex gap-1">
                  <input
                    type="radio"
                    id="ex1-active"
                    name="ex1"
                  />
                  <div>Active</div>
                </div>
                <div className="d-flex gap-1">
                  <input
                    type="radio"
                    name="ex1"
                    id="ex1-inactive"
                  />
                  <div>In-Active</div>
                </div>
              </div>
            </div>
            </Col></Row>
            <Row style={{marginTop:'20px'}}>
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

export default AddAgent;
