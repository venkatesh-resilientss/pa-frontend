import { Controller } from 'react-hook-form'
import { Col, Form, Input, Label, Row } from 'reactstrap'
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function SignatoryDetailsForm({ control, errors }) {

  const form = [
    { name: 'mpiphpSignatoryCode', label: 'MPIPHP Signatory Code', required: true, placeholder: 'Enter MPIPHP Signatory Code' },
    { name: 'signatoryName', label: 'MPIPHP Signatory Name', required: true, placeholder: 'Enter MPIPHP Signatory Name' },
    { name: 'sagSignatoryCode', label: 'SAG Signatory Code', required: true, placeholder: 'Enter SAG Signatory Code' },
    { name: 'sagSignatoryName', label: 'SAG Signatory Name', required: true, placeholder: 'Enter SAG Signatory Name' },
    { name: 'dgaSignatoryCode', label: 'DGA Signatory Code', required: true, placeholder: 'Enter DGA Signatory Code' },
    { name: 'dgaSignatoryName', label: 'DGA Signatory Name', required: true, placeholder: 'Enter DGA Signatory Name' },
    { name: 'wgaSignatoryCode', label: 'WGA Signatory Code', required: true, placeholder: 'Enter WGA Signatory Code' },
    { name: 'wgasignatoryName', label: 'WGA Signatory Name', required: true, placeholder: 'Enter WGA Signatory Name' }
  ]

  return (
    <div>
      <div className="my-3">
        <p>Signatory Agreements</p>
      </div>
      <Form>
        <Row>
          {form.map((formField) => (
            <Col xl="6" className='p-2' key={formField.name}>
              <Label className="text-black form-label">{formField.label}{formField.required && '*'}</Label>
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
  )
}

export default SignatoryDetailsForm
