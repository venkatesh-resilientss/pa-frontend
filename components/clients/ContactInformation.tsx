import React, { useState } from "react";

import FormFields from "@/components/clients/FormFields";

export default function ContactInformation(props) {
  const { step } = props;
  const [err, setErr] = useState(false);
  const primaryFields = [
    {
      lb: "Name",
      ph: "Enter POC Name",
      typ: "text",
      vl: "Company.PrimaryContact.FullName",
      err: "",
    },
    {
      lb: "Title",
      ph: "Enter Role",
      typ: "text",
      vl: "Company.PrimaryContact.Title",
      err: "",
    },
    {
      lb: "Office Phone",
      ph: "Enter Phone Number",
      typ: "text",
      vl: "Company.PrimaryContact.OfficePhone",
      err: "",
    },
    {
      lb: "Cell Phone",
      ph: "Enter Mobile Number",
      typ: "phone",
      vl: "Company.PrimaryContact.CellPhone",
      err: "",
    },
    {
      lb: "Email",
      ph: "Enter Email ID",
      typ: "text",
      vl: "Company.PrimaryContact.EmailID",
      err: "Enter Email ID",
    },
  ];

  const invoiceFields = [
    {
      lb: "Name",
      ph: "Enter POC Name",
      typ: "text",
      vl: "Company.SecondaryContact.FullName",
      err: "",
    },
    {
      lb: "Title",
      ph: "Enter Role",
      typ: "text",
      vl: "Company.SecondaryContact.Title",
      err: "",
    },
    {
      lb: "Office Phone",
      ph: "Enter Phone Number",
      typ: "text",
      vl: "Company.SecondaryContact.OfficePhone",
      err: "",
    },
    {
      lb: "Cell Phone",
      ph: "Enter Mobile Number",
      typ: "phone",
      vl: "Company.SecondaryContact.CellPhone",
      err: "",
    },
    {
      lb: "Email",
      ph: "Enter Email ID",
      typ: "text",
      vl: "Company.SecondaryContact.EmailID",
      err: "",
    },
  ];

  const primaryProps = { ...props, fields: primaryFields };
  const invoiceProps = { ...props, fields: invoiceFields };

  if (step !== 3) return <></>;
  return (
    <div>
      <p className="text-black f-20 fw-600">Primary Contact Information</p>
      <FormFields {...primaryProps} {...{ err, setErr }} hideBtns={true} />

      <p className="text-black f-20 fw-600">Secondary Contact Information</p>

      <FormFields
        {...invoiceProps}
        {...{ err, setErr }}
        validate={primaryFields}
      />
    </div>
  );
}
