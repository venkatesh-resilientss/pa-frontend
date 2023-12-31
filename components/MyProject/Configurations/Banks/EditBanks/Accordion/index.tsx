import React, { useState, useEffect } from "react";
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
import { SeriesService, LocationsService } from "services";
import { SetsService } from "services";
import { COAAccountsService } from "services";
import Button from "react-bootstrap-button-loader";
const coaAccountsService = new COAAccountsService();

const seriesService = new SeriesService();
const setService = new SetsService();

function BankAccordion() {
  const router = useRouter();
  const [eft, setEft] = useState(false)
  const [positivePay, setPositivePay] = useState(false)
  const [ACHExport, setACHExport] = useState(false);
  const [wireTransfer, setWireTransfer] = useState(false);
  const [check, setCheck] = useState(false)

  const DataFormatOptions = [
    { label: "JSON", value: "json" },
    { label: "XML", value: "xml" },
    { label: "CSV", value: "csv" },
  ]


  const { reset } = useForm();
  const BankId = router.query.id;

  const [open, setOpen] = useState("1");
  const [bankDetails, setBankDetails]: any = useState();
  const [bankConfigDetails, setBankConfigDetails]: any = useState();
  const [bankAchDetails, setBankAchDetails]: any = useState();
  const [loading, setLoading]: any = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);
  const bankService = new BankService();

  const locationService = new LocationsService();

  const toggle = (id) => {
    if (open === id) {
      reset();
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  const onSubmit = (data) => {
    setLoading(true)
    const clientId = parseInt(localStorage.getItem("clientid"));
    const projectId = parseInt(localStorage.getItem("projectid"));
    const primaryContactPhone = `${data.basicInfoCountryCode}-${data.basicInfoContactNumber}`
    const bankPayload: any = {
      Name: data.bankName,
      Code: data.bankCode,
      AccountNumber: parseInt(data.accountNumber),
      RoutingNumber: parseInt(data.routingNumber),
      Description: data.description,
      Fax: data.mailingFax,
      BranchNumber: parseInt(data.branchNumber),
      ClientId: clientId,
      projectId: projectId,
      IsActive: activeStatus,
      PrimaryContact: {
        FullName: data.contactName,
        // PhoneCode: parseInt(data.basicInfoCountryCode),
        CellPhone: primaryContactPhone,
        EmailID: data.emailIDBasicInfo
      },
      PhysicalAddress: {
        Line1: data?.physicalAddress1,
        Line2: data?.physicalAddress2,
        CityName: data?.physicalAddressCity,
        StateId: parseInt(data?.physicalAddressState?.value),
        CountryId: parseInt(data?.physicalAddressState?.country.ID),
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
        }
      },
      SeriesId: parseInt(data?.series?.value),
      SetId: parseInt(data?.set?.value),
      LocationId: parseInt(data?.location?.value),
      CurrencyId: parseInt(data?.currency?.value),
      CountryId: parseInt(data?.physicalAddressState?.country?.ID),
      DefaultAmountCash: parseFloat(data.defaultAccountCash),
      DefaultAccountClearing: parseFloat(data.defaultAccountClearing),
      DefaultAccountDiscount: parseFloat(data.defaultAccountDiscount),
      DefaultAccountDeposit: parseInt(data.defaultAccountDeposit),
    }
    if (eft) {
      if (ACHExport) {
        const achExportPayload = {
          id: data.ID,
          Host: data.ACHhost,
          Username: data.ACHuserName,
          Password: data.ACHpassword,
          InboundPath: data.ACHinboundPath,
          OutboundPath: data.ACHoutboundPath,
          DataFormat: data.ACHdataFormat.value,
          Certificate: data.ACHcertificate,
          Type: "ACH"
        }
        bankPayload.Meta.BankAch.push(achExportPayload)
      }
      if (positivePay) {
        const positivepayPayload = {
          Host: data.PPhost,
          Username: data.PPuserName,
          Password: data.PPpassword,
          OutboundPath: data.PPoutboundPath,
          DataFormat: data.PPdataFormat.value,
          Certificate: data.PPcertificate,
          Port: parseInt(data.PPport),
          Type: "PositivePay"
        }
        bankPayload.Meta.BankAch.push(positivepayPayload)
      }

    }

    bankService
      .editBank(BankId, bankPayload)
      .then(() => {
        toast.success("Bank details updated successfully");
        setLoading(false)
        router.back()
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || 'Unable to edit Bank');
        setLoading(false)
      });
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (BankId) {
      bankService
        .bankDetails(BankId)
        .then((bankres) => {
          setBankDetails(bankres);
          seriesService.seriesDetails(bankres.SeriesID).then((res) => {
            const selectedSeries = {
              label: res.Name,
              value: res.ID,
            };
            setValue("series", selectedSeries);
          });
          locationService.locationDetails(bankres.LocationID).then((res) => {
            const selectedlocation = {
              label: res.Name,
              value: res.ID,
            };
            setValue("location", selectedlocation);
          });
          setService.setsDetails(bankres.SetID).then((res) => {
            const selectedSets = {
              label: res.Name,
              value: res.ID,
            };
            setValue("set", selectedSets);
          });
          bankService.getBankConfigDetails(bankres.ID).then((configRes) => {
            setBankConfigDetails(configRes);
          });
          bankService.getBankAchDetails(bankres.ID).then((BankAchRes) => {
            setBankAchDetails(BankAchRes);
          });
          coaAccountsService.coaDetails(parseInt(bankres?.DefaultAccountDeposit)).then((res) => {
            const deposit = {
              value: res.ID,
              label: `${res.Name} - ${res.Code}`,
            }
            setValue("defaultAccountDeposit", deposit);
          });
          coaAccountsService.coaDetails(parseInt(bankres?.DefaultAccountDiscount)).then((res) => {
            const discount = {
              value: res.ID,
              label: `${res.Name} - ${res.Code}`,
            }
            setValue("defaultAccountDiscount", discount);



          });
          coaAccountsService.coaDetails(parseInt(bankres?.DefaultAccountClearing)).then((res) => {
            const clearing = {
              value: res.ID,
              label: `${res.Name} - ${res.Code}`,
            }
            setValue("defaultAccountClearing", clearing);

          });
          coaAccountsService.coaDetails(parseInt(bankres?.DefaultAmountCash)).then((res) => {
            const cash = {
              value: res.ID,
              label: `${res.Name} - ${res.Code}`,
            }
            setValue("defaultAccountCash", cash);
          });

        })
        .catch((error) => {
          toast.error(error?.error || error?.Message || 'Unable to get data');
        });
    }
  }, [router.query]);

  useEffect(() => {
    if (bankDetails) {
      setValue("bankName", bankDetails?.Name);
      setValue("bankCode", bankDetails?.Code);
      setValue("accountNumber", bankDetails?.AccountNumber);
      setValue("description", bankDetails?.Description);
      setValue("routingNumber", bankDetails?.RoutingNumber);
      setValue("accountFraction", bankDetails?.AccountFraction);
      const currency = {
        label: bankDetails.Currency.Name,
        value: bankDetails.Currency.ID,
      };
      setValue("currency", currency);
      setValue("contactName", bankDetails?.PrimaryContact?.FirstName);
      setValue("emailIDBasicInfo", bankDetails?.PrimaryContact?.EmailID);
      setValue("basicInfoCountryCode", bankDetails?.PrimaryContact?.CellPhone.split("-")[0]);
      setValue("basicInfoContactNumber", bankDetails?.PrimaryContact?.CellPhone.split("-")[1]);
      setValue("branchNumber", bankDetails?.BranchNumber);

      //physical address
      setValue("physicalAddress1", bankDetails?.PhysicalAddress?.Line1);
      setValue("physicalAddress2", bankDetails?.PhysicalAddress?.Line2);
      setValue("physicalAddressCity", bankDetails?.PhysicalAddress?.CityName);

      const pysicalAddState = {
        label: bankDetails.PhysicalAddress?.State?.Name,
        value: bankDetails.PhysicalAddress?.State?.ID,
        country: bankDetails.PhysicalAddress?.State?.Country,
      };
      setValue("physicalAddressState", pysicalAddState);
      setValue(
        "physicalAddressPostalCode",
        bankDetails?.PhysicalAddress?.Zipcode
      );

      //mailing address
      setValue("mailingAddress1", bankDetails?.MailingAddress?.Line1);
      setValue("mailingAddress2", bankDetails?.MailingAddress?.Line2);
      setValue("mailingAddressCity", bankDetails?.MailingAddress?.CityName);
      const mailingAddState = {
        label: bankDetails.MailingAddress?.State?.Name,
        value: bankDetails.MailingAddress?.State?.ID,
        country: bankDetails.MailingAddress?.State?.Country,
      };
      setValue("mailingAddressState", mailingAddState);
      setValue(
        "mailingAddressPostalCode",
        bankDetails?.MailingAddress?.Zipcode
      );
      setValue("mailingPhoneNumber", bankDetails?.MailingAddress?.ContactPhone);
      setValue("mailingCountryCode", bankDetails?.MailingAddress?.ContactPhoneCode);
      setValue("mailingFax", bankDetails?.Fax);
      setValue("mailingEmail", bankDetails?.MailingAddress?.ContactEmailID);

      setValue("checkCopies", bankConfigDetails?.CheckCopies);
      setValue("checkRangeStart", bankConfigDetails?.CheckRangeStart);
      setValue("checkRangeEnd", bankConfigDetails?.CheckRangeEnd);
      if (bankConfigDetails?.CheckRangeStart) {
        setCheck(true)
      }
      if (bankConfigDetails?.EftRangeStart) {
        setEft(true)
      }
      if (bankConfigDetails?.WireTransferRangeStart) {
        setWireTransfer(true)
      }
      setValue("ACHeftRangeStart", bankConfigDetails?.EftRangeStart);
      setValue("ACHeftRangeEnd", bankConfigDetails?.EftRangeEnd);
      setValue("ACHeftCopies", bankConfigDetails?.EftCopies);
      bankAchDetails?.map((ach) => {
        if (ach.Type === "PositivePay") {
          setValue("PPhost", ach.Host);
          setValue("PPuserName", ach.Username);
          setValue("PPpassword", ach.Password);
          setValue("PPoutboundPath", ach.OutboundPath);
          setValue("PPcertificate", ach.Certificate);
          setValue("PPport", ach.Port);
          const PPDataFormatOptions = DataFormatOptions.filter((data) => {
            return data.value === ach.DataFormat;
          })?.[0];
          setValue("PPdataFormat", PPDataFormatOptions);
          setPositivePay(true)
        } else if (ach.Type === "ACH") {
          setValue("ACHhost", ach.Host);
          setValue("ACHuserName", ach.Username);
          setValue("ACHinboundPath", ach.InboundPath);
          setValue("ACHoutboundPath", ach.OutboundPath);
          const ACHDataFormatOptions = DataFormatOptions.filter((data) => {
            return data.value === ach.DataFormat;
          })?.[0];
          setValue("ACHdataFormat", ACHDataFormatOptions);
          setValue("ACHcertificate", ach.Certificate);
          setValue("ACHpassword", ach.Password);
          setACHExport(true)
        }
      })

      setValue(
        "wireTransaferRangeStart",
        bankConfigDetails?.WireTransferRangeStart
      );
      setValue(
        "wireTransaferRangeEnd",
        bankConfigDetails?.WireTransferRangeEnd
      );
      setValue(
        "wireTransferCopies",
        bankConfigDetails?.WireTransferCopies
      );

      setValue("host", bankConfigDetails?.host);
      setValue("userName", bankConfigDetails?.username);
      setValue("password", bankConfigDetails?.password);
      setValue("inboundPath", bankConfigDetails?.inboundPath);
      setValue("outboundPath", bankConfigDetails?.outboundPath);
      setValue("dataFormat", bankConfigDetails?.dataFormat);

      setActiveStatus(bankDetails.IsActive)
    }
  }, [bankDetails, bankConfigDetails, bankAchDetails]);

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
                {...{ eft, setEft, positivePay, setPositivePay, ACHExport, setACHExport, check, setCheck, wireTransfer, setWireTransfer }}
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
            <AccordionHeader targetId="6">Set/Series/Location Information</AccordionHeader>
            <AccordionBody accordionId="6">
              <OtherDetailsForm
                control={control}
                onSubmit={onSubmit}
                errors={errors}
                {...{ activeStatus, setActiveStatus }}
              />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default BankAccordion;
