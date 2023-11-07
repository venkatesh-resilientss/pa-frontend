import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CurrencyService } from "@src/services";

function index() {
  const history = useHistory();

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
      name: data.currencyname,
      code: data.currencycode,
      currency_keys: data.currencysymbol,
      is_active: activeStatus,
    };

    CurrencyService.create(backendFormat)
      .then((res) => {
        toast.success("Currency Added successfully");
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
        All Currencies
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Add New Currency
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
            <Label>Currency Code</Label>
            <Controller
              id="currencycode"
              name="currencycode"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Currency Code"
                  invalid={errors.currencycode && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1">
            <Label>Currency Name</Label>
            <Controller
              id="currencyname"
              name="currencyname"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Currency Name"
                  invalid={errors.currencyname && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1">
            <Label>Currency Symbol</Label>
            <Controller
              id="currencysymbol"
              name="currencysymbol"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Currency Symbol"
                  invalid={errors.currencysymbol && true}
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
