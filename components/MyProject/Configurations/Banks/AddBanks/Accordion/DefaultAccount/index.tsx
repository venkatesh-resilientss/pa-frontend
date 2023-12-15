import { useForm, Controller } from "react-hook-form";
import { Col, Form, Label, Row } from "reactstrap";
import { formValidationRules } from "@/constants/common";
import { useEffect, useState } from "react";
import { getSessionVariables } from "@/constants/function";
import { COAAccountsService } from "services";
import { selectStyles } from "constants/common";
import AsyncSelect from "react-select/async";

const coaAccountsService = new COAAccountsService();


function DefaultAccountForm({ onSubmit, control, errors }) {
  const bankValidationRules = formValidationRules.banks;
  const [initialcoaOptions, setInitialcoaOptions] = useState([]);
  const { handleSubmit } = useForm();


  //Options for Default Account  starts here
  useEffect(() => {
    const fetchInitialcoaOptions = async () => {
      const { clientID, projectID } = getSessionVariables();
      try {
        const res = await coaAccountsService.getCoasAccounts(
          { clientID, projectID },
          {
            search: "",
            pageLimit: 25,
            offset: 0,
            is_active: true
          }
        );
        const options = res?.result.filter(item => item.IsActive).map((item) => ({
          value: item.ID,
          label: `${item.Name} - ${item.Code}`,
        }));
        setInitialcoaOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialcoaOptions();
  }, []);






  const loadCoaOptions: any = async (inputValue, callback) => {
    const { clientID, projectID } = getSessionVariables();
    try {
      const res = await coaAccountsService.getCoasAccounts(
        { clientID, projectID },
        {
          search: inputValue.toString(),
          pageLimit: 25,
          offset: 0,
          is_active: true
        }
      );
      const options = res?.result.filter(item => item.IsActive).map((item) => ({
        value: item.ID,
        label: `${item.Name} - ${item.Code}`,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  //initial Options Default Account discount end

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
              Default Account Cash <span className="required">*</span>
            </Label>
            <Controller
              name="defaultAccountCash"
              rules={{
                ...bankValidationRules.defaultAmountCash,
                required: "Default Account Cash is required",
              }}
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
            {errors.defaultAccountCash && (
              <span className="text-danger">
                {errors.defaultAccountCash.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Account Clearing <span className="required">*</span>
            </Label>
            <Controller
              name="defaultAccountClearing"
              rules={{
                ...bankValidationRules.defaultAmountClearing,
                required: "Default Account Clearing",
              }}
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
            {errors.defaultAccountClearing && (
              <span className="text-danger">
                {errors.defaultAccountClearing.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Account Deposit <span className="required">*</span>
            </Label>
            <Controller
              name="defaultAccountDeposit"
              rules={{
                ...bankValidationRules.defaultAccountDeposit,
                required: "Default Account Deposit is required",
              }}
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
            {errors.defaultAccountDeposit && (
              <span className="text-danger">
                {errors.defaultAccountDeposit.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Account Discount <span className="required">*</span>
            </Label>
            <Controller
              name="defaultAccountDiscount"
              rules={{
                ...bankValidationRules.defaultAccountDiscount,
                required: "Default Account Discount is required",
              }}
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
            {errors.defaultAccountDiscount && (
              <span className="text-danger">
                {errors.defaultAccountDiscount.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default DefaultAccountForm;
