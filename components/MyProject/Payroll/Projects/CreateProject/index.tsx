import CreateClientStepper from "components/clients/create-client-stepper";
import { useEffect, useState, createElement } from "react";
import { Button } from "reactstrap";
import BasicDetailsForm from "./Accordion/BasicDetailsForm";
import ContactInformationForm from "./Accordion/ContactInformationForm";
import AddressDetailsForm from "./Accordion/AddressDetailsForm";
import SignatoryDetailsForm from "./Accordion/SignatoryDetailsForm";
import AccountingInformationForm from "./Accordion/AccountingInformationForm";
import FeesForm from "./Accordion/FeesForm";
import AgreementsForm from "./Accordion/AggrementsForm";
import ApprovalInformationForm from "./Accordion/ApprovalInformationForm";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const completedStep = "/completedStep.svg";
const currentStep = "/currentStep.svg";
const notYetSelectedStep = '/notyetSelectedStep.svg';

const sections = [{
  label: 'Basic Information', component: BasicDetailsForm, icon: '/currentStep.svg', state: ''
},
{
  label: 'Address Information', component: AddressDetailsForm, icon: '/notyetSelectedStep.svg', state: ''
},
{
  label: 'Contact Information', component: ContactInformationForm, icon: '/notyetSelectedStep.svg', state: ''
},
{
  label: 'Approval Information', component: ApprovalInformationForm, icon: '/notyetSelectedStep.svg', state: ''
},
{
  label: 'Signatory Agreements', component: SignatoryDetailsForm, icon: '/notyetSelectedStep.svg', state: ''
},
{
  label: 'Accounting Information', component: AccountingInformationForm, icon: '/notyetSelectedStep.svg', state: ''
},
// {
//   label: 'Software/Cost', component: SoftwaresForm, icon: '/notyetSelectedStep.svg', state: ''
// },
{
  label: 'Fees', component: FeesForm, icon: '/notyetSelectedStep.svg', state: ''
},
{
  label: 'Agreements', component: AgreementsForm, icon: '/notyetSelectedStep.svg', state: ''
}
]
function CreateClient() {
  const [steps, setSteps] = useState(sections);
  const [activeStep, setActiveStep] = useState(0);
  const laststep = steps.length - 1

  const { control, handleSubmit, formState: { errors } } = useForm();
  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleFormSubmit = async () => {
    handleSubmit(onSubmit)();
  }

  const onSubmit = () => {
    setActiveStep((prev) => {
      return Math.min(prev + 1, laststep);
    });
    if (activeStep === laststep) {
      toast.success("Project Created successfully");
    }
  };

  useEffect(() => {
    const adminstep = sections.map(({ ...step }, index) => ({ ...step, icon: index === activeStep ? currentStep : index < activeStep ? completedStep : notYetSelectedStep }));
    setSteps(adminstep);
  }, [activeStep]);

  return (
    <div className="p-4">
      <div
        className="text-black form-label"
      >
        All Projects
      </div>
      <p className="font-size-32 fw-600">Project Details</p>

      <hr/>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-end">
            <CreateClientStepper
              {...{ handlePrev, handleNext, steps, activeStep }}
            />
          </div>
        </div>
      </div>
      <div>
        {sections.map((item, index) => (
          <div key={index}>
            {activeStep === index && createElement(item.component, {
              control: control, errors: errors
            }
            )}
          </div>
        ))}
      </div>
      {/* <ProjectAccordion /> */}
      {/* step one */}
      <hr/>
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
        <Button
          className="button-props"
          onClick={handleFormSubmit}
        >
          {activeStep === laststep ? ('Submit') : ('Continue')}
        </Button>
      </div>
    </div>
  );
}

export default CreateClient;
