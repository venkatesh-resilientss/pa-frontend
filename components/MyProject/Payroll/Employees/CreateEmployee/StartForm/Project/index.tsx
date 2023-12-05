import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function ProjectForm({ control, errors }) {
    const formData = [
        { name: 'company_name', label: 'Company Name', type: 'select', required:false, placeholder: 'Company Name' },
        { name: 'project', label: 'Project', type: 'select', required:false, placeholder: 'Project' }
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

export default ProjectForm;
