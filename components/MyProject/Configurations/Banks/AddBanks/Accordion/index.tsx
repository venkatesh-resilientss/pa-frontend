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
import { BankService, AddressService } from "services";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PhysicalAddressForm from "./PhysicalAddress";
import DefaultAccountForm from "./DefaultAccount";
import OtherDetailsForm from "./OtherDetails";
import CheckEFTForm from "./CheckEftForm";

function BankAccordion() {
  const { reset } = useForm();

  const [open, setOpen] = useState("");
  const bankService = new BankService();
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
    const pysicalAddressPaylaod = {
      cityName: data.physicalAddressCity,
      countryID: data.physicalAddressState.country.ID,
      line1: data.physicalAddress1,
      line2: data.physicalAddress2,
      stateID: data.physicalAddressState.value,
      zipcode: parseInt(data.physicalAddressPostalCode),
    };
    const mailingAddress = {
      cityName: data.physicalAddressCity,
      countryID: data.mailingAddressState.country.ID,
      line1: data.mailingAddress1,
      line2: data.mailingAddress2,
      stateID: data.mailingAddressState.value,
      zipcode: parseInt(data.mailingAddressPostalCode),
    };

    addressService
      .createAddress(pysicalAddressPaylaod) //creating pysical address
      .then((pysicalAddressResponse) => {
        addressService
          .createAddress(mailingAddress) //creating mailing address
          .then((mailingAddressResponse) => {
            const bankPayload = {
              accountNumber: parseInt(data.accountNumber),
              code: data.bankCode,
              countryID: data.physicalAddressState.country.ID,
              currencyID: data.currency.value,
              description: data.description,
              fax: data.mailingFax,
              mailingAddressID: mailingAddressResponse.ID,
              name: data.bankName,
              physicalAddressID: pysicalAddressResponse.ID,
              // "primaryContactID": 0,
              routingNumber: parseInt(data.routingNumber),
              SetID: parseInt(data.set.value),
              LocationID: parseInt(data.location.value),
              SeriesID: parseInt(data.series.value),
              DefaultAmountCash: parseInt(data.defaultAccountCash),
              DefaultAccountClearing: parseInt(data.defaultAccountClearing),
              DefaultAccountDeposit: parseInt(data.defaultAccountDeposit),
              DefaultAccountDiscount: parseInt(data.defaultAccountDiscount),
              // "secondaryContactID": 0,
            };
            bankService
              .createBank(bankPayload)
              .then((bankRes) => {
                toast.success("Bank created successfully");
                const bankConfigPayload = {
                  bankID: parseInt(bankRes.ID),
                  checkCopies: parseInt(data.checkCopies),
                  checkRangeEnd: parseInt(data.checkRangeEnd),
                  checkRangeStart: parseInt(data.checkRangeStart),
                  eftCopies: parseInt(data.eftCopies),
                  eftRangeEnd: parseInt(data.eftRangeEnd),
                  eftRangeStart: parseInt(data.eftRangeStart),
                  wireTransferRangeEnd: parseInt(data.wireTransaferRangeEnd),
                  wireTransferRangeStart: parseInt(
                    data.wireTransaferRangeStart
                  ),
                  wireTransferCopies: parseInt(data.wireTransferCopies),
                };
                bankService
                  .createBankConfig(bankConfigPayload)
                  .then(() => {
                    const bankAchPayload = {
                      bankID: parseInt(bankRes.ID),
                      certificate: data.certificate,
                      dataFormat: data.dataFormat,
                      host: data.host,
                      inboundPath: data.inboundPath,
                      outboundPath: data.outboundPath,
                      password: data.password,
                      username: data.userName,
                    };
                    bankService
                      .createBankAch(bankAchPayload)
                      .then(() => {
                        router.back();
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
