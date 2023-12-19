import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
// import useSWR from "swr";
import { StatesService } from "services";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { formValidationRules } from "@/constants/common";

export default function MailingAddress(props) {
  const { control, onSubmit, errors, isEditing } = props;
  const bankValidationRules = formValidationRules.banks;
  const { handleSubmit } = useForm();
  const [initialStateOptions, setInitialStateOptions] = useState([]);

  const stateService = new StatesService();

  useEffect(() => {
    const fetchInitialStates = async () => {
      try {
        const res = await stateService.getStates({
          search: "",
          limit: 25,
          offset: 0,
          is_active: true,
        });
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: item.Name,
          country: item.Country,
        }));
        setInitialStateOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialStates();
  }, []);

  const loadStateOptions: any = async (inputValue, callback) => {
    try {
      const res = await stateService.getStates({
        search: inputValue.toString(),
        limit: 25,
        offset: 0,
        is_active: true,
      });

      const options = res?.data.map((item) => ({
        value: item.ID,
        label: item.Name,
        country: item.Country,
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
        errors.mailingAddressState &&
        errors.mailingAddressState?.message &&
        !state.hasValue
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
              Mailing Address Line 1 <span className="required">*</span>
            </Label>
            <Controller
              name="mailingAddress1"
              rules={bankValidationRules.mailingAddressLine1}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Mailing Address Line 1"
                  invalid={errors.mailingAddress1 && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.mailingAddress1 && (
              <span className="text-danger">
                {errors.mailingAddress1.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Mailing Address Line 2
            </Label>
            <Controller
              name="mailingAddress2"
              rules={bankValidationRules.mailingAddressLine2}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Mailing Address Line 2"
                  invalid={errors.mailingAddress2 && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.mailingAddress2 && (
              <span className="text-danger">
                {errors.mailingAddress2.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Mailing Address City <span className="required">*</span>
            </Label>
            <Controller
              name="mailingAddressCity"
              rules={bankValidationRules.mailingAddressCity}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter City"
                  invalid={errors.mailingAddressCity && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.mailingAddressCity && (
              <span className="text-danger">
                {errors.mailingAddressCity.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Mailing Address State <span className="required">*</span>
            </Label>
            <Controller
              name="mailingAddressState"
              rules={bankValidationRules.mailingAddressState}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isDisabled={!isEditing || false}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadStateOptions}
                  placeholder="Select State"
                  defaultOptions={initialStateOptions}
                  styles={selectStyles}
                />
              )}
            />
            {errors.mailingAddressState && (
              <span className="text-danger">
                {errors.mailingAddressState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Mailing Address Postal Code <span className="required">*</span>
            </Label>
            <Controller
              name="mailingAddressPostalCode"
              rules={bankValidationRules.mailingAddressPostalCode}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Postal Code"
                  invalid={errors.mailingAddressPostalCode && true}
                  {...field}
                  disabled={!isEditing || false}
                  type="number"
                />
              )}
            />
            {errors.mailingAddressPostalCode && (
              <span className="text-danger">
                {errors.mailingAddressPostalCode.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2"></Col>

          {/* <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Phone
            </Label>
            <Controller
              name="mailingPhoneNumber"
              rules={{
                required: " Phone Number is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Phone Number"
                  invalid={errors.mailingPhoneNumber && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.mailingPhoneNumber && (
              <span className="text-danger">
                {errors.mailingPhoneNumber.message as React.ReactNode}
              </span>
            )}
          </Col> */}
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Phone <span className="required">*</span>
            </Label>
            <div className="d-flex gap-2">
              <div style={{ width: "20%" }}>
                <Controller
                  name="mailingCountryCode"
                  rules={bankValidationRules.mailingAddressCountryCode}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="00"
                      invalid={errors.mailingCountryCode && true}
                      {...field}
                      disabled={!isEditing || false}
                      type="number"
                    />
                  )}
                />
              </div>
              <div style={{ width: "80%" }}>
                <Controller
                  name="mailingPhoneNumber"
                  rules={bankValidationRules.mailingAddressPhoneNumber}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Enter Phone Number"
                      invalid={errors.mailingPhoneNumber && true}
                      {...field}
                      disabled={!isEditing || false}
                      type="number"
                    />
                  )}
                />
              </div>
            </div>

            {errors.mailingCountryCode ? (
              <span className="text-danger">
                {errors.mailingCountryCode.message as React.ReactNode}
              </span>
            ) : errors.mailingPhoneNumber ? (
              <span className="text-danger">
                {errors.mailingPhoneNumber.message as React.ReactNode}
              </span>
            ) : null}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Fax
            </Label>
            <Controller
              rules={bankValidationRules.mailingAddressFax}
              name="mailingFax"
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Fax"
                  invalid={errors.mailingFax && true}
                  {...field}
                  disabled={!isEditing || false}
                  type="number"
                />
              )}
            />
            {errors.mailingFax && (
              <span className="text-danger">
                {errors.mailingFax.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Email <span className="required">*</span>
            </Label>
            <Controller
              name="mailingEmail"
              rules={bankValidationRules.mailingEmail}
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Email"
                  invalid={errors.mailingEmail && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.mailingEmail && (
              <span className="text-danger">
                {errors.mailingEmail.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
