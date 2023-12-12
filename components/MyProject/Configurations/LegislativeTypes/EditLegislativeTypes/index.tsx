import { Button, Col, Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditLegislativeType() {
  const router = useRouter();
  const onSubmit = async () => {
    // Handle form submission logic here
    try {
      // Your logic to save the form data
      toast.success("Legislative Type Updated successfully");
      router.push("/configurations/legislative-type");
    } catch (error) {
      toast.error("Error adding Legislative Type");
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
            Legislative Type
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black add-agents-subheader"
            >
              Edit Legislative Type
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
                  <Label className="form-lable-font">Legislative Code<span className="text-danger">*</span></Label>
                  <Controller
                    name="LegislativeCode"
                    rules={{ required: "Legislative Code is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Legislative Code"
                        invalid={errors.LegislativeCode && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.LegislativeCode && (
                    <span className="text-danger">
                      {errors.LegislativeCode.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Legislative Name<span className="text-danger">*</span></Label>
                  <Controller
                    name="LegislativeName"
                    rules={{ required: "Legislative Name is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Legislative Name"
                        invalid={errors.LegislativeName && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.LegislativeName && (
                    <span className="text-danger">
                      {errors.LegislativeName.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Description</Label>
                  <Controller
                    name="Description"
                    control={control}
                    render={({ field }) => (
                      <Input
                      {...field}
                        className="inputFeild"
                        placeholder="Description"
                      />
                    )}
                  />
                </div>
              </Col>

            </Row>
            <Row>
              <Col xl="4">
                <div className="d-flex flex-column mt-2">
                  <Label
                    className="text-black"
                    style={{ fontSize: "16px", fontWeight: "400" }}
                  >
                    Status
                  </Label>
                  <div className="d-flex gap-1">
                    <div className="d-flex gap-1">
                      <input
                        type="radio"
                        id="ex1-active"
                        name="ex1"
                        value="active"
                        checked={true}
                      />
                      <div>Active</div>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        type="radio"
                        name="ex1"
                        id="ex1-inactive"
                        value="inactive"
                      />
                      <div>Inactive</div>
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

export default EditLegislativeType;
