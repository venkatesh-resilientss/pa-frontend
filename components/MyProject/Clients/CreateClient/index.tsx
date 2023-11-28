import { useRouter } from "next/router";
import CreateClientStepper from "components/clients/create-client-stepper";
import { useEffect, useState } from "react";
import { Button, Col, Input, Label } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form } from "reactstrap";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import { ClientsService } from "services";
import useSWR from "swr";
import { toast } from "react-toastify";

const steps1Data = [
  {
    label: "Basic Information",
    icon: "/currentStep.svg",
    state: "current",
  },
  {
    label: "Address ",
    icon: "/notyetSelectedStep.svg",
    state: "notSelected",
  },
  {
    label: "Contact Information",
    icon: "/notyetSelectedStep.svg",
    state: "notSelected",
  },
];
const steps2Data = [
  {
    label: "Basic Information",
    icon: "/completedStep.svg",
    state: "current",
  },
  {
    label: "Address ",
    icon: "/currentStep.svg",
    state: "notSelected",
  },
  {
    label: "Contact Information",
    icon: "/notyetSelectedStep.svg",
    state: "notSelected",
  },
];
const steps3Data = [
  {
    label: "Basic Information",
    icon: "/completedStep.svg",
    state: "current",
  },
  {
    label: "Address ",
    icon: "/completedStep.svg",
    state: "notSelected",
  },
  {
    label: "Contact Information",
    icon: "/currentStep.svg",
    state: "notSelected",
  },
];

