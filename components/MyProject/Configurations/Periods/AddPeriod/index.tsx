import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { PeriodsService } from "services";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker"; // Import the CSS
import moment from "moment";

function AddPeriod() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const router = useRouter();
  const periodsService = new PeriodsService();
  const handleStartDateChange = (date) => {
    setStartDate(moment(date).toDate());
  };

  const handleEndDateChange = (date) => {
    setEndDate(moment(date).toDate());
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const backendFormat = {
      name: data.periodname,
      description: data.description,
      start: startDate,
      endDate: endDate,
    };

    periodsService
      .createPeriod(backendFormat)
      .then(() => {
        toast.success("Period Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <>
      <div className="section mt-4">
        <div className="overflow-auto">
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
              Add New Period
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
                <Label className="form-lable-font"> Period Name</Label>
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
                  <span style={{ color: "red" }}>
                    {errors.periodname.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4" className="d-flex flex-column">
              <Label className="form-lable-font">Start Date</Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    id="startDatePicker" // Add the id here
                    className="w-100 custom-datepicker "
                    placeholderText="Select Start date"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd" // Set the desired date format
                  />
                )}
              />
            </Col>

            <Col xl="4" className="d-flex flex-column">
              <Label className="form-lable-font">End Date</Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    id="endDatePicker" // Add the id here
                    className="w-100 custom-datepicker "
                    placeholderText="Select End date"
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
            </Col>

            <Col xl="4">
              <div className="mb-1 ">
                <Label className="form-lable-font">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description  is required" }}
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
                  <span style={{ color: "red" }}>
                    {errors.description.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddPeriod;
