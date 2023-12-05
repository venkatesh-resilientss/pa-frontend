import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function I9Form({ control, errors }) {
  const formData = [
    [{ name: 'legal_status', label: 'Legal Status', type: 'select', placeholder: 'Legal Status' },
    { name: 'document', label: 'Document', type: 'select', required: false, placeholder: 'Document' },
    { name: 'authority', label: 'Document Issuing Authority', required: true, placeholder: 'Document Issuing Authority' },
    { name: 'number', label: 'Document Number', placeholder: 'Document Number' },
    { name: 'expirationDate', label: 'Document Expiration Date', type: 'date', placeholder: 'Document Expiration Date' }],
    [{ name: 'doesnotexpire', label: 'Does Not Expire', type: 'check', placeholder: 'Does Not Expire' }]
  ]

  const signForms = [
    { name: 'sign', required: true, title: 'Sign I-9', label: 'Please enter your full name to sign', placeholder: 'Please enter your full name to sign' },
    { name: 'documents', title: 'Attach Documents', label: 'U.S Passport', type: 'file' }
  ]
  return (
    <div>
      <Form>
        {formData.map((formField, index) => (
          <Row key={index} className="my-3">
            {formField.map((formField, formindex) => (
              <Col key={formindex} xl="4">
                {formField.type !== 'check' && <Label className="form-lable-font text-black form-label">
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
                ) : formField.type === 'date' ? (
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
                ) : formField.type === 'check' ? (
                  <Controller
                    name={formField.name}
                    control={control}
                    rules={{ required: formField.required && `${formField.label} is required` }}
                    render={({ field }) => (
                      <div>
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
        ))}
      </Form>
      <Form>
        <Row>
          {signForms.map((formField, index) => (
            <Col xl="4" className="p-2" key={index}>
              <div
                className="text-black h6 text-bold"
              >
                <strong>{formField.title}</strong>
              </div>
              {formField.type !== 'check' && <Label className="form-lable-font text-black form-label">
                {formField.label}{formField.required && '*'}
              </Label>}
              {formField.type === 'file' ? (
                <Controller
                  name={formField.name}
                  control={control}
                  rules={{ required: formField.required && `${formField.label} is required` }}
                  render={({ field }) => (
                    <Input
                      type="file"
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

export default I9Form;
