import CreateClientStepper from "components/clients/create-client-stepper";
import { useEffect, useState, createElement } from "react";
import { Button, Col, Input, Label } from "reactstrap";
import { InputGroup, InputGroupText } from "reactstrap";

import BasicDetailsForm from "./Accordion/BasicDetailsForm";
import ContactInformationForm from "./Accordion/ContactInformationForm";
import AddressDetailsForm from "./Accordion/AddressDetailsForm";
import WorkSpaceForm from "./Accordion/WorkSpaceForm";
import SignatoryDetailsForm from "./Accordion/SignatoryDetailsForm";
import AccountingInformationForm from "./Accordion/AccountingInformationForm";
import FeesForm from "./Accordion/FeesForm";
import AgreementsForm from "./Accordion/AggrementsForm";
import ProjectDetailsForm from "./Accordion/ProjectDetailsForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

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
const completedStep = "/completedStep.svg";
const currentStep = "/currentStep.svg";
const notYetSelectedStep = "/notyetSelectedStep.svg";

const sections = [
  {
    label: "Basic Information",
    component: BasicDetailsForm,
    icon: "/currentStep.svg",
    state: "",
  },
  {
    label: "Contact Information",
    component: ContactInformationForm,
    icon: "/notyetSelectedStep.svg",
    state: "",
  },
  {
    label: "Address Information",
    component: AddressDetailsForm,
    icon: "/notyetSelectedStep.svg",
    state: "",
  },
  {
    label: "Signatory Agreements",
    component: SignatoryDetailsForm,
    icon: "/notyetSelectedStep.svg",
    state: "",
  },
  {
    label: "Accounting Information",
    component: AccountingInformationForm,
    icon: "/notyetSelectedStep.svg",
    state: "",
  },
  {
    label: "Project Information",
    component: ProjectDetailsForm,
    icon: "/notyetSelectedStep.svg",
    state: "",
  },
  {
    label: "Fees",
    component: FeesForm,
    icon: "/notyetSelectedStep.svg",
    state: "",
  },
  {
    label: "Agreements",
    component: AgreementsForm,
    icon: "/notyetSelectedStep.svg",
    state: "",
  },
  {
    label: "Workspace",
    component: WorkSpaceForm,
    icon: "/notyetSelectedStep.svg",
    state: "",
  },
];
function CreateClient() {
  const isAdmin = true;
  const [steps, setSteps] = useState(steps1Data);
  const [activeStep, setActiveStep] = useState(isAdmin ? 0 : 1);
  const laststep = isAdmin ? steps.length - 1 : steps.length;
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleFormSubmit = async () => {
    handleSubmit(onSubmit)();
  };

  const onSubmit = () => {
    setActiveStep((prev) => {
      return Math.min(prev + 1, laststep);
    });
    if (activeStep === laststep) {
      toast.success("Client Created successfully");
      router.push("/clients");
    }
  };

  useEffect(() => {
    if (isAdmin) {
      const adminstep = sections.map(({ ...step }, index) => ({
        ...step,
        icon:
          index === activeStep
            ? currentStep
            : index < activeStep
            ? completedStep
            : notYetSelectedStep,
      }));
      setSteps(adminstep);
    } else {
      if (activeStep === 1) {
        //
      } else if (activeStep === 2) {
        setSteps(steps2Data);
      } else {
        setSteps(steps3Data);
      }
    }
  }, [activeStep]);

  return (
    <div className="p-4">
      <div className="text-black form-label">All Clients</div>
      <p className="font-size-32 fw-600">Add New Client</p>

      <hr />
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-end">
            <CreateClientStepper
              {...{ handlePrev, handleNext, steps, activeStep }}
            />
          </div>
        </div>
      </div>

      {isAdmin ? (
        <div>
          {sections.map((item, index) => (
            <div key={index}>
              {activeStep === index &&
                createElement(item.component, {
                  control: control,
                  errors: errors,
                })}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {activeStep === 1 ? (
            <div>
              <p className="text-black form-label">Basic Information</p>
              <div className="row mb-5">
                <Col xl="4">
                  <Label className="text-black form-label">Client Name</Label>
                  <Input placeholder="Client Name" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Client Code</Label>
                  <Input placeholder="Client Name" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Client Code</Label>
                  <Input placeholder="Client Name" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">
                    Client Legal Name (If different)
                  </Label>
                  <Input placeholder="Enter Legal Name" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">FEIN</Label>
                  <Input placeholder="Enter FEIN" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">
                    Physical Address
                  </Label>
                  <Input placeholder="Enter Address" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">
                    Invoice Address
                  </Label>
                  <Input placeholder="Enter Invoice Address" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Routing #</Label>
                  <Input placeholder="Routing Number" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Bank Name</Label>
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
              <p className="text-black form-label">Contact Information</p>
              <div className="row mb-5">
                <Col xl="4">
                  <Label className="text-black form-label">
                    Company Primary Contact
                  </Label>
                  <Input placeholder="Enter POC Name" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Title</Label>
                  <Input placeholder="Select Role" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Office Phone</Label>
                  <Input placeholder="Enter Phone Number" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Cell Phone</Label>
                  <Input placeholder="Enter Mobile Number" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Email</Label>
                  <Input placeholder="Enter Email ID" />
                </Col>
                <Col xl="4"></Col>
                <Col xl="4">
                  <Label className="text-black form-label">
                    Company Secondary Contact
                  </Label>
                  <Input placeholder="Enter POC Name" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Title</Label>
                  <Input placeholder="Select Role" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Office Phone</Label>
                  <Input placeholder="Enter Phone Number" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Cell Phone</Label>
                  <Input placeholder="Enter Mobile Number" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Email</Label>
                  <Input placeholder="Enter Email ID" />
                </Col>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-black form-label">Workspace</p>
              <div className="row mb-5">
                <Col xl="4">
                  <Label className="text-black form-label">Logo</Label>
                  <Input type="file" name="file" id="exampleFile" />
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">Domain</Label>
                  <InputGroup>
                    <Input />
                    <InputGroupText>.rssl.io</InputGroupText>
                  </InputGroup>
                </Col>

                <Col xl="4">
                  <Label className="text-black form-label">Client Admin</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option className="text-grey" disabled>
                      Select Admin
                    </option>
                    <option>Admin 1</option>
                    <option>Admin 2</option>
                  </Input>
                </Col>
                <Col xl="4">
                  <Label className="text-black form-label">
                    RSSL Support User
                  </Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option className="text-grey" disabled>
                      Select Admin
                    </option>
                    <option>Admin 1</option>
                    <option>Admin 2</option>
                  </Input>
                </Col>
              </div>
            </div>
          )}
        </div>
      )}
      {/* <ClientAccordion /> */}
      {/* step one */}
      <hr />
      <div className="d-flex row-reverse justify-content-end my-5 gap-3">
        <Button
          color="link"
          className="text-decoration-none"
          onClick={() => {
            setActiveStep((prev) => {
              return Math.max(prev - 1, 0);
            });
          }}
        >
          Back
        </Button>
        <Button className="button-props" onClick={handleFormSubmit}>
          {activeStep === laststep ? "Submit" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

export default CreateClient;
