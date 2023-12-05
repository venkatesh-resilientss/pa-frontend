import { Controller } from "react-hook-form";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import { Plus, Minus } from "react-feather";
import ReactSelect from "react-select";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function ContactInformationForm({ control, errors }) {

  const contacts = [
    { name: 'accountantType', label: 'Production Accountant', type: 'select', placeholder: 'Enter Accountant' },
    { name: 'productionAccountant', label: 'Production Accountant', required: true, placeholder: 'Enter Accountant' },
    { name: 'productionAccountantOfficePhone', label: 'Office Phone', required: true, placeholder: 'Enter Accountant Office Phone' },
    { name: 'productionAccountantCellPhone', label: 'Cell Phone', required: true, placeholder: 'Enter Accountant Cell Phone' },
    { name: 'productionAccountantEmailPhone', label: 'Email', required: true, placeholder: 'Enter Email' }]

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
                  {formField.label}{formField.required && '*'}
                </Label>
                {formField.type === 'select' ? (
                  <Controller
                    name={formField.name}
                    control={control}
                    rules={{ required: formField.required && `${formField.label} is required` }}
                    render={({ field }) => (
                      <ReactSelect {...field} isClearable />
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