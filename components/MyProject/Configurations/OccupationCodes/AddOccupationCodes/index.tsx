import { Button, Col, Row ,Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

function AddSeries() {
  const router = useRouter();
  const onSubmit = async () => {
    // Handle form submission logic here
    try {
      // Your logic to save the form data
      toast.success("Company added successfully");
      router.push("/configurations/company");
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
        <div className="overflow-auto">
          <div
            className="text-black"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            Occupation Code
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black"
              style={{ fontSize: "32px", fontWeight: "600" }}
            >
              Add Occupation Code
            </div>
          </div>

          <hr style={{ height: "2px" }} />
          <Form
            style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
            className=" mt-2 d-flex flex-column"
            onClick={handleSubmit(onSubmit)}
          >
            <Row>
            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">OCC Code<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="OCCCode"
                  rules={{ required: "OCC Code is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="OCC Code"
                      invalid={errors.OCCCode && true}
                      {...field}
                    />
                  )}
                />
                {errors.OCCCode && (
                  <span style={{ color: "red" }}>
                    {errors.OCCCode.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Description<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="Description"
                  rules={{ required: "Description is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Description"
                      invalid={errors.Description && true}
                      {...field}
                    />
                  )}
                />
                {errors.Description && (
                  <span style={{ color: "red" }}>
                    {errors.Description.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">WC Class<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="WCClass"
                  rules={{ required: "WC Class is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Series Code"
                      invalid={errors.WCClass && true}
                      {...field}
                    />
                  )}
                />
                {errors.WCClass && (
                  <span style={{ color: "red" }}>
                    {errors.WCClass.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Employee Type<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="EmployeeType"
                  rules={{ required: "Employee Type is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Employee Type"
                      invalid={errors.EmployeeType && true}
                      {...field}
                    />
                  )}
                />
                {errors.EmployeeType && (
                  <span style={{ color: "red" }}>
                    {errors.EmployeeType.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">OFF Production<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="OFFProduction"
                  rules={{ required: "OFF Production is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="inputFeild"
                      placeholder="OFF Production"
                      invalid={errors.OFFProduction && true}
                      {...field}
                    />
                  )}
                />
                {errors.OFFProduction && (
                  <span style={{ color: "red" }}>
                    {errors.OFFProduction.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Agreements<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="Agreements"
                  rules={{ required: "Agreements is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Agreements"
                      invalid={errors.Agreements && true}
                      {...field}
                    />
                  )}
                />
                {errors.Agreements && (
                  <span style={{ color: "red" }}>
                    {errors.Agreements.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
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
               className="buttonStyle"
              >
                Cancel 
              </Button>
              <Button
                color="primary"
                className="buttonStyle1"
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

export default AddSeries;
