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
import AddressService from "services/address.service";
import useSWR from 'swr'

function VendorAccordion() {
  const { reset } = useForm();
  const router = useRouter();
  const { id } = router.query;
  const vendorService = new VendorsService();
  const addressService = new AddressService();
  const [open, setOpen] = useState("1");
  const fetchVendorData = (id) => vendorService.getVendorDetails(id);
  const toggle = (id) => {
    if (open === id) {
      reset();
      setOpen(""); // Close the accordion if it's already open
    } else {
      setOpen(id);
    }
  };
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: vendorData, error: fetchError } = useSWR(
    id ? ["STATE_DETAILS", id] : null,
    () => fetchVendorData(id)
  );

  const setBasicInformation = (data) => {
    data.Name && setValue("vendorName", data.Name);
    data.Code && setValue("vendorCode", data.Code);
    data.PaymentType && setValue("paymentType", data.PaymentType); //
    data.LegalName && setValue("legalName", data.LegalName);
    data.Email && setValue('vendorEmail',data.Email);
    data.EntityID && setValue("entityType", data.EntityID);
    data.DefaultAddress && setValue('defaultAddress',data.DefaultAddress)
    data.State && setValue("workState", data.State); //
    // console.log({state : data.State});
    data.TaxID && setValue("taxId", data.TaxID);
    data.DefaultAccount && setValue('defaultAccount',data.DefaultAccount)
    data.AchRoutingNumber &&  setValue('routingNumber',data.AchRoutingNumber)
    data.AchBankAccountNUmber && setValue('achAccountNumber',data.AchBankAccountNUmber)
    data.PayeeName && setValue("payeeName", data.PayeeName);
  };

  useEffect(() => {
    if (vendorData) {
      setBasicInformation(vendorData);
      if (vendorData.PrimaryAddress)
        setContactAddress(vendorData.PrimaryAddress);
      if (vendorData.MailingAddress)
        setMailingAdress(vendorData.MailingAddress);
      if (vendorData.BillingAddress)
        setBillingAdress(vendorData.BillingAddress);
    }
  }, [vendorData]);
  useEffect(() => {
    if (fetchError) toast.error(fetchError);
  }, [fetchError]);
  

  const setContactAddress = (data) => {
    // key -  PrimaryAddress
    data.Line1 && setValue("contactAddress1", data.Line1);
    data.Line2 && setValue("contactAddress2", data.Line2);
    data.State && setValue("contactAddressState", {value : data.State.ID , label : data.State.Name});
    data.Zipcode && setValue("contactAddressPostalCode", data.Zipcode);
    data.CityName && setValue('contactAddressCity',data.CityName)
  };
  const setBillingAdress = (data) => {
    // key -  MailingAddress
    data.Line1 && setValue("billingAddress1", data.Line1);
    data.Line2 && setValue("billingAddress2", data.Line2);
    data.State && setValue("billingAddressState", {value : data.State.ID, label : data.State.Name});
    data.Zipcode && setValue("billingAddressPostalCode", data.Zipcode);
    data.CityName && setValue('billingAddressCity',data.CityName)
  };
  const setMailingAdress = (data) => {
    // key -  BillingAddress
    data.Line1 && setValue("mailingAddress1", data.Line1);
    data.Line2 && setValue("mailingAddress2", data.Line2);
    data.State && setValue("mailingAddressState", {value : data.State.ID, label : data.State.Name});
    data.Zipcode && setValue("mailingAddressPostalCode", data.Zipcode);
    data.CityName && setValue('mailingAddressCity',data.CityName)
  };

  const onSubmit = (data) => {
    if(!vendorData){
      toast.error('Data fetch failed');
      return
    }
    const contactAddressID = vendorData.PrimaryAddressID;
    const mailingAddressID = vendorData.MailingAddressID;
    const billingAddressID = vendorData.BillingAddressID;

    let backendFormat;
    const contactAddressPaylaod = {
      cityName: data.contactAddressCity,
      countryID: data.contactAddressState.countryId,
      line1: data.contactAddress1,
      line2: data.contactAddress2,
      stateID: data.contactAddressState.value,
      zipcode: parseInt(data.contactAddressPostalCode),
    };
    const mailingAddressPaylaod = {
      cityName: data.mailingAddressCity,
      countryID: data.mailingAddressState.countryId,
      line1: data.mailingAddress1,
      line2: data.mailingAddress2,
      stateID: data.mailingAddress2.value,
      zipcode: parseInt(data.mailingAddressPostalCode),
    };
    const billingAddressPaylaod = {
      cityName: data.billingAddressCity,
      countryID: data.billingAddressState.countryId,
      line1: data.billingAddress1,
      line2: data.billingAddress2,
      stateID: data.billingAddressState.value,
      zipcode: parseInt(data.billingAddressPostalCode),
    };

    addressService
      .updateAddress(contactAddressID,contactAddressPaylaod) //contact address
      .then((res) => {
        addressService
          .updateAddress(mailingAddressID,mailingAddressPaylaod) //mailing address
          .then((res) => {
            addressService
              .updateAddress(billingAddressID,billingAddressPaylaod) //billing address
              .then((res) => {
                backendFormat = {
                  Name: data.vendorName,
                  TaxID: data.taxId,
                  PaymentType: data.paymentType?.value,
                  PayeeName: data.payeeName,
                  PettyCashCustodianAccountID: parseInt(
                    data.pettyCashCustodianAccountID
                  ),
                  PettyCashPCardAccountID: parseInt(
                    data.pettyCashPCardAccountID
                  ),
                  // PettyCashPCardEnabled
                  PettyCashAccountID: parseInt(data.pettyCashAccountID),
                  // AliasName
                  // PettyCashCustodian
                  // LegalName
                  // Description
                  WorkStateID: parseInt(data.workState?.value),
                  EntityID: parseInt(data.entityType),
                  // TaxCodeID
                  // BankAchID
                  PrimaryAddressID: contactAddressID,
                  MailingAddressID: mailingAddressID,
                  BillingAddressID: billingAddressID,
                  // PrimaryContactID
                  // SecondaryContactID
                  // ParentID
                };

                vendorService
                  .editVendor(id,backendFormat)
                  .then((res) => {
                    toast.success("Vendor updated successfully");
                    // reset();
                    // router.back();
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

  return (
    <div>
      <div>
        {" "}
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
            Edit Vendor
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
