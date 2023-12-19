import React, { useEffect, useState } from "react";
import { Accordion } from "reactstrap";
import { AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "react-bootstrap-button-loader";

import { getSessionVariables } from "@/constants/function";
import { BasicDetails, MailingAddress } from "@/components/banks";
import { PhysicalAddress, DefaultAccount } from "@/components/banks";
import { OtherDetails, CheckEFT } from "@/components/banks";

import { BankService } from "services";

const bankService = new BankService();

export default function BankAccordion({ router }) {
  const [steps, setSteps] = useState<any>([
    { name: "Basic Information", toggle: true },
    { name: "Physical Address", toggle: false },
    { name: "Mailing Address", toggle: false },
    { name: "Check/EFT/Wiretransfer Details", toggle: false },
    { name: "Default Accounts", toggle: false },
    { name: "Set/Series/Location Information", toggle: false },
  ]);

  const { control, handleSubmit, formState, watch, trigger, setValue } =
    useForm();
  const { errors, isSubmitted } = formState;

  const [eft, setEft] = useState(false);
  const [positivePay, setPositivePay] = useState(false);
  const [ACHExport, setACHExport] = useState(false);
  const [loading, setLoading] = useState(false);

  const [wireTransfer, setWireTransfer] = useState(false);
  const [check, setCheck] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    const { clientID, projectID } = getSessionVariables();
    const primaryContactPhone =
      data.basicInfoCountryCode && data.basicInfoContactNumber
        ? `${data.basicInfoCountryCode}-${data.basicInfoContactNumber}`
        : null;
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
        setLoading(false);
        toast.success("Bank created successfully");
        router.back();
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.error || error?.Message || "Unable to add Bank");
      });
  };

  useEffect(() => {
    if (isSubmitted)
      setSteps([...steps].map((el) => ({ name: el.name, toggle: true })));
  }, [isSubmitted]);

  const isEditing = true;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between">
        <div>
          <div className="text-black fw-600">All Banks</div>
          <div className="f-32 fw-600">Add New Bank</div>
        </div>

        <div className="my-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn f-14"
          >
            Dismiss
          </button>
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
      <hr />

      {steps.map((e, id) => (
        <Accordion
          open={String(e.toggle)}
          toggle={() =>
            setSteps(
              [...steps].map((el) =>
                el.name === e.name ? { name: el.name, toggle: !el.toggle } : el
              )
            )
          }
          key={id}
          className="bank-accordion border-bottom"
        >
          <AccordionItem>
            <AccordionHeader targetId={"true"}>{e.name}</AccordionHeader>
            <AccordionBody accordionId={"true"}>
              {e.name === "Basic Information" ? (
                <BasicDetails {...{ control, onSubmit, errors, isEditing }} />
              ) : e.name === "Physical Address" ? (
                <PhysicalAddress
                  {...{ control, onSubmit, errors, isEditing }}
                />
              ) : e.name === "Mailing Address" ? (
                <MailingAddress {...{ control, onSubmit, errors, isEditing }} />
              ) : e.name === "Check/EFT/Wiretransfer Details" ? (
                <CheckEFT
                  {...{ eft, setEft, control, onSubmit, errors }}
                  {...{ watch, trigger, setValue, isSubmitted, isEditing }}
                  {...{ positivePay, setPositivePay, ACHExport, setACHExport }}
                  {...{ wireTransfer, setWireTransfer, check, setCheck }}
                />
              ) : e.name === "Default Accounts" ? (
                <DefaultAccount {...{ control, onSubmit, errors, isEditing }} />
              ) : (
                e.name === "Set/Series/Location Information" && (
                  <OtherDetails
                    {...{ control, onSubmit, errors, isEditing }}
                    edit={false}
                  />
                )
              )}
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
