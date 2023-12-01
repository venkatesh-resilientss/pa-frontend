import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import BasicDetailsForm from "./BasicDetailsForm";
import ContactInformationForm from "./ContactInformationForm";
import WorkSpaceForm from "./WorkSpaceForm";
import ProjectDetailsForm from "./ProjectDetailsForm";
import SignatoryDetailsForm from "./SignatoryDetailsForm";
import AccountingInformationForm from "./AccountingInformationForm";
import AgreementsForm from "./AggrementsForm";
import FeesForm from "./FeesForm";
import SoftwaresForm from "./SoftwaresForm";
import HandlingFeeForm from "./HandlingFeeForm";

function ProjectAccordion({ control, errors }) {
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      setOpen("");
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
            <BasicDetailsForm control={control} errors={errors} />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="2">Contact Information</AccordionHeader>
          <AccordionBody accordionId="2">
            <ContactInformationForm control={control} errors={errors} />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="3">Workspace</AccordionHeader>
          <AccordionBody accordionId="3">
            <WorkSpaceForm control={control} errors={errors}/>
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="4">Project Details</AccordionHeader>
          <AccordionBody accordionId="4">
            <ProjectDetailsForm />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="5">Signatory Details</AccordionHeader>
          <AccordionBody accordionId="5">
            <SignatoryDetailsForm control={control} errors={errors} />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="6">
            Accounting Information (For Internal Usage Only)
          </AccordionHeader>
          <AccordionBody accordionId="6">
            <AccountingInformationForm control={control} errors={errors} />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="7">Softwares</AccordionHeader>
          <AccordionBody accordionId="7">
            <SoftwaresForm />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="8">Fees</AccordionHeader>
          <AccordionBody accordionId="8">
            <FeesForm control={control} errors={errors} />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="9">Handling Fee</AccordionHeader>
          <AccordionBody accordionId="9">
            <HandlingFeeForm />
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="10">Agreements</AccordionHeader>
          <AccordionBody accordionId="10">
            <AgreementsForm />
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ProjectAccordion;
