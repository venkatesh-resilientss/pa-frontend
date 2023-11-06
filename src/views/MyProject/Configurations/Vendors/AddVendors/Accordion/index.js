import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import BasicDetailsForm from "./BasicDetailsForm";
import ContactAddressForm from "./ContactAddress";
import MailingAddressForm from "./MailingAddress";
import BillingAddressForm from "./BillingAddress";

function VendorAccordion(props) {
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <div>
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">Basic Information</AccordionHeader>
          <AccordionBody accordionId="1">
            <BasicDetailsForm />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="2">Contact Address</AccordionHeader>
          <AccordionBody accordionId="2">
            <ContactAddressForm />{" "}
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="3">Mailing Address</AccordionHeader>
          <AccordionBody accordionId="3">
            <MailingAddressForm />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="4">Billing Address</AccordionHeader>
          <AccordionBody accordionId="4">
            <BillingAddressForm />
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default VendorAccordion;
