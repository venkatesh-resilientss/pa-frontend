import { Controller } from 'react-hook-form'
import { Col, Form, Input, Label, Row } from 'reactstrap'
import ReactSelect from "react-select";

function ProjectDetailsForm({ control, errors }) {

  const formData = [
    [{ name: 'departments', label: 'Departments', placeholder: 'Enter Departments' },
    { name: ' payFrequency', label: ' Pay Frequency', placeholder: 'Enter  Pay Frequency' },
    { name: 'periodEndingDay', label: 'Period Ending Day', type: 'date', placeholder: 'Enter Period Ending Day' }],
    [{ name: 'precalc', label: 'Pre-calc', type: 'select', placeholder: 'Select Pre-calc' }],
    [{ name: 'calculate1', label: 'Calculate Approval One', type: 'select', placeholder: 'Select Calculate Approval One' },
    { name: 'calculate2', label: 'Calculate Approval Two', type: 'select', placeholder: 'Select Calculate Approval Two' },
    { name: 'calculateFinal', label: 'Calculate Approval Final', required: false, type: 'select', placeholder: 'Select Calculate Approval Final' }]
  ]

  return (
    <div>
      <div className="my-3">
        <p>Signatory Agreements</p>
      </div>
      <Form>
      {formData.map((form, index) => (
      <Row>
        {form.map((formField) => (
          <Col xl="4" key={formField.name}>
            {formField.type !== 'check' && <Label className="form-lable-font text-black"
            style={{ fontSize: "14px", fontWeight: "400" }}>
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
                  className="text-black"
                  style={{ fontSize: "14px", fontWeight: "400", marginLeft: "10px" }}
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
              <span style={{ color: "red" }}>
                {errors[`${formField.name}`].message as React.ReactNode}
              </span>
            )}
          </Col>
        ))}
      </Row>
        ))}
      
      </Form>
    </div>
  )
}

export default ProjectDetailsForm
