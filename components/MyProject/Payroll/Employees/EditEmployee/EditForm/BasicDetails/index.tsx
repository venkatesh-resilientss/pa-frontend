import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function BasicDetailsForm({ control, errors }) {
    const formData = [
      { name: 'project_name', label: 'Project', placeholder: 'Project' },
      { name: 'project_#', label: 'Project#', placeholder: 'Project #' },
      { name: 'client_name', label: 'Client', placeholder: 'Client' },
      { name: 'ssn', label: 'SSN/EIN', required: true, placeholder: 'SSN/EIN' },
      { name: 'last_name', label: 'Last Name', required: true, placeholder: 'Last Name' },
      { name: 'first_name', label: 'First Name', required: true, placeholder: 'First Name' },
      { name: 'middle_name', label: 'Middle Name', placeholder: 'Middle Name' },
      { name: 'suffix', label: 'Suffix', placeholder: 'Suffix' },
      { name: 'dob', label: 'Birth Date', required: true, type: 'date', placeholder: 'Birth Date' },
      { name: 'email', label: 'Email Address', required: true, placeholder: 'Email' },
      { name: 'phone_number', label: 'Phone Number', required: true, placeholder: 'Phone Number' },
      { name: 'ethnicity', label: 'Ethnicity', placeholder: 'Ethnicity' },
      { name: 'gender', label: 'Gender', type: 'select', placeholder: 'Gender' },
      { name: 'citizenship', label: 'Citizenship', placeholder: 'Citizenship' },
      { name: 'visa_type', label: 'Visa Type', placeholder: 'Visa Type' },
      { name: 'unionDuesApproval', label: 'Union Dues Approval', type: 'check', placeholder: 'Union Dues Approval' }
      ];

    const exempt = [
      {name: 'fit', label: 'FIT', required: false},
      {name: 'sit', label: 'SIT'},
      {name: 'fica', label: 'FICA'},
      {name: 'medi', label: 'Medi'},
      {name: 'local', label: 'Local'}
    ]  

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
            <Row>
              <Col className="text-dark m-4">Exempt:</Col>
              {exempt.map((formField, index) => (
               <Col key={index}>
                <Controller
                name={formField.name}
                control={control}
                rules={{ required: formField.required && `${formField.label} is required` }}
                render={({ field }) => (
                 <div className="m-4">
                  <Input
                    type="checkbox"
                    className="p-2"
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
               </Col>
              ))}
            </Row>
          </Form>
        </div>
      );
}

export default BasicDetailsForm;
