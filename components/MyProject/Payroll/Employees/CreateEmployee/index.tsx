import { useState } from "react";
import { Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BasicDetailsForm from "./BasicDetails";
import DocumentsForm from "./Documents";
import StartForm from "./StartForm";
import { Form, Input, Label } from "reactstrap";
import {
  Row,
  Col
} from 'reactstrap';
import { useRouter } from "next/router";

function CreateEmployee() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [activeStep, setActiveStep] = useState('1');
  const [isChecked, setChecked] = useState(false);

  const formField =  { name: 'ndafile', label: 'NDA/NCA', required: false, type: 'check', placeholder: 'Select NDA/NCA' }

  const handleFormSubmit = async () => {
    handleSubmit(onSubmit)();
  }

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const onSubmit = () => {
    if (isChecked) {
      setActiveStep((prev) => {
        return Math.min(Number(prev) + 1, 4).toLocaleString();
      });
    }
    if (activeStep === '4' || !isChecked) {
      toast.success("Invitation has been sent successfully");
      router.push({
        pathname: `/payroll/employees`,
      });
    }
  };
    return (
        <div style={{ fontFamily: "Segoe UI" }} className="p-4" id="CreateEmployee">
        <div
          className="text-black "
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          All Employees
        </div>
        <p className="font-size-32 fw-600">Add New Employee</p>
  
        <hr style={{ height: "2px" }} />
        <BasicDetailsForm control={control} errors={errors}/>
        <DocumentsForm control={control} errors={errors}/>
        <Form className='mt-4'>
          <Row>
          <Col xl="4" className="d-flex">
          <Input
            type="checkbox"
            className="p-2"
            checked={isChecked}
            onChange={handleCheckboxChange}
            placeholder={formField.placeholder}
            />
            <Label
            className="text-black"
            style={{ fontSize: "14px", fontWeight: "400", marginLeft: "10px" }}
            >
            Would you like to send the start Form to this team member?
            </Label>
          </Col>
          </Row>
        </Form>
        {isChecked && <StartForm control={control} errors={errors} activeStep={activeStep}/>}
        <div className="d-flex row-reverse justify-content-end my-5 gap-3">
          {isChecked && <Button
          color="link"
          className="text-decoration-none"
          onClick={() => {
            setActiveStep((prev) => {
              return Math.max(Number(prev) - 1, 0).toLocaleString();
            });
          }}
            >
            Back
            </Button>}
            <Button
            className="button-props"
            onClick={handleFormSubmit}
            >
            {(!isChecked || (activeStep === '4')) ? ('Invite Employee') : ('Continue')}
            </Button>
        </div>
        <hr style={{ height: "2px" }} />
      </div>
    )

}

export default CreateEmployee;