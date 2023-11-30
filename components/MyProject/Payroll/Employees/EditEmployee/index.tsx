import { useState } from "react";
import { Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import StartForm from "./EditForm";
import { useRouter } from "next/router";
 
function EditEmployee() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [activeStep, setActiveStep] = useState('1');

  const handleFormSubmit = async () => {
    handleSubmit(onSubmit)();
  }

  const onSubmit = () => {
    setActiveStep((prev) => {
      return Math.min(Number(prev) + 1, 6).toLocaleString();
    });
    if (activeStep === '6') {
      toast.success("Employee updated successfully");
      router.push({
        pathname: `/payroll/employees`,
      });
    }
  };
    return (
        <div style={{ fontFamily: "Segoe UI" }} className="p-4">
        <div
          className="text-black "
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          All Employees
        </div>
        <p className="font-size-32 fw-600">Edit Employee Details</p>
  
        <hr style={{ height: "2px" }} />
        <StartForm control={control} errors={errors} activeStep={activeStep}/>
        <div className="d-flex row-reverse justify-content-end my-5 gap-3">
        <Button
          color="link"
          className="text-decoration-none"
          onClick={() => {
            setActiveStep((prev) => {
              return Math.max(Number(prev) - 1, 0).toLocaleString();
            });
          }}
            >
            Back
            </Button>
            <Button
            className="button-props"
            onClick={handleFormSubmit}
            >
            {activeStep === '6' ? ('Update Employee') : ('Continue')}
            </Button>
        </div>
        <hr style={{ height: "2px" }} />
      </div>
    )
}

export default EditEmployee;