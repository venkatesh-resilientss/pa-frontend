import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StatesService } from "services";
import useSWR from "swr";

const stateService = new StatesService();
function MailingAddressForm({ onSubmit, control, watch, errors }) {
  const { register, handleSubmit } = useForm();
  const {data:states, mutate: stateMutate } = useSWR("LIST_STATES", () =>
    stateService.getStates()
  );

  const statesDropdownoptions = states?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
      country : b.Country
    };
  });
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
              Mailing Address Line 1
            </Label>
            <Controller
              name="mailingAddress1"
              rules={{
                required: "Mailing Address Line 1 is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Mailing Address Line 1"
                  invalid={errors.mailingAddress1 && true}
                  {...field}
                />
              )}
            />
            {errors.mailingAddress1 && (
              <span style={{ color: "red" }}>
                {errors.mailingAddress1.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Mailing Address Line 2
            </Label>
            <Controller
              name="mailingAddress2"
              rules={{
                required: "  Mailing Address Line 2 is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Mailing Address Line 2"
                  invalid={errors.mailingAddress2 && true}
                  {...field}
                />
              )}
            />
            {errors.mailingAddress2 && (
              <span style={{ color: "red" }}>
                {errors.mailingAddress2.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Mailing Address City
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
              <span style={{ color: "red" }}>
                {errors.mailingAddressCity.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Mailing Address State{" "}
            </Label>
            <Controller
              name="mailingAddressState"
              rules={{
                required: " State is required",
              }}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  // loadOptions={loadStateOptions}
                  placeholder="Select State"
                  defaultOptions={statesDropdownoptions}
                />
              )}
            />
            {errors.mailingAddressState && (
              <span style={{ color: "red" }}>
                {errors.mailingAddressState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Mailing Address Postal Code
            </Label>
            <Controller
              name="mailingAddressPostalCode"
              rules={{
                required: " Postal Code is required",
              }}
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
              <span style={{ color: "red" }}>
                {errors.mailingAddressPostalCode.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4"></Col>

          <Col xl="4">
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
                />
              )}
            />
            {errors.mailingPhoneNumber && (
              <span style={{ color: "red" }}>
                {errors.mailingPhoneNumber.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Fax
            </Label>
            <Controller
              name="mailingFax"
              rules={{
                required: "Fax is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Fax"
                  invalid={errors.mailingFax && true}
                  {...field}
                />
              )}
            />
            {errors.mailingFax && (
              <span style={{ color: "red" }}>
                {errors.mailingFax.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Email
            </Label>
            <Controller
              name="mailingEmail"
              rules={{
                required: "Email is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Email"
                  invalid={errors.mailingEmail && true}
                  {...field}
                />
              )}
            />
            {errors.mailingEmail && (
              <span style={{ color: "red" }}>
                {errors.mailingEmail.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default MailingAddressForm;
