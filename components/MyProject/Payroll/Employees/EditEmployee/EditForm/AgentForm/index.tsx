import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import { Plus, Minus } from "react-feather";

function AgentForm({ control, errors }) {
    const details = [
      { name: 'agency_name', label: 'Agency Name',  placeholder: 'Agency Name' },
      { name: 'attn', label: 'Attn', required: false, placeholder: 'Attn' },
      { name: 'agency_address', label: 'Agency Address', required: false, placeholder: 'Agency Address' },
      { name: 'as_of_date', label: 'As Of Date', placeholder: 'As Of Date' },
      { name: 'rate', label: 'Rate %', placeholder: 'Rate %' },
      { name: 'active', label: 'Active', type: 'check', placeholder: 'Active' }
      ];
      const [formData, setFormData] = useState([details]);

  
      const addNewForm = () => {
        const newform = details.map(obj => {return { ...obj, name: formData.length + "_" + obj.name };});
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
                  {formindex > 0 && <Row><Col xl="8">Agent {formindex+1}</Col><Col className="text-end" xl="4">
                  <Button color="white" onClick={() => {
                    removeForm((formindex));
                  }}>
                        <Minus />
                      </Button>
                      </Col></Row>}
                <Row>
                  {form.map((formField) => (
                    <Col xl="4" key={formField.name}>
                      {formField.type !== 'check' && <Label className="form-lable-font text-black"
                        style={{ fontSize: "14px", fontWeight: "400" }}>
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
                                className="text-black"
                                style={{ fontSize: "14px", fontWeight: "400", marginLeft: "10px" }}
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
                        <span style={{ color: "red" }}>
                          {errors[`${formField.name}`].message as React.ReactNode}
                        </span>
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
              Add New Agent
            </Button>
          </div>
        </div>
      );
}

export default AgentForm;
