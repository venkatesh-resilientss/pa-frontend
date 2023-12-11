import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { Plus, Minus } from "react-feather";
import { useState } from "react";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function FeesForm({ control, errors }) {
  const details = [
    { name: 'fee_name', label: 'Fee Name', required: false, type: 'select', placeholder: 'Fee Name' },
    { name: 'amount', label: 'Amount', required: false, placeholder: 'Amount' },
    { name: 'amount_basis', label: 'Basis', type: 'select', placeholder: 'Basis' },
    { name: 'max_amount', label: 'Max Amount', placeholder: 'Max Amount' },
    { name: 'max_amount_basis', label: 'Basis', type: 'select', placeholder: 'Basis' },
    { name: 'min_amount', label: 'Min Amount', placeholder: 'Min Amount' },
    { name: 'min_amount_basis', label: 'Basis', type: 'select', placeholder: 'Basis' }
  ];
  const [formData, setFormData] = useState([details]);

  const addNewForm = () => {
    const newform = details.map(obj => { return { ...obj, name: formData.length + "_" + obj.name }; });
    setFormData((prevData) => [
      ...prevData,
      newform,
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
      <Form>
        {
          formData.map((form, formindex) => (
            <div key={formindex}>
              {formindex > 0 && <Row><Col xl="8">Bank {formindex + 1}</Col><Col className="text-end" xl="4">
                <Button color="white" onClick={() => {
                  removeForm((formindex));
                }}>
                  <Minus />
                </Button>
              </Col></Row>}
              <Row>
                {form.map((formField) => (
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
                    ) : formField.type === 'date' ? (
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
                    ) : formField.type === 'check' ? (
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
            </div>
          ))
        }
      </Form>
      <div className="d-flex justify-content-end">
        <Button color="white" onClick={addNewForm}>
          <Plus />
          Add New Fee
        </Button>
      </div>
    </div>
  );
}

export default FeesForm;
