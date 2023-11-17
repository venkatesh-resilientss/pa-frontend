import { useRouter } from "next/router";
import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { CurrencyService } from "services";

function EditCurrency() {
  const router = useRouter();

  const { id } = router.query;

  const fetchCurrencyDetails = (id) => CurrencyService.details(id);

  const {
    data: currencyData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["CURRENCY_DETAILS", id] : null, () =>
    fetchCurrencyDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!currencyData) return;

    currencyData?.Name && setValue("name", currencyData?.Name);
    currencyData?.Code && setValue("code", currencyData?.Code);

    currencyData?.Description &&
      setValue("description", currencyData?.Description);
  }),
    [currencyData];

  const currencyService = new CurrencyService();

  const { mutate: currencyMutate } = useSWR("LIST_CURRENCY", () =>
    currencyService.getCurrencies()
  );

  const [activeStatus, setActiveStatus] = useState(currencyData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.name,
      description: data.description,
      is_active: activeStatus,
      code: data.code,
    };

    CurrencyService.edit(id, backendFormat)
      .then((res) => {
        toast.success("Currency Edited successfully");
        mutate(currencyMutate());
        router.back();

        reset();
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
              All currencies
            </div>

            <div className="d-flex justify-content-between">
              <div
                className="text-black"
                style={{ fontSize: "32px", fontWeight: "600" }}
              >
                Edit Currency
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
                  Edit
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
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Currency Code
                </Label>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Currency Code"
                      invalid={errors.code && true}
                      {...field}
                    />
                  )}
                />{" "}
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Currency Name
                </Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Currency Name"
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />{" "}
              </Col>

              {/* <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Currency Symbol
                </Label>
                <Controller
                  name="symbol"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder=" Currency Symbol"
                      invalid={errors.symbol && true}
                      {...field}
                    />
                  )}
                />{" "}
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Current rate vs 1.00 unit of base currency
                </Label>
                <Controller
                  name="rate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder=" Current Rate"
                      invalid={errors.rate && true}
                      {...field}
                    />
                  )}
                />{" "}
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
                    <label className="form-check-label">Default Currency</label>
                  </div>
                </div>
              </Col> */}

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
                          defaultChecked={currencyData?.IsActive}
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
                          defaultChecked={!currencyData?.IsActive}
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
        </div>
      </div>
    </div>
  );
}

export default EditCurrency;
