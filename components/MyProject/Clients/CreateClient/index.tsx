import ClientAccordion from "./Accordion";
import { useRouter } from "next/router";
import CreateClientStepper from "components/clients/create-client-stepper";
import { useEffect, useState } from "react";
import { Button, Col, Input, Label } from "reactstrap";
import { InputGroup, InputGroupText } from "reactstrap";

const steps1Data = [
  {
    label: "Basic Information",
    icon: "/currentStep.svg",
    state: "current",
  },
  {
    label: "Contact Information",
    icon: "/notyetSelectedStep.svg",
    state: "notSelected",
  },
  {
    label: "Workspace Details",
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
    label: "Contact Information",
    icon: "/currentStep.svg",
    state: "notSelected",
  },
  {
    label: "Workspace Details",
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
    label: "Contact Information",
    icon: "/completedStep.svg",
    state: "notSelected",
  },
  {
    label: "Workspace Details",
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
  const [steps, setSteps] = useState(steps1Data);

  useEffect(() => {
    if (activeStep === 1) {
      setSteps(steps1Data);
    } else if (activeStep === 2) {
      setSteps(steps2Data);
    } else {
      setSteps(steps3Data);
    }
  }, [activeStep]);

  return (
    <div style={{ fontFamily: "Segoe UI" }} className="p-4">
      <div
        className="text-black "
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
              <Input placeholder="Client Name" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Client Code
              </Label>
              <Input placeholder="Client Name" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Client Code
              </Label>
              <Input placeholder="Client Name" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Client Legal Name (If different)
              </Label>
              <Input placeholder="Enter Legal Name" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                FEIN
              </Label>
              <Input placeholder="Enter FEIN" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Physical Address
              </Label>
              <Input placeholder="Enter Address" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Invoice Address
              </Label>
              <Input placeholder="Enter Invoice Address" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Routing #
              </Label>
              <Input placeholder="Routing Number" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Bank Name
              </Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>SBI</option>
                <option>ICICI</option>
                <option>HDFC</option>
              </Input>
            </Col>
          </div>
        </div>
      ) : activeStep === 2 ? (
        <div>
          <p
            className="text-black "
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Contact Information
          </p>
          <div className="row mb-5">
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Company Primary Contact
              </Label>
              <Input placeholder="Enter POC Name" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Title
              </Label>
              <Input placeholder="Select Role" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Office Phone
              </Label>
              <Input placeholder="Enter Phone Number" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Cell Phone
              </Label>
              <Input placeholder="Enter Mobile Number" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Email
              </Label>
              <Input placeholder="Enter Email ID" />
            </Col>
            <Col xl="4"></Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Company Secondary Contact
              </Label>
              <Input placeholder="Enter POC Name" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Title
              </Label>
              <Input placeholder="Select Role" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Office Phone
              </Label>
              <Input placeholder="Enter Phone Number" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Cell Phone
              </Label>
              <Input placeholder="Enter Mobile Number" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Email
              </Label>
              <Input placeholder="Enter Email ID" />
            </Col>
          </div>
        </div>
      ) : (
        <div>
          <p
            className="text-black "
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            Workspace
          </p>
          <div className="row mb-5">
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Logo
              </Label>
              <Input type="file" name="file" id="exampleFile" />
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Domain
              </Label>
              <InputGroup>
                <Input />
                <InputGroupText>.rssl.io</InputGroupText>
              </InputGroup>
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Client Admin
              </Label>
              <Input type="select" name="select" id="exampleSelect">
                <option style={{ color: "grey" }} disabled>
                  Select Admin
                </option>
                <option>Admin 1</option>
                <option>Admin 2</option>
              </Input>
            </Col>
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                RSSL Support User
              </Label>
              <Input type="select" name="select" id="exampleSelect">
                <option style={{ color: "grey" }} disabled>
                  Select Admin
                </option>
                <option>Admin 1</option>
                <option>Admin 2</option>
              </Input>
            </Col>
          </div>
        </div>
      )}

      <hr style={{ height: "2px" }} />
      <div className="d-flex row-reverse justify-content-end my-5 gap-3">
        <Button
          color="link"
          className="text-decoration-none"
          onClick={() => {
            setActiveStep((prev) => {
              return Math.max(prev - 1, 1);
            });
          }}
        >
          Back
        </Button>
        <Button
          className="button-props"
          onClick={() => {
            setActiveStep((prev) => {
              return Math.min(prev + 1, 3);
            });
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default CreateClient;
