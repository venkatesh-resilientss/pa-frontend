import { Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import ReactSelect from "react-select";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function ApprovalInformationForm({ control, errors }) {

  const formData = [
    [{ name: 'precalc', label: 'Pre-calc', type: 'select', required: true, options: [{ value: "Asst. Prod. Acct (Payroll Acct)", label: "Asst. Prod. Acct (Payroll Acct)" },{ value: "Dept Head", label: "Dept Head" }, { value: "Prod Acct", label: "Prod Acct" }, { value: "UPM", label: "UPM" }], placeholder: 'Select Pre-calc' }],
    [{ name: 'calculate1', label: 'Calculate Approval One', type: 'select', options: [{ value: "Asst. Prod. Acct (Payroll Acct)", label: "Asst. Prod. Acct (Payroll Acct)" },{ value: "Dept Head", label: "Dept Head" }, { value: "Prod Acct", label: "Prod Acct" }, { value: "UPM", label: "UPM" }], required: true, placeholder: 'Select Calculate Approval One' },
    { name: 'calculate2', label: 'Calculate Approval Two', type: 'select', options: [{ value: "Asst. Prod. Acct (Payroll Acct)", label: "Asst. Prod. Acct (Payroll Acct)" },{ value: "Dept Head", label: "Dept Head" }, { value: "Prod Acct", label: "Prod Acct" }, { value: "UPM", label: "UPM" }], required: true, placeholder: 'Select Calculate Approval Two' },
    { name: 'calculateFinal', label: 'Calculate Approval Final', type: 'select', options: [{ value: "Asst. Prod. Acct (Payroll Acct)", label: "Asst. Prod. Acct (Payroll Acct)" },{ value: "Dept Head", label: "Dept Head" }, { value: "Prod Acct", label: "Prod Acct" }, { value: "UPM", label: "UPM" }], required: true, placeholder: 'Select Calculate Approval Final' }]
  ]

  return (
    <div>
      <div className="my-3">
        <p>Payroll Approval Levels</p>
      </div>
      <Form>
      {formData.map((formField, index) => (
        <Row key={index} className="my-3">
          {formField.map((formField, formindex) => (
           <Col key={formindex} xl="4">
               {formField.type !== 'check' && <Label className="form-lable-font text-black form-label"
                >
                  {formField.label}{formField.required && <span className='text-danger'>*</span>}
                </Label>}

               {formField.type === 'select' ? (
            <Controller
            name={formField.name}
            control={control}
            rules={{ required: formField.required && `${formField.label} is required` }}
            render={({ field }) => (
              <ReactSelect 
              value={field.value}
              onChange={(selectedOption) => field.onChange(selectedOption)}
              className={`selectField ${errors[`${formField.name}`] ? 'errorBorder' : ''}`} {...field} options={formField.options} isClearable />
            )}
            />
         ) : formField.type === 'check'? (
          <Controller
           name={formField.name}
           control={control}
           rules={{ required: formField.required && `${formField.label} is required` }}
           render={({ field }) => (
            <div className="m-4">
             <Input
               type="checkbox"
               className="p-2"
               placeholder={formField.placeholder}
               invalid={errors[`${formField.name}`] && formField.required && true}
               {...field}
             />
             <Label
              className="text-black form-label"
            >
              {formField.label}
            </Label>
            </div>
           )}
         />
         ) : (
          <Controller
           name={formField.name}
           control={control}
           rules={{ required: formField.required && `${formField.label} is required` }}
           render={({ field }) => (
             <Input
               type="text"
               className="p-2"
               placeholder={formField.placeholder}
               invalid={errors[`${formField.name}`] && formField.required && true}
               {...field}
             />
           )}
         />
         )}

                {errors[`${formField.name}`] && formField.required && (
                  <InvalidFeedBack message={errors[`${formField.name}`].message} />
                )}
              </Col>
               ))}
        </Row>
        ))}
      </Form>
    </div>
  );
}

export default ApprovalInformationForm;
