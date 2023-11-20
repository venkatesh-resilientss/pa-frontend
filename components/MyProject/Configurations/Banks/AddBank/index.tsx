import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import { BankService } from "services";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

function AddBank() {
  const router = useRouter();
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
      description: data.description,
      is_active: activeStatus,
      name: data.bankName,
      location: data.location,
    };

    BankService.create(backendFormat)
      .then((res) => {
        toast.success("Bank Added successfully");
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
        All Banks
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Add New Bank
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
          <Label className="form-lable-font">Bank Name</Label>

          <Controller
            name="bankName"
            control={control}
            rules={{ required: "Bank Name is required" }}
            render={({ field }) => (
              <Input
                className="p-2"
                placeholder="Bank Name"
                {...register}
                invalid={errors.bankName && true}
                {...field}
              />
            )}
          />
          {errors.bankName && (
            <span style={{ color: "red" }}>
              {errors.bankName.message as React.ReactNode}
            </span>
          )}
        </Col>

        <Col xl="4">
          <Label className="form-lable-font">Description</Label>
          <Controller
            name="description"
            rules={{ required: "Description  is required" }}
            control={control}
            render={({ field }) => (
              <Input
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  height: "81px",
                }}
                placeholder="Description"
                type="textarea"
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
        </Col>

        <Col xl="4">
          <Label className="form-lable-font">Last Name</Label>
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <Input
                className="p-2"
                placeholder="Location"
                {...register}
                invalid={errors.location && true}
                {...field}
              />
            )}
          />
          {errors.location && (
            <span style={{ color: "red" }}>
              {errors.location.message as React.ReactNode}
            </span>
          )}
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
              <input type="radio" />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input type="radio" />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddBank;
