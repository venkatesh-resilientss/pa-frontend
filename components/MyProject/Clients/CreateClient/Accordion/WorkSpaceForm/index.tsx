import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import {
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function WorkSpaceForm({ control, errors }) {

  const form = [
    { name: 'logo', label: 'Logo', type: 'file', placeholder: 'Select Logo' },
    { name: 'domain', label: 'Domain', required: true, placeholder: 'Enter Domain' },
    { name: 'clientAdmin', label: 'Client Admin', type: 'select', placeholder: 'Select Client Admin' },
    { name: 'supportUser', label: 'RSSL Support User', type: 'select', placeholder: 'Select RSSL Support User' }
  ]

  return (
    <div>
      <div className="my-3">
        <p>Workspace</p>
      </div>
      <Form>
        <Row>

          {form.map((formField) => (
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
              ) : formField.type === 'file' ? (
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
                    <InputGroup>
                      <Input
                        type="text"
                        className="p-2"
                        placeholder={formField.placeholder}
                        invalid={errors[`${formField.name}`] && formField.required && true}
                        {...field}
                      />
                      <InputGroupText>.rssl.io</InputGroupText>
                    </InputGroup>
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

export default WorkSpaceForm;
