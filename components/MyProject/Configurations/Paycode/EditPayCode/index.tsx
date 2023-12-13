import { Button, Col,Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";

function EditpayCodes() {
  const router = useRouter();

  const onSubmit = async () => {
    // Handle form submission logic here
    try {
      // Your logic to save the form data
      toast.success("Paycode saved successfully");
      router.push("/configurations/paycode");
    } catch (error) {
      toast.error("Error adding Paycode");
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
      <div className="overflow-auto mt-4">
        <div
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          Paycodes
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="text-black"
            style={{ fontSize: "32px", fontWeight: "600" }}
          >
            Edit Paycode
          </div>
          
        </div>

        <hr style={{ height: "2px" }} />

        <Form
            style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
            className=" mt-2 d-flex flex-column"
            onClick={handleSubmit(onSubmit)}
          >
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">CODE<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="Code"
                  rules={{ required: "Code is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Code"
                      invalid={errors.Code && true}
                      {...field}
                    />
                  )}
                />
                {errors.Code && (
                  <span style={{ color: "red" }}>
                    {errors.Code.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">DESCRIPTION<span style={{ color: 'red' }}>*</span></Label>
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
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SHORT DESCRIPTION<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="ShortDescription"
                  rules={{ required: "Short Description is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Short Description"
                      invalid={errors.ShortDescription && true}
                      {...field}
                    />
                  )}
                />
                {errors.ShortDescription && (
                  <span style={{ color: "red" }}>
                    {errors.ShortDescription.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">FACTOR<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="Factor"
                  rules={{ required: "Factor is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Factor"
                      invalid={errors.Factor && true}
                      {...field}
                    />
                  )}
                />
                {errors.Factor && (
                  <span style={{ color: "red" }}>
                    {errors.Factor.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">H/N/U/S<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="HNUS"
                  rules={{ required: "H/N/U/S is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="H/N/U/S"
                      invalid={errors.HNUS && true}
                      {...field}
                    />
                  )}
                />
                {errors.HNUS && (
                  <span style={{ color: "red" }}>
                    {errors.HNUS.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">TAXABLE<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="TAXABLE"
                  rules={{ required: "Taxable is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Taxable"
                      {...field}
                    />
                  )}
                />
                {errors.TAXABLE && (
                  <span style={{ color: "red" }}>
                    {errors.TAXABLE.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">WORK TIME<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="WORKTIME"
                  rules={{ required: "Work Time is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Worked Time"
                      {...field}
                    />
                  )}
                />
                {errors.WORKTIME && (
                  <span style={{ color: "red" }}>
                    {errors.WORKTIME.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">OVER TIME<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="OVERTIME"
                  rules={{ required: "Over Time is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Over time"
                      {...field}
                    />
                  )}
                />
                {errors.OVERTIME && (
                  <span style={{ color: "red" }}>
                    {errors.OVERTIME.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SUBJECT TO WC<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="SUBJECTTOWC"
                  rules={{ required: "Subject To WC is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Subject To WC"
                      {...field}
                    />
                  )}
                />
                {errors.SUBJECTTOWC && (
                  <span style={{ color: "red" }}>
                    {errors.SUBJECTTOWC.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">STRIAGHT TIME<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="STRIAGHTTIME"
                  rules={{ required: "Straight Time is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Striaght Time"
                      {...field}
                    />
                  )}
                />
                {errors.STRIAGHTTIME && (
                  <span style={{ color: "red" }}>
                    {errors.STRIAGHTTIME.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">ALLOWANCE<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="ALLOWANCE"
                  rules={{ required: "Allowance is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Allowance"
                      {...field}
                    />
                  )}
                />
                {errors.ALLOWANCE && (
                  <span style={{ color: "red" }}>
                    {errors.ALLOWANCE.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SICK ACCRUAL<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="SICKACCRUAL"
                  rules={{ required: "Sick Accrual is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Sick Accrual"
                      {...field}
                    />
                  )}
                />
                {errors.SICKACCRUAL && (
                  <span style={{ color: "red" }}>
                    {errors.SICKACCRUAL.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SICK TIME WORKED<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="SICKTIMEWORKED"
                  rules={{ required: "Sick Time Worked is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Sick Time Worked"
                      {...field}
                    />
                  )}
                />
                {errors.SICKTIMEWORKED && (
                  <span style={{ color: "red" }}>
                    {errors.SICKTIMEWORKED.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">VAC ACCURAL<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="VACACCURAL"
                  rules={{ required: "VAC Accural is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Vac Accural"
                      {...field}
                    />
                  )}
                />
                {errors.VACACCURAL && (
                  <span style={{ color: "red" }}>
                    {errors.VACACCURAL.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">VAC WORKED<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="VACWORKED"
                  rules={{ required: "VAC Worked is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Vac Worked"
                      {...field}
                    />
                  )}
                />
                {errors.VACWORKED && (
                  <span style={{ color: "red" }}>
                    {errors.VACWORKED.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">HOL ACCRUAL<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="HOLACCRUAL"
                  rules={{ required: "HOL Accrual is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Hol Accrual"
                      {...field}
                    />
                  )}
                />
                {errors.HOLACCRUAL && (
                  <span style={{ color: "red" }}>
                    {errors.HOLACCRUAL.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">H-N-W<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="HNW"
                  rules={{ required: "H-N-W is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="H-N-W"
                      {...field}
                    />
                  )}
                />
                {errors.HNW && (
                  <span style={{ color: "red" }}>
                    {errors.HNW.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">HOL WORKED<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="HOLWORKED"
                  rules={{ required: "HOL Worked is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Hol Worked"
                      {...field}
                    />
                  )}
                />
                {errors.HOLWORKED && (
                  <span style={{ color: "red" }}>
                    {errors.HOLWORKED.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">ADD TO PREM OT CAL<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="ADDTOPREMOTCAL"
                  rules={{ required: "ADD TO PREM OT CAL is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Add To Prem Ot Cal"
                      invalid={errors.ADDTOPREMOTCAL && true}
                      {...field}
                    />
                  )}
                />
                {errors.ADDTOPREMOTCAL && (
                  <span style={{ color: "red" }}>
                    {errors.ADDTOPREMOTCAL.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">CATEGORY<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="CATEGORY"
                  rules={{ required: "Category is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Category"
                      {...field}
                    />
                  )}
                />
                {errors.CATEGORY && (
                  <span style={{ color: "red" }}>
                    {errors.CATEGORY.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">GL CODE<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="GLCODE"
                  rules={{ required: "GL Code is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="GL Code"
                      invalid={errors.GLCODE && true}
                      {...field}
                    />
                  )}
                />
                {errors.GLCODE && (
                  <span style={{ color: "red" }}>
                    {errors.GLCODE.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SUBJECT TO PHW<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="SUBJECTTOPHW"
                  rules={{ required: "Subject To PHW is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                    className="inputFeild"
                      placeholder="Subject To PHW"
                      {...field}
                    />
                  )}
                />
                {errors.SUBJECTTOPHW && (
                  <span style={{ color: "red" }}>
                    {errors.SUBJECTTOPHW.message as React.ReactNode}
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
            </Col>
            </Row>
            <Row style={{marginTop:'20px'}}>
              <Col>
                 <div className="d-flex me-2 " style={{ gap: "20px" }}>
              <Button
                onClick={() => router.back()}
               className="buttonStyle buttons-width"
              >
                Cancel 
              </Button>
              <Button
                color="primary"
                className="buttonStyle1 buttons-width"
              >
                Save
              </Button>
            </div></Col>
            </Row>
          </Form>
      </div>
    </>
  );
}

export default EditpayCodes;
