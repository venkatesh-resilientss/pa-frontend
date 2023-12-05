import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { Plus, Minus } from "react-feather";
import { useState } from "react";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function DeductionsForm({ control, errors }) {
    const details = [
      { name: 'fee_name', label: 'Fee Name', required: false, placeholder: 'Fee Name' },
      { name: 'percentage_rate', label: 'Percentage Rate', required: false, placeholder: 'Percentage Rate' },
      { name: 'flat_amount', label: 'Flat Amount', placeholder: 'Flat Amount' },
      { name: 'max_amount', label: 'Max Amount', placeholder: 'Max Amount' },
      { name: 'per', label: 'Per', placeholder: 'Per' },
      { name: 'min_amt_per_ck', label: 'Min Amt Per Ck', placeholder: 'Min Amt Per Ck' },
      { name: 'protected_net_based_on', label: 'Protected Net Based on', placeholder: 'Protected Net Based on' },
      { name: 'amount', label: 'Amount', placeholder: 'Amount' },
      { name: 'case', label: 'Case#', placeholder: 'Case#' },
      { name: 'withholding_agent', label: 'Withholding Agent', placeholder: 'Withholding Agent' },
      { name: 'agency_address', label: 'Agency Address', placeholder: 'Agency Address' },
      { name: 'lifetime_max_amt', label: 'Lifetime Max Amt', placeholder: 'Lifetime Max Amt' },
      { name: 'gross', label: 'Gross', type: 'check', placeholder: 'Gross' },
      { name: 'net', label: 'Net', type: 'check', placeholder: 'Net' },
    ];
    const [formData, setFormData] = useState([details]);

    const addNewForm = () => {
      console.log('formData', formData.length)
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
                {formindex > 0 && <Row><Col xl="8">Bank {formindex+1}</Col><Col className="text-end" xl="4">
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
            Add New Bank
          </Button>
        </div>
      </div>
    );
}

export default DeductionsForm;
