import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { PeriodsService } from "services";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

function AddPeriod() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const router = useRouter();

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
    reset,
    formState: { errors },
  } = useForm();

  const [activeStatus, setActiveStatus] = useState(false);

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
                    <a href="#" onClick={() => router.back()} className='text-decoration-none text-secondary m-2'>Dismiss</a>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    color="primary" className="px-4 p-2"
                    
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
                      <span style={{ color: "red" }}>
                        {errors.periodname.message as React.ReactNode}
                      </span>
                    )}
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
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{ required: "End Date  is required" }}
                      render={({ field }) => (
                        <DatePicker
                          placeholderText="Select a date"
                          selected={startDate}
                          onChange={handleStartDateChange}
                          dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx" // Set the desired date format
                        />
                      )}
                    />
                  </Col>

                  <Col xl="6">
                    <Label
                      className="text-black"
                      style={{ fontSize: "12px", fontWeight: "400" }}
                    >
                      End Date
                    </Label>
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{ required: "End Date  is required" }}
                      render={({ field }) => (
                        <DatePicker
                          placeholderText="Select a date"
                          selected={endDate}
                          onChange={handleEndDateChange}
                          dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx" // Set the desired date format
                        />
                      )}
                    />
                  </Col>
                </Col>

                <Col xl="4">
                  <div className="mb-1">
                    <Label> Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: "Description  is required" }}
                      render={({ field }) => (
                        <Input
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
          </div>
        
    </>
  );
}

export default AddPeriod;
