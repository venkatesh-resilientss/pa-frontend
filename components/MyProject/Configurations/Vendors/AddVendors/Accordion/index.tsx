import React, { useState, useEffect } from "react";
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
import { checkTenant } from "constants/function";

function VendorAccordion() {
  const { reset } = useForm();

  const [open, setOpen] = useState("");
   
  const vendorService = new VendorsService();

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

    vendorService
      .createVendor(backendFormat)
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
          <Button
            onClick={() => router.back()}
            style={{
              fontSize: "14px",
              fontWeight: "400",
              height: "34px",
              backgroundColor: "transparent",
              color: "#2D2C2C",
              border: "none",
            }}
          >
            Dismiss
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            color="primary"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              height: "34px",
            }}
          >
            Save
          </Button>
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
