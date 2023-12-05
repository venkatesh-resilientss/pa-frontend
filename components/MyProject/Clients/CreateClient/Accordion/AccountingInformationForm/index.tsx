import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function AccountingInformationForm({ control, errors }) {

  const form = [
    { name: 'parentClientCode', label: 'Parent Client Code', required: true, placeholder: 'Enter Parent Client Code' },
    { name: 'parentClientName', label: 'Parent Client Name', required: true, placeholder: 'Parent Client Name' },
    { name: 'rsslCompany', label: 'RSSL Company', type: 'select', placeholder: 'Enter RSSL Company' },
    { name: 'rsslInvoiceAddress', label: 'RSSL Invoice Address', type: 'select', placeholder: 'Enter RSSL Invoice Address' },
    { name: 'rsslBank', label: 'RSSL Bank', type: 'select', placeholder: 'Enter RSSL Bank' },
    { name: 'psaSignedDate', label: 'PSA Signed Date', required: true, type: 'date', placeholder: 'Enter PSA Signed Date' },
    { name: 'coa', label: 'COA', required: true, placeholder: 'Enter COA' },
    { name: 'software_cost', label: 'Software Cost', placeholder: 'Enter Software Cost' },
    { name: 'per', label: 'Per', placeholder: 'Per' },
    { name: 'credit_terms', label: 'Credit Terms', required: true, placeholder: 'Credit Terms' },
    { name: 'release_days', label: 'Days +- Release', required: true, placeholder: 'Days +- Release' },
    { name: 'invoice', label: 'Invoice Format', required: true, placeholder: 'Invoice Format' },
    { name: 'allowDirectDeposit', label: 'Allow Direct Deposit', placeholder: 'Enter Allow Direct Deposit' },
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