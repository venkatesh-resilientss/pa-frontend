import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CurrencyService } from "services";

function AddCurrency() {
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
      name: data.currencyname,
      code: data.currencycode,
      currency_keys: data.currencysymbol,
      IsActive: activeStatus,
    };

    CurrencyService.create(backendFormat)
      .then((res) => {
        toast.success("Currency Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="overflow-auto">
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
                  <Label>Currency Code</Label>
                  <Controller
                    name="currencycode"
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
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1 mt-2">
                  <Label>Currency Name</Label>
                  <Controller
                    name="currencyname"
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
                </div>
              </Col>
              {/* <Col xl="4">
                <div className="mb-1 mt-2">
                  <Label>Currency Symbol</Label>
                  <Controller
                    name="currencysymbol"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Currency Symbol"
                        invalid={errors.currencysymbol && true}
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1 mt-2">
                  <Label>Current rate vs 1.00 unit of base currency</Label>
                  <Controller
                    name="currencyrate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Currency rate"
                        invalid={errors.currencyrate && true}
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1 mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label">Default checkbox</label>
                  </div>
                </div>
              </Col> */}
              <div className="d-flex flex-column mt-2">
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
        </div>
      </div>
    </div>
  );
}

export default AddCurrency;
