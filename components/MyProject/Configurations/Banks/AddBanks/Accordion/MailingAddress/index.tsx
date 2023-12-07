import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
// import useSWR from "swr";
import { StatesService } from "services";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";

function MailingAddressForm({ onSubmit, control, errors }) {
  const { handleSubmit } = useForm();
  const [initialStateOptions, setInitialStateOptions] = useState([]);

  const stateService = new StatesService();
  // const { data: states } = useSWR("LIST_STATES", () =>
  //   stateService.getStates()
  // );

  // const statesDropdownoptions = states?.data.map((b) => {
  //   return {
  //     value: b.ID,
  //     label: b.Name,
  //     country: b.Country,
  //   };
  // });

  useEffect(() => {
    const fetchInitialStates = async () => {
      try {
        const res = await stateService.getStates({
          search: "",
          pageLimit: 25,
          offset: 0,
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
        pageLimit: 25,
        offset: 0,
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

  return (
    <div className="text-black">
      <Form
        style={{ fontSize: "12px", fontWeight: "400" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row>
          <Col xl="4" className="my-2">
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
              <span className="text-danger">
                {errors.mailingAddress1.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
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
              <span className="text-danger">
                {errors.mailingAddress2.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
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
              <span className="text-danger">
                {errors.mailingAddressCity.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
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
                  loadOptions={loadStateOptions}
                  placeholder="Select State"
                  defaultOptions={initialStateOptions}
                />
              )}
            />
            {errors.mailingAddressState && (
              <span className="text-danger">
                {errors.mailingAddressState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
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
              <span className="text-danger">
                {errors.mailingAddressPostalCode.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2"></Col>

          {/* <Col xl="4" className="my-2">
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
              <span className="text-danger">
                {errors.mailingPhoneNumber.message as React.ReactNode}
              </span>
            )}
          </Col> */}
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Phone
            </Label>
            <div className="d-flex gap-2">
              <div style={{ width: "20%" }}>
                <Controller
                  name="mailingCountryCode"
                  rules={{
                    required: "Country Code is Required",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="00"
                      invalid={errors.mailingCountryCode && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div style={{ width: "80%" }}>
                <Controller
                  name="mailingPhoneNumber"
                  rules={{
                    required: "Email ID is Required",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder=" Enter Email ID"
                      invalid={errors.mailingPhoneNumber && true}
                      {...field}
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

          <Col xl="4" className="my-2">
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
              <span className="text-danger">
                {errors.mailingFax.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
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

export default MailingAddressForm;
