import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
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
import Button from "react-bootstrap-button-loader";

function BankAccordion() {
  const { reset } = useForm();

  const [open, setOpen] = useState("");
  const [eft, setEft] = useState(false);
  const [positivePay, setPositivePay] = useState(false);
  const [ACHExport, setACHExport] = useState(false);
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    const { clientID, projectID } = getSessionVariables();
    const primaryContactPhone = `${data.basicInfoCountryCode}-${data.basicInfoContactNumber}`
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
        FirstName: data.contactName,
        // PhoneCode: parseInt(data.basicInfoCountryCode),
        CellPhone: primaryContactPhone,
        EmailID: data.emailIDBasicInfo,
      },
      PhysicalAddress: {
        Line1: data?.physicalAddress1,
        Line2: data?.physicalAddress2,
        CityName: data?.physicalAddressCity,
        StateId: parseInt(data?.physicalAddressState?.value),
        CountryId: parseInt(data?.physicalAddressState?.country?.ID),
        Zipcode: parseInt(data?.physicalAddressPostalCode),
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
      SeriesId: parseInt(data.series?.value),
      SetId: parseInt(data.set?.value),
      LocationId: parseInt(data.location?.value),
      CurrencyId: parseInt(data.currency?.value),
      CountryId: parseInt(data.physicalAddressState?.country?.ID),
      // PrimaryContactId: 1,
      // SecondaryContactId: 1,
      DefaultAmountCash: parseInt(data.defaultAccountCash?.value),
      DefaultAccountClearing: parseInt(data.defaultAccountClearing?.value),
      DefaultAccountDiscount: parseInt(data.defaultAccountDiscount?.value),
      DefaultAccountDeposit: parseInt(data.defaultAccountDeposit?.value),
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
        setLoading(false)
        toast.success("Bank created successfully");
        router.back();
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error?.error || error?.Message || "Unable to add Bank");
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
          <a
            href="#"
            onClick={() => router.back()}
            className="text-decoration-none text-secondary m-2"
          >
            Dismiss
          </a>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="px-3 py-2"
            spinColor="#ffffff"
            onClick={handleSubmit(onSubmit)}
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
            <AccordionHeader targetId="5">Default Accounts</AccordionHeader>
            <AccordionBody accordionId="5">
              <DefaultAccountForm
                control={control}
                onSubmit={onSubmit}
                errors={errors}
              />
            </AccordionBody>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader targetId="6">
              Set/Series/Location Information
            </AccordionHeader>
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
