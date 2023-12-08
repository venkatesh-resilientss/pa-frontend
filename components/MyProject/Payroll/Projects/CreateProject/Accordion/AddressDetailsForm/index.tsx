import { Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";
import ReactSelect from "react-select";

function BasicDetailsForm({ control, errors }) {

  const physicalAddress = [
    { name: 'physicalAddressLine1', label: 'Address Line 1', required: true, placeholder: 'Enter Address Line 1' },
    { name: 'physicalAddressLine2', label: 'Address Line 2', required: true, placeholder: 'Enter Address Line 2' },
    { name: 'physicalCity', label: 'City', required: true, placeholder: 'Enter City' },
    { name: 'physicalState', label: 'State', required: true, placeholder: 'Enter State' },
    { name: 'physicalZip', label: 'Zip', required: true, placeholder: 'Enter Zip' },
    { name: 'worklocation', label: 'All Work Location Address', required: true, placeholder: 'Select Work Location' },
    { name: 'checkDeliveryMethod', label: 'Check Delivery Method', type:'select', required: true, options: [{label: 'Mail', value: 'Mail'}, {label: 'Fedex', value: 'Fedex'}, {label: 'Messenger', value: 'Messenger'}, {label: 'P/U', value: 'P/U'}, {label: 'Local Printer', value: 'Local Printer'}], placeholder: 'Select Delivery Method' }
  ]

  const invoiceAddress = [
    { name: 'invoiceAddressLine1', label: 'Address Line 1', placeholder: 'Enter Address Line 1' },
    { name: 'invoiceAddressLine2', label: 'Address Line 2', placeholder: 'Enter Address Line 2' },
    { name: 'invoiceCity', label: 'City', placeholder: 'Enter City' },
    { name: 'invoiceState', label: 'State', placeholder: 'Enter State' },
    { name: 'invoiceZip', label: 'Zip', required: false, placeholder: 'Enter Zip' }
  ]

  const officeAddress = [
    { name: 'officeAddressLine1', label: 'Address Line 1', placeholder: 'Enter Address Line 1' },
    { name: 'officeAddressLine2', label: 'Address Line 2', placeholder: 'Enter Address Line 2' },
    { name: 'officeCity', label: 'City', placeholder: 'Enter City' },
    { name: 'officeState', label: 'State', placeholder: 'Enter State' },
    { name: 'officeZip', label: 'Zip', required: false, placeholder: 'Enter Zip' }
  ]

  return (
    <div>
      <div className="my-3">
        <p>Address Information</p>
      </div>
      <Form>
        <div className="my-3">
          <p>Physical Address Information</p>
        </div>
        <Row>
          {physicalAddress.map((formField) => (
            <Col xl="4" key={formField.name}>
            {formField.type !== 'check' && <Label className="form-lable-font text-black form-label">
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
        <div className="my-3">
          <p>Invoice Address Information</p>
        </div>
        <Row>
          {invoiceAddress.map((formField) => (
            <Col xl="4" className="p-2" key={formField.name}>
              <Label className="text-black form-label">{formField.label}{formField.required && <span className='text-danger'>*</span>}</Label>
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
              {errors[`${formField.name}`] && formField.required && (
                <InvalidFeedBack message={errors[`${formField.name}`].message} />
              )}
            </Col>
          ))}
        </Row>
        <div className="my-3">
          <p>Production Office Address (if different from above)</p>
        </div>
        <Row>
          {officeAddress.map((formField) => (
            <Col xl="4" className="p-2" key={formField.name}>
              <Label className="form-lable-font">{formField.label}{formField.required && <span className='text-danger'>*</span>}</Label>
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

export default BasicDetailsForm;
