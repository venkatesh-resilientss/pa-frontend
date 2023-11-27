import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { StatesService } from "services";
import useSWR from "swr";


function BasicDetailsForm({ control, watch, onSubmit, errors }) {
  const {handleSubmit} = useForm();
  const options = [
    { value: "cheque", label: "Cheque" },
    { value: "wireTransfer", label: "Wire Transfer" },
    { value: "manualCheque", label: "Manual Cheque" },
    { value: "eft", label: "EFT" },
  ];
  const statesService = new StatesService();
  const { data: statesData } = useSWR("LIST_STATES", () =>
    statesService.getStates()
  );

  const stateSelectOptions = statesData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
      countryId : b.CountryID
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
              Vendor Name
            </Label>
            <Controller
              name="vendorName"
              rules={{ required: "Vendor Name  is required" }}
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
              <span style={{ color: "red" }}>
                {errors.vendorName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Vendor Code
            </Label>
            <Controller
              name="vendorCode"
              rules={{ required: "Vendor Code  is required" }}
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
              <span style={{ color: "red" }}>
                {errors.vendorCode.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Payment Type
            </Label>

            <Controller
              name="paymentType"
              rules={{
                required: "Default Payment Type is required",
              }}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  defaultOptions={options}
                  placeholder="Select an option"
                  isClearable={true}
                />
              )}
            />
            {errors.paymentType && (
              <span style={{ color: "red" }}>
                {errors.paymentType.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Vendor Legal Name
            </Label>
            <Controller
              name="legalName"
              rules={{
                required: "Vendor Legal Name is required",
              }}
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
              <span style={{ color: "red" }}>
                {errors.legalName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Vendor Email
            </Label>
            <Controller
              name="vendorEmail"
              rules={{
                required: "Vendor Email is required",
              }}
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
              <span style={{ color: "red" }}>
                {errors.vendorEmail.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Entity Type
            </Label>
            <Controller
              name="entityType"
              rules={{
                required: " Entity Type is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Entity Type"
                  invalid={errors.entityType && true}
                  {...field}
                />
              )}
            />
            {errors.entityType && (
              <span style={{ color: "red" }}>
                {errors.entityType.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Address
            </Label>
            <Controller
              name="defaultAddress"
              rules={{
                required: "  Default Address is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Address"
                  invalid={errors.defaultAddress && true}
                  {...field}
                />
              )}
            />
            {errors.defaultAddress && (
              <span style={{ color: "red" }}>
                {errors.defaultAddress.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Work State
            </Label>
            <Controller
              name="workState"
              rules={{
                required: "Work State is required",
              }}
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <AsyncSelect
                  name="workState"
                  defaultOptions={stateSelectOptions}
                  placeholder="Select State"
                  {...field}
                  isClearable={true}
                />
              )}
            />
            {errors.workState && (
              <span style={{ color: "red" }}>
                {errors.workState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Tax Id
            </Label>
            <Controller
              name="taxId"
              rules={{
                required: "Tax Id is required",
              }}
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
              <span style={{ color: "red" }}>
                {errors.taxId.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Account{" "}
            </Label>
            <Controller
              name="defaultAccount"
              rules={{
                required: " Default Account is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Account"
                  invalid={errors.defaultAccount && true}
                  {...field}
                />
              )}
            />
            {errors.defaultAccount && (
              <span style={{ color: "red" }}>
                {errors.defaultAccount.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              ACH Bank Routing Number{" "}
            </Label>
            <Controller
              name="routingNumber"
              rules={{
                required: "  ACH Bank Routing Number is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Routing Number"
                  invalid={errors.routingNumber && true}
                  {...field}
                />
              )}
            />
            {errors.routingNumber && (
              <span style={{ color: "red" }}>
                {errors.routingNumber.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              ACH Bank Acoount Number{" "}
            </Label>
            <Controller
              name="achAccountNumber"
              rules={{
                required: "ACH Bank Acoount Number is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Account Number"
                  invalid={errors.accountNumber && true}
                  {...field}
                />
              )}
            />
            {errors.accountNumber && (
              <span style={{ color: "red" }}>
                {errors.accountNumber.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Payee Name
            </Label>
            <Controller
              name="payeeName"
              rules={{
                required: " Payee Name is required",
              }}
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
              <span style={{ color: "red" }}>
                {errors.payeeName.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default BasicDetailsForm;
