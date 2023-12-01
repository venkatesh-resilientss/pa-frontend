import { Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";

function AddressForm({ control, errors }) {
    const formData = [
      { name: 'resident_address', label: 'Resident Address', required: false, placeholder: 'Resident Address' },
      { name: 'mailing_address', label: 'Mailing Address', required: false, placeholder: 'Mailing Address' },
      { name: 'w2_address', label: 'W-2 Address', placeholder: 'W-2 Address' }
    ];

      return (
        <div>
          <Form>
            <Row>
              {formData.map((formField) => (
                <Col xl="4" key={formField.name}>
                  <Label className="form-lable-font text-black"
                  style={{ fontSize: "14px", fontWeight: "400" }}>
                    {formField.label}{formField.required && '*'}
            </Label>
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
                  {errors[`${formField.name}`] && formField.required && (
                    <span style={{ color: "red" }}>
                      {errors[`${formField.name}`].message as React.ReactNode}
                    </span>
                  )}
                </Col>
              ))}
            </Row>
          </Form>
        </div>
      );
}

export default AddressForm;
