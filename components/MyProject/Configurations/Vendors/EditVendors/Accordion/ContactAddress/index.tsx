import { selectStyles } from "constants/common";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StatesService } from "services";
import useSWR from "swr";
import { formValidationRules } from "constants/common";
function ContactAddressForm({ onSubmit, control, errors }) {
  const { handleSubmit } = useForm();
  const addressValidationRules = formValidationRules.address;
  const statesService = new StatesService();
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
              Address Line 1 <span className="required">*</span>
            </Label>
            <Controller
              name="contactAddress1"
              rules={addressValidationRules.line1}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Contact Address Line 1"
                  invalid={errors.contactAddress1 && true}
                  {...field}
                />
              )}
            />
            {errors.contactAddress1 && (
              <span className="text-danger">
                {errors.contactAddress1.message as React.ReactNode}
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
              name="contactAddress2"
              rules={addressValidationRules.line1}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Contact Address Line 2"
                  invalid={errors.contactAddress2 && true}
                  {...field}
                />
              )}
            />
            {errors.contactAddress2 && (
              <span className="text-danger">
                {errors.contactAddress2.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Postal Code <span className="required">*</span>
            </Label>
            <Controller
              name="contactAddressPostalCode"
              rules={{
                required: " Postal Code is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Postal Code"
                  invalid={errors.contactAddressPostalCode && true}
                  {...field}
                />
              )}
            />
            {errors.contactAddressPostalCode && (
              <span className="text-danger">
                {errors.contactAddressPostalCode.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Country <span className="required">*</span>
            </Label>
            <Controller
              name="contactAddressCountry"
              rules={addressValidationRules.state}
              control={control}
              render={({ field }) => (
                <Select
                  options={[]}
                  placeholder="Select Country"
                  {...field}
                  styles={selectStyles}
                />
              )}
            />
            {errors.contactAddressCountry && (
              <span className="text-danger">
                {errors.contactAddressCountry.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              State <span className="required">*</span>
            </Label>
            <Controller
              name="contactAddressState"
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
            {errors.contactAddressState && (
              <span className="text-danger">
                {errors.contactAddressState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              City <span className="required">*</span>
            </Label>
            <Controller
              name="contactAddressCity"
              rules={{
                required: "  City is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter City"
                  invalid={errors.contactAddressCity && true}
                  {...field}
                />
              )}
            />
            {errors.contactAddressCity && (
              <span className="text-danger">
                {errors.contactAddressCity.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ContactAddressForm;
