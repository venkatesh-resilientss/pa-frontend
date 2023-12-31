import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import AsyncSelect from "react-select/async";
import { CurrencyService } from "services";
// import useSWR from "swr";
import { useEffect, useState } from "react";
import { formValidationRules } from "constants/common";

export default function BasicDetails(props) {
  const { control, onSubmit, errors, isEditing } = props;
  const { handleSubmit } = useForm();
  const bankValidationRules = formValidationRules.banks;
  const [initialCurrencyOptions, setInitialCurrencyOptions] = useState([]);

  const currencyService = new CurrencyService();

  useEffect(() => {
    const fetchInitialCurrencyOptions = async () => {
      try {
        const res = await currencyService.getCurrencies({
          search: "",
          limit: 25,
          offset: 0,
          is_active: true,
        });
        const options = res?.result.map((item) => ({
          value: item.ID,
          label: item.Name,
        }));
        setInitialCurrencyOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialCurrencyOptions();
  }, []);

  const loadCurrencyOptions: any = async (inputValue, callback) => {
    try {
      const res = await currencyService.getCurrencies({
        search: inputValue.toString(),
        limit: 25,
        offset: 0,
        is_active: true,
      });
      const options = res?.result.map((item) => ({
        value: item.ID,
        label: item.Name,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      background: state.isDisabled ? "#e9ecef" : "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "0.375rem",
      minHeight: "40px",
      boxShadow: null,
      ":hover": {
        borderColor: "#A2CFFE",
      },
      borderColor:
        errors.currency && errors.currency?.message && !state.hasValue
          ? "#e50000 !important"
          : "#dee2e6",
    }),

    singleValue: (provided) => ({ ...provided, color: "#212529" }),

    valueContainer: (base) => ({ ...base, padding: "0 6px" }),

    input: (base) => ({ ...base, margin: "0" }),

    placeholder: (base: any) => ({
      ...base,
      position: "center",
      transform: "none",
      color: "#c9c9c9 !important",
    }),

    menu: (base: any) => ({ ...base, margin: "0 !important" }),
    menuList: (base: any) => ({ ...base, padding: "0 !important" }),

    option: (base: any, state: any) => ({
      ...base,
      cursor: "pointer",
      color: "#212529",
      ":hover": {
        backgroundColor: "#c9c9c97d",
      },
      backgroundColor: state.isSelected ? "#c9c9c97d !important" : "white",
    }),

    indicatorSeparator: () => ({ display: "none" }),
  };

  return (
    <div className="text-black">
      <Form
        style={{ fontSize: "12px", fontWeight: "400" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Bank Name <span className="required">*</span>
            </Label>
            <Controller
              name="bankName"
              rules={bankValidationRules.name}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Bank Name"
                  invalid={errors.bankName && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.bankName && (
              <span className="text-danger">
                {errors.bankName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Bank Code <span className="required">*</span>
            </Label>
            <Controller
              name="bankCode"
              rules={bankValidationRules.code}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Bank Code "
                  invalid={errors.bankCode && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.bankCode && (
              <span className="text-danger">
                {errors.bankCode.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Account Number <span className="required">*</span>
            </Label>
            <Controller
              name="accountNumber"
              rules={bankValidationRules.accountNumber}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Account Number"
                  invalid={errors.accountNumber && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.accountNumber && (
              <span className="text-danger">
                {errors.accountNumber.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Description
            </Label>
            <Controller
              name="description"
              rules={bankValidationRules.description}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Description"
                  invalid={errors.description && true}
                  {...field}
                  disabled={!isEditing || false}
                  // type="textarea"
                />
              )}
            />
            {errors.description && (
              <span className="text-danger">
                {errors.description.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Routing Number <span className="required">*</span>
            </Label>
            <Controller
              name="routingNumber"
              rules={bankValidationRules.routingNumber}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Routing Number"
                  invalid={errors.routingNumber && true}
                  {...field}
                  disabled={!isEditing || false}
                  type="number"
                />
              )}
            />
            {errors.routingNumber && (
              <span className="text-danger">
                {errors.routingNumber.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Account Fraction <span className="required">*</span>
            </Label>
            <Controller
              name="accountFraction"
              rules={bankValidationRules.accountFraction}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Account Fraction"
                  invalid={errors.accountFraction && true}
                  {...field}
                  disabled={!isEditing || false}
                  type="number"
                />
              )}
            />
            {errors.accountFraction && (
              <span className="text-danger">
                {errors.accountFraction.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="form-lable-font"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Currency <span className="required">*</span>
            </Label>
            <Controller
              name={"currency"}
              rules={bankValidationRules.currency}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isDisabled={!isEditing || false}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadCurrencyOptions}
                  placeholder="Select Currency"
                  defaultOptions={initialCurrencyOptions}
                  styles={selectStyles}
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

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Contact Name <span className="required">*</span>
            </Label>
            <Controller
              name="contactName"
              rules={bankValidationRules.contactName}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Contact Name"
                  invalid={errors.contactName && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.contactName && (
              <span className="text-danger">
                {errors.contactName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Branch Number
            </Label>
            <Controller
              name="branchNumber"
              control={control}
              rules={bankValidationRules.branchNumber}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Branch Number"
                  invalid={errors.branchNumber && true}
                  {...field}
                  disabled={!isEditing || false}
                  type="number"
                />
              )}
            />
            {errors.branchNumber && (
              <span className="text-danger">
                {errors.branchNumber.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Email ID <span className="required">*</span>
            </Label>
            <Controller
              name="emailIDBasicInfo"
              rules={bankValidationRules.email}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Email ID"
                  invalid={errors.emailIDBasicInfo && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.emailIDBasicInfo && (
              <span className="text-danger">
                {errors.emailIDBasicInfo.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Contact Number
            </Label>
            {/* <Controller
              name="basicInfoContactNumber"
              rules={bankValidationRules.phoneNumber}
              control={control}
              render={({ field }) => (
                <PhoneInput
                  inputClass="react-tel-input w-100"
                  country={"us"}
                  placeholder="Enter Mobile Number"
                  {...field}disabled={!isEditing || false}
                />
              )}
            /> */}
            <div className="d-flex gap-2">
              <div style={{ width: "20%" }}>
                <Controller
                  name="basicInfoCountryCode"
                  rules={bankValidationRules.countryCode}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="00"
                      // invalid={errors.emailIDBasicInfo && true}
                      {...field}
                      disabled={!isEditing || false}
                      type="number"
                    />
                  )}
                />
              </div>
              <div style={{ width: "80%" }}>
                <Controller
                  name="basicInfoContactNumber"
                  rules={bankValidationRules.phoneNumber}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder=" Enter Contact Number"
                      // invalid={errors.emailIDBasicInfo && true}
                      {...field}
                      disabled={!isEditing || false}
                      type="number"
                    />
                  )}
                />
              </div>
            </div>

            {errors.basicInfoCountryCode ? (
              <span className="text-danger">
                {errors.basicInfoCountryCode.message as React.ReactNode}
              </span>
            ) : errors.basicInfoContactNumber ? (
              <span className="text-danger">
                {errors.basicInfoContactNumber.message as React.ReactNode}
              </span>
            ) : null}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
