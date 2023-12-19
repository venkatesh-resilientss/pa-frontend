import React, { useEffect, useState } from "react";
import { Accordion } from "reactstrap";
import { AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "react-bootstrap-button-loader";

import { BasicDetails, MailingAddress, NoBankPage } from "@/components/banks";
import { PhysicalAddress, DefaultAccount } from "@/components/banks";
import { OtherDetails, CheckEFT } from "@/components/banks";

import { BankService, SetsService, COAAccountsService } from "services";
import { SeriesService, LocationsService } from "services";
import { hasAccess } from "@/commonFunctions/hasAccess";

const bankService = new BankService();
const setService = new SetsService();
const coaAccountsService = new COAAccountsService();
const seriesService = new SeriesService();
const locationService = new LocationsService();

export default function BankAccordion({ user, router }) {
  const BankId = router.query.id;

  const [steps, setSteps] = useState<any>([
    { name: "Basic Information", toggle: true },
    { name: "Physical Address", toggle: false },
    { name: "Mailing Address", toggle: false },
    { name: "Check/EFT/Wiretransfer Details", toggle: false },
    { name: "Default Accounts", toggle: false },
    { name: "Set/Series/Location Information", toggle: false },
  ]);

  const {
    control,
    handleSubmit,
    formState,
    watch,
    trigger,
    getValues,
    setValue,
  } = useForm();
  const { errors, isSubmitted } = formState;

  const [eft, setEft] = useState(false);
  const [positivePay, setPositivePay] = useState(false);
  const [ACHExport, setACHExport] = useState(false);
  const [loading, setLoading] = useState(true);

  const [wireTransfer, setWireTransfer] = useState(false);
  const [check, setCheck] = useState(false);
  const [bankDetails, setBankDetails]: any = useState();
  const [bankConfigDetails, setBankConfigDetails]: any = useState();
  const [bankAchDetails, setBankAchDetails]: any = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const DataFormatOptions = [
    { label: "JSON", value: "json" },
    { label: "XML", value: "xml" },
    { label: "CSV", value: "csv" },
  ];
  console.log(getValues(), "DATA");
  useEffect(() => {
    if (BankId) {
      bankService
        .bankDetails(BankId)
        .then((bankres) => {
          setBankDetails(bankres);
          setLoading(false);
          seriesService.seriesDetails(bankres.SeriesID).then((res) => {
            const selectedSeries = {
              label: `${res.Code} - ${res.Name}`,
              value: res.ID,
            };
            setValue("series", selectedSeries);
          });
          locationService.locationDetails(bankres.LocationID).then((res) => {
            const selectedlocation = {
              label: `${res.Code} - ${res.Name}`,
              value: res.ID,
            };
            setValue("location", selectedlocation);
          });
          setService.setsDetails(bankres.SetID).then((res) => {
            const selectedSets = {
              label: `${res.Code} - ${res.Name}`,
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
          coaAccountsService
            .coaDetails(parseInt(bankres?.DefaultAccountDeposit))
            .then((res) => {
              const deposit = {
                value: res.ID,
                label: `${res.Code} - ${res.Name}`,
              };
              setValue("defaultAccountDeposit", deposit);
            });
          coaAccountsService
            .coaDetails(parseInt(bankres?.DefaultAccountDiscount))
            .then((res) => {
              const discount = {
                value: res.ID,
                label: `${res.Code} - ${res.Name}`,
              };
              setValue("defaultAccountDiscount", discount);
            });
          coaAccountsService
            .coaDetails(parseInt(bankres?.DefaultAccountClearing))
            .then((res) => {
              const clearing = {
                value: res.ID,
                label: `${res.Code} - ${res.Name}`,
              };
              setValue("defaultAccountClearing", clearing);
            });
          coaAccountsService
            .coaDetails(parseInt(bankres?.DefaultAmountCash))
            .then((res) => {
              const cash = {
                value: res.ID,
                label: `${res.Code} - ${res.Name}`,
              };
              setValue("defaultAccountCash", cash);
            });
        })
        .catch((error) => {
          toast.error(error?.error || error?.Message || "Unable to get data");
          setLoading(false);
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
      setValue("accountFraction", bankDetails?.AccountFraction || "");
      const currency = {
        label: bankDetails.Currency.Name,
        value: bankDetails.Currency.ID,
      };
      setValue("currency", currency);
      setValue("contactName", bankDetails?.PrimaryContact?.FirstName);
      setValue("emailIDBasicInfo", bankDetails?.PrimaryContact?.EmailID);
      setValue(
        "basicInfoCountryCode",
        bankDetails?.PrimaryContact?.CellPhone.split("-")[0] || ""
      );
      setValue(
        "basicInfoContactNumber",
        bankDetails?.PrimaryContact?.CellPhone.split("-")[1] || ""
      );
      setValue("branchNumber", bankDetails?.BranchNumber || "");

      //physical address
      setValue("physicalAddress1", bankDetails?.PhysicalAddress?.Line1);
      setValue("physicalAddress2", bankDetails?.PhysicalAddress?.Line2);
      setValue("physicalAddressCity", bankDetails?.PhysicalAddress?.CityName);

      const pysicalAddState = bankDetails.PhysicalAddress?.State?.ID
        ? {
            label: bankDetails.PhysicalAddress?.State?.Name,
            value: bankDetails.PhysicalAddress?.State?.ID,
            country: bankDetails.PhysicalAddress?.State?.Country,
          }
        : null;
      setValue("physicalAddressState", pysicalAddState);
      setValue(
        "physicalAddressPostalCode",
        bankDetails?.PhysicalAddress?.Zipcode || ""
      );

      //mailing address
      setValue("mailingAddress1", bankDetails?.MailingAddress?.Line1);
      setValue("mailingAddress2", bankDetails?.MailingAddress?.Line2);
      setValue("mailingAddressCity", bankDetails?.MailingAddress?.CityName);
      const mailingAddState = bankDetails.MailingAddress?.State?.ID
        ? {
            label: bankDetails.MailingAddress?.State?.Name,
            value: bankDetails.MailingAddress?.State?.ID,
            country: bankDetails.MailingAddress?.State?.Country,
          }
        : null;
      setValue("mailingAddressState", mailingAddState);
      setValue(
        "mailingAddressPostalCode",
        bankDetails?.MailingAddress?.Zipcode || ""
      );
      setValue(
        "mailingPhoneNumber",
        bankDetails?.MailingAddress?.ContactPhone || ""
      );
      setValue(
        "mailingCountryCode",
        bankDetails?.MailingAddress?.ContactPhoneCode
      );
      setValue("mailingFax", bankDetails?.Fax);
      setValue("mailingEmail", bankDetails?.MailingAddress?.ContactEmailID);

      setValue("checkCopies", bankConfigDetails?.CheckCopies || "");
      setValue("checkRangeStart", bankConfigDetails?.CheckRangeStart || "");
      setValue("checkRangeEnd", bankConfigDetails?.CheckRangeEnd || "");
      if (bankConfigDetails?.CheckRangeStart) {
        setCheck(true);
      }
      if (bankConfigDetails?.EftRangeStart) {
        setEft(true);
      }
      if (bankConfigDetails?.WireTransferRangeStart) {
        setWireTransfer(true);
      }
      setValue("ACHeftRangeStart", bankConfigDetails?.EftRangeStart || "");
      setValue("ACHeftRangeEnd", bankConfigDetails?.EftRangeEnd || "");
      setValue("ACHeftCopies", bankConfigDetails?.EftCopies || "");
      bankAchDetails?.map((ach) => {
        if (ach.Type === "PositivePay") {
          setValue("PPhost", ach.Host || "");
          setValue("PPuserName", ach.Username || "");
          setValue("PPpassword", ach.Password || "");
          setValue("PPoutboundPath", ach.OutboundPath || "");
          setValue("PPcertificate", ach.Certificate || "");
          setValue("PPport", ach.Port || "");
          const PPDataFormatOptions = DataFormatOptions.filter((data) => {
            return data.value === ach.DataFormat;
          })?.[0];
          setValue("PPdataFormat", PPDataFormatOptions);
          setPositivePay(true);
        } else if (ach.Type === "ACH") {
          setValue("ACHhost", ach.Host || "");
          setValue("ACHuserName", ach.Username || "");
          setValue("ACHinboundPath", ach.InboundPath || "");
          setValue("ACHoutboundPath", ach.OutboundPath || "");
          const ACHDataFormatOptions =
            DataFormatOptions.filter((data) => {
              return data.value === ach.DataFormat;
            })?.[0] || null;
          setValue("ACHdataFormat", ACHDataFormatOptions);
          setValue("ACHcertificate", ach.Certificate || "");
          setValue("ACHpassword", ach.Password || "");
          setACHExport(true);
        }
      });

      setValue(
        "wireTransaferRangeStart",
        bankConfigDetails?.WireTransferRangeStart || ""
      );
      setValue(
        "wireTransaferRangeEnd",
        bankConfigDetails?.WireTransferRangeEnd || ""
      );
      setValue(
        "wireTransferCopies",
        bankConfigDetails?.WireTransferCopies || ""
      );

      setValue("host", bankConfigDetails?.host || "");
      setValue("userName", bankConfigDetails?.username || "");
      setValue("password", bankConfigDetails?.password || "");
      setValue("inboundPath", bankConfigDetails?.inboundPath || "");
      setValue("outboundPath", bankConfigDetails?.outboundPath || "");
      setValue("dataFormat", bankConfigDetails?.dataFormat || "");

      setActiveStatus(bankDetails.IsActive);
    }
  }, [bankDetails, bankConfigDetails, bankAchDetails]);

  const hasPermission = hasAccess(
    user,
    "configuration_management",
    "edit_configuration"
  );

  const onSubmit = (data) => {
    setLoading(true);
    const clientId = parseInt(localStorage.getItem("clientid"));
    const projectId = parseInt(localStorage.getItem("projectid"));
    const primaryContactPhone = `${data.basicInfoCountryCode}-${data.basicInfoContactNumber}`;
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
      AccountFraction: data.accountFraction,
      IsActive: activeStatus,
      PrimaryContact: {
        FullName: data.contactName,
        // PhoneCode: parseInt(data.basicInfoCountryCode),
        CellPhone: primaryContactPhone,
        EmailID: data.emailIDBasicInfo,
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
        StateId: parseInt(data.mailingAddressState?.value),
        CountryId: parseInt(data.mailingAddressState?.country?.ID),
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
        },
      },
      SeriesId: parseInt(data?.series?.value),
      SetId: parseInt(data?.set?.value),
      LocationId: parseInt(data?.location?.value),
      CurrencyId: parseInt(data?.currency?.value),
      CountryId: parseInt(data?.physicalAddressState?.country?.ID),
      DefaultAmountCash: parseInt(data.defaultAccountCash?.value),
      DefaultAccountClearing: parseInt(data.defaultAccountClearing?.value),
      DefaultAccountDiscount: parseInt(data.defaultAccountDiscount?.value),
      DefaultAccountDeposit: parseInt(data.defaultAccountDeposit?.value),
    };
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
          Type: "ACH",
        };
        bankPayload.Meta.BankAch.push(achExportPayload);
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
          Type: "PositivePay",
        };
        bankPayload.Meta.BankAch.push(positivepayPayload);
      }
    }

    bankService
      .editBank(BankId, bankPayload)
      .then(() => {
        toast.success("Bank details updated successfully");
        setLoading(false);
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || "Unable to edit Bank");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isSubmitted)
      setSteps([...steps].map((el) => ({ name: el.name, toggle: true })));
  }, [isSubmitted]);

  const hasViewPermission = hasAccess(
    user,
    "configuration_management",
    "view_all_configurations"
  );

  return (
    <>
      {user && !hasViewPermission ? (
        <NoBankPage
          {...{ user }}
          typ={user && !hasViewPermission ? "Access Denied" : ""}
        />
      ) : (
        <div className="p-4">
          <div className="d-flex justify-content-between">
            <div>
              <div className="text-black fw-600">All Banks</div>
              <div className="f-32 fw-600">Edit Bank</div>
            </div>

            <div className="my-auto">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn f-14"
              >
                Dismiss
              </button>

              {isEditing ? (
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
              ) : (
                <Button
                  type="button"
                  loading={loading}
                  disabled={loading}
                  className="px-3 py-2"
                  spinColor="#ffffff"
                  onClick={() => {
                    console.log("DATA-HIT");

                    if (hasPermission) setEditing(true);
                    else toast.error("Access Denied");
                  }}
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
              )}
            </div>
          </div>
          <hr />

          {steps.map((e, id) => (
            <Accordion
              open={String(e.toggle)}
              toggle={() =>
                setSteps(
                  [...steps].map((el) =>
                    el.name === e.name
                      ? { name: el.name, toggle: !el.toggle }
                      : el
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
                    <BasicDetails
                      {...{ control, onSubmit, errors, isEditing }}
                    />
                  ) : e.name === "Physical Address" ? (
                    <PhysicalAddress
                      {...{ control, onSubmit, errors, isEditing }}
                    />
                  ) : e.name === "Mailing Address" ? (
                    <MailingAddress
                      {...{ control, onSubmit, errors, isEditing }}
                    />
                  ) : e.name === "Check/EFT/Wiretransfer Details" ? (
                    <CheckEFT
                      {...{ eft, setEft, control, onSubmit, errors }}
                      {...{ watch, trigger, setValue, isSubmitted, isEditing }}
                      {...{ positivePay, setPositivePay }}
                      {...{ ACHExport, setACHExport }}
                      {...{ wireTransfer, setWireTransfer, check, setCheck }}
                    />
                  ) : e.name === "Default Accounts" ? (
                    <DefaultAccount
                      {...{ control, onSubmit, errors, isEditing }}
                    />
                  ) : (
                    e.name === "Set/Series/Location Information" && (
                      <OtherDetails
                        {...{ control, onSubmit, errors, isEditing }}
                        {...{ activeStatus, setActiveStatus }}
                        edit={true}
                      />
                    )
                  )}
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
    </>
  );
}
