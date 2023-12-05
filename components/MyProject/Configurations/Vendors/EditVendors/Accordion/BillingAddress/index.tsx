import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StatesService } from "services";
import useSWR from "swr";
import Select from "react-select";

function BillingAddressForm({ onSubmit, control, errors }) {
  const { handleSubmit } = useForm();
  const statesService = new StatesService();
  const { data: statesData } = useSWR("LIST_STATES", () =>
    statesService.getStates()
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
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Address Line 1
            </Label>
            <Controller
              name="billingAddress1"
              rules={{
                required: "Contact Address Line 1 is required",
              }}
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

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Address Line 2
            </Label>
            <Controller
              name="billingAddress2"
              rules={{
                required: "  Contact Address Line 2 is required",
              }}
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

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              State{" "}
            </Label>
            <Controller
              name="billingAddressState"
              rules={{
                required: " State is required",
              }}
              control={control}
              render={({ field }) => (
                <Select
                  options={stateSelectOptions}
                  placeholder="Enter State"
                  {...field}
                />
              )}
            />
            {errors.billingAddressState && (
              <span className="text-danger">
                {errors.billingAddressState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Postal Code
            </Label>
            <Controller
              name="billingAddressPostalCode"
              rules={{
                required: " Postal Code is required",
              }}
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

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              City
            </Label>
            <Controller
              name="billingAddressCity"
              rules={{
                required: "  City is required",
              }}
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
