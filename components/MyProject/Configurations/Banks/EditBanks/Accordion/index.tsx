import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
} from "reactstrap";
import BasicDetailsForm from "./BasicDetailsForm";
import ContactAddressForm from "./DefaultAccount";
import MailingAddressForm from "./MailingAddress";
import BillingAddressForm from "./PhysicalAddress";
import { useForm } from "react-hook-form";
import { BankService, VendorsService } from "services";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PhysicalAddressForm from "./PhysicalAddress";
import DefaultAccountForm from "./DefaultAccount";
import OtherDetailsForm from "./OtherDetails";
import CheckEFTForm from "./CheckEftForm";
import { checkTenant } from "constants/function";

function BankAccordion({ id }) {
  const { reset } = useForm();
   

  const [open, setOpen] = useState("");
  const bankService = new BankService();
  const toggle = (id) => {
    if (open === id) {
      reset();
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      Name: data.bankName,
      Code: data.bankCode,
      AccountNumber: data.accountNumber,
      RoutingNumber: data.routingNumber,
      Description: data.description,
      Fax: data.fax,
      // CountryID:
      CurrencyID: data.currency?.value,
      // PhysicalAddressID:
      // MailingAddressID:
      // PrimaryContactID:
      // SecondaryContactID:
    };

    bankService
      .editBank(id, backendFormat)
      .then((res) => {
        toast.success("Bank Edited successfully");
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
        All Banks
      </div>
      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Edit Bank
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
            <AccordionHeader targetId="2">Physical Address</AccordionHeader>
            <AccordionBody accordionId="2">
              <PhysicalAddressForm
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
            <AccordionHeader targetId="4">
              Check/EFT/Wiretransfer Details
            </AccordionHeader>
            <AccordionBody accordionId="4">
              <CheckEFTForm
                control={control}
                watch={watch}
                onSubmit={onSubmit}
                errors={errors}
              />
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="5">Default Account</AccordionHeader>
            <AccordionBody accordionId="5">
              <DefaultAccountForm
                control={control}
                watch={watch}
                onSubmit={onSubmit}
                errors={errors}
              />
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="6">Other Details</AccordionHeader>
            <AccordionBody accordionId="6">
              <OtherDetailsForm
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

export default BankAccordion;
