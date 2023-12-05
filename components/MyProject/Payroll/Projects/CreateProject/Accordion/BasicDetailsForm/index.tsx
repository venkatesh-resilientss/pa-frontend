import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function BasicDetailsForm({ control, errors }) {

  const childFields = [
    { name: 'project', label: 'Project #', required: true, placeholder: 'Project #' },
    { name: 'project_name', label: 'Project Name', required: true, placeholder: 'Project Name' },
    { name: 'code', label: 'Client Code', required: true, placeholder: 'Enter Client Code ex:102910381' },
    { name: 'client_name', label: 'Client Name', required: true, placeholder: 'Client Name' },
    { name: 'preProductionStart', label: 'Pre-Production Start', required: true, type: 'date', placeholder: 'Enter Pre-Production Start' },
    { name: 'startPrincipalPhotography', label: 'Start Principal Photography', required: true, type: 'date', placeholder: 'Enter Start Principal Photography' },
    { name: 'postProductionStart', label: 'Post Production Start', required: true, type: 'date', placeholder: 'Enter Post Production Start' },
    { name: 'budget', label: 'Budget', placeholder: 'Enter Budget' },
    { name: 'projectType', label: 'Project Type', placeholder: 'Enter Project Type' },
    { name: 'departments', label: 'Departments', placeholder: 'Enter Departments' },
    { name: 'batchingRequirements', label: 'Batching Requirements', placeholder: 'Enter Batching Requirements' },
    { name: 'dGAProjectType', label: 'DGA Project Type', type: 'select', placeholder: 'Enter DGA Project Type' },
    { name: 'showLength', label: 'Show Length', type: 'select', placeholder: 'Enter Show Length' },
    { name: 'videotapeProjectType', label: 'Videotape Project Type', type: 'select', placeholder: 'Enter Videotape Project Type' },
    { name: 'payFrequency', label: 'Pay Frequency', type: 'select', placeholder: 'Enter Pay Frequency' },
    { name: 'separateallowancechecks', label: 'Separate allowance checks', type: 'check', placeholder: 'Enter Separate allowance checks' },
    { name: 'separatecheckperemployeetimecard', label: 'Separate check per employee time card', type: 'check', placeholder: 'Enter Separate check per employee time card' },
    { name: 'processingDefaultInvoice', label: 'Processing Default Invoice', type: 'check', placeholder: 'Enter Processing Default Invoice' },
    { name: 'processingDefaulteechecks', label: 'Processing Default EE Check', type: 'check', placeholder: 'Enter Processing Default EE Check' },
    { name: 'separateCheckPerTimeCard', label: 'Separate Check Per TimeCard', type: 'check', placeholder: 'Enter Separate Check Per TimeCard' }
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

export default BasicDetailsForm;
