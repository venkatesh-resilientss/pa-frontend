import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { TaxCodesService } from "services";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";

function AddTaxCode() {
  const {
    control,
    setError,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [activeStatus, setActiveStatus] = useState(false);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      code: data.taxcode,
      description: data.description,
      is_active: activeStatus,
    };

    TaxCodesService.create(backendFormat)
      .then((res) => {
        toast.success("TaxCode Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };
  return (
    <div className="overflow-auto mt-4">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Tax Codes
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Add New Tax Code
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
            <Label className="form-lable-font">Tax Code</Label>
            <Controller
              name="taxcode"
              rules={{ required: "Tax Code  is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Tax Code"
                  invalid={errors.taxcode && true}
                  {...field}
                />
              )}
            />
            {errors.taxcode && (
              <span style={{ color: "red" }}>
                {errors.taxcode.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font" f>
              Description
            </Label>
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

export default AddTaxCode;
