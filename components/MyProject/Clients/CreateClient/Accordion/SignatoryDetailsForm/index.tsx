import { Controller } from 'react-hook-form'
import { Col, Form, Input, Label, Row } from 'reactstrap'
import ReactSelect from "react-select";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function SignatoryDetailsForm({ control, errors }) {

  const form = [
    { name: 'mpiphpSignatoryCode', label: 'MPIPHP Signatory Code', placeholder: 'Enter MPIPHP Signatory Code' },
    { name: 'signatoryName', label: 'MPIPHP Signatory Name', placeholder: 'Enter MPIPHP Signatory Name' },
    { name: 'sagSignatoryCode', label: 'SAG Signatory Code', placeholder: 'Enter SAG Signatory Code' },
    { name: 'sagSignatoryName', label: 'SAG Signatory Name', placeholder: 'Enter SAG Signatory Name' },
    { name: 'dgaSignatoryCode', label: 'DGA Signatory Code', placeholder: 'Enter DGA Signatory Code' },
    { name: 'dgaSignatoryName', label: 'DGA Signatory Name', placeholder: 'Enter DGA Signatory Name' },
    { name: 'wgaSignatoryCode', label: 'WGA Signatory Code', placeholder: 'Enter WGA Signatory Code' },
    { name: 'wgasignatoryName', label: 'WGA Signatory Name', required: false, placeholder: 'Enter WGA Signatory Name' },
    { name: 'million', label: 'MPIPHP > 15 Million', type:'check', placeholder: 'MPIPHP > 15 MIllion' }
  ]

  return (
    <div>
      <div className="my-3">
        <p>Project Information</p>
      </div>
      <Form>
      <Row>
      <Label className="form-lable-font text-black form-label">Please upload all signatory Agreements here</Label>
      <Controller
        name="signatoryAgreements"
        control={control}
        render={({ field }) => (
          <Input
            type="file"
            className="p-2 m-3"
            placeholder="Signatory Agreements"
            {...field}
          />
        )}
      />
      </Row>
      <Row>
        {form.map((formField) => (
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
                  className="text-black checkbox-label"
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
      </Form>
    </div>
  )
}

export default SignatoryDetailsForm
