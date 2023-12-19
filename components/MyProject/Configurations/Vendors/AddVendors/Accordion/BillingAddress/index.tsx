import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import { StatesService, CountryService } from "services";
import {toast} from 'react-toastify';
import { useState,useEffect } from "react";
import { selectStyles } from "constants/common";
import { formValidationRules } from "constants/common";
function BillingAddressForm({ onSubmit, control, errors,setValue }) {
  const { handleSubmit } = useForm();
  const statesService = new StatesService();
  const countryService = new CountryService();
  const addressValidationRules = formValidationRules.address;
  const [initialCountryOptions, setInitialCountryOptions] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [initialStateOptions,setInititalStateOptions] = useState([]);
  useEffect(() => {
    const fetchInitialCountryOptions = async () => {
      try {
        const res = await countryService.getCountries({
          search: "",
          limit: 25,
          offset: 0,
        });
        // console.log(res);
        const options = res?.data?.map((item) => ({
          value: item.ID,
          label: item.Name,
        }));
        setInitialCountryOptions(options);
      } catch (error) {
        console.error("Error fetching Country options:", error);
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
    if(!currentCountry)
      return
    setInititalStateOptions([]);
    setValue("mailingAddressState", null);
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
                  options={initialCountryOptions}
                  placeholder="Select Country"
                  {...field}
                  styles={selectStyles}
                  onChange={(e) => {
                    setCurrentCountry(e);
                    setValue("mailingAddressCountry", e);
                  }}
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
                  options={initialStateOptions}
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
