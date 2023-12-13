import { Button, Col, Row ,Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";
function AddpayCodes() {
  const router = useRouter();
  const onSubmit = async () => {
    // Handle form submission logic here
    try {
      // Your logic to save the form data
      toast.success("Paycode added successfully");
      router.push("/configurations/paycode");
    } catch (error) {
      toast.error("Error adding Paycode");
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
           Paycodes
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black add-agents-subheader "
            >
              Add  New Paycode
            </div>
          </div>

          <hr className="occupation-hr " />
          <Form
            className=" mt-2 d-flex flex-column add-form "
            onClick={handleSubmit(onSubmit)}
          >
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">CODE<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.Code.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">DESCRIPTION<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.Description.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SHORT DESCRIPTION<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.ShortDescription.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">FACTOR<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.Factor.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">H/N/U/S<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.HNUS.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">TAXABLE<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.TAXABLE.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">WORK TIME<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.WORKTIME.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">OVER TIME<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.OVERTIME.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SUBJECT TO WC<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.SUBJECTTOWC.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">STRIAGHT TIME<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.STRIAGHTTIME.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">ALLOWANCE<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.ALLOWANCE.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SICK ACCRUAL<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.SICKACCRUAL.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SICK TIME WORKED<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.SICKTIMEWORKED.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">VAC ACCURAL<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.VACACCURAL.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">VAC WORKED<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.VACWORKED.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">HOL ACCRUAL<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.HOLACCRUAL.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">H-N-W<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.HNW.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">HOL WORKED<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.HOLWORKED.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">ADD TO PREM OT CAL<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.ADDTOPREMOTCAL.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">CATEGORY<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.CATEGORY.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">GL CODE<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.GLCODE.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">SUBJECT TO PHW<span className="text-danger">*</span></Label>
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
                  <span className="text-danger">
                    {errors.SUBJECTTOPHW.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            </Row>
            <Row className="margin-t-20">
              <Col>
                 <div className="d-flex me-2 gap-20">
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

export default AddpayCodes;
