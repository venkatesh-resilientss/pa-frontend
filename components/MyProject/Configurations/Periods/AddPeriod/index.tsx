import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { PeriodsService } from "services";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker"; // Import the CSS
import moment from "moment";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";

function AddPeriod() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const periodValidationRules = formValidationRules.periods;
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

  const compareDates = (startDate : string,endDate : string)=>{
    const isAfter = moment(endDate).isAfter(startDate);
    return isAfter;
  }

  const onSubmit = (data) => {
    if(startDate && endDate && !compareDates(startDate,endDate)){
      toast.warning('End Date must be greater than Start Date');
      return;
    }
    const {clientID,projectID} = getSessionVariables();
    const backendFormat = {
      name: data.periodname,
      description: data.description,
      start: startDate,
      endDate: endDate,
      clientID,
      projectID
    };

    periodsService
      .createPeriod(backendFormat)
      .then(() => {
        toast.success("Period Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || 'Unable to add Period');
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
            <Col xl="4" className="d-flex flex-column">
              <Label className="form-lable-font">Start Date<span className="required" >*</span></Label>
              <Controller
                name="startdate"
                control={control}
                // rules={periodValidationRules.startDate}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className="w-100 form-control"
                    placeholderText="Select Start date"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd" // Set the desired date format
                  />
                )}
              />
              {/* {errors.startdate && (
                  <span style={{ color: "red" }}>
                    {errors.startdate.message as React.ReactNode}
                  </span>
                )} */}
            </Col>

            <Col xl="4" className="d-flex flex-column">
              <Label className="form-lable-font">End Date</Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    style={{ fontSize: "12px", fontWeight: "400" }}
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
              <div className="mb-1 ">
                <Label className="form-lable-font">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  rules={periodValidationRules.description}
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
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddPeriod;
