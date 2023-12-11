import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
} from "reactstrap";
import BasicDetailsForm from "./BasicDetailsForm";
import MailingAddressForm from "./MailingAddress";
import { useForm } from "react-hook-form";
import { BankService } from "services";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PhysicalAddressForm from "./PhysicalAddress";
import DefaultAccountForm from "./DefaultAccount";
import OtherDetailsForm from "./OtherDetails";
import CheckEFTForm from "./CheckEftForm";
import { getSessionVariables } from "@/constants/function";

function BankAccordion() {
  const { reset } = useForm();

  const [open, setOpen] = useState("");
  const [eft, setEft] = useState(false);
  const [positivePay, setPositivePay] = useState(false);
  const [ACHExport, setACHExport] = useState(false);
  const bankService = new BankService();
  // const addressService = new AddressService();
  const toggle = (id) => {
    if (open === id) {
      reset();
      setOpen(""); // Close the accordion if it's already open
    } else {
      setOpen(id);
    }
  };

  const onSubmit = (data) => {
    const { clientID, projectID } = getSessionVariables();
    const bankPayload: any = {
      Name: data.bankName,
      Code: data.bankCode,
      AccountNumber: parseInt(data.accountNumber),
      RoutingNumber: parseInt(data.routingNumber),
      Description: data.description,
      Fax: data.mailingFax,
      BranchNumber: parseInt(data.branchNumber),
      ClientId: clientID,
      projectId: projectID,
      AccountFraction: data.accountFraction,
      PrimaryContact: {
        // "FullName": "john philips",
        PhoneCode: parseInt(data.basicInfoCountryCode),
        CellPhone: data.basicInfoContactNumber,
        EmailID: data.emailIDBasicInfo
      },
      PhysicalAddress: {
        Line1: data.physicalAddress1,
        Line2: data.physicalAddress2,
        CityName: data.physicalAddressCity,
        StateId: parseInt(data.physicalAddressState.value),
        CountryId: parseInt(data.physicalAddressState.country.ID),
        Zipcode: parseInt(data.physicalAddressPostalCode),
      },
      MailingAddress: {
        Line1: data.mailingAddress1,
        Line2: data.mailingAddress2,
        CityName: data.mailingAddressCity,
        StateId: parseInt(data.mailingAddressState.value),
        CountryId: parseInt(data.mailingAddressState.country.ID),
        Zipcode: parseInt(data.mailingAddressPostalCode),
        ContactPhone: data.mailingPhoneNumber,
        ContactPhoneCode: data.mailingCountryCode,
        ContactEmailID: data.mailingEmail,
      },
      Meta: {
        BankAch: [],
        BankConfig: {
          CheckCopies: parseInt(data.checkCopies),
          WireTransferRangeStart: parseInt(data.wireTransaferRangeStart),
          WireTransferRangeEnd: parseInt(data.wireTransaferRangeEnd),
          WireTransferCopies: parseInt(data.wireTransferCopies),
          CheckRangeStart: parseInt(data.checkRangeStart),
          CheckRangeEnd: parseInt(data.checkRangeEnd),
          EftRangeStart: parseInt(data.ACHeftRangeStart),
          EftRangeEnd: parseInt(data.ACHeftRangeEnd),
          EftCopies: parseInt(data.ACHeftCopies),
          // PositivePayEftRangeStart: parseInt(data.PPeftRangeStart),
          // PositivePayEftRangeEnd: parseInt(data.PPeftRangeEnd),
          // PositivePayEftCopies: parseInt(data.PPeftCopies),
        },
      },
      SeriesId: parseInt(data.series.value),
      SetId: parseInt(data.set.value),
      LocationId: parseInt(data.location.value),
      CurrencyId: parseInt(data.currency.value),
      CountryId: parseInt(data.physicalAddressState.country.ID),
      // PrimaryContactId: 1,
      // SecondaryContactId: 1,
      DefaultAmountCash: parseFloat(data.defaultAccountCash),
      DefaultAccountClearing: parseFloat(data.defaultAccountClearing),
      DefaultAccountDiscount: parseFloat(data.defaultAccountDiscount),
      DefaultAccountDeposit: parseInt(data.defaultAccountDeposit),
    };
    if (eft) {
      if (ACHExport) {
        const achExportPayload = {
          Host: data.ACHhost,
          Username: data.ACHuserName,
          Password: data.ACHpassword,
          InboundPath: data.ACHinboundPath,
          OutboundPath: data.ACHoutboundPath,
          DataFormat: data.ACHdataFormat.value,
          Certificate: data.ACHcertificate,
          // Port: 1234,
          Type: "ACH",
        };
        bankPayload.Meta.BankAch.push(achExportPayload);
      }
      if (positivePay) {
        const positivepayPayload = {
          Host: data.PPhost,
          Username: data.PPuserName,
          Password: data.PPpassword,
          // "InboundPath": " PositivePay your_inbound_path_here",
          OutboundPath: data.PPoutboundPath,
          DataFormat: data.PPdataFormat.value,
          Certificate: data.PPcertificate,
          Port: parseInt(data.PPport),
          Type: "PositivePay",
        };
        bankPayload.Meta.BankAch.push(positivepayPayload);
      }
    }

    bankService
      .createBank(bankPayload)
      .then(() => {
        toast.success("Bank created successfully");
        router.back();
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
        All Banks
      </div>
      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Add New Bank
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
            <AccordionHeader targetId="2">Physical Address</AccordionHeader>
            <AccordionBody accordionId="2">
              <PhysicalAddressForm
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
            <AccordionHeader targetId="4">
              Check/EFT/Wiretransfer Details
            </AccordionHeader>
            <AccordionBody accordionId="4">
              <CheckEFTForm
                control={control}
                onSubmit={onSubmit}
                errors={errors}
                {...{
                  eft,
                  setEft,
                  positivePay,
                  setPositivePay,
                  ACHExport,
                  setACHExport,
                }}
              />
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="5">Default Account</AccordionHeader>
            <AccordionBody accordionId="5">
              <DefaultAccountForm
                control={control}
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
