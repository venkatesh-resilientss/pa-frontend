import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function DefaultAccountForm({ onSubmit, control, watch, errors }) {
  const { register, handleSubmit } = useForm();

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
              Default Account Cash
            </Label>
            <Controller
              name="defaultAccountCash"
              rules={{
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
              <span style={{ color: "red" }}>
                {errors.defaultAccountCash.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Account Clearing
            </Label>
            <Controller
              name="defaultAccountClearing"
              rules={{
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
              <span style={{ color: "red" }}>
                {errors.defaultAccountClearing.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Account Deposit
            </Label>
            <Controller
              name="defaultAccountDeposit"
              rules={{
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
              <span style={{ color: "red" }}>
                {errors.defaultAccountDeposit.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Default Account Discount
            </Label>
            <Controller
              name="defaultAccountDiscount"
              rules={{
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
              <span style={{ color: "red" }}>
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
