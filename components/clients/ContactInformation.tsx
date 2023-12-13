import React, { useEffect, useState } from "react";

import FormFields from "@/components/clients/FormFields";
import { inFields, prFields } from "@/commonData";

export default function ContactInformation(props) {
  const { step, errors } = props;

  useEffect(() => {
    if (errors) setErr(errors);
  }, [errors]);

  const [err, setErr] = useState(false);
  const primaryFields = [...prFields];

  const invoiceFields = [...inFields];

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
