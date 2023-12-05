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
import AddressService from "services/address.service";
function VendorAccordion() {
  const { reset } = useForm();

  const [open, setOpen] = useState("1");
   
  const vendorService = new VendorsService();
  const addressService = new AddressService();
  const toggle = (id) => {
    if (open === id) {
      reset();
      setOpen(""); // Close the accordion if it's already open
    } else {
      setOpen(id);
    }
  };

  const onSubmit = (data) => {
    const contactAddressPaylaod = {
      cityName: data.contactAddressCity,
      countryID: data.contactAddressState.countryId,
      line1: data.contactAddress1,
      line2: data.contactAddress2,
      stateID: data.contactAddressState.value,
      zipcode: parseInt(data.contactAddressPostalCode),
    };
    const mailingAddressPaylaod = {
      "cityName": data.mailingAddressCity,
      "countryID": data.mailingAddressState.countryId,
      "line1": data.mailingAddress1,
      "line2":data.mailingAddress2,
      "stateID": data.mailingAddressState.value,
      "zipcode": parseInt(data.mailingAddressPostalCode)
    };
    const billingAddressPaylaod = {
      "cityName": data.billingAddressCity,
      "countryID": data.billingAddressState.countryId,
      "line1": data.billingAddress1,
      "line2":data.billingAddress2,
      "stateID": data.billingAddressState.value,
      "zipcode": parseInt(data.billingAddressPostalCode)
    }


    


  
    addressService.createAddress(contactAddressPaylaod)//contact address
    .then(res=>{
      const contactAddressID = res.ID;
      addressService.createAddress(mailingAddressPaylaod)//mailing address
      .then(res=>{
        const mailingAddressID = res.ID;
        addressService.createAddress(billingAddressPaylaod)//billing address
        .then(res=>{
          const billingAddressID = res.ID;
          const backendFormat = {
            Name: data.vendorName,
            TaxID: data.taxId,
            PaymentType: data.paymentType?.value,
            PayeeName: data.payeeName,
            PettyCashCustodianAccountID : null,
            PettyCashPCardAccountID : null,
            Code : data.vendorCode,
            StateID : parseInt(data.workState.value),
            Email : data.vendorEmail,
            // PettyCashPCardEnabled
            PettyCashAccountID : null,
            // AliasName
            // PettyCashCustodian
            LegalName : data.legalName,
            // Description
            EntityID : parseInt(data.entityType),
            // TaxCodeID
            // BankAchID
            PrimaryAddressID : contactAddressID,
            MailingAddressID : mailingAddressID,
            BillingAddressID : billingAddressID,
            DefaultAccount : data.defaultAccount,
            DefaultAddress : data.defaultAddress,
            AchBankAccountNUmber : parseInt(data.achAccountNumber),
            AchRoutingNumber : parseInt(data.achRoutingNumber),
            // PrimaryContactID
            // SecondaryContactID
            // ParentID
          };

                vendorService
                  .createVendor(backendFormat)
                  .then(() => {
                    toast.success("Vendor Added successfully");
                    // reset();
                    router.back();
                  })
                  .catch((error) => {
                    toast.error(error?.error);
                  });
              });
          });
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  const router = useRouter();

  const {
    control,
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
