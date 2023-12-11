import { Controller } from "react-hook-form";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import { Plus, Minus } from "react-feather";
import ReactSelect from "react-select";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function ContactInformationForm({ control, errors }) {

  const contacts = [
    { name: 'accountantType', label: 'Production Accountant', required: true, type: 'select', options: [{label: 'Production Accountant', value: 'Production Accountant'}, {label: 'Asst. Production Accountant', value: 'Asst. Production Accountant'}, {label: 'Payroll Accountant', value: 'Payroll Accountant'}, {label: 'UPM', value: 'UPM'}, {label: 'For W/C', value: 'For W/C'}], placeholder: 'Enter Accountant' },
    { name: 'productionAccountantOfficePhone', label: 'Office Phone', required: true, placeholder: 'Enter Accountant Office Phone' },
    { name: 'productionAccountantCellPhone', label: 'Cell Phone', required: false, placeholder: 'Enter Accountant Cell Phone' },
    { name: 'productionAccountantEmailPhone', label: 'Email', required: false, placeholder: 'Enter Email' }]

  const [formData, setFormData] = useState([contacts]);

  const addNewForm = () => {
    const newform = contacts.map(obj => {return { ...obj, name: formData.length + "_" + obj.name };});

    setFormData((prevData) => [
      ...prevData,
      newform
    ]);
  };

  const removeForm = (form) => {
    if (form === 0) {
      return
    }
    setFormData((prevData) => prevData.filter((data, index) => index !== form));
  };

  return (
    <div>
      <div className="my-3">
        <p>Contact Information</p>
      </div>
      <Form>
        {formData.map((formField, index) => (
          <Row key={index} className="my-3">
            {formField.map((formField, formindex) => (
              <Col key={formindex} xl="4">
                <Label
                  className="text-black form-label"
                >
                  {formField.label}{formField.required && <span className='text-danger'>*</span>}
                </Label>
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
            <Col xl="4">
              {index > 0 && <Button color="white" onClick={() => {
                removeForm((index));
              }}>
                <Minus />
              </Button>}
            </Col>
          </Row>
        ))}
      </Form>
      <div className="d-flex justify-content-end">
        <Button color="white" onClick={addNewForm}>
          <Plus />
          Add New Contact
        </Button>
      </div>
    </div>
  );
}

export default ContactInformationForm;
