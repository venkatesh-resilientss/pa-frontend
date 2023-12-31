import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import { CountryService, StatesService } from "services";
import { selectStyles } from "constants/common";
import { COAAccountsService, EntitiesService } from "services";
import {
  formValidationRules,
  PaymentOptions,
  VendorsAddressTypes,
} from "constants/common";
import { useEffect } from "react";
import { getSessionVariables } from "@/constants/function";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import { toast } from 'react-toastify';
function BasicDetailsForm({ control, onSubmit, errors, setValue }) {
  const {
    // control,
    handleSubmit,
  } = useForm();
  const [isPettyCashEnabled, setPettyCashEnabled] = useState(false);
  const vendorsValidationRules = formValidationRules.vendors;
  const statesService = new StatesService();
  const countryService = new CountryService();
  const entityServices = new EntitiesService();
  const coaAccountsService = new COAAccountsService();

  const [initialcoaOptions, setInitialcoaOptions] = useState([]);
  const [initialEntityOptions, setInitialEntityOptions] = useState([]);
  const [initialCountryOptions, setInitialCountryOptions] = useState([]);
  const [initialStateOptions, setInititalStateOptions] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  useEffect(() => {
    const fetchInitialcoaOptions = async () => {
      const { clientID, projectID } = getSessionVariables();
      try {
        const res = await coaAccountsService.getCoasAccounts(
          { clientID, projectID },
          {
            search: "",
            limit: 500,
            offset: 0,
          }
        );
        const options = res?.result.map((item) => ({
          value: item.ID,
          label: item.Name,
        }));
        setInitialcoaOptions(options);
      } catch (error) {
        console.error("Error fetching COA options:", error);
      }
    };
    const fetchInitialEntityOptions = async () => {
      try {
        const res = await entityServices.getEntities({
          search: "",
          limit: 25,
          offset: 0,
        });
        const options = res?.map((item) => ({
          value: item.ID,
          label: item.Name,
        }));
        setInitialEntityOptions(options);
      } catch (error) {
        console.error("Error fetching Entity options:", error);
      }
    };
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

    fetchInitialEntityOptions();
    fetchInitialcoaOptions();
    fetchInitialCountryOptions();
  }, []);

  useEffect(() => {

    const fetchStateOptions = async () => {
      try {
        const response = await statesService.getStatesByCountry(currentCountry.value);
        const options = response.map(i => {
          return {
            value: i.ID,
            label: i.Name,
            countryId: i.CountryID
          }
        })
        setInititalStateOptions(options);
      } catch (error) {
        toast.error(error?.Message || error?.message || error?.error || 'Unable to get state options');
      }
    }
    if (!currentCountry)
      return
    setInititalStateOptions([]);
    setValue('workState', null)
    fetchStateOptions();
  }, [currentCountry]);

  const loadCoaOptions: any = async (inputValue, callback) => {
    const { clientID, projectID } = getSessionVariables();
    try {
      const res = await coaAccountsService.getCoasAccounts(
        { clientID, projectID },
        {
          search: inputValue.toString(),
          pageLimit: 25,
          offset: 0,
        }
      );
      const options = res?.result.map((item) => ({
        value: item.ID,
        label: item.Name,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  const loadEntityOptions: any = async (inputValue, callback) => {
    try {
      const res = await entityServices.getEntities({
        search: inputValue.toString(),
        limit: 25,
        offset: 0,
      });
      const options = res?.map((item) => ({
        value: item.ID,
        label: item.Name,
      }));
      callback(options);
    } catch (error) {
      console.error("Error fetching initial options:", error);
    }
  };
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
              Vendor Name <span className="required">*</span>
            </Label>
            <Controller
              name="vendorName"
              rules={vendorsValidationRules.name}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Vendor Name"
                  invalid={errors.vendorName && true}
                  {...field}
                />
              )}
            />
            {errors.vendorName && (
              <span className="text-danger">
                {errors.vendorName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Vendor Code <span className="required">*</span>
            </Label>
            <Controller
              name="vendorCode"
              rules={vendorsValidationRules.code}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Vendor Code ex:102910381"
                  invalid={errors.vendorCode && true}
                  {...field}
                />
              )}
            />
            {errors.vendorCode && (
              <span className="text-danger">
                {errors.vendorCode.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Payment Type <span className="required">*</span>
            </Label>

            <Controller
              name="paymentType"
              rules={vendorsValidationRules.paymentType}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={PaymentOptions}
                  placeholder="Select an option"
                  styles={selectStyles}
                />
              )}
            />
            {errors.paymentType && (
              <span className="text-danger">
                {errors.paymentType.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Vendor Legal Name
            </Label>
            <Controller
              name="legalName"
              rules={vendorsValidationRules.legalName}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Legal Name"
                  invalid={errors.legalName && true}
                  {...field}
                />
              )}
            />
            {errors.legalName && (
              <span className="text-danger">
                {errors.legalName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Vendor Email <span className="required">*</span>
            </Label>
            <Controller
              name="vendorEmail"
              rules={vendorsValidationRules.email}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  type="email"
                  placeholder="Enter Email"
                  invalid={errors.vendorEmail && true}
                  {...field}
                />
              )}
            />
            {errors.vendorEmail && (
              <span className="text-danger">
                {errors.vendorEmail.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Entity Type <span className="required">*</span>
            </Label>
            <Controller
              name="entityType"
              rules={vendorsValidationRules.entityType}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadEntityOptions}
                  placeholder="Select Entity"
                  defaultOptions={initialEntityOptions}
                  styles={selectStyles}
                />
              )}
            />
            {errors.entityType && (
              <span className="text-danger">
                {errors.entityType.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Address <span className="required">*</span>
            </Label>
            <Controller
              name="defaultAddress"
              rules={vendorsValidationRules.defaultAddress}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={VendorsAddressTypes}
                  placeholder="Select Default Address"
                  styles={selectStyles}
                />
              )}
            />
            {errors.defaultAddress && (
              <span className="text-danger">
                {errors.defaultAddress.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Country <span className="required">*</span>
            </Label>
            <Controller
              name="vendorcountry"
              rules={vendorsValidationRules.country}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={initialCountryOptions}
                  placeholder="Select Country"
                  styles={selectStyles}
                  onChange={(e) => {
                    setCurrentCountry(e);
                    setValue("vendorcountry", e)
                  }}
                />
              )}
            />
            {errors.vendorcountry && (
              <span className="text-danger">
                {errors.vendorcountry.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Work State <span className="required">*</span>
            </Label>
            <Controller
              name="workState"
              rules={vendorsValidationRules.workState}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={initialStateOptions}
                  placeholder="Select State"
                  styles={selectStyles}
                />
              )}
            />
            {errors.workState && (
              <span className="text-danger">
                {errors.workState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Tax Id
            </Label>
            <Controller
              name="taxId"
              rules={vendorsValidationRules.taxID}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Tax Id"
                  invalid={errors.taxId && true}
                  {...field}
                />
              )}
            />
            {errors.taxId && (
              <span className="text-danger">
                {errors.taxId.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Account
            </Label>
            <Controller
              name="defaultAccount"
              rules={vendorsValidationRules.deafultAccount}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadCoaOptions}
                  placeholder="Select COA Parent"
                  defaultOptions={initialcoaOptions}
                  styles={selectStyles}
                />
              )}
            />
            {errors.defaultAccount && (
              <span className="text-danger">
                {errors.defaultAccount.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              ACH Bank Routing Number <span className="required">*</span>
            </Label>
            <Controller
              name="achRoutingNumber"
              rules={vendorsValidationRules.routingNumber}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Routing Number"
                  invalid={errors.achRoutingNumber && true}
                  {...field}
                />
              )}
            />
            {errors.achRoutingNumber && (
              <span style={{ color: "red" }}>
                {errors.achRoutingNumber.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              ACH Bank Account Number <span className="required">*</span>
            </Label>
            <Controller
              name="achAccountNumber"
              rules={vendorsValidationRules.accountNumber}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Account Number"
                  invalid={errors.achAccountNumber && true}
                  {...field}
                />
              )}
            />
            {errors.achAccountNumber && (
              <span style={{ color: "red" }}>
                {errors.achAccountNumber.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Payee Name
            </Label>
            <Controller
              name="payeeName"
              rules={vendorsValidationRules.payeename}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Payee Name"
                  invalid={errors.payeeName && true}
                  {...field}
                />
              )}
            />
            {errors.payeeName && (
              <span className="text-danger">
                {errors.payeeName.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2 align-self-center">
            <div className="d-flex gap-2 align-items-center">
              <Controller
                name="isPettyCashEnabled"
                control={control}
                render={({ field }) => (
                  <Input
                    type="checkbox"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                    checked={isPettyCashEnabled}
                    onChange={() => {
                      setPettyCashEnabled(!isPettyCashEnabled);
                    }}
                  />
                )}
              />
              <Label
                className="text-black mb-0"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Is Petty Cash Enabled
              </Label>
            </div>
          </Col>
          {isPettyCashEnabled && (
            <Col xl="4" className="mt-2">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Petty Cash Account <span className="required">*</span>
              </Label>
              <Controller
                name="pettyCashAccount"
                rules={vendorsValidationRules.pettyCashAccount}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[]}
                    placeholder="Select an option"
                    styles={selectStyles}
                  />
                )}
              />
              {errors.pettyCashAccount && (
                <span style={{ color: "red" }}>
                  {errors.pettyCashAccount.message as React.ReactNode}
                </span>
              )}
            </Col>
          )}

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Contact Name <span className="required">*</span>
            </Label>
            <Controller
              name="contactName"
              rules={vendorsValidationRules.contactname}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Payee Name"
                  invalid={errors.contactName && true}
                  {...field}
                />
              )}
            />
            {errors.contactName && (
              <span style={{ color: "red" }}>
                {errors.contactName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Contact Number <span className="required">*</span>
            </Label>
            <Controller
              name="contactNumber"
              rules={vendorsValidationRules.contactNumber}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Contact Number"
                  invalid={errors.contactNumber && true}
                  {...field}
                />
              )}
            />
            {errors.contactNumber && (
              <span style={{ color: "red" }}>
                {errors.contactNumber.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default BasicDetailsForm;
