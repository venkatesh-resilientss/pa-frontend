import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { PeriodsService } from "services";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

import moment from "moment";

function EditPeriod() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(moment(date).toDate());
  };

  const handleEndDateChange = (date) => {
    setEndDate(moment(date).toDate());
  };

  const periodsService = new PeriodsService();

  const { id } = router.query;

  const fetchPeriodDetails = (id) => periodsService.periodDetails(id);

  const { data: periodData } = useSWR(id ? ["PERIOD_DETAILS", id] : null, () =>
    fetchPeriodDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const compareDates = (startDate : string,endDate : string)=>{
    const isAfter = moment(endDate).isAfter(startDate);
    return isAfter;
  }

  useEffect(() => {
    

    if (!periodData) return;

    periodData?.Name && setValue("periodname", periodData?.Name);

    periodData?.Description && setValue("description", periodData?.Description);
    handleStartDateChange(periodData?.Start);
    handleEndDateChange(periodData?.EndDate);

    setActiveStatus(periodData.IsActive);
  }, [periodData]);

  const { mutate: bankMutate } = useSWR("LIST_PERIODS", () =>
    periodsService.getPeriods()
  );

  const [activeStatus, setActiveStatus] = useState(periodData?.IsActive);

  const onSubmit = (data) => {
    if(!compareDates(startDate,endDate)){
      toast.warning('End Date must be greater than Start Date');
      return 
    }

    const backendFormat = {
      name: data.periodname,
      description: data.description,
      isActive: activeStatus,
      start: data.startDate,
      endDate: data.endDate,
    };

    periodsService
      .editPeriod(id, backendFormat)
      .then(() => {
        toast.success("Period Edited successfully");
        mutate(bankMutate());
        router.back();

        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div className="mt-4">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Periods
      </div>
      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Edit Period
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
        <Col xl="4">
          <div className="mb-1">
            <Label> Period Name</Label>
            <Controller
              name="periodname"
              rules={{ required: "Period Name  is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Period name"
                  invalid={errors.periodname && true}
                  {...field}
                />
              )}
            />
            {errors.periodname && (
              <span className="text-danger">
                {errors.periodname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>

        <Col xl="4" className="d-flex flex-column">
              <Label className="form-lable-font">Start Date<span className="required" >*</span></Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    id="startDatePicker" // Add the id here
                    className="w-100 form-control"
                    placeholderText="Select Start date"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd" // Set the desired date format
                  />
                )}
              />
            </Col>

            <Col xl="4" className="d-flex flex-column">
              <Label className="form-lable-font">End Date<span className="required" >*</span></Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    id="endDatePicker" // Add the id here
                    className="w-100 form-control "
                    placeholderText="Select End date"
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
            </Col>

        <Col xl="4">
          <div className="mb-1">
            <Label> Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    height: "81px",
                  }}
                  placeholder="Description"
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

        <div className="d-flex flex-column mt-1">
          <Label
            className="text-black"
            style={{ fontSize: "16px", fontWeight: "400" }}
          >
            Status{" "}
          </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input
                type="radio"
                id="ex1-active"
                name="ex1"
                checked={activeStatus}
                onChange={() => {
                  setActiveStatus(true);
                }}
              />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input
                type="radio"
                name="ex1"
                checked={!activeStatus}
                id="ex1-inactive"
                onChange={() => {
                  setActiveStatus(false);
                }}
              />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditPeriod;
