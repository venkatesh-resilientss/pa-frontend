import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function UnionForm({ control, errors }) {
    const formData = [
        { name: 'union', label: 'Union', required: true, placeholder: 'Union' },
        { name: 'occ_code', label: 'OCC Code', required: true, placeholder: 'OCC Code' },
        { name: 'occ_description', label: 'OCC Description', required: true, placeholder: 'OCC Description' },
        { name: 'schedule', label: 'Schedule', required: true, placeholder: 'Schedule' },
        { name: 'labour_account', label: 'Labour Account', required: true, placeholder: 'Labour Account' },
        { name: 'flsa', label: 'FLSA', required: true, placeholder: 'FLSA', options: [{label: 'Exempt', value: 'Exempt'}, {label: 'Non-Exempt', value: 'Non-Exempt'}] },
        { name: 'department', label: 'Department', placeholder: 'Department' },
        { name: 'eeoc', label: 'EEOC', placeholder: 'EEOC', required: true, options: [{label: 'Executive/senior-level officials and managers.', value: 'Executive/senior-level officials and managers.'}, {label: 'First/mid-level officials and managers.', value: 'First/mid-level officials and managers.'}, {label: 'Professionals', value: 'Professionals'}, {label: 'Technicians', value: 'Technicians'}, {label: 'Sales Workers', value: 'Sales Workers'}, {label: 'Administrative support workers', value: 'Administrative support workers'}, {label: ' Craft workers', value: ' Craft workers'}, {label: 'Operatives', value: 'Operatives'}] },
        { name: 'aca_status', label: 'ACA Status', required: true, placeholder: 'ACA Status', options: [{label: 'Full-Time', value: 'Full-Time'}, {label: 'Part-Time', value: 'Part-Time'}, {label: 'Variable', value: 'Variable'}]},
        { name: 'hireLocation', label: 'Hire Location', type: 'select', placeholder: 'Hire Location' },
        { name: 'job_description_override', label: 'Job Description Override', placeholder: 'Job Description Override' },
        { name: 'employee_start_date', label: 'Employee Start Date', type: 'date', placeholder: 'Employee Start Date' },
        { name: 'temparory_address', label: 'Temparory Address', placeholder: 'Temparory Address' }
      ];

      return (
        <div>
          <Form>
            <Row>
              {formData.map((formField) => (
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
