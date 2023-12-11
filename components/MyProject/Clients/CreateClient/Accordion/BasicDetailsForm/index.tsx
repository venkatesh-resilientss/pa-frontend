import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function BasicDetailsForm({ control, errors }) {

  const childFields = [
    { name: 'name', label: 'Client Name', required: true, placeholder: 'Client Name' },
    { name: 'code', label: 'Client Code', required: true, placeholder: 'Enter Client Code ex:102910381' },
    { name: 'legal', label: 'Client Legal Name (If different)', placeholder: 'Enter Legal Name' },
    { name: 'fein', label: 'FEIN', required: true, placeholder: 'Enter FEIN' },
    { name: 'routing', label: 'Routing Number', required: true, placeholder: 'Enter Routing Number' },
    { name: 'bank_name', label: 'Bank Name', required: true, placeholder: 'Enter Bank Name' },
    { name: 'account_number', type: 'input', label: 'Account Number', required: true, placeholder: 'Enter Account Number' }
  ];

  return (
    <div>
      <div className="my-3">
        <p>Basic Information</p>
      </div>
      <Form>
        <Row>
          {childFields.map((formField) => (
            <Col xl="4" key={formField.name}>
              <Label className="text-black form-label">{formField.label}{formField.required && <span className='text-danger'>*</span>}</Label>
              {formField.type === 'select' ? (
                <Controller
                  name={formField.name}
                  control={control}
                  rules={{ required: formField.required && `${formField.label} is required` }}
                  render={({ field }) => (
                    <ReactSelect {...field} isClearable />
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

export default BasicDetailsForm;
