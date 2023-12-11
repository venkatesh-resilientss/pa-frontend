import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function BasicDetailsForm({ control, errors }) {
    const formData = [
      { name: 'project_name', label: 'Project', required: true, placeholder: 'Project' },
      { name: 'project_#', label: 'Project#', required: true, placeholder: 'Project #' },
      { name: 'client_name', label: 'Client', required: true, placeholder: 'Client' },
      { name: 'ssn', label: 'SSN/EIN', required: true, placeholder: 'SSN/EIN' },
      { name: 'last_name', label: 'Last Name', required: true, placeholder: 'Last Name' },
      { name: 'first_name', label: 'First Name', required: true, placeholder: 'First Name' },
      { name: 'middle_name', label: 'Middle Name', placeholder: 'Middle Name' },
      { name: 'suffix', label: 'Suffix', type: 'select', placeholder: 'Suffix', options: [{label: 'Jr.', value: 'Jr'}, {label: 'Sr.', value: 'Sr'}, {label: 'Esq.', value: 'Esq'}] },
      { name: 'dob', label: 'Birth Date', required: true, type: 'date', placeholder: 'Birth Date' },
      { name: 'email', label: 'Email Address', required: true, placeholder: 'Email' },
      { name: 'phone_number', label: 'Phone Number', required: true, placeholder: 'Phone Number' },
      { name: 'ethnicity', required: true, type: 'select', label: 'Ethnicity', placeholder: 'Ethnicity', options: [{label: 'Hspanic or Latino', value: 'Hspanic or Latino'}, {label: 'White', value: 'White'}, {label: 'Black or African American', value: 'Black or African American'}, {label: 'Native Hawaiin or Other Pacific Islander', value: 'Native Hawaiin or Other Pacific Islander'}, {label: 'Asian', value: 'Asian'}, {label: 'American Indian or Alaska Native', value: 'American Indian or Alaska Native'}, {label: 'Two or More Races', value: 'Two or More Races'}, {label: 'Decline to Answer', value: 'Decline to Answer'}] },
      { name: 'gender', label: 'Gender', required: true, type: 'select', placeholder: 'Gender', options: [{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}, {label: 'Other', value: 'Other'}, {label: 'Decline to Answer', value: 'Decline to Answer'}] },
      { name: 'citizenship', label: 'Citizenship', type: 'select', required: true, placeholder: 'Citizenship', options: [{label: 'U.S. Citizen', value: 'U.S. Citizen'}, {label: 'Resident Alien', value: 'Resident Alien'}, {label: 'Non-Resident Alien', value: 'Non-Resident Alien'}, {label: 'Non-Resident Alien Performer', value: 'Non-Resident Alien Performer'}] },
      { name: 'visa_type', label: 'Visa Type', type: 'select', placeholder: 'Visa Type', required: true, options: [{label: 'H-1B', value: 'H-1B'}, {label: 'H-1C', value: 'H-1C'}, {label: ' H-2A', value: ' H-2A'}, {label: 'H-2B', value: 'H-2B'}, {label: 'H-3', value: 'H-3'}] },
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
