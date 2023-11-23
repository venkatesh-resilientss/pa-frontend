import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import useSWR from "swr";
import { CurrencyService } from "services";
import { useState, useEffect } from "react";
import { checkTenant } from "constants/function";

function BasicDetailsForm({ control, watch, onSubmit, errors }) {
  const {
    // control,
    setError,
    handleSubmit,
    register,
    reset,
  } = useForm();

  const options = [
    { value: "cheque", label: "Cheque" },
    { value: "wireTransfer", label: "Wire Transfer" },
    { value: "manualCheque", label: "Manual Cheque" },
    { value: "eft", label: "EFT" },
  ];

  const [currency, setCurrency] = useState("");

  const currencyService = new CurrencyService();

  const {
    data: currencyData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_CURRENCIES", () => currencyService.getCurrencies());

  const currenciesSelectFormat = currencyData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadCurrencyOptions = (values, callBack) => {
    setCurrency(values);
    callBack(currenciesSelectFormat);
  };
  return (
    <div className="text-black">
      <Form
        style={{ fontSize: "12px", fontWeight: "400" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Bank Name
            </Label>
            <Controller
              name="bankName"
              rules={{ required: "Bank Name  is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Bank Name"
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
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Bank Code
            </Label>
            <Controller
              name="bankCode"
              rules={{ required: "Bank Code  is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Bank Code "
                  invalid={errors.bankCode && true}
                  {...field}
                />
              )}
            />
            {errors.bankCode && (
              <span style={{ color: "red" }}>
                {errors.bankCode.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Account Number
            </Label>
            <Controller
              name="accountNumber"
              rules={{
                required: "Account Number is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Account Number"
                  invalid={errors.accountNumber && true}
                  {...field}
                />
              )}
            />
            {errors.accountNumber && (
              <span style={{ color: "red" }}>
                {errors.accountNumber.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Description
            </Label>
            <Controller
              name="description"
              rules={{
                required: "Description is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Description"
                  invalid={errors.description && true}
                  {...field}
                  // type="textarea"
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
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Routing Number
            </Label>
            <Controller
              name="routingNumber"
              rules={{
                required: "Routing Number is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Routing Number"
                  invalid={errors.routingNumber && true}
                  {...field}
                />
              )}
            />
            {errors.routingNumber && (
              <span style={{ color: "red" }}>
                {errors.routingNumber.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Account Fraction
            </Label>
            <Controller
              name="accountFraction"
              rules={{
                required: "Account Fraction is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Account Fraction"
                  invalid={errors.accountFraction && true}
                  {...field}
                />
              )}
            />
            {errors.accountFraction && (
              <span style={{ color: "red" }}>
                {errors.accountFraction.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label className="form-lable-font">Currency</Label>
            <Controller
              name={"currency"}
              rules={{ required: "Currency is required" }}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadCurrencyOptions}
                  placeholder="Select Series"
                  defaultOptions={currenciesSelectFormat}
                />
              )}
            />
            {errors.currency && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                {" "}
                {errors.currency.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Contact Name
            </Label>
            <Controller
              name="contactName"
              rules={{
                required: "Contact Name is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Contact Name"
                  invalid={errors.contactName && true}
                  {...field}
                />
              )}
            />
            {errors.contactName && (
              <span style={{ color: "red" }}>
                {errors.contactName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Branch Number
            </Label>
            <Controller
              name="branchNumber"
              rules={{
                required: " Branch Number is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Branch Number"
                  invalid={errors.branchNumber && true}
                  {...field}
                />
              )}
            />
            {errors.branchNumber && (
              <span style={{ color: "red" }}>
                {errors.branchNumber.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default BasicDetailsForm;
