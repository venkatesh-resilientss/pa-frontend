import { Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import ReactSelect from "react-select";

function ApprovalInformationForm({ control, errors }) {

  const formData = [
    [{ name: 'precalc', label: 'Pre-calc', type: 'select', placeholder: 'Select Pre-calc' }],
    [{ name: 'calculate1', label: 'Calculate Approval One', type: 'select', placeholder: 'Select Calculate Approval One' },
    { name: 'calculate2', label: 'Calculate Approval Two', type: 'select', placeholder: 'Select Calculate Approval Two' },
    { name: 'calculateFinal', label: 'Calculate Approval Final', required: false, type: 'select', placeholder: 'Select Calculate Approval Final' }]
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
                  {formField.label}{formField.required && '*'}
                </Label>}

               {formField.type === 'select' ? (
            <Controller
            name={formField.name}
            control={control}
            rules={{ required: formField.required && `${formField.label} is required` }}
            render={({ field }) => (
              <ReactSelect {...field} isClearable />
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

                {errors[`${index+'_'+formField.name}`] && formField.required && (
                  <span className="error-message">
                    {errors[`${index+'_'+formField.name}`].message as React.ReactNode}
                  </span>
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
