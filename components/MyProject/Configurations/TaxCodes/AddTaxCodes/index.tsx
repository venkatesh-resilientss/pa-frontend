import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { TaxCodesService } from "services";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

function AddTaxCode() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const taxCodeService = new TaxCodesService();

  const onSubmit = (data) => {
    const backendFormat = {
      code: data.taxcode,
      description: data.description,
      is_active: false,
    };

    taxCodeService
      .createTaxCode(backendFormat)
      .then(() => {
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
              <span className="text-danger">
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
              <span className="text-danger">
                {errors.description.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
      </Form>
    </div>
  );
}

export default AddTaxCode;
