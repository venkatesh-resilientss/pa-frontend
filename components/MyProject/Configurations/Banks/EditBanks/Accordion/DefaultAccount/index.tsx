import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { formValidationRules } from "@/constants/common";

function DefaultAccountForm({ onSubmit, control, errors }) {
  const bankValidationRules = formValidationRules.banks;
  const { handleSubmit } = useForm();

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
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Default Account Cash"
                  invalid={errors.defaultAccountCash && true}
                  {...field}
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
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Default Account Clearing"
                  invalid={errors.defaultAccountClearing && true}
                  {...field}
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
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Default Account Deposit"
                  invalid={errors.defaultAccountDeposit && true}
                  {...field}
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
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Default Account Discount"
                  invalid={errors.defaultAccountDiscount && true}
                  {...field}
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
