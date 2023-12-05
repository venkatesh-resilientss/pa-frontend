import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import AsyncSelect from "react-select/async";
import { StatesService } from "services";
import useSWR from "swr";

function PhysicalAddressForm({ onSubmit, control, errors }) {
  const { handleSubmit } = useForm();

  const stateService = new StatesService();
  const { data: states } = useSWR("LIST_STATES", () =>
    stateService.getStates()
  );

  const statesDropdownoptions = states?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
      country: b.Country,
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
              Physical Address Line 1
            </Label>
            <Controller
              name="physicalAddress1"
              rules={{
                required: "Physical Address Line 1 is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Physical Address Line 1"
                  invalid={errors.physicalAddress1 && true}
                  {...field}
                />
              )}
            />
            {errors.physicalAddress1 && (
              <span className="text-danger">
                {errors.physicalAddress1.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address Line 2
            </Label>
            <Controller
              name="physicalAddress2"
              rules={{
                required: "  Physical Address Line 2 is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Physical Address Line 2"
                  invalid={errors.physicalAddress2 && true}
                  {...field}
                />
              )}
            />
            {errors.physicalAddress2 && (
              <span className="text-danger">
                {errors.physicalAddress2.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address City
            </Label>
            <Controller
              name="physicalAddressCity"
              rules={{
                required: "  City is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter City"
                  invalid={errors.physicalAddressCity && true}
                  {...field}
                />
              )}
            />
            {errors.physicalAddressCity && (
              <span className="text-danger">
                {errors.physicalAddressCity.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address State{" "}
            </Label>
            <Controller
              name="physicalAddressState"
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
            {errors.physicalAddressState && (
              <span className="text-danger">
                {errors.physicalAddressState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address Postal Code
            </Label>
            <Controller
              name="physicalAddressPostalCode"
              rules={{
                required: " Postal Code is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Postal Code"
                  invalid={errors.physicalAddressPostalCode && true}
                  {...field}
                />
              )}
            />
            {errors.physicalAddressPostalCode && (
              <span className="text-danger">
                {errors.physicalAddressPostalCode.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default PhysicalAddressForm;
