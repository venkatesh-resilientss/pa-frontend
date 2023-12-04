import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function UnionForm({ control, errors }) {
    const formData = [
        { name: 'union', label: 'Union', required: true, placeholder: 'Union' },
        { name: 'occ_code', label: 'OCC Code', required: true, placeholder: 'OCC Code' },
        { name: 'occ_description', label: 'OCC Description', required: true, placeholder: 'OCC Description' },
        { name: 'schedule', label: 'Schedule', placeholder: 'Schedule' },
        { name: 'labour_account', label: 'Labour Account', placeholder: 'Labour Account' },
        { name: 'flsa', label: 'FLSA', placeholder: 'FLSA' },
        { name: 'department', label: 'Department', type: 'select', placeholder: 'Department' },
        { name: 'eeoc', label: 'EEOC', placeholder: 'EEOC' },
        { name: 'aca_status', label: 'ACA Status', placeholder: 'ACA Status' },
        { name: 'job_description_override', label: 'Job Description Override', placeholder: 'Job Description Override' },
        { name: 'employee_start_date', label: 'Employee Start Date', placeholder: 'Employee Start Date' },
        { name: 'temparory_address', label: 'Temparory Address', placeholder: 'Temparory Address' }
      ];

      return (
        <div>
          <Form>
            <Row>
              {formData.map((formField) => (
                <Col xl="4" key={formField.name}>
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
      );
}

export default UnionForm;
