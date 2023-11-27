import { useRouter } from "next/router";
import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { CurrencyService } from "services";
import { checkTenant } from "constants/function";

function EditCurrency() {
  const router = useRouter();

  const { id } = router.query;
  const [tenantId, setTenantId] = useState("");

  useEffect(() => {
    const getTenant = async () => {
      const tenant = await checkTenant();
      // console.log(tenant, "tenant");
      if (tenant) {
        setTenantId(tenant.id);
      }
    };
    getTenant();
  }, []);
  const fetchCurrencyDetails = (id) => CurrencyService.details(tenantId, id);

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

    currencyData?.Name && setValue("currencyname", currencyData?.Name);
    currencyData?.Code && setValue("currencycode", currencyData?.Code);

    currencyData?.Description &&
      setValue("description", currencyData?.Description);
  }),
    [currencyData];

  const currencyService = new CurrencyService();

  const { mutate: currencyMutate } = useSWR("LIST_CURRENCY", () =>
    currencyService.getCurrencies(tenantId)
  );

  const [activeStatus, setActiveStatus] = useState(currencyData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.currencyname,
      description: data.description,
      is_active: activeStatus,
      code: data.currencycode,
    };

    CurrencyService.edit(tenantId, id, backendFormat)
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
    <div className="section mt-4">
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
              <Label>Currency Code</Label>
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
              <Label>Currency Name</Label>
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
  );
}

export default EditCurrency;
