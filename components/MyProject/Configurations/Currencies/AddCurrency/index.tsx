import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { CurrencyService } from "services";

function AddCurrency() {
  const currencyService = new CurrencyService();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    const backendFormat = {
      name: data.currencyname,
      code: data.currencycode,
      currency_keys: data.currencysymbol,
      IsActive: false,
    };

    currencyService
      .createCurrency(backendFormat)
      .then(() => {
        toast.success("Currency Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div className="section">
      <div className="overflow-auto mt-4">
        <div
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          All Currencies
        </div>
        <div className="d-flex justify-content-between">
          <div
            className="text-black"
            style={{ fontSize: "32px", fontWeight: "600" }}
          >
            Add New Currency
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
              <Label className="form-lable-font">Currency Code</Label>
              <Controller
                name="currencycode"
                rules={{ required: "Currency Code  is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Currency Code"
                    invalid={errors.currencycode && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              {errors.currencycode && (
                <span style={{ color: "red" }}>
                  {errors.currencycode.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="4">
            <div className="mb-1 mt-2">
              <Label className="form-lable-font">Currency Name</Label>
              <Controller
                name="currencyname"
                rules={{ required: "Currency Name  is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Currency Name"
                    invalid={errors.currencyname && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              {errors.currencyname && (
                <span style={{ color: "red" }}>
                  {errors.currencyname.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
}

export default AddCurrency;
