import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StatesService, CountryService } from "services";
import useSWR from "swr";
import Select from "react-select";
import { selectStyles } from "constants/common";
import { formValidationRules } from "constants/common";
function MailingAddressForm({ onSubmit, control, errors }) {
  const { handleSubmit } = useForm();
  const statesService = new StatesService();
  const addressValidationRules = formValidationRules.address;
  const { data: statesData } = useSWR("LIST_STATES", () =>
    statesService.getStates({ search: "", pageLimit: 25, offset: 0 })
  );

  const stateSelectOptions = statesData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
      countryId: b.CountryID,
    };
  });

  const countryService = new CountryService();
  const {data:countryData} = useSWR("LIST_COUNTRIES", ()=> countryService.getCountries());
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
              name="mailingAddress1"
              rules={addressValidationRules.line1}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Contact Address Line 1"
                  invalid={errors.mailingAddress1 && true}
                  {...field}
                />
              )}
            />
            {errors.mailingAddress1 && (
              <span className="text-danger">
                {errors.mailingAddress1.message as React.ReactNode}
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
              name="mailingAddress2"
              rules={addressValidationRules.line2}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Contact Address Line 2"
                  invalid={errors.mailingAddress2 && true}
                  {...field}
                />
              )}
            />
            {errors.mailingAddress2 && (
              <span className="text-danger">
                {errors.mailingAddress2.message as React.ReactNode}
              </span>
            )}
          </Col>

          

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Postal Code <span className="requierd">*</span>
            </Label>
            <Controller
              name="mailingAddressPostalCode"
              rules={addressValidationRules.zipCode}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Postal Code"
                  invalid={errors.mailingAddressPostalCode && true}
                  {...field}
                />
              )}
            />
            {errors.mailingAddressPostalCode && (
              <span className="text-danger">
                {errors.mailingAddressPostalCode.message as React.ReactNode}
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
              name="mailingAddressCountry"
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
            {errors.mailingAddressCountry && (
              <span className="text-danger">
                {errors.mailingAddressCountry.message as React.ReactNode}
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
              name="mailingAddressState"
              rules={addressValidationRules.state}
              control={control}
              render={({ field }) => (
                <Select
                  options={stateSelectOptions}
                  placeholder="Enter State"
                  {...field}
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

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              City
            </Label>
            <Controller
              name="mailingAddressCity"
              rules={{
                required: "  City is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter City"
                  invalid={errors.mailingAddressCity && true}
                  {...field}
                />
              )}
            />
            {errors.mailingAddressCity && (
              <span className="text-danger">
                {errors.mailingAddressCity.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default MailingAddressForm;
