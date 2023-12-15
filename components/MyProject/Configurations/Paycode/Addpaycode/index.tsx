import { Button, Col, Row ,Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";
import { PaycodesService } from "services";
import { useState } from "react";
function AddpayCodes() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const paycodesService = new PaycodesService();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('data', data)
    data.Factor = parseInt(data.Factor)
    data.hnus = data.hnus.value
    data.Category = data.Category.value
    data.glCodeID = parseInt(data.glCodeID)


    if(isSaving) return
    setIsSaving(true)
    try {
      paycodesService
      .createPaycode(data)
      .then(() => {
        setIsSaving(false)
        toast.success("Paycode added successfully");
        router.push("/configurations/paycode");
        reset();
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error);
      });
    } catch (error) {
      toast.error("Error adding Paycode");
      console.error(error);
    }
  };
  
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
            Add New Paycode
          </div>
          <div className="d-flex me-2 " style={{ gap: "10px" }}>
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
        </div>
          
        </div>

        <hr style={{ height: "2px" }} />

        <Form
            style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
            className=" mt-2 d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">Code<span style={{ color: 'red' }}>*</span></Label>
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
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">Short Description<span style={{ color: 'red' }}>*</span></Label>
                <Controller
                  name="shortName"
                  rules={{ required: "Short Description is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="Short Description"
                      invalid={errors.shortName && true}
                      {...field}
                    />
                  )}
                />
                {errors.shortName && (
                  <span style={{ color: "red" }}>
                    {errors.shortName.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">Factor<span style={{ color: 'red' }}>*</span></Label>
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
                  name="hnus"
                  rules={{ required: "H/N/U/S is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="selectField"
                      value={field.value}
                      onChange={(selectedOption) => field.onChange(selectedOption)}
                      options={[
                        { value: 'H', label: 'H' },
                        { value: 'N', label: 'N' },
                        { value: 'U', label: 'U' },
                        { value: 'S', label: 'S' },
                      ]}
                    />
                  )}
                />
                {errors.hnus && (
                  <span style={{ color: "red" }}>
                    {errors.hnus.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
            <Col xl="3" className="m-auto">
                <div className="d-flex gap-1 m-auto">
                <Controller
                    name="hnw"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                  <Label
                    className="form-lable-font"
                  >
                    HNW
                  </Label>
                </div>
              </Col>

            <Col xl="3" className="m-auto">
                <div className="d-flex gap-1 m-auto">
                <Controller
                    name="taxable"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                  <Label
                    className="form-lable-font"
                  >
                    Taxable
                  </Label>
                </div>
              </Col>
            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="workTime"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Work Time</Label>
              </div>
            </Col>
            
            </Row>
            <Row className="m-2">
            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="overTime"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Over Time</Label>
              </div>
            </Col>
            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="subjectToWc"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Subject To Wc</Label>
              </div>
            </Col>
            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="subjectToPhw"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Subject To Phw</Label>
              </div>
            </Col>

            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="straightTime"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Straight Time</Label>
              </div>
            </Col>
            </Row>
            <Row className="m-2">
            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="allowance"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Allowance</Label>
              </div>
            </Col>
            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="sickAccrual"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Sick Accrual</Label>
              </div>
            </Col>
            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="sickWorked"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Sick Time Worked</Label>
              </div>
            </Col>

            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="vacationAccrual"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Vacation Accrual</Label>
              </div>
            </Col>
            </Row>
            <Row className="m-2">
            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="vacationWorked"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Vacation Pay</Label>
              </div>
            </Col>
            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="holAccrual"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Hol Accrual</Label>
              </div>
            </Col>
            

            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="holWorked"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Hol Worked</Label>
              </div>
            </Col>

            <Col xl="3" className="m-auto">
            <div className="d-flex gap-1 m-auto">
              <Controller
                    name="addToPremOffCalc"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        {...field}
                      />
                    )}
                  />
                <Label className="form-lable-font">Add To OT Calc</Label>
              </div>
            </Col>
            </Row>
            <Row className="m-2">
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">Category</Label>
                <Controller
                  name="Category"
                  rules={{ required: "Category is required" }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="selectField"
                      value={field.value}
                      onChange={(selectedOption) => field.onChange(selectedOption)}
                      options={[
                        { value: 'Idle', label: 'Idle' },
                        { value: 'Rest Invasion', label: 'Rest Invasion' },
                        { value: 'VAC', label: 'VAC' },
                        { value: 'Travel', label: 'Travel' },
                      ]}
                    />
                  )}
                />
              </div>
            </Col>
            <Col xl="3">
              <div className="mb-1">
                <Label className="form-lable-font">GL Code</Label>
                <Controller
                  name="glCodeID"
                  rules={{ required: "GL Code is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                    className="inputFeild"
                      placeholder="GL Code"
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            </Row>
          </Form>
      </div>
    </>
  );
}

export default AddpayCodes;
