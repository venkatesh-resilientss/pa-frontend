import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StatesService, CountryService } from "services";
import useSWR from "swr";
import Select from "react-select";
import { selectStyles } from "constants/common";
import { formValidationRules } from "constants/common";
function BillingAddressForm({ onSubmit, control, errors }) {
  const { handleSubmit } = useForm();
  const statesService = new StatesService();
  const { data: statesData } = useSWR("LIST_STATES", () =>
    statesService.getStates({ search: "", limit: 25, offset: 0, is_active: true })
  );
  const addressValidationRules = formValidationRules.address;
  const stateSelectOptions = statesData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
      countryId: b.CountryID,
    };
  });
  const countryService = new CountryService();
  const { data: countryData } = useSWR("LIST_COUNTRIES", () => countryService.getCountries({ search: "", limit: 25, offset: 0, is_active: true }));
  const countrySelectOptions = countryData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });
  return (
    <div className="text-black">
      <Form
        style={{ fontSize: "12px", fontWeight: "400" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row>
          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Address Line 1
            </Label>
            <Controller
              name="billingAddress1"
              rules={addressValidationRules.line1}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Contact Address Line 1"
                  invalid={errors.billingAddress1 && true}
                  {...field}
                />
              )}
            />
            {errors.billingAddress1 && (
              <span className="text-danger">
                {errors.billingAddress1.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Address Line 2
            </Label>
            <Controller
              name="billingAddress2"
              rules={addressValidationRules.line2}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Contact Address Line 2"
                  invalid={errors.billingAddress2 && true}
                  {...field}
                />
              )}
            />
            {errors.billingAddress2 && (
              <span className="text-danger">
                {errors.billingAddress2.message as React.ReactNode}
              </span>
            )}
          </Col>


          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Postal Code
            </Label>
            <Controller
              name="billingAddressPostalCode"
              rules={addressValidationRules.zipCode}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Postal Code"
                  invalid={errors.billingAddressPostalCode && true}
                  {...field}
                />
              )}
            />
            {errors.billingAddressPostalCode && (
              <span className="text-danger">
                {errors.billingAddressPostalCode.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Country
            </Label>
            <Controller
              name="billingAddressCountry"
              rules={addressValidationRules.country}
              control={control}
              render={({ field }) => (
                <Select
                  options={countrySelectOptions}
                  placeholder="Select Country"
                  {...field}
                  styles={selectStyles}
                />
              )}
            />
            {errors.billingAddressCountry && (
              <span style={{ color: "red" }}>
                {errors.billingAddressCountry.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              State
            </Label>
            <Controller
              name="billingAddressState"
              rules={addressValidationRules.state}
              control={control}
              render={({ field }) => (
                <Select
                  options={stateSelectOptions}
                  placeholder="Select State"
                  {...field}
                  styles={selectStyles}
                />
              )}
            />
            {errors.billingAddressState && (
              <span style={{ color: "red" }}>
                {errors.billingAddressState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              City
            </Label>
            <Controller
              name="billingAddressCity"
              rules={addressValidationRules.city}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter City"
                  invalid={errors.billingAddressCity && true}
                  {...field}
                />
              )}
            />
            {errors.billingAddressCity && (
              <span className="text-danger">
                {errors.billingAddressCity.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default BillingAddressForm;
