import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import AsyncSelect from "react-select/async";
import { CurrencyService } from "services";
// import useSWR from "swr";
import { useEffect, useState } from "react";
import { selectStyles } from "constants/common";

function BasicDetailsForm({ control, onSubmit, errors }) {
  const { handleSubmit } = useForm();
  const [initialCurrencyOptions, setInitialCurrencyOptions] = useState([]);

  const currencyService = new CurrencyService();

  useEffect(() => {
    const fetchInitialCurrencyOptions = async () => {
      try {
        const res = await currencyService.getCurrencies({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.result.map((item) => ({
          value: item.ID,
          label: item.Name,
        }));
        setInitialCurrencyOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialCurrencyOptions();
  }, []);

  const loadCurrencyOptions: any = async (inputValue, callback) => {
    try {
      const res = await currencyService.getCurrencies({
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      });
      const options = res?.result.map((item) => ({
        value: item.ID,
        label: item.Name,
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
              Bank Name
            </Label>
            <Controller
              name="bankName"
              rules={{ required: "Bank Name  is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Bank Name"
                  invalid={errors.bankName && true}
                  {...field}
                />
              )}
            />
            {errors.bankName && (
              <span className="text-danger">
                {errors.bankName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Bank Code
            </Label>
            <Controller
              name="bankCode"
              rules={{ required: "Bank Code  is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Bank Code "
                  invalid={errors.bankCode && true}
                  {...field}
                />
              )}
            />
            {errors.bankCode && (
              <span className="text-danger">
                {errors.bankCode.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Account Number
            </Label>
            <Controller
              name="accountNumber"
              rules={{
                required: "Account Number is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Account Number"
                  invalid={errors.accountNumber && true}
                  {...field}
                />
              )}
            />
            {errors.accountNumber && (
              <span className="text-danger">
                {errors.accountNumber.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Description
            </Label>
            <Controller
              name="description"
              rules={{
                required: "Description is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Description"
                  invalid={errors.description && true}
                  {...field}
                // type="textarea"
                />
              )}
            />
            {errors.description && (
              <span className="text-danger">
                {errors.description.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Routing Number
            </Label>
            <Controller
              name="routingNumber"
              rules={{
                required: "Routing Number is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Routing Number"
                  invalid={errors.routingNumber && true}
                  {...field}
                />
              )}
            />
            {errors.routingNumber && (
              <span className="text-danger">
                {errors.routingNumber.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Account Fraction
            </Label>
            <Controller
              name="accountFraction"
              rules={{
                required: "Account Fraction is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Account Fraction"
                  invalid={errors.accountFraction && true}
                  {...field}
                />
              )}
            />
            {errors.accountFraction && (
              <span className="text-danger">
                {errors.accountFraction.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            <Label
              className="form-lable-font"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Currency
            </Label>
            <Controller
              name={"currency"}
              rules={{ required: "Currency is required" }}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadCurrencyOptions}
                  placeholder="Select Series"
                  defaultOptions={initialCurrencyOptions}
                  styles={selectStyles}
                />
              )}
            />
            {errors.currency && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                {" "}
                {errors.currency.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Contact Name
            </Label>
            <Controller
              name="contactName"
              rules={{
                required: "Contact Name is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Contact Name"
                  invalid={errors.contactName && true}
                  {...field}
                />
              )}
            />
            {errors.contactName && (
              <span className="text-danger">
                {errors.contactName.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Branch Number
            </Label>
            <Controller
              name="branchNumber"
              rules={{
                required: " Branch Number is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder=" Enter Branch Number"
                  invalid={errors.branchNumber && true}
                  {...field}
                />
              )}
            />
            {errors.branchNumber && (
              <span className="text-danger">
                {errors.branchNumber.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default BasicDetailsForm;
