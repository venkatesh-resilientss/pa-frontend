import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { SetsService } from "services";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { checkTenant } from "constants/function";

function AddSet() {
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
  const setsService = new SetsService();

  const handleRadioButton = (status) => {
    if (status === true) {
      setActiveStatus(true);
    } else if (status === false) {
      setActiveStatus(false);
    }
  };
  console.log(activeStatus, "activeStatus");

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.setname,
      code: data.setcode,
      description: data.description,
      isActive: activeStatus,
    };

    setsService
      .createSet(backendFormat)
      .then((res) => {
        toast.success("Sets Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div>
      <div
        className="text-black mt-4"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Sets
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Add New Set
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
        {" "}
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">Set Name</Label>
            <Controller
              name="setname"
              rules={{ required: "Set Name is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Set Name"
                  invalid={errors.departmenname && true}
                  {...field}
                />
              )}
            />
            {errors.setname && (
              <span style={{ color: "red" }}>
                {errors.setname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">Set Code</Label>
            <Controller
              name="setcode"
              rules={{ required: "Set Code is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Set Code"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  invalid={errors.setcode && true}
                  {...field}
                />
              )}
            />
            {errors.setcode && (
              <span style={{ color: "red" }}>
                {errors.setcode.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">Description</Label>
            <Controller
              name="description"
              rules={{ required: "Description is required" }}
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
          </div>
        </Col>
        <div className="d-flex flex-column mt-1">
          <Label className="form-lable-font">Status </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input
                type="radio"
                id="ex1-active"
                name="ex1"
                value="active"
                onChange={() => handleRadioButton(true)}
              />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input
                type="radio"
                name="ex1"
                id="ex1-inactive"
                value="inactive"
                onChange={() => handleRadioButton(false)}
              />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddSet;
