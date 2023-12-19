import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StatesService, CountryService } from "services";
import { toast } from 'react-toastify';
import Select from "react-select";
import { selectStyles } from "constants/common";
import { formValidationRules } from "constants/common";
import { useEffect, useState } from "react";
function ContactAddressForm({ onSubmit, control, errors, setValue }) {
  const { handleSubmit } = useForm();
  const addressValidationRules = formValidationRules.address;
  const countryService = new CountryService();
  const statesService = new StatesService();

  const [initialCountryOptions, setInitialCountryOptions] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [initialStateOptions, setInititalStateOptions] = useState([]);
  useEffect(() => {
    const fetchInitialCountryOptions = async () => {
      try {
        const res = await countryService.getCountries({
          search: "",
          limit: 500,
          offset: 0,
        });
        const options = res?.data?.map((item) => ({
          value: item.ID,
          label: item.Name,
        }));
        setInitialCountryOptions(options);
      } catch (error) {
        // console.error("Error fetching Country options:", error);
      }
    };
    fetchInitialCountryOptions();
  }, []);
  useEffect(() => {
    const fetchStateOptions = async () => {

      try {
        const response = await statesService.getStatesByCountry(
          currentCountry.value
        );
        const options = response.map((i) => {
          return {
            value: i.ID,
            label: i.Name,
            countryId: i.CountryID,
          };
        });
        setInititalStateOptions(options);
      } catch (error) {
        toast.error(
          error?.Message ||
          error?.message ||
          error?.error ||
          "Unable to get state options"
        );
      }
    };
    if (!currentCountry)
      return
    setInititalStateOptions([]);
    setValue("contactAddressState", null);
    fetchStateOptions();
  }, [currentCountry]);
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
              rules={addressValidationRules.line2}
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
              Postal Code
            </Label>
            <Controller
              name="contactAddressPostalCode"
              control={control}
              rules={addressValidationRules.zipCode}
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
              Country
            </Label>
            <Controller
              name="contactAddressCountry"
              rules={addressValidationRules.country}
              control={control}
              render={({ field }) => (
                <Select
                  options={initialCountryOptions}
                  placeholder="Select Country"
                  {...field}
                  styles={selectStyles}
                  onChange={(e) => {
                    setCurrentCountry(e);
                    setValue("contactAddressCountry", e);
                  }}
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
              State
            </Label>
            <Controller
              name="contactAddressState"
              rules={addressValidationRules.state}
              control={control}
              render={({ field }) => (
                <Select
                  options={initialStateOptions}
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
              City
            </Label>
            <Controller
              name="contactAddressCity"
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
