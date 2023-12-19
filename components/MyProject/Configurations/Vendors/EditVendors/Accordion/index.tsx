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
import useSWR from "swr";
import { VendorsAddressTypes,PaymentOptions } from "@/constants/common";
import { LoaderButton } from "@/components/Loaders";
import { hasPermission } from "@/commonFunctions/functions";

function VendorAccordion() {
  const { reset } = useForm();
  const router = useRouter();
  const { id } = router.query;
  const [editMode,setEditMode] = useState(false);
  const [isLoading,setLoader] = useState(false);
  const vendorService = new VendorsService();
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
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: vendorData, error: fetchError } = useSWR(
    id ? ["STATE_DETAILS", id] : null,
    () => fetchVendorData(id)
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  const [activeStatus, setActiveStatus] = useState(vendorData?.IsActive);
  const setBasicInformation = (data) => {
    data.Name && setValue("vendorName", data.Name);
    data.Code && setValue("vendorCode", data.Code);

    const paymentType = PaymentOptions.find(type => type.value === data.PaymentType);
    data.PaymentType && setValue("paymentType", paymentType); //

    data.LegalName && setValue("legalName", data.LegalName);
    data.Email && setValue("vendorEmail", data.Email);
    // data.EntityID && setValue("entityType", data.EntityID);
    const vendorEntity = {
      value: data.EntityType.ID,
      label: data.EntityType.Name
    }
    setValue("entityType", vendorEntity)
    // data.DefaultAddress && setValue("defaultAddress", data.DefaultAddress);
    const defaultAddress = VendorsAddressTypes.find(el => el.value === data.DefaultAddress);
    setValue("defaultAddress", defaultAddress);
    const basicInfoCountry = {
      label: data.State?.Country?.Name,
      value: data.State?.Country?.Id
    }
    setValue('vendorcountry', basicInfoCountry);
    // data.State && setValue("workState", data.State); //
    const basicInfoState = {
      label: data.State?.Name,
      value: data.State?.Id
    }
    setValue('workState', basicInfoState)
    data.TaxID && setValue("taxId", data.TaxID);
    data.DefaultAccount && setValue("defaultAccount", data.DefaultAccount);
    data.AchRoutingNumber && setValue("achRoutingNumber", data.AchRoutingNumber);
    data.AchBankAccountNUmber &&
      setValue("achAccountNumber", data.AchBankAccountNUmber);
    data.PayeeName && setValue("payeeName", data.PayeeName);
    if (data.PrimaryContact) {
      const primaryContactData = data.PrimaryContact;
      setValue("contactName", primaryContactData.FirstName);
      setValue("contactNumber", primaryContactData.CellPhone);
      setValue("vendorEmail", primaryContactData.EmailID);
    }
    setActiveStatus(data.IsActive)
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
    data.State &&
      setValue("contactAddressState", {
        value: data.State.ID,
        label: data.State.Name,
      });
    data.Country && setValue("contactAddressCountry",{
      value : data.Country.ID,
      label : data.Country.Name
    })
    data.Zipcode && setValue("contactAddressPostalCode", data.Zipcode);
    data.CityName && setValue("contactAddressCity", data.CityName);
  };
  const setBillingAdress = (data) => {
    // key -  MailingAddress
    data.Line1 && setValue("billingAddress1", data.Line1);
    data.Line2 && setValue("billingAddress2", data.Line2);
    data.State &&
      setValue("billingAddressState", {
        value: data.State.ID,
        label: data.State.Name,
      });
    data.Country && setValue("billingAddressCountry",{
      value : data.Country.ID,
      label : data.Country.Name
    })
    data.Zipcode && setValue("billingAddressPostalCode", data.Zipcode);
    data.CityName && setValue("billingAddressCity", data.CityName);
  };
  const setMailingAdress = (data) => {
    // key -  BillingAddress
    data.Line1 && setValue("mailingAddress1", data.Line1);
    data.Line2 && setValue("mailingAddress2", data.Line2);
    data.State &&
      setValue("mailingAddressState", {
        value: data.State.ID,
        label: data.State.Name,
      });
    data.Country && setValue("mailingAddressCountry",{
      value : data.Country.ID,
      label : data.Country.Name
    })
    data.Zipcode && setValue("mailingAddressPostalCode", data.Zipcode);
    data.CityName && setValue("mailingAddressCity", data.CityName);
  };

  const onSubmit = (data) => {
    if (!vendorData) {
      toast.error("Data fetch failed");
      return;
    }
    setLoader(true);
    const contactAddressPaylaod = {
      cityName: data.contactAddressCity,
      countryID: data.contactAddressCountry?.value,
      line1: data.contactAddress1,
      line2: data.contactAddress2,
      stateID: data.contactAddressState?.value,
      zipcode: parseInt(data.contactAddressPostalCode),
    };
    const mailingAddressPaylaod = {
      "cityName": data.mailingAddressCity,
      "countryID": data.mailingAddressCountry?.value,
      "line1": data.mailingAddress1,
      "line2": data.mailingAddress2,
      "stateID": data.mailingAddressState?.value,
      "zipcode": parseInt(data.mailingAddressPostalCode)
    };
    const billingAddressPaylaod = {
      "cityName": data.billingAddressCity,
      "countryID": data.billingAddressCountry?.value,
      "line1": data.billingAddress1,
      "line2": data.billingAddress2,
      "stateID": data.billingAddressState?.value,
      "zipcode": parseInt(data.billingAddressPostalCode)
    }

    const vendorsPayload = {
      Name: data.vendorName,
      Code: data.vendorCode,
      PaymentType: data.paymentType.value,
      LegalName: data.legalName,
      Email: data.vendorEmail,
      EntityTypeID: parseInt(data.entityType.value),
      TaxID: data.taxId,
      PayeeName: data.payeeName,
      StateID: data.workState.value,
      PettyCashPCardEnabled: data.isPettyCashEnabled,
      PettyCashAccountID: data.pettyCashAccount,
      DefaultAccountID: data.defaultAccount?.value,
      DefaultAddress: data.defaultAddress.value,
      AchBankAccountNUmber: parseInt(data.achAccountNumber),
      AchRoutingNumber: parseInt(data.achRoutingNumber),
      IsActive : activeStatus,
      PrimaryAddress: contactAddressPaylaod,
      MailingAddress: mailingAddressPaylaod,
      BillingAddress: billingAddressPaylaod,
      PrimaryContact: {
        FirstName: data.contactName,
        CellPhone: data.contactNumber,
        EmailID: data.vendorEmail
      }
    }
    vendorService.editVendor(id, vendorsPayload).then(() => {
      toast.success("Vendor Edited successfully");
      reset();
      router.push('/configurations/vendors');
      setLoader(false);
    }).catch(error => {
      toast.error(error.Message || error.error || 'Unable to edit vendor');
      setLoader(false);
    });
  };

  return (
    <div>
      <div className="mt-4">
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
          <div className="d-flex me-2 align-items-center" style={{ gap: "10px" }}>
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
            {hasEditConfigurationPermission && (
              <LoaderButton
                buttonText={editMode ? "Save" : "Edit"}
                isLoading={isLoading}
                handleClick={() => {
                  if (!editMode) {
                    setEditMode(true);
                    return;
                  }
                  handleSubmit(onSubmit)();
                }}
              />
            )}
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
                onSubmit={onSubmit}
                errors={errors}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
                editMode={editMode}
                setValue={setValue}
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
                editMode={editMode}
                setValue={setValue}
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
                editMode={editMode}
                setValue={setValue}
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
                editMode={editMode}
                setValue={setValue}
              />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default VendorAccordion;