function CreateClient() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const clientService = new ClientsService();

  const { data: softwares } = useSWR("LIST_SOFTWARES", () =>
    clientService.getSoftwares()
  );

  const [steps, setSteps] = useState(steps1Data);
  const [err, setErr] = useState(false);
  const selectStyle = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #dee2e6",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#21252966 !important",
    }),
  };

  const defaultClientData: any = {
    software: "",
    name: "",
    code: "",
    legalName: "",
    FEIN: "",
    routing: "",
    bankName: "",
    accountNumber: "",

    pAdd1: "",
    pAdd2: "",
    pCountry: null,
    pState: null,
    pCity: null,
    pZip1: "",

    iAdd1: "",
    iAdd2: "",
    iCountry: null,
    iState: null,
    iCity: null,
    iZip: "",

    pContactName: "",
    pTitle: "",
    pOffice: "",
    pCell: "",
    pEmail: "",

    sContactName: "",
    sTitle: "",
    sOffice: "",
    sCell: "",
    sEmail: "",
  };
  const [clientData, setClientData] = useState(defaultClientData);
  const [clientModal, setClientModal] = useState(false);

  const banks = [
    { label: "ICICI", value: "ICICI" },
    { label: "SBI", value: "SBI" },
  ];

  const countryData = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  useEffect(() => {
    if (activeStep === 1) {
      setSteps(steps1Data);
    } else if (activeStep === 2) {
      setSteps(steps2Data);
    } else {
      setSteps(steps3Data);
    }
  }, [activeStep]);

  useEffect(() => {
    if (!clientData.software) setClientModal(true);
  }, [clientData]);

  return (
    <div style={{ fontFamily: "Segoe UI" }} className="p-4">
      <div
        className="text-black  "
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Clients
      </div>

      <p className="font-size-32 fw-600">Add New Client</p>

      <hr style={{ height: "2px" }} />
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-end">
            <CreateClientStepper
              {...{ handlePrev, handleNext, steps, activeStep }}
            />
          </div>
        </div>
      </div>

      {/* <ClientAccordion /> */}
      {/* step one */}
      {activeStep === 1 ? (
        <div>
          <p
            className="text-black "
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Basic Information
          </p>
          <div className="row mb-5">
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Client Name
              </Label>
              <Input
                placeholder="Enter Client Name"
                type="text"
                value={clientData.name}
                onChange={(e) =>
                  setClientData({ ...clientData, name: e.target.value })
                }
              />
              {err && !clientData.name.trim() && (
                <small className="text-danger">Enter Client Name</small>
              )}
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Client Code
              </Label>
              <Input
                placeholder="Enter Client Code"
                value={clientData.code}
                onChange={(e) =>
                  setClientData({ ...clientData, code: e.target.value })
                }
              />
              {err && !clientData.code.trim() && (
                <small className="text-danger">Enter Client Code</small>
              )}
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Client Legal Name (If different)
              </Label>
              <Input
                placeholder="Enter Legal Name"
                type="text"
                value={clientData.legalName}
                onChange={(e) =>
                  setClientData({ ...clientData, legalName: e.target.value })
                }
              />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                FEIN
              </Label>
              <Input
                placeholder="Enter FEIN"
                type="number"
                value={clientData.FEIN}
                onChange={(e) =>
                  setClientData({ ...clientData, FEIN: e.target.value })
                }
              />
              {err && !clientData.FEIN.trim() && (
                <small className="text-danger">Enter FEIN</small>
              )}
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Routing #
              </Label>
              <Input
                type="text"
                placeholder="Routing Number"
                value={clientData.routing}
                onChange={(e) =>
                  setClientData({ ...clientData, routing: e.target.value })
                }
              />
            </Col>
            <Col xl="4">
              <Label className="f-12">Bank Name</Label>
              <Select
                className="w-100 mb-3 pr-5 f-12"
                classNamePrefix="selectBank"
                styles={selectStyle}
                placeholder="Select Bank"
                value={
                  banks.find((e) => e.label === clientData.bankName) || null
                }
                options={banks}
                name="banks"
                onChange={(e: any) =>
                  setClientData({ ...clientData, bankName: e.value })
                }
              />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Account Number
              </Label>
              <Input
                type="text"
                placeholder="Enter Account Number"
                value={clientData.accountNumber}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    accountNumber: e.target.value,
                  })
                }
              />
            </Col>
          </div>
        </div>
      ) : activeStep === 2 ? (
        <div>
          <div>
            <p
              className="text-black "
              style={{ fontSize: "20px", fontWeight: "600" }}
            >
              Physical Address
            </p>
            <div className="row">
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Address Line 1
                </Label>
                <Input
                  placeholder="Enter Address"
                  type="text"
                  value={clientData.pAdd1}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      pAdd1: e.target.value,
                    })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Address Line 2
                </Label>
                <Input
                  placeholder="Enter Address"
                  type="text"
                  value={clientData.pAdd2}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      pAdd2: e.target.value,
                    })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Zip Code
                </Label>
                <Input
                  placeholder="Enter Zip Code"
                  type="text"
                  value={clientData.pZip1}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      pZip1: e.target.value,
                    })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Country
                </Label>
                <Select
                  className="w-100 mb-3 pr-5 f-12"
                  classNamePrefix="selectCountry1"
                  placeholder="Select Country"
                  styles={selectStyle}
                  value={clientData.pCountry}
                  options={countryData}
                  name="countries1"
                  onChange={(e: any) =>
                    setClientData({ ...clientData, pCountry: e })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  State
                </Label>
                <Select
                  className="w-100 mb-3 pr-5 f-12"
                  classNamePrefix="selectState1"
                  placeholder="Select State"
                  styles={selectStyle}
                  value={clientData.pState}
                  options={(clientData.pCountry
                    ? State.getStatesOfCountry(clientData.pCountry.value)
                    : []
                  ).map((state) => ({
                    value: state.isoCode,
                    label: state.name,
                  }))}
                  name="states1"
                  onChange={(e: any) =>
                    setClientData({ ...clientData, pState: e })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  City
                </Label>
                <Select
                  className="w-100 mb-3 pr-5 f-12"
                  classNamePrefix="selectCity1"
                  placeholder="Select City"
                  styles={selectStyle}
                  value={
                    banks.find((e) => e.label === clientData.pCity) || null
                  }
                  options={(clientData.pCountry && clientData.pState
                    ? City.getCitiesOfState(
                        clientData.pCountry.value,
                        clientData.pState.value
                      )
                    : []
                  ).map((city) => ({
                    value: city.name,
                    label: city.name,
                  }))}
                  name="cities1"
                  onChange={(e: any) =>
                    setClientData({ ...clientData, pCity: e })
                  }
                />
              </Col>
            </div>
          </div>

          <hr className="my-2" />

          <div>
            <p
              className="text-black "
              style={{ fontSize: "20px", fontWeight: "600" }}
            >
              Invoice Address
            </p>
            <div className="row mb-5">
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Address Line 1
                </Label>
                <Input
                  placeholder="Enter Address"
                  type="text"
                  value={clientData.iAdd1}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      iAdd1: e.target.value,
                    })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Address Line 2
                </Label>
                <Input
                  placeholder="Enter Address"
                  type="text"
                  value={clientData.iAdd2}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      iAdd2: e.target.value,
                    })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Zip Code
                </Label>
                <Input
                  placeholder="Enter Zip Code"
                  type="text"
                  value={clientData.iZip}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      iZip: e.target.value,
                    })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Country
                </Label>
                <Select
                  className="w-100 mb-3 pr-5 f-12"
                  classNamePrefix="selectCountry2"
                  placeholder="Select Country"
                  styles={selectStyle}
                  value={clientData.iCountry}
                  options={countryData}
                  name="countries1"
                  onChange={(e: any) =>
                    setClientData({ ...clientData, iCountry: e })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  State
                </Label>
                <Select
                  className="w-100 mb-3 pr-5 f-12"
                  classNamePrefix="selectState2"
                  placeholder="Select State"
                  styles={selectStyle}
                  value={clientData.iState}
                  options={(clientData.iCountry
                    ? State.getStatesOfCountry(clientData.iCountry.value)
                    : []
                  ).map((state) => ({
                    value: state.isoCode,
                    label: state.name,
                  }))}
                  name="states1"
                  onChange={(e: any) =>
                    setClientData({ ...clientData, iState: e })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  City
                </Label>
                <Select
                  className="w-100 mb-3 pr-5 f-12"
                  classNamePrefix="selectCity2"
                  placeholder="Select City"
                  styles={selectStyle}
                  value={
                    banks.find((e) => e.label === clientData.iCity) || null
                  }
                  options={(clientData.iCountry && clientData.iState
                    ? City.getCitiesOfState(
                        clientData.iCountry.value,
                        clientData.iState.value
                      )
                    : []
                  ).map((city) => ({
                    value: city.name,
                    label: city.name,
                  }))}
                  name="cities2"
                  onChange={(e: any) =>
                    setClientData({ ...clientData, iCity: e })
                  }
                />
              </Col>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p
            className="text-black "
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Address
          </p>
          <div className="row mb-5">
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Company Primary Contact Name
              </Label>
              <Input
                placeholder="Enter POC Name"
                value={clientData.pContactName}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    pContactName: e.target.value,
                  })
                }
              />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Title
              </Label>
              <Input
                placeholder="Enter Role"
                value={clientData.pTitle}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    pTitle: e.target.value,
                  })
                }
              />
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Office Phone
              </Label>
              <Input
                placeholder="Enter Office Number"
                value={clientData.pOffice}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    pOffice: e.target.value,
                  })
                }
              />
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Cell Phone
              </Label>
              <PhoneInput
                inputClass="react-tel-input w-100"
                country={"us"}
                placeholder="Enter Mobile Number"
                value={clientData.pCell}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    pCell: e,
                  })
                }
              />
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Email
              </Label>
              <Input
                type="email"
                placeholder="Enter Email"
                value={clientData.pEmail}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    pEmail: e.target.value,
                  })
                }
              />
            </Col>
          </div>

          <div className="row mb-5">
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Company Secondary Contact Name
              </Label>
              <Input
                placeholder="Enter POC Name"
                value={clientData.sContactName}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    sContactName: e.target.value,
                  })
                }
              />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Title
              </Label>
              <Input
                placeholder="Enter Role"
                value={clientData.sTitle}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    sTitle: e.target.value,
                  })
                }
              />
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Office Phone
              </Label>
              <Input
                placeholder="Enter Office Number"
                value={clientData.sOffice}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    sOffice: e.target.value,
                  })
                }
              />
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Cell Phone
              </Label>
              <PhoneInput
                inputClass="react-tel-input w-100"
                country={"us"}
                placeholder="Enter Mobile Number"
                value={clientData.sCell}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    sCell: e,
                  })
                }
              />
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Email
              </Label>
              <Input
                type="email"
                placeholder="Enter Email"
                value={clientData.sEmail}
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    sEmail: e.target.value,
                  })
                }
              />
            </Col>
          </div>
        </div>
      )}

      <hr style={{ height: "2px" }} />
      <div className="d-flex row-reverse justify-content-end mb-5 gap-3">
        <Button
          color="link"
          className="text-decoration-none"
          onClick={() => {
            if (activeStep > 1)
              setActiveStep((prev) => {
                return Math.max(prev - 1, 1);
              });
            else router.push("/clients");
          }}
        >
          Back
        </Button>
        <Button
          className="button-props"
          onClick={async () => {
            if (
              activeStep === 1 &&
              (!clientData.name.trim() ||
                !clientData.code.trim() ||
                !clientData.FEIN.trim())
            )
              setErr(true);
            else if (activeStep === 3) {
              try {
                const {
                  name: Name,
                  legalName: LegalName,
                  code: Code,
                  FEIN,
                } = clientData;
                const resp = await clientService.createClient({
                  Name,
                  LegalName,
                  Code,
                  FEIN: Number(FEIN) || 0,
                  meta: clientData,
                });
                router.push(`/clients/edit-client/${resp.ID}`);
              } catch (e) {
                toast.error(e?.error || "Error");
              }
            } else
              setActiveStep((prev) => {
                return Math.min(prev + 1, 3);
              });
          }}
        >
          Continue
        </Button>
      </div>
      <Modal isOpen={clientModal} size="lg">
        <ModalHeader>Add New Client</ModalHeader>
        <ModalBody>
          <p>Softwares</p>
          <Form>
            <div className="row">
              {(softwares || []).map((software, idx) => (
                <Col sm="4" key={idx} className="my-1">
                  <div className="flex-center me-3">
                    <input
                      type="radio"
                      id={software.Name}
                      checked={software.ID === clientData.software}
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          software: software.ID,
                        })
                      }
                    />
                    <label htmlFor={software.Name} className="ms-1">
                      {software.Name}
                    </label>
                  </div>
                </Col>
              ))}
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              if (clientData.software) setClientModal(false);
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateClient;
