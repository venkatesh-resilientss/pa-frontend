import { Button, Col, Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import { PaycodesService } from "services";
import useSWR, { mutate } from "swr";

function EditpayCodes() {
  const router = useRouter();
  const { id } = router.query;
  const paycodesService = new PaycodesService();
  const fetchpaycodeDetails = (id) => paycodesService.paycodeDetails(id);

  const { data: paycode } = useSWR(
    id ? ["PAYCODE_DETAILS", id] : null,
    () => fetchpaycodeDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (isSaving) return
    data.IsActive = activeStatus
    data.hnus = data.hnus.value
    setIsSaving(true)
    paycodesService
      .editPaycode(id, data)
      .then(() => {
        setIsSaving(false)
        toast.success("Paycode saved successfully");
        router.push("/configurations/paycode");
        mutate(paycodeMutate());
        reset();
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error);
      });
  };

  const [activeStatus, setActiveStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [activeHnw, setActiveHnw] = useState(false);
  const [activeTaxable, setActiveTaxable] = useState(false);
  const [activeWorkTime, setActiveWorkTime] = useState(false);
  const [activeOverTime, setActiveOverTime] = useState(false);
  const [activeSubjectToWc, setActiveSubjectToWc] = useState(false);
  const [activeSubjectToPhw, setActiveSubjectToPhw] = useState(false);
  const [activeStraightTime, setActiveStraightTime] = useState(false);

  const [activeAllowance, setActiveAllowance] = useState(false);

  const [activeSickAccrual, setActiveSickAccrual] = useState(false);

  const [activeSickWorked, setActiveSickWorked] = useState(false);

  const [activeVacationAccrual, setActiveVacationAccrual] = useState(false);

  const [activeVacationWorked, setActiveVacationWorked] = useState(false);

  const [activeHolAccrual, setActiveHolAccrual] = useState(false);

  const [activeHolWorked, setActiveHolWorked] = useState(false);

  const [activeAddToPremOffCalc, setActiveAddToPremOffCalc] = useState(false);

  const { mutate: paycodeMutate } = useSWR("LIST_PAYCODES", () =>
    paycodesService.getPaycodes({ search: "", pageLimit: 25, offset: 0 })
  );
  useEffect(() => {
    if (!paycode) return;
    paycode?.Code && setValue("Code", paycode?.Code);
    paycode?.Description && setValue("Description", paycode?.Description);
    paycode?.ShortName && setValue("shortName", paycode?.ShortName);
    paycode?.Factor && setValue("Factor", paycode?.Factor);
    paycode?.Hnus && setValue("hnus", { value: paycode?.Hnus, label: paycode?.Hnus });
    paycode?.Category && setValue("Category", { value: paycode?.Category.ID, label: paycode?.Category.Code });
    paycode?.Hnw && setValue("hnw", paycode?.Hnw);
    paycode?.Taxable && setValue("taxable", paycode?.Taxable);
    paycode?.WorkTime && setValue("workTime", paycode?.WorkTime);
    paycode?.OverTime && setValue("overTime", paycode?.OverTime);
    paycode?.SubjectToWc && setValue("subjectToWc", paycode?.SubjectToWc);
    paycode?.SubjectToPhw && setValue("subjectToPhw", paycode?.SubjectToPhw);
    paycode?.StraightTime && setValue("straightTime", paycode?.StraightTime);
    paycode?.Allowance && setValue("allowance", paycode?.Allowance);
    paycode?.SickAccrual && setValue("sickAccrual", paycode?.SickAccrual);
    paycode?.SickWorked && setValue("sickWorked", paycode?.SickWorked);
    paycode?.VacationAccrual && setValue("vacationAccrual", paycode?.VacationAccrual);
    paycode?.VacationWorked && setValue("vacationWorked", paycode?.VacationWorked);
    paycode?.HolAccrual && setValue("holAccrual", paycode?.HolAccrual);
    paycode?.HolWorked && setValue("holWorked", paycode?.HolWorked);
    paycode?.AddToPremOffCalc && setValue("addToPremOffCalc", paycode?.AddToPremOffCalc);
    paycode?.GlCodeID && setValue("glCodeID", paycode?.GlCodeID);

    setActiveHnw(paycode?.Hnw);

    setActiveTaxable(paycode?.Taxable);
    setActiveWorkTime(paycode?.WorkTime);
    setActiveOverTime(paycode?.OverTime);
    setActiveSubjectToWc(paycode?.SubjectToWc);
    setActiveSubjectToPhw(paycode?.SubjectToPhw);
    setActiveStraightTime(paycode?.StraightTime);
    setActiveAllowance(paycode?.Allowance);
    setActiveSickAccrual(paycode?.SickAccrual);
    setActiveSickWorked(paycode?.SickWorked);
    setActiveVacationAccrual(paycode?.VacationAccrual);
    setActiveVacationWorked(paycode?.VacationWorked);
    setActiveHolAccrual(paycode?.HolAccrual);
    setActiveHolWorked(paycode?.HolWorked);
    setActiveAddToPremOffCalc(paycode?.AddToPremOffCalc);
    setActiveStatus(paycode?.IsActive);
  }, [paycode]);

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
                      checked={activeHnw}
                      onChange={() => {
                        setActiveHnw(!activeHnw);
                      }}
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
                      checked={activeTaxable}
                      onChange={() => {
                        setActiveTaxable(!activeTaxable);
                      }}
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
                      checked={activeWorkTime}
                      onChange={() => {
                        setActiveWorkTime(!activeWorkTime);
                      }}
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
                      checked={activeOverTime}
                      onChange={() => {
                        setActiveOverTime(!activeOverTime);
                      }}
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
                      checked={activeSubjectToWc}
                      onChange={() => {
                        setActiveSubjectToWc(!activeSubjectToWc);
                      }}
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
                      checked={activeSubjectToPhw}
                      onChange={() => {
                        setActiveSubjectToPhw(!activeSubjectToPhw);
                      }}
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
                      checked={activeStraightTime}
                      onChange={() => {
                        setActiveStraightTime(!activeStraightTime);
                      }}
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
                      checked={activeAllowance}
                      onChange={() => {
                        setActiveAllowance(!activeAllowance);
                      }}
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
                      checked={activeSickAccrual}
                      onChange={() => {
                        setActiveSickAccrual(!activeSickAccrual);
                      }}
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
                      checked={activeSickWorked}
                      onChange={() => {
                        setActiveSickWorked(!activeSickWorked);
                      }}
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
                      checked={activeVacationAccrual}
                      onChange={() => {
                        setActiveVacationAccrual(!activeVacationAccrual);
                      }}
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
                      checked={activeVacationWorked}
                      onChange={() => {
                        setActiveVacationWorked(!activeVacationWorked);
                      }}
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
                      checked={activeHolAccrual}
                      onChange={() => {
                        setActiveHolAccrual(!activeHolAccrual);
                      }}
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
                      checked={activeHolWorked}
                      onChange={() => {
                        setActiveHolWorked(!activeHolWorked);
                      }}
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
                      checked={activeAddToPremOffCalc}
                      onChange={() => {
                        setActiveAddToPremOffCalc(!activeAddToPremOffCalc);
                      }}
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
        </Form>
      </div>
    </>
  );
}

export default EditpayCodes;
