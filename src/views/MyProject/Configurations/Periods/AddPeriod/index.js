import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import { PeriodsService } from "@src/services";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

function index() {
  const history = useHistory();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const {
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [activeStatus, setActiveStatus] = useState();

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.periodname,
      description: data.description,
      start: startDate,
      end: endDate,
      is_active: activeStatus,
    };

    PeriodsService.create(backendFormat)
      .then((res) => {
        toast.success("Period Added successfully");
        resetForm();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Periods
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Add New Period
        </div>
        <div className="d-flex gap-1">
          <Button onClick={() => history.goBack()} color="white" size="sm">
            Dismiss
          </Button>
          <Button onClick={handleSubmit(onSubmit)} size="sm" color="info">
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />
      <Form className=" mt-2" onSubmit={handleSubmit(onSubmit)}>
        <Col xl="4">
          <div className="mb-1">
            <Label> Period Name</Label>
            <Controller
              id="periodname"
              name="periodname"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Period name"
                  invalid={errors.periodname && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>

        <Col xl="4" className="d-flex gap-1">
          <Col xl="6">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Start Date
            </Label>

            <DatePicker
              placeholderText="Select a date"
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx" // Set the desired date format
            />
          </Col>

          <Col xl="6">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              End Date
            </Label>
            <DatePicker
              placeholderText="Select a date"
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx" // Set the desired date format
            />
          </Col>
        </Col>

        <Col xl="4">
          <div className="mb-1">
            <Label> Description</Label>
            <Controller
              id="description"
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Description"
                  invalid={errors.description && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>

        <div className="d-flex flex-column mt-1">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Status{" "}
          </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input
                type="radio"
                id="ex1-active"
                name="ex1"
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

export default index;
