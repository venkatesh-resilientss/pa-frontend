import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function AccountingInformationForm({ control, errors }) {

  const form = [
    { name: 'rsslCompany', label: 'RSSL Company', type: 'select', placeholder: 'Enter RSSL Company' },
    { name: 'rsslInvoiceAddress', label: 'RSSL Invoice Address', type: 'select', placeholder: 'Enter RSSL Invoice Address' },
    { name: 'rsslBank', label: 'RSSL Bank', required: false, type: 'select', placeholder: 'Enter RSSL Bank' }
  ]

  return (
    <div>
      <div className="my-3">
        <p>Accounting Information</p>
      </div>
      <Form>
        <Row>
        {form.map((formField) => (
         <Col xl="4" className="p-2" key={formField.name}>
         <Label className="text-black form-label">{formField.label}{formField.required && '*'}</Label>
         {formField.type === 'select' ? (
            <Controller
            name={formField.name}
            control={control}
            rules={{ required: formField.required && `${formField.label} is required` }}
            render={({ field }) => (
              <ReactSelect {...field} isClearable />
            )}
            />
         ) : formField.type === 'date'? (
          <Controller
           name={formField.name}
           control={control}
           rules={{ required: formField.required && `${formField.label} is required` }}
           render={({ field }) => (
             <Input
               type="date"
               className="p-2"
               placeholder={formField.placeholder}
               invalid={errors[`${formField.name}`] && formField.required && true}
               {...field}
             />
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
      </Form>
    </div>
  );
}

export default AccountingInformationForm;
