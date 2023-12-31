import { Controller } from "react-hook-form";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import { Plus, Minus } from "react-feather";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function ContactInformationForm({ control, errors }) {

  const primaryContact = [
    { name: 'primaryContact', label: 'Company Primary Contact', required: true, placeholder: 'Enter Primary Contact' },
    { name: 'primaryTitle', label: 'Title', required: true, placeholder: 'Enter Title' },
    { name: 'primaryOfficePhone', label: 'Office Phone', required: true, placeholder: 'Enter Office Phone' },
    { name: 'primaryphoneNumber', label: 'Phone Number', required: true, placeholder: 'Enter Phone Number' },
    { name: 'primaryEmail', label: 'Email', placeholder: 'Enter Email' }
  ]

  const secondaryContact = [
    { name: 'secondaryContact', label: 'Company Secondary Contact', placeholder: 'Enter Secondary Contact' },
    { name: 'secondaryTitle', label: 'Title', placeholder: 'Enter Title' },
    { name: 'secondaryOfficePhone', label: 'Office Phone', placeholder: 'Enter Office Phone' },
    { name: 'secondaryPhoneNumber', label: 'Phone Number', placeholder: 'Enter Phone Number' },
    { name: 'secondaryEmail', label: 'Email', required: false, placeholder: 'Enter Email' }
  ]

  const additionalContact = [
    { name: 'additionalContact', label: 'Company Additional Contact', placeholder: 'Enter Additional Contact' },
    { name: 'additionalTitle', label: 'Title', placeholder: 'Enter Title' },
    { name: 'additionalOfficePhone', label: 'Office Phone', placeholder: 'Enter Office Phone' },
    { name: 'additionalPhoneNumber', label: 'Phone Number', placeholder: 'Enter Phone Number' },
    { name: 'additionalEmail', label: 'Email', required: false, placeholder: 'Enter Email' }
  ]

  const [formData, setFormData] = useState([primaryContact, secondaryContact]);

  const addNewForm = () => {
    setFormData((prevData) => [
      ...prevData,
      additionalContact,
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
                <Controller
                  name={index + '_' + formField.name}
                  control={control}
                  rules={{ required: formField.required && `${formField.label} is required` }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      className="p-2"
                      placeholder={formField.placeholder}
                      invalid={errors[`${index + '_' + formField.name}`] && formField.required && true}
                      {...field}
                    />
                  )}
                />
                {errors[`${index + '_' + formField.name}`] && formField.required && (
                  <InvalidFeedBack message={errors[`${index + '_' + formField.name}`].message} />
                )}
              </Col>
            ))}
            <Col xl="4">
              {index > 1 && <Button color="white" onClick={() => {
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
