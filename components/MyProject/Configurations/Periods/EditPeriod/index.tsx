import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { PeriodsService } from "services";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { getSessionVariables } from "@/constants/function";
import moment from "moment";
import { hasPermission } from "@/commonFunctions/functions";
import { LoaderButton } from "@/components/Loaders";

function EditPeriod() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);
  const [customErrors, setCustomErrors] = useState({
    startDate: null,
  });
  const periodsService = new PeriodsService();
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );

  const handleStartDateChange = (date) => {
    if (date) setStartDate(moment(date).toDate());
    else setStartDate(null);
  };
  const handleEndDateChange = (date) => {
    if (date) setEndDate(moment(date).toDate());
    else setEndDate(null);
  };
  useEffect(() => {
    const fetchData = async (id: any) => {
      try {
        const response = await periodsService.periodDetails(id);
        const data = response;
        /**Set form values*/
        handleStartDateChange(data.Start);
        handleEndDateChange(data.EndDate);
        setValue("description", data.Description);
        setActiveStatus(data.IsActive);
      } catch (error) {
        toast.error(
          error?.message ||
            error?.Message ||
            error?.error ||
            "Unable to fetch data"
        );
      }
    };
    const { id } = router.query;
    if (id) fetchData(id);
  }, [router.query]);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const compareDates = (startDate: string, endDate: string) => {
    const isGreater = moment(endDate).isAfter(startDate);
    return isGreater;
  };
  const onSubmit = (data) => {
    /**Custom validations */
    if (startDate === null) {
      setCustomErrors({
        ...customErrors,
        startDate: "Start date is required",
      });
      null;
      return;
    }
    setCustomErrors({
      startDate: null,
    });
    const { id } = router.query;
    if (startDate && endDate && !compareDates(startDate, endDate)) {
      toast.warning("End Date must be greater than Start Date");
      return;
    }
    setLoader(true);
    const { clientID, projectID } = getSessionVariables();
    const backendFormat = {
      description: data.description,
      isActive: activeStatus,
      start: startDate,
      endDate: endDate,
      clientID,
      projectID,
    };

    periodsService
      .editPeriod(id, backendFormat)
      .then(() => {
        toast.success("Period Edited successfully");
        router.push("/configurations/periods");

        reset();
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || "Unable to edit Period");
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
        <div className="d-flex me-2 align-items-center" style={{ gap: "10px" }}>
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
          {hasEditConfigurationPermission && (
            <LoaderButton
              buttonText={editMode ? "Save" : "Edit"}
              isLoading={isLoading}
              handleClick={() => {
                if (!editMode) {
                  setEditMode(true);
                  return;
                }
                handleSubmit(onSubmit)();
              }}
            />
          )}
        </div>
      </div>
      <hr style={{ height: "2px" }} />
      <Form
        style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
        className=" mt-2 d-flex flex-column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Col xl="4" className="d-flex flex-column">
          <Label className="form-lable-font">
            Start Date<span className="required">*</span>
          </Label>
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
                disabled={!editMode}
              />
            )}
          />
          {customErrors.startDate && (
            <span style={{ color: "red" }}>
              {customErrors.startDate as React.ReactNode}
            </span>
          )}
        </Col>

        <Col xl="4" className="d-flex flex-column">
          <Label className="form-lable-font">
            End Date<span className="required">*</span>
          </Label>
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
                disabled={!editMode}
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
                  disabled={!editMode}
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
                disabled={!editMode}
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
                disabled={!editMode}
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
