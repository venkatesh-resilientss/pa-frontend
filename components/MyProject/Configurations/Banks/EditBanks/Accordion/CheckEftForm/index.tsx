import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { formValidationRules } from "@/constants/common";


function CheckEFTForm({ onSubmit, control, errors, eft, setEft, positivePay, setPositivePay, ACHExport, setACHExport, check, setCheck, wireTransfer, setWireTransfer }) {
  const { handleSubmit } = useForm();
  const bankValidationRules = formValidationRules.banks;

  const PPDataFormat = [
    { label: "JSON", value: "json" },
    { label: "XML", value: "xml" },
    { label: "CSV", value: "csv" },
  ]
  const PPDataFormatOptions = PPDataFormat.map((data) => {
    return {
      value: data.value,
      label: data.label,
    };
  });
  const ACHDataFormat = [
    { label: "JSON", value: "json" },
    { label: "XML", value: "xml" },
    { label: "CSV", value: "csv" },
  ]
  const ACHDataFormatOptions = ACHDataFormat.map((data) => {
    return {
      value: data.value,
      label: data.label,
    };
  });
  useEffect(() => {
    if (!eft) {
      setACHExport(false)
      setPositivePay(false)
    }
  }, [eft])
  return (
    <div className="text-black">
      <Form
        style={{ fontSize: "12px", fontWeight: "400" }}
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column "
      >
        <div className="d-flex" style={{ gap: "5px" }}>
          <div className="form-check form-switch ">
            <Input
              type="switch"
              name="customSwitch"
              id="exampleCustomSwitch"
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
            />
            <div>Check</div>
          </div>
        </div>
        <Row className="mx-2">
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Check Range Start <span className="required">*</span>
            </Label>
            <Controller disabled={!check}

              name="checkRangeStart"
              rules={{
                ...bankValidationRules.rangeStart,
                required: check ? "Check Range Start is required" : false,
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
              <span className="text-danger">
                {errors.checkRangeStart.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Check Range End <span className="required">*</span>
            </Label>
            <Controller disabled={!check}
              name="checkRangeEnd"
              rules={{
                ...bankValidationRules.rangeEnd,
                required: check ? "Check Range End is required" : false,
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
              <span className="text-danger">
                {errors.checkRangeEnd.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Check Copies
            </Label>
            <Controller disabled={!check}
              name="checkCopies"
              rules={{
                ...bankValidationRules.rangeCopies,
                required: check ? "Check Copies is required" : false,
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
              <span className="text-danger">
                {errors.checkCopies.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
        <div className="d-flex" style={{ gap: "5px" }}>
          <div className="form-check form-switch ">
            <Input onChange={(e) => setEft(e.target.checked)}
              checked={eft}
              type="switch"
              name="customSwitch"
              id="exampleCustomSwitch"
            />
            <div>EFT</div>
          </div>
        </div>
        <Row className="mx-2">
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              EFT Range Start
            </Label>
            <Controller disabled={!eft}
              name="ACHeftRangeStart"
              rules={{
                ...bankValidationRules.rangeStart,
                required: eft ? "EFT Range Start is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter EFT Range Start"
                  invalid={errors.ACHeftRangeStart && true}
                  {...field}
                />
              )}
            />
            {errors.ACHeftRangeStart && (
              <span className="text-danger">
                {errors.ACHeftRangeStart.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              EFT Range End
            </Label>
            <Controller disabled={!eft}
              name="ACHeftRangeEnd"
              rules={{
                ...bankValidationRules.rangeEnd,
                required: eft ? "EFT Range End is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter EFT Range End"
                  invalid={errors.ACHeftRangeEnd && true}
                  {...field}
                />
              )}
            />
            {errors.ACHeftRangeEnd && (
              <span className="text-danger">
                {errors.ACHeftRangeEnd.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              EFT Copies
            </Label>
            <Controller disabled={!eft}
              name="ACHeftCopies"
              rules={{
                ...bankValidationRules.rangeCopies,
                required: eft ? "EFT Copies is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter EFT Copies"
                  invalid={errors.ACHeftCopies && true}
                  {...field}
                />
              )}
            />
            {errors.ACHeftCopies && (
              <span className="text-danger">
                {errors.ACHeftCopies.message as React.ReactNode}
              </span>
            )}
          </Col>
          <div
            className="d-flex mt-2"
            style={{
              fontSize: "14px",
              fontWeight: "400",
              marginBottom: "5px",
            }}
          >
            <div className="d-flex" style={{ gap: "5px" }}>
              <input type="checkbox" disabled={!eft} checked={ACHExport} onChange={(e) => setACHExport(e.target.checked)} />
              <div>ACH Export</div>

            </div>
          </div>
          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Host
            </Label>
            <Controller disabled={!ACHExport}
              name="ACHhost"
              rules={{
                ...bankValidationRules.eftHost,
                required: ACHExport ? "Host is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Host"
                  invalid={errors.ACHhost && true}
                  {...field}
                />
              )}
            />
            {errors.ACHhost && (
              <span className="text-danger">
                {errors.ACHhost.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              User Name
            </Label>
            <Controller disabled={!ACHExport}
              name="ACHuserName"
              rules={{
                ...bankValidationRules.eftUserName,
                required: ACHExport ? "User Name is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter User Name"
                  invalid={errors.ACHuserName && true}
                  {...field}
                />
              )}
            />
            {errors.ACHuserName && (
              <span className="text-danger">
                {errors.ACHuserName.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Password
            </Label>
            <Controller disabled={!ACHExport}
              name="ACHpassword"
              rules={{
                ...bankValidationRules.eftPassword,
                required: ACHExport ? " Password is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input type="password"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Password"
                  invalid={errors.ACHpassword && true}
                  {...field}
                />
              )}
            />
            {errors.ACHpassword && (
              <span className="text-danger">
                {errors.ACHpassword.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Inbound Path
            </Label>
            <Controller disabled={!ACHExport}
              name="ACHinboundPath"
              rules={{
                ...bankValidationRules.eftInboundPath,
                required: ACHExport ? "Inbound Path is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter   Inbound Path"
                  invalid={errors.ACHinboundPath && true}
                  {...field}
                />
              )}
            />
            {errors.ACHinboundPath && (
              <span className="text-danger">
                {errors.ACHinboundPath.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Outbound Path
            </Label>
            <Controller disabled={!ACHExport}
              name="ACHoutboundPath"
              rules={{
                ...bankValidationRules.eftOutboundPath,
                required: ACHExport ? "Outbound Path is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Outbound Path"
                  invalid={errors.ACHoutboundPath && true}
                  {...field}
                />
              )}
            />
            {errors.ACHoutboundPath && (
              <span className="text-danger">
                {errors.ACHoutboundPath.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Data Format
            </Label>
            <Controller
              name="ACHdataFormat"
              rules={{
                required: ACHExport ? "Data Format is required" : false,
              }}
              control={control}
              // render={({ field }) => (
              //   <Input
              //     style={{ fontSize: "12px", fontWeight: "400" }}
              //     placeholder="Enter  Data Format"
              //     invalid={errors.dataFormat && true}
              //     {...field}
              //   />
              // )}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  // loadOptions={loadStateOptions}
                  placeholder="Select  Data Format"
                  defaultOptions={ACHDataFormatOptions}
                  isDisabled={!ACHExport}
                />
              )}
            />
            {errors.ACHdataFormat && (
              <span className="text-danger">
                {errors.ACHdataFormat.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Certificate
            </Label>
            <Controller disabled={!ACHExport}
              name="ACHcertificate"
              rules={{
                ...bankValidationRules.eftCertificate,
                required: ACHExport ? "Certificate is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Certificate"
                  invalid={errors.ACHcertificate && true}
                  {...field}
                />
              )}
            />
            {errors.ACHcertificate && (
              <span className="text-danger">
                {errors.ACHcertificate.message as React.ReactNode}
              </span>
            )}
          </Col>

          <div
            className="d-flex mt-2"
            style={{
              fontSize: "14px",
              fontWeight: "400",
              marginBottom: "5px",
            }}
          >
            <div className="d-flex" style={{ gap: "5px" }}>
              <input type="checkbox" disabled={!eft} checked={positivePay} onChange={(e) => setPositivePay(e.target.checked)} />
              <div>Positive Pay</div>
            </div>
          </div>

          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Host
            </Label>
            <Controller disabled={!positivePay}
              name="PPhost"
              rules={{
                ...bankValidationRules.eftHost,
                required: positivePay ? "Host is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Host"
                  invalid={errors.PPhost && true}
                  {...field}
                />
              )}
            />
            {errors.PPhost && (
              <span className="text-danger">
                {errors.PPhost.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Port
            </Label>
            <Controller disabled={!positivePay}
              name="PPport"
              rules={{
                ...bankValidationRules.eftPort,
                required: positivePay ? "Port is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Port"
                  invalid={errors.PPport && true}
                  {...field}
                />
              )}
            />
            {errors.PPport && (
              <span className="text-danger">
                {errors.PPport.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              User Name
            </Label>
            <Controller disabled={!positivePay}
              name="PPuserName"
              rules={{
                ...bankValidationRules.eftUserName,
                required: positivePay ? "User Name is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter User Name"
                  invalid={errors.PPuserName && true}
                  {...field}
                />
              )}
            />
            {errors.PPuserName && (
              <span className="text-danger">
                {errors.PPuserName.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Password
            </Label>
            <Controller disabled={!positivePay}
              name="PPpassword"
              rules={{
                ...bankValidationRules.eftPassword,
                required: positivePay ? "Password is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Password"
                  invalid={errors.PPpassword && true}
                  {...field}
                />
              )}
            />
            {errors.PPpassword && (
              <span className="text-danger">
                {errors.PPpassword.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Outbound Path
            </Label>
            <Controller disabled={!positivePay}
              name="PPoutboundPath"
              rules={{
                ...bankValidationRules.eftOutboundPath,
                required: positivePay ? "Outbound Path is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Outbound Path"
                  invalid={errors.PPoutboundPath && true}
                  {...field}
                />
              )}
            />
            {errors.PPoutboundPath && (
              <span className="text-danger">
                {errors.PPoutboundPath.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Data Format
            </Label>
            <Controller
              name="PPdataFormat"
              rules={{
                required: positivePay ? "Data Format is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  // loadOptions={loadStateOptions}
                  placeholder="Select  Data Format"
                  defaultOptions={PPDataFormatOptions}
                  isDisabled={!positivePay}
                />
              )}
            />
            {errors.PPdataFormat && (
              <span className="text-danger">
                {errors.PPdataFormat.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Certificate
            </Label>
            <Controller disabled={!positivePay}
              name="PPcertificate"
              rules={{
                ...bankValidationRules.eftCertificate,
                required: positivePay ? "Certificate is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Certificate"
                  invalid={errors.PPcertificate && true}
                  {...field}
                />
              )}
            />
            {errors.PPcertificate && (
              <span className="text-danger">
                {errors.PPcertificate.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
        <div className="d-flex mt-2" style={{ gap: "5px" }}>
          <div className="form-check form-switch ">
            <Input onChange={(e) => setWireTransfer(e.target.checked)}
              type="switch"
              name="customSwitch"
              id="exampleCustomSwitch"
              checked={wireTransfer}
            />
            <div>Wire Transfer</div>
          </div>
        </div>
        <Row className="mx-2">
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Wire Transafer Range Start
            </Label>
            <Controller disabled={!wireTransfer}
              name="wireTransaferRangeStart"
              rules={{
                ...bankValidationRules.rangeStart,
                required: wireTransfer ? "Wire Transafer Range Start is required" : false,
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
              <span className="text-danger">
                {errors.wireTransaferRangeStart.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Wire Transfer Range End
            </Label>
            <Controller disabled={!wireTransfer}
              name="wireTransaferRangeEnd"
              rules={{
                ...bankValidationRules.rangeEnd,
                required: wireTransfer ? " Wire Transfer Range End is required" : false,
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
              <span className="text-danger">
                {errors.wireTransaferRangeEnd.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Wire Transfer Copies
            </Label>
            <Controller disabled={!wireTransfer}
              name="wireTransferCopies"
              rules={{
                ...bankValidationRules.rangeCopies,
                required: wireTransfer ? "Wire Transfer Copies is required" : false,
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
              <span className="text-danger">
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
