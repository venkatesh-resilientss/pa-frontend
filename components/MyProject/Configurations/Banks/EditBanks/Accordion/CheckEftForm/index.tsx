import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";

function CheckEFTForm({ onSubmit, control, errors }) {
  const { handleSubmit } = useForm();
  return (
    <div className="text-black">
      <Form
        style={{ fontSize: "12px", fontWeight: "400", gap: "14px" }}
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column "
      >
        <Row>
          <div className="d-flex" style={{ gap: "5px" }}>
            <div className="form-check form-switch ">
              <Input
                type="switch"
                name="customSwitch"
                id="exampleCustomSwitch"
              />
              <div>Check</div>
            </div>
          </div>{" "}
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Check Range Start
            </Label>
            <Controller
              name="checkRangeStart"
              rules={{
                required: "Check Range Start is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Check Range Start"
                  invalid={errors.checkRangeStart && true}
                  {...field}
                />
              )}
            />
            {errors.checkRangeStart && (
              <span style={{ color: "red" }}>
                {errors.checkRangeStart.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Check Range End
            </Label>
            <Controller
              name="checkRangeEnd"
              rules={{
                required: "Check Range End is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Check Range End"
                  invalid={errors.checkRangeEnd && true}
                  {...field}
                />
              )}
            />
            {errors.checkRangeEnd && (
              <span style={{ color: "red" }}>
                {errors.checkRangeEnd.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Check Copies
            </Label>
            <Controller
              name="checkCopies"
              rules={{
                required: "Check Copies is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Check Copies"
                  invalid={errors.checkCopies && true}
                  {...field}
                />
              )}
            />
            {errors.checkCopies && (
              <span style={{ color: "red" }}>
                {errors.checkCopies.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
        <Row>
          <div className="d-flex" style={{ gap: "5px" }}>
            <div className="form-check form-switch ">
              <Input
                type="switch"
                name="customSwitch"
                id="exampleCustomSwitch"
              />
              <div>EFT</div>
            </div>
          </div>

          <div
            className="d-flex"
            style={{
              gap: "14px",
              fontSize: "14px",
              fontWeight: "400",
              marginBottom: "5px",
            }}
          >
            <div className="d-flex" style={{ gap: "5px" }}>
              <input type="checkbox" />
              <div>ACH Export</div>
            </div>
            <div className="d-flex" style={{ gap: "5px" }}>
              <input type="checkbox" />
              <div>Positive Pay</div>
            </div>
          </div>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              EFT Range Start
            </Label>
            <Controller
              name="eftRangeStart"
              rules={{
                required: "EFT Range Start is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter EFT Range Start"
                  invalid={errors.eftRangeStart && true}
                  {...field}
                />
              )}
            />
            {errors.eftRangeStart && (
              <span style={{ color: "red" }}>
                {errors.eftRangeStart.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              EFT Range End
            </Label>
            <Controller
              name="eftRangeEnd"
              rules={{
                required: "EFT Range End is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter EFT Range End"
                  invalid={errors.eftRangeEnd && true}
                  {...field}
                />
              )}
            />
            {errors.eftRangeEnd && (
              <span style={{ color: "red" }}>
                {errors.eftRangeEnd.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              EFT Copies
            </Label>
            <Controller
              name="eftCopies"
              rules={{
                required: "EFT Copies is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter EFT Copies"
                  invalid={errors.eftCopies && true}
                  {...field}
                />
              )}
            />
            {errors.eftCopies && (
              <span style={{ color: "red" }}>
                {errors.eftCopies.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Host
            </Label>
            <Controller
              name="host"
              rules={{
                required: "  Host is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Host"
                  invalid={errors.host && true}
                  {...field}
                />
              )}
            />
            {errors.host && (
              <span style={{ color: "red" }}>
                {errors.host.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              User Name
            </Label>
            <Controller
              name="userName"
              rules={{
                required: " User Name is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter User Name"
                  invalid={errors.userName && true}
                  {...field}
                />
              )}
            />
            {errors.userName && (
              <span style={{ color: "red" }}>
                {errors.userName.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Password
            </Label>
            <Controller
              name="password"
              rules={{
                required: " Password is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Password"
                  invalid={errors.password && true}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <span style={{ color: "red" }}>
                {errors.password.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Inbound Path
            </Label>
            <Controller
              name="inboundPath"
              rules={{
                required: "   Inbound Path is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter   Inbound Path"
                  invalid={errors.inboundPath && true}
                  {...field}
                />
              )}
            />
            {errors.inboundPath && (
              <span style={{ color: "red" }}>
                {errors.inboundPath.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Outbound Path
            </Label>
            <Controller
              name="outboundPath"
              rules={{
                required: "  Outbound Path is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Outbound Path"
                  invalid={errors.outboundPath && true}
                  {...field}
                />
              )}
            />
            {errors.outboundPath && (
              <span style={{ color: "red" }}>
                {errors.outboundPath.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Data Format
            </Label>
            <Controller
              name="dataFormat"
              rules={{
                required: "   Data Format is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter  Data Format"
                  invalid={errors.dataFormat && true}
                  {...field}
                />
              )}
            />
            {errors.dataFormat && (
              <span style={{ color: "red" }}>
                {errors.dataFormat.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Certificate
            </Label>
            <Controller
              name="certificate"
              rules={{
                required: "  Certificate is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Certificate"
                  invalid={errors.certificate && true}
                  {...field}
                />
              )}
            />
            {errors.certificate && (
              <span style={{ color: "red" }}>
                {errors.certificate.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
        <Row>
          <div className="d-flex" style={{ gap: "5px" }}>
            <div className="form-check form-switch ">
              <Input
                type="switch"
                name="customSwitch"
                id="exampleCustomSwitch"
              />
              <div>Wire Transfer</div>
            </div>
          </div>{" "}
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Wire Transafer Range Start
            </Label>
            <Controller
              name="wireTransaferRangeStart"
              rules={{
                required: "Wire Transafer Range Start is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Wire Transafer Range Start"
                  invalid={errors.wireTransaferRangeStart && true}
                  {...field}
                />
              )}
            />
            {errors.wireTransaferRangeStart && (
              <span style={{ color: "red" }}>
                {errors.wireTransaferRangeStart.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Wire Transfer Range End
            </Label>
            <Controller
              name="wireTransaferRangeEnd"
              rules={{
                required: " Wire Transfer Range End is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter  Wire Transfer Range End"
                  invalid={errors.wireTransaferRangeEnd && true}
                  {...field}
                />
              )}
            />
            {errors.wireTransaferRangeEnd && (
              <span style={{ color: "red" }}>
                {errors.wireTransaferRangeEnd.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Wire Transfer Copies
            </Label>
            <Controller
              name="wireTransferCopies"
              rules={{
                required: "Wire Transfer Copies is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Wire Transfer Copies"
                  invalid={errors.wireTransferCopies && true}
                  {...field}
                />
              )}
            />
            {errors.wireTransferCopies && (
              <span style={{ color: "red" }}>
                {errors.wireTransferCopies.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CheckEFTForm;
