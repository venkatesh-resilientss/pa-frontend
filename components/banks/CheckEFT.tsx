import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

import { Col, Form, Input, Label, Row } from "reactstrap";
import { formValidationRules } from "@/constants/common";

export default function CheckEFT(props) {
  const { positivePay, setPositivePay, ACHExport, setACHExport, isEditing } =
    props;
  const { eft, setEft, wireTransfer, setWireTransfer, check, setCheck } = props;
  const { isSubmitted, watch, trigger, setValue, onSubmit, control, errors } =
    props;

  const bankValidationRules = formValidationRules.banks;
  const { handleSubmit } = useForm();

  const PPDataFormat = [
    { label: "JSON", value: "json" },
    { label: "XML", value: "xml" },
    { label: "CSV", value: "csv" },
  ];
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
  ];
  const ACHDataFormatOptions = ACHDataFormat.map((data) => {
    return {
      value: data.value,
      label: data.label,
    };
  });
  useEffect(() => {
    if (!eft) {
      setACHExport(false);
      setPositivePay(false);
    }
  }, [eft]);

  const rangeStart = watch("checkRangeStart");
  const rangeEnd = watch("checkRangeEnd");

  const validateRangeStart = () => {
    if (rangeStart && rangeEnd && parseInt(rangeStart) >= parseInt(rangeEnd))
      return "Range start must be less than Range end";
    return undefined;
  };

  useEffect(() => {
    if (isSubmitted) trigger();
  }, [rangeStart, rangeEnd, isSubmitted]);

  const eftStart = watch("ACHeftRangeStart");
  const eftEnd = watch("ACHeftRangeEnd");

  const validateEFTStart = () => {
    if (eftStart && eftEnd && parseInt(eftStart) >= parseInt(eftEnd))
      return "Range start must be less than Range end";
    return undefined;
  };

  useEffect(() => {
    if (isSubmitted) trigger();
  }, [eftStart, eftEnd, isSubmitted]);

  const wTStart = watch("wireTransaferRangeStart");
  const wTEnd = watch("wireTransaferRangeEnd");

  const validateWireTransferStart = () => {
    if (wTStart && wTEnd && parseInt(wTStart) >= parseInt(wTEnd))
      return "Range start must be less than Range end";
    return undefined;
  };

  useEffect(() => {
    if (isSubmitted) trigger();
  }, [wTStart, wTEnd, isSubmitted]);

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      background: state.isDisabled ? "#e9ecef" : "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "0.375rem",
      minHeight: "40px",
      boxShadow: null,
      ":hover": {
        borderColor: "#A2CFFE",
      },
      borderColor:
        ((errors.ACHdataFormat &&
          errors.ACHdataFormat?.message &&
          (state.selectProps.instanceId || "").includes("ACHdataFormat")) ||
          (errors.PPdataFormat &&
            errors.PPdataFormat?.message &&
            (state.selectProps.instanceId || "").includes("PPdataFormat"))) &&
        !state.hasValue
          ? "#e50000 !important"
          : "#dee2e6",
    }),

    singleValue: (provided) => ({ ...provided, color: "#212529" }),

    valueContainer: (base) => ({ ...base, padding: "0 6px" }),

    input: (base) => ({ ...base, margin: "0" }),

    placeholder: (base: any) => ({
      ...base,
      position: "center",
      transform: "none",
      color: "#c9c9c9 !important",
    }),

    menu: (base: any) => ({ ...base, margin: "0 !important" }),
    menuList: (base: any) => ({ ...base, padding: "0 !important" }),

    option: (base: any, state: any) => ({
      ...base,
      cursor: "pointer",
      color: "#212529",
      ":hover": {
        backgroundColor: "#c9c9c97d",
      },
      backgroundColor: state.isSelected ? "#c9c9c97d !important" : "white",
    }),

    indicatorSeparator: () => ({ display: "none" }),
  };

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
              disabled={!isEditing || false}
              name="customSwitch"
              id="exampleCustomSwitch"
              checked={check}
              onChange={(e) => {
                setCheck(e.target.checked);
                if (isSubmitted) trigger();
                if (!e.target.checked) {
                  setValue("checkRangeStart", "");
                  setValue("checkRangeEnd", "");
                  setValue("checkCopies", "");
                }
              }}
            />

            <div>Check</div>
          </div>
        </div>
        <Row className="mx-2">
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Check Range Start
            </Label>
            <Controller
              name="checkRangeStart"
              rules={{
                ...bankValidationRules.rangeStart,
                required: check ? "Check Range Start is required" : false,
                validate: check ? validateRangeStart : undefined,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Check Range Start"
                  invalid={errors.checkRangeStart && true}
                  {...field}
                  disabled={!check || !isEditing || false}
                />
              )}
            />
            {errors.checkRangeStart && check && (
              <span className="text-danger">
                {errors.checkRangeStart.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Check Range End
            </Label>
            <Controller
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
                  disabled={!check || !isEditing || false}
                />
              )}
            />
            {errors.checkRangeEnd && check && (
              <span className="text-danger">
                {errors.checkRangeEnd.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Check Copies
            </Label>
            <Controller
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
                  disabled={!check || !isEditing || false}
                />
              )}
            />
            {errors.checkCopies && check && (
              <span className="text-danger">
                {errors.checkCopies.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
        <div className="d-flex" style={{ gap: "5px" }}>
          <div className="form-check form-switch ">
            <Input
              checked={eft}
              type="switch"
              disabled={!isEditing || false}
              name="customSwitch"
              id="exampleCustomSwitch"
              onChange={(e) => {
                setEft(e.target.checked);
                if (isSubmitted) trigger();
                if (!e.target.checked) {
                  setValue("ACHeftRangeStart", "");
                  setValue("ACHeftRangeEnd", "");
                  setValue("ACHeftCopies", "");
                  setValue("ACHhost", "");
                  setValue("ACHuserName", "");
                  setValue("ACHpassword", "");
                  setValue("ACHinboundPath", "");
                  setValue("ACHoutboundPath", "");
                  setValue("ACHdataFormat", null);
                  setValue("ACHcertificate", "");
                  setValue("PPhost", "");
                  setValue("PPport", "");
                  setValue("PPuserName", "");
                  setValue("PPpassword", "");
                  setValue("PPoutboundPath", "");
                  setValue("PPdataFormat", null);
                  setValue("PPcertificate", "");
                }
              }}
            />
            <div>EFT</div>
          </div>
        </div>
        <Row className="mx-2">
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              EFT Range Start
            </Label>
            <Controller
              name="ACHeftRangeStart"
              rules={{
                ...bankValidationRules.rangeStart,
                required: eft ? "EFT Range Start is required" : false,
                validate: eft ? validateEFTStart : undefined,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter EFT Range Start"
                  invalid={errors.ACHeftRangeStart && true}
                  {...field}
                  disabled={!eft || !isEditing || false}
                />
              )}
            />
            {errors.ACHeftRangeStart && eft && (
              <span className="text-danger">
                {errors.ACHeftRangeStart.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              EFT Range End
            </Label>
            <Controller
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
                  disabled={!eft || !isEditing || false}
                />
              )}
            />
            {errors.ACHeftRangeEnd && eft && (
              <span className="text-danger">
                {errors.ACHeftRangeEnd.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              EFT Copies
            </Label>
            <Controller
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
                  disabled={!eft || !isEditing || false}
                />
              )}
            />
            {errors.ACHeftCopies && eft && (
              <span className="text-danger">
                {errors.ACHeftCopies.message as React.ReactNode}
              </span>
            )}
          </Col>
          <div
            className="d-flex mt-2"
            style={{
              gap: "14px",
              fontSize: "14px",
              fontWeight: "400",
              marginBottom: "5px",
            }}
          >
            <div className="d-flex" style={{ gap: "5px" }}>
              <input
                type="checkbox"
                disabled={!eft || !isEditing}
                checked={ACHExport}
                onChange={(e) => {
                  setACHExport(e.target.checked);
                  if (isSubmitted) trigger();
                  if (!e.target.checked) {
                    setValue("ACHhost", "");
                    setValue("ACHuserName", "");
                    setValue("ACHpassword", "");
                    setValue("ACHinboundPath", "");
                    setValue("ACHoutboundPath", "");
                    setValue("ACHdataFormat", null);
                    setValue("ACHcertificate", "");
                  }
                }}
              />
              <div>ACH Export</div>
            </div>
          </div>
          <Col lg="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Host
            </Label>
            <Controller
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
                  disabled={!ACHExport || !isEditing || false}
                />
              )}
            />
            {errors.ACHhost && ACHExport && (
              <span className="text-danger">
                {errors.ACHhost.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              User Name
            </Label>
            <Controller
              name="ACHuserName"
              rules={{
                ...bankValidationRules.eftUserName,
                required: ACHExport ? " User Name is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter User Name"
                  invalid={errors.ACHuserName && true}
                  {...field}
                  disabled={!ACHExport || !isEditing || false}
                />
              )}
            />
            {errors.ACHuserName && ACHExport && (
              <span className="text-danger">
                {errors.ACHuserName.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Password
            </Label>
            <Controller
              name="ACHpassword"
              rules={{
                ...bankValidationRules.eftPassword,
                required: ACHExport ? " Password is required" : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Password"
                  invalid={errors.ACHpassword && true}
                  {...field}
                  disabled={!ACHExport || !isEditing || false}
                />
              )}
            />
            {errors.ACHpassword && ACHExport && (
              <span className="text-danger">
                {errors.ACHpassword.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Inbound Path
            </Label>
            <Controller
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
                  disabled={!ACHExport || !isEditing || false}
                />
              )}
            />
            {errors.ACHinboundPath && ACHExport && (
              <span className="text-danger">
                {errors.ACHinboundPath.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Outbound Path
            </Label>
            <Controller
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
                  disabled={!ACHExport || !isEditing || false}
                />
              )}
            />
            {errors.ACHoutboundPath && ACHExport && (
              <span className="text-danger">
                {errors.ACHoutboundPath.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
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
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  // loadOptions={loadStateOptions}
                  placeholder="Select  Data Format"
                  defaultOptions={ACHDataFormatOptions}
                  isDisabled={!ACHExport || !isEditing || false}
                  styles={selectStyles}
                  instanceId={`react-select-ACHdataFormat`}
                />
              )}
            />
            {errors.ACHdataFormat && ACHExport && (
              <span className="text-danger">
                {errors.ACHdataFormat.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Certificate
            </Label>
            <Controller
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
                  disabled={!ACHExport || !isEditing || false}
                />
              )}
            />
            {errors.ACHcertificate && ACHExport && (
              <span className="text-danger">
                {errors.ACHcertificate.message as React.ReactNode}
              </span>
            )}
          </Col>

          <div
            className="d-flex my-2"
            style={{
              gap: "14px",
              fontSize: "14px",
              fontWeight: "400",
              marginBottom: "5px",
            }}
          >
            <div className="d-flex" style={{ gap: "5px" }}>
              <input
                type="checkbox"
                disabled={!eft || !isEditing || false}
                checked={positivePay}
                onChange={(e) => {
                  setPositivePay(e.target.checked);
                  if (isSubmitted) trigger();
                  if (!e.target.checked) {
                    setValue("PPhost", "");
                    setValue("PPport", "");
                    setValue("PPuserName", "");
                    setValue("PPpassword", "");
                    setValue("PPoutboundPath", "");
                    setValue("PPdataFormat", null);
                    setValue("PPcertificate", "");
                  }
                }}
              />
              <div>Positive Pay</div>
            </div>
          </div>

          <Col lg="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Host
            </Label>
            <Controller
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
                  disabled={!positivePay || !isEditing || false}
                />
              )}
            />
            {errors.PPhost && (
              <span className="text-danger">
                {errors.PPhost.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Port
            </Label>
            <Controller
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
                  disabled={!positivePay || !isEditing || false}
                  type="number"
                />
              )}
            />
            {errors.PPport && (
              <span className="text-danger">
                {errors.PPport.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              User Name
            </Label>
            <Controller
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
                  disabled={!positivePay || !isEditing || false}
                />
              )}
            />
            {errors.PPuserName && (
              <span className="text-danger">
                {errors.PPuserName.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Password
            </Label>
            <Controller
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
                  disabled={!positivePay || !isEditing || false}
                />
              )}
            />
            {errors.PPpassword && (
              <span className="text-danger">
                {errors.PPpassword.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Outbound Path
            </Label>
            <Controller
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
                  disabled={!positivePay || !isEditing || false}
                />
              )}
            />
            {errors.PPoutboundPath && (
              <span className="text-danger">
                {errors.PPoutboundPath.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
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
                  placeholder="Select Data Format"
                  defaultOptions={PPDataFormatOptions}
                  isDisabled={!positivePay || !isEditing || false}
                  styles={selectStyles}
                  instanceId={`react-select-PPdataFormat`}
                />
              )}
            />
            {errors.PPdataFormat && (
              <span className="text-danger">
                {errors.PPdataFormat.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Certificate
            </Label>
            <Controller
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
                  disabled={!positivePay || !isEditing || false}
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
            <Input
              type="switch"
              disabled={!isEditing || false}
              name="customSwitch"
              id="exampleCustomSwitch"
              checked={wireTransfer}
              onChange={(e) => {
                setWireTransfer(e.target.checked);
                if (isSubmitted) trigger();
                if (!e.target.checked) {
                  setValue("wireTransaferRangeStart", "");
                  setValue("wireTransaferRangeEnd", "");
                  setValue("wireTransferCopies", "");
                }
              }}
            />
            <div>Wire Transfer</div>
          </div>
        </div>
        <Row className="mx-2">
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Wire Transafer Range Start
            </Label>
            <Controller
              name="wireTransaferRangeStart"
              rules={{
                ...bankValidationRules.rangeStart,
                required: wireTransfer
                  ? "Wire Transafer Range Start is required"
                  : false,
                validate: wireTransfer ? validateWireTransferStart : undefined,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Wire Transafer Range Start"
                  invalid={errors.wireTransaferRangeStart && true}
                  {...field}
                  disabled={!wireTransfer || !isEditing || false}
                />
              )}
            />
            {errors.wireTransaferRangeStart && wireTransfer && (
              <span className="text-danger">
                {errors.wireTransaferRangeStart.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Wire Transfer Range End
            </Label>
            <Controller
              name="wireTransaferRangeEnd"
              rules={{
                ...bankValidationRules.rangeEnd,
                required: wireTransfer
                  ? "Wire Transfer Range End is required"
                  : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter  Wire Transfer Range End"
                  invalid={errors.wireTransaferRangeEnd && true}
                  {...field}
                  disabled={!wireTransfer || !isEditing || false}
                />
              )}
            />
            {errors.wireTransaferRangeEnd && wireTransfer && (
              <span className="text-danger">
                {errors.wireTransaferRangeEnd.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Wire Transfer Copies
            </Label>
            <Controller
              name="wireTransferCopies"
              rules={{
                ...bankValidationRules.rangeCopies,
                required: wireTransfer
                  ? "Wire Transfer Copies is required"
                  : false,
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Wire Transfer Copies"
                  invalid={errors.wireTransferCopies && true}
                  {...field}
                  disabled={!wireTransfer || !isEditing || false}
                />
              )}
            />
            {errors.wireTransferCopies && wireTransfer && (
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
