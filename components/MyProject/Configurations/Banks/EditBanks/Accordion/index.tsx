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
import { SeriesService, LocationsService,AddressService } from "services";
import { SetsService } from "services";
import { checkTenant } from "constants/function";

  const seriesService = new SeriesService();
  const setService = new SetsService();
const addressService = new AddressService();
  

function BankAccordion({ id }) {
  const router = useRouter();
  
  const { reset } = useForm();
  const BankId = router.query.id
   

  const [open, setOpen] = useState("1");
  const [bankDetails, setBankDetails]:any = useState();
  const [selectedSeries, setSelectedSeries]:any = useState();
  const [selectedLocation, setSelectedLocation]:any = useState();
  const [selectedSets, setSelectedSets]:any = useState();
  const [bankConfigDetails, setBankConfigDetails]:any = useState();
  const [bankAchDetails, setBankAchDetails]:any = useState();
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
    const pysicalAddressPaylaod = {
          "cityName": data.physicalAddressCity,
          "countryID": data.physicalAddressState.country.ID,
          "line1": data.physicalAddress1,
          "line2":data.physicalAddress2,
          "stateID": data.physicalAddressState.value,
          "zipcode": parseInt(data.physicalAddressPostalCode)
        }
    const mailingAddress = {
          "cityName": data.physicalAddressCity,
          "countryID": data.mailingAddressState.country.ID,
          "line1": data.mailingAddress1,
          "line2":data.mailingAddress2,
          "stateID": data.mailingAddressState.value,
          "zipcode": parseInt(data.mailingAddressPostalCode)
        }

    addressService
      .updateAddress(bankDetails?.PhysicalAddress?.ID,pysicalAddressPaylaod) //creating pysical address
      .then((pysicalAddressResponse) => {
        addressService.updateAddress(bankDetails?.MailingAddress?.ID,mailingAddress) //creating mailing address
          .then((mailingAddressResponse) => {
            const bankPayload = {
                "accountNumber": parseInt(data.accountNumber),
                "code": data.bankCode,
                "countryID": data.physicalAddressState.country.ID,
                "currencyID":data.currency.value,
                "description": data.description,
                "fax": data.mailingFax,
                "mailingAddressID": mailingAddressResponse.ID,
                "name": data.bankName,
                "physicalAddressID": pysicalAddressResponse.ID,
                // "primaryContactID": 0,
              "routingNumber": parseInt(data.routingNumber),
              "SetID": parseInt(data.set.value),
              "LocationID": parseInt(data.location.value),
              "SeriesID": parseInt(data.series.value),
              "DefaultAmountCash": parseInt(data.defaultAccountCash),
              "DefaultAccountClearing": parseInt(data.defaultAccountClearing),
              "DefaultAccountDeposit": parseInt(data.defaultAccountDeposit),
              "DefaultAccountDiscount": parseInt(data.defaultAccountDiscount)
                // "secondaryContactID": 0,
            }
        bankService
      .editBank(BankId,bankPayload)
          .then((bankRes) => {
             const bankConfigPayload = {
                  "bankID": parseInt(bankRes.ID),
                  "checkCopies": parseInt(data.checkCopies),
                  "checkRangeEnd": parseInt(data.checkRangeEnd),
                  "checkRangeStart": parseInt(data.checkRangeStart),
                  "eftCopies": parseInt(data.eftCopies),
                  "eftRangeEnd": parseInt(data.eftRangeEnd),
                  "eftRangeStart": parseInt(data.eftRangeStart),
                  "wireTransferRangeEnd": parseInt(data.wireTransaferRangeEnd),
                  "wireTransferRangeStart": parseInt(data.wireTransaferRangeStart),
                  "wireTransferCopies": parseInt(data.wireTransferCopies)
                }
            bankService.createBankConfig(bankConfigPayload)
              .then((bankConfigRes) => {
                const bankAchPayload = {
                          "bankID": parseInt(bankRes.ID),
                          "certificate": data.certificate,
                          "dataFormat": data.dataFormat,
                          "host": data.host,
                          "inboundPath": data.inboundPath,
                          "outboundPath": data.outboundPath,
                          "password": data.password,
                          "username": data.userName
                        }
                 bankService.createBankAch(bankAchPayload)
                  .then((bankAchRes) => {
                  })
                  .catch((error) => {
                    toast.error(error?.error);
                  });
                  })
                  .catch((error) => {
                    toast.error(error?.error);
                  });
        
      })
      .catch((error) => {
        toast.error(error?.error);
      });
      })
      .catch((error) => {
        toast.error(error?.error);
      });
      })
      .catch((error) => {
        toast.error(error?.error);
      });

  };



  const {
    control,
    watch,
    handleSubmit, setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (BankId){
      bankService
        .bankDetails(BankId)
        .then((bankres) => {
          setBankDetails(bankres)
          seriesService.seriesDetails(bankres.SeriesID).then((res) => {
            const selectedSeries = {
              label: res.Name,
              value: res.ID
            }
            setSelectedSeries(selectedSeries)
          });
          locationService.locationDetails(bankres.LocationID).then((res) => {
            const selectedlocation = {
              label: res.Name,
              value: res.ID
            }
             setSelectedLocation(selectedlocation)
          });
          setService.setsDetails(bankres.SetID).then((res) => {
            const selectedSets = {
              label: res.Name,
              value: res.ID
            }
            setSelectedSets(selectedSets)
          });
          bankService.getBankConfigDetails(bankres.ID).then((configRes) => {
            setBankConfigDetails(configRes)
          });
          bankService.getBankAchDetails(bankres.ID).then((BankAchRes) => {
            setBankAchDetails(BankAchRes)
          });

        })
        .catch((error) => {
          toast.error(error?.error);
        });
    }
  }, [router.query])
  
  useEffect(() => {
    if (bankDetails) {
      setValue("bankName", bankDetails?.Name )
      setValue("bankCode", bankDetails?.Code )
      setValue("accountNumber", bankDetails?.AccountNumber )
      setValue("description", bankDetails?.Description )
      setValue("routingNumber", bankDetails?.RoutingNumber )
      setValue("accountFraction", bankDetails?.accountFraction)
      const currency = { 
        label: bankDetails.Currency.Name,
        value:bankDetails.Currency.ID
      }
      setValue("currency",  currency )
      setValue("contactName", bankDetails?.contactName )
      setValue("branchNumber", bankDetails?.branchNumber)
      
      //physical address
      setValue("physicalAddress1",bankDetails?.PhysicalAddress?.Line1)
      setValue("physicalAddress2",bankDetails?.PhysicalAddress?.Line2)
      setValue("physicalAddressCity", bankDetails?.PhysicalAddress?.CityName)
      
      const pysicalAddState = {
        label : bankDetails.PhysicalAddress?.State?.Name,
        value : bankDetails.PhysicalAddress?.State?.ID,
        country : bankDetails.PhysicalAddress?.State?.Country,
      }
      setValue("physicalAddressState",pysicalAddState)
      setValue("physicalAddressPostalCode", bankDetails?.PhysicalAddress?.Zipcode)

      //mailing address
      setValue("mailingAddress1",bankDetails?.MailingAddress?.Line1)
      setValue("mailingAddress2",bankDetails?.MailingAddress?.Line2)
      setValue("mailingAddressCity", bankDetails?.MailingAddress?.CityName)
      const mailingAddState = {
        label : bankDetails.MailingAddress?.State?.Name,
        value : bankDetails.MailingAddress?.State?.ID,
        country : bankDetails.MailingAddress?.State?.Country,
      }
      setValue("mailingAddressState",mailingAddState)
      setValue("mailingAddressPostalCode", bankDetails?.MailingAddress?.Zipcode)
      setValue("mailingPhoneNumber", bankDetails?.MailingAddress?.ContactPhone)
      setValue("mailingFax", bankDetails?.Fax)
      setValue("mailingEmail", bankDetails?.MailingAddress?.ContactEmailID)

      setValue("defaultAccountDeposit", bankDetails?.DefaultAccountDeposit)
      setValue("defaultAccountDiscount", bankDetails?.DefaultAccountDiscount)
      setValue("defaultAccountClearing", bankDetails?.DefaultAccountClearing)
      setValue("defaultAccountCash", bankDetails?.DefaultAmountCash)

      setValue("set", selectedSets)
      setValue("location", selectedLocation)
      setValue("series", selectedSeries)

      setValue("checkCopies", bankConfigDetails?.CheckCopies)
      setValue("checkRangeStart", bankConfigDetails?.CheckRangeStart)
      setValue("checkRangeEnd", bankConfigDetails?.CheckRangeEnd)

      setValue("eftRangeStart", bankConfigDetails?.EftRangeStart)
      setValue("eftRangeEnd", bankConfigDetails?.EftRangeEnd)
      setValue("eftCopies", bankConfigDetails?.EftCopies)

      setValue("wireTransaferRangeStart", bankConfigDetails?.WireTransferRangeStart)
      setValue("wireTransaferRangeEnd", bankConfigDetails?.WireTransferRangeEnd)

      setValue("host", bankConfigDetails?.host)
      setValue("userName", bankConfigDetails?.username)
      setValue("password", bankConfigDetails?.password)
      setValue("inboundPath", bankConfigDetails?.inboundPath)
      setValue("outboundPath", bankConfigDetails?.outboundPath)
      setValue("dataFormat", bankConfigDetails?.dataFormat)
      // setValue("physicalAddress1", bankDetails?.Name )
    }
  },[bankDetails,bankConfigDetails,bankAchDetails])

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
                isActive={bankDetails?.IsActive}
              />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default BankAccordion;
