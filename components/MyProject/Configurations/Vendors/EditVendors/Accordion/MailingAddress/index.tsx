import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StatesService, CountryService } from "services";
import Select from "react-select";
import { selectStyles } from "constants/common";
import { formValidationRules } from "constants/common";
import { useEffect, useState } from "react";
import {toast} from 'react-toastify';

function MailingAddressForm({ onSubmit, control, errors ,editMode , setValue}) {
  const { handleSubmit } = useForm();
  const statesService = new StatesService();
  const addressValidationRules = formValidationRules.address;
  const countryService = new CountryService();
  const [initialCountryOptions, setInitialCountryOptions] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [initialStateOptions,setInititalStateOptions] = useState([]);
  useEffect(() => {
    const fetchInitialCountryOptions = async () => {
      try {
        const res = await countryService.getCountries({
          search: "",
          limit: 200,
          offset: 0,
        });
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
              name="mailingAddress1"
              rules={addressValidationRules.line1}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Contact Address Line 1"
                  invalid={errors.mailingAddress1 && true}
                  {...field}
                  disabled={!editMode}
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
                  disabled={!editMode}
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
                  disabled={!editMode}
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
                  options={initialCountryOptions}
                  placeholder="Select Country"
                  {...field}
                  styles={selectStyles}
                  isDisabled={!editMode}
                  onChange={(e) => {
                    setCurrentCountry(e);
                    setValue("mailingAddressCountry", e);
                  }}
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
                  options={initialStateOptions}
                  placeholder="Enter State"
                  {...field}
                  styles={selectStyles}
                  isDisabled={!editMode}
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
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter City"
                  invalid={errors.mailingAddressCity && true}
                  {...field}
                  disabled={!editMode}
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
