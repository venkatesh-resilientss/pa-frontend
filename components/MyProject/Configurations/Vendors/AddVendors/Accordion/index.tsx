import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
} from "reactstrap";
import BasicDetailsForm from "./BasicDetailsForm";
import ContactAddressForm from "./ContactAddress";
import MailingAddressForm from "./MailingAddress";
import BillingAddressForm from "./BillingAddress";
import { useForm } from "react-hook-form";
import { VendorsService } from "services";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function VendorAccordion() {
  const { reset } = useForm();

  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      reset();
      setOpen(""); // Close the accordion if it's already open
    } else {
      setOpen(id);
    }
  };

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      Name: data.vendorName,
      TaxID: data.taxId,
      PaymentType: data.paymentType?.value,
      PayeeName: data.payeeName,
      // PettyCashCustodianAccountID
      // PettyCashPCardAccountID
      // PettyCashPCardEnabled
      // PettyCashAccountID
      // AliasName
      // PettyCashCustodian
      // LegalName
      // Description
      // WorkStateID
      // EntityID
      // TaxCodeID
      // BankAchID
      // PrimaryAddressID
      // MailingAddressID
      // BillingAddressID
      // PrimaryContactID
      // SecondaryContactID
      // ParentID
    };

    VendorsService.create(backendFormat)
      .then((res) => {
        toast.success("Vendor Added successfully");
        // reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  const router = useRouter();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="mt-4">
        <div
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          All Vendors
        </div>
        <div className="d-flex justify-content-between">
          <div
            className="text-black"
            style={{ fontSize: "32px", fontWeight: "600" }}
          >
            Add New Vendor
          </div>
          <div className="d-flex me-2 " style={{ gap: "10px" }}>
              <a href="#" onClick={() => router.back()} className='text-decoration-none text-secondary m-2'>Dismiss</a>
            <Button
              onClick={handleSubmit(onSubmit)}
              color="primary" className="px-3 p-2" >
              Save
            </Button>
          </div>
        </div>
      </div>

      <hr style={{ height: "2px" }} />
      <div className="m-2">
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">Basic Information</AccordionHeader>
            <AccordionBody accordionId="1">
              <BasicDetailsForm
                control={control}
                watch={watch}
                onSubmit={onSubmit}
                errors={errors}
              />
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="2">Contact Address</AccordionHeader>
            <AccordionBody accordionId="2">
              <ContactAddressForm
                control={control}
                watch={watch}
                onSubmit={onSubmit}
                errors={errors}
              />{" "}
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="3">Mailing Address</AccordionHeader>
            <AccordionBody accordionId="3">
              <MailingAddressForm
                control={control}
                watch={watch}
                onSubmit={onSubmit}
                errors={errors}
              />
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="4">Billing Address</AccordionHeader>
            <AccordionBody accordionId="4">
              <BillingAddressForm
                control={control}
                watch={watch}
                onSubmit={onSubmit}
                errors={errors}
              />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default VendorAccordion;
