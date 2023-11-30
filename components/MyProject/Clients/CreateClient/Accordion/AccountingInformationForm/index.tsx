import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function AccountingInformationForm({ control, errors }) {

  const form = [
    { name: 'parentClientCode', label: 'Parent Client Code', required: true, placeholder: 'Enter Parent Client Code' },
    { name: 'parentClientName', label: 'Parent Client Name', required: true, placeholder: 'Parent Client Name' },
    { name: 'rsslCompany', label: 'RSSL Company', type: 'select', placeholder: 'Enter RSSL Company' },
    { name: 'rsslInvoiceAddress', label: 'RSSL Invoice Address', type: 'select', placeholder: 'Enter RSSL Invoice Address' },
    { name: 'rsslBank', label: 'RSSL Bank', type: 'select', placeholder: 'Enter RSSL Bank' },
    { name: 'psaSignedDate', label: 'PSA Signed Date', required: true, type: 'date', placeholder: 'Enter PSA Signed Date' }
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
         <Label className="text-black" style={{ fontSize: "14px", fontWeight: "400" }}>{formField.label}{formField.required && '*'}</Label>
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
           <span style={{ color: "red" }}>
             {errors[`${formField.name}`].message as React.ReactNode}
           </span>
         )}
       </Col>
      ))}
          {/* <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Parent Client Code
            </Label>
            <Input placeholder="Enter Parent Client Code" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Parent Client Name
            </Label>
            <Input placeholder="Enter Parent Client Name" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              RSSL Company
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              RSSL Invoice Address{" "}
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              RSSL Bank
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              PSA Signed Date{" "}
            </Label>
            <Input type="date" {...register} />
          </Col> */}
        </Row>
      </Form>
    </div>
  );
}

export default AccountingInformationForm;
