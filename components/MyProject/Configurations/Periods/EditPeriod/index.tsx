import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { PeriodsService } from "services";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditPeriod() {
  const router = useRouter();

  const { id } = router.query;

  const fetchPeriodDetails = (id) => PeriodsService.details(id);

  const {
    data: periodData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["PERIOD_DETAILS", id] : null, () => fetchPeriodDetails(id));

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!periodData) return;

    periodData?.Name && setValue("name", periodData?.Name);

    periodData?.Description && setValue("description", periodData?.Description);
    periodData?.Start && setValue("startDate", periodData?.Start);
    periodData?.EndDate && setValue("endDate", periodData?.EndDate);
  }),
    [periodData];

  const periodService = new PeriodsService();

  const { mutate: bankMutate } = useSWR("LIST_PERIODS", () =>
    periodService.getPeriods()
  );

  const [activeStatus, setActiveStatus] = useState(periodData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.name,
      description: data.description,
      is_active: activeStatus,
      start: data.startDate,
      endDate: data.endDate,
    };

    PeriodsService.edit(id, backendFormat)
      .then((res) => {
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
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Edit Period
        </div>
        <div className="d-flex me-2 " style={{ gap: "10px" }}>
          <Button
            onClick={() => router.back()}
            style={{
              fontSize: "14px",
              fontWeight: "600",
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
            EDIT
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
        className=" mt-2 d-flex flex-column"
      >
        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Period Name{" "}
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                style={{ fontSize: "12px", fontWeight: "400" }}
                placeholder="Bank Name"
                invalid={errors.name && true}
                {...field}
              />
            )}
          />{" "}
        </Col>

        <Col xl="4" className="d-flex gap-1">
          <Col xl="6">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Start Date
            </Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => <DatePicker {...field} />}
            />
          </Col>

          <Col xl="6">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              End Date
            </Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => <DatePicker {...field} />}
            />
          </Col>
        </Col>

        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Description
          </Label>
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
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    id="ex1-active"
                    name="ex1"
                    defaultChecked={periodData?.IsActive}
                    onChange={() => {
                      setActiveStatus(true);
                    }}
                  />
                )}
              />{" "}
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <Controller
                name="inactive"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    name="ex1"
                    id="ex1-inactive"
                    defaultChecked={!periodData?.IsActive}
                    onChange={() => {
                      setActiveStatus(false);
                    }}
                  />
                )}
              />{" "}
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditPeriod;
