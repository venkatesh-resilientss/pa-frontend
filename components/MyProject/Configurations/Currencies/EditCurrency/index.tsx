import { useRouter } from "next/router";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { CurrencyService } from "services";
import { formValidationRules } from "@/constants/common";
import { getLabel } from "@/commonFunctions/common";
import { hasPermission } from "@/commonFunctions/functions";
import { LoaderButton } from "@/components/Loaders";
function EditCurrency() {
  const router = useRouter();
  const currencyValidationRules = formValidationRules.currencies;
  const { id } = router.query;
  const currencyService = new CurrencyService();
  const [isBaseCurrency, setIsBaseCurrency] = useState(false);
  const fetchCurrencyDetails = (id) => currencyService.currencyDetails(id);
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  const [editMode, setEditMode] = useState(false);
  const { data: currencyData } = useSWR(
    id ? ["CURRENCY_DETAILS", id] : null,
    () => fetchCurrencyDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!currencyData) return;

    currencyData?.Name && setValue("currencyname", currencyData?.Name);
    currencyData?.Code && setValue("currencycode", currencyData?.Code);
    currencyData?.CurrencySymbol &&
      setValue("currencysymbol", currencyData?.CurrencySymbol);
    currencyData?.CurrentRate &&
      setValue("currentRate", currencyData?.CurrentRate);
    currencyData?.Description &&
      setValue("description", currencyData?.Description);

    setActiveStatus(currencyData?.IsActive);
    setIsBaseCurrency(currencyData?.BaseCurrency);
  }, [currencyData]);

  const { mutate: currencyMutate } = useSWR("LIST_CURRENCY", () =>
    currencyService.getCurrencies({ search: "", pageLimit: 25, offset: 0 })
  );

  const [activeStatus, setActiveStatus] = useState(currencyData?.IsActive);
  const [isLoading, setLoader] = useState(false);
  const onSubmit = (data) => {
    const backendFormat = {
      name: getLabel(data.currencyname),
      code: data.currencycode,
      currencySymbol: data.currencysymbol,
      currentRate: data.currentRate,
      description: data.description,
      BaseCurrency: isBaseCurrency,
      isActive: activeStatus,
    };
    setLoader(true);
    currencyService
      .editCurrency(id, backendFormat)
      .then(() => {
        toast.success("Currency updated successfully");
        mutate(currencyMutate());
        router.push("/configurations/currencies");
        reset();
        setLoader(false);
      })
      .catch((error) => {
        toast.error(
          error?.error || error?.Message || "Unable to update Currency"
        );
        setLoader(false);
      });
  };

  return (
    <div className="section mt-4 configuration-add">
      <div className="overflow-auto">
        <div className="title-head">All currencies</div>

        <div className="d-flex justify-content-between">
          <div className="title">Edit Currency</div>
          <div
            className="d-flex me-2 align-items-center"
            style={{ gap: "10px" }}
          >
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
            {hasEditConfigurationPermission && (
              <LoaderButton
                buttonText={editMode ? "Save" : "Edit"}
                isLoading={isLoading}
                handleClick={() => {
                  if (!editMode) {
                    setEditMode(true);
                    return;
                  }
                  handleSubmit(onSubmit)();
                }}
              />
            )}
          </div>
        </div>

        <hr style={{ height: "2px" }} />
        <Form
          style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
          className=" mt-2 d-flex flex-column"
          onSubmit={handleSubmit(onSubmit)}
        >
          {" "}
          <Col xl="5">
            <div className="mb-1">
              <Label className="form-lable-font">
                Currency Code<span className="required">*</span>
              </Label>
              <Controller
                name="currencycode"
                rules={currencyValidationRules.code}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Currency Code"
                    invalid={errors.currencycode && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                    disabled={!editMode}
                  />
                )}
              />
              {errors.currencycode && (
                <span className="text-danger">
                  {errors.currencycode.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 mt-2">
              <Label className="form-lable-font">
                Currency Name<span className="required">*</span>
              </Label>
              <Controller
                name="currencyname"
                rules={currencyValidationRules.name}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Currency Name"
                    invalid={errors.currencyname && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                    disabled={!editMode}
                  />
                )}
              />
              {errors.currencyname && (
                <span className="text-danger">
                  {errors.currencyname.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 mt-2">
              <Label className="form-lable-font">
                Currency Symbol<span className="required">*</span>
              </Label>
              <Controller
                name="currencysymbol"
                rules={currencyValidationRules.symbol}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Currency Symbol"
                    invalid={errors.currencyname && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                    disabled={!editMode}
                  />
                )}
              />
              {errors.currencysymbol && (
                <span style={{ color: "red" }}>
                  {errors.currencysymbol.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 mt-2 d-flex gap-2 align-items-center">
              <Controller
                name="BaseCurrency"
                control={control}
                render={({ field }) => (
                  <Input
                    type="checkbox"
                    invalid={errors.isBaseCurrency && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                    disabled={!editMode}
                    checked={isBaseCurrency}
                    onChange={(e) => {
                      setIsBaseCurrency(e.target.checked);
                    }}
                  />
                )}
              />
              <Label className="form-lable-font mb-0">Is Base Currency</Label>
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 mt-2">
              <Label className="form-lable-font">
                Decimal Value of 1 current rate vs 1.00 unit of base currency
                <span className="required">*</span>
              </Label>
              <Controller
                name="currentRate"
                rules={currencyValidationRules.currentRate}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Enter Value"
                    invalid={errors.currentRate && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                    disabled={!editMode}
                  />
                )}
              />
              {errors.currentRate && (
                <span style={{ color: "red" }}>
                  {errors.currentRate.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 ">
              <Label className="form-lable-font">Description</Label>
              <Controller
                name="description"
                control={control}
                rules={currencyValidationRules.description}
                render={({ field }) => (
                  <Input
                    type="textarea"
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      height: "81px",
                    }}
                    placeholder="Description"
                    invalid={errors.description && true}
                    {...field}
                    disabled={!editMode}
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
                  checked={activeStatus}
                  onChange={() => {
                    setActiveStatus(true);
                  }}
                  disabled={!editMode}
                />
                <div>Active</div>
              </div>
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  name="ex1"
                  id="ex1-inactive"
                  checked={!activeStatus}
                  onChange={() => {
                    setActiveStatus(false);
                  }}
                  disabled={!editMode}
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
