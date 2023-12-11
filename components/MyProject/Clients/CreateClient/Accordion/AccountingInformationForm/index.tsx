import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function AccountingInformationForm({ control, errors }) {

  const form = [
    { name: 'parentClientCode', label: 'Parent Client Code', placeholder: 'Enter Parent Client Code' },
    { name: 'parentClientName', label: 'Parent Client Name', placeholder: 'Parent Client Name' },
    { name: 'rsslCompany', label: 'RSSL Company', type: 'select', required: true, options: [{label:'RSSL', value: 'RSSL'}, {label:'LLC', value: 'LLC'}], placeholder: 'Enter RSSL Company' },
    { name: 'rsslInvoiceAddress', label: 'RSSL Invoice Address', type: 'select', required: true, options: [{label:'address1', value: 'Address1'}, {label:'address2', value: 'Address2'}], placeholder: 'Enter RSSL Invoice Address' },
    { name: 'rsslBank', label: 'RSSL Bank', type: 'select', required: true, options: [{label:'bank1', value: 'Bank1'}, {label:'bank2', value: 'Bank2'}], placeholder: 'Enter RSSL Bank' },
    { name: 'psaSignedDate', label: 'PSA Signed Date', type: 'date', placeholder: 'Enter PSA Signed Date' },
    { name: 'payment_method', label: 'Payment Method', type: 'select', required: true, options: [{label: 'ACH', value: 'ACH'}, {label: 'Company Check', value: 'Company Check'}, {label:'Bank Check', value: 'Bank Check'}, {label: 'Wire', value: 'Wire'}], placeholder: 'Payment Method' },
    { name: 'credit_terms', label: 'Credit Terms', required: true, options: [{label: '1', value: '1'}, {label: '2', value: '2'}, {label: '3', value: '3'}, {label: '4', value: '4'}, {label: '5', value: '5'}, {label: '6', value: '6'}, {label: '7', value: '7'}, {label: '8', value: '8'}, {label: '9', value: '9'}, {label: '10', value: '10'}], placeholder: 'Credit Terms' },
    { name: 'invoice', label: 'Invoice Format', type: 'select', required: true, options: [{label: 'PDF', value: 'PDF'}, {label: 'Text', value: 'Text'}], placeholder: 'Invoice Format' }
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
         <Label className="text-black form-label">{formField.label}{formField.required && <span className="text-danger">*</span>}</Label>
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
