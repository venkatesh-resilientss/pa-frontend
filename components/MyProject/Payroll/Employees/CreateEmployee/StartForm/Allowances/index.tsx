import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function AllowancesForm({ control, errors }) {
    const formData = [
        { name: 'kit_rental', label: 'Kit Rental', required: true, placeholder: 'Kit Rental' },
        { name: 'kit_schedule', label: 'Schedule', type: 'select', placeholder: 'Schedule' },
        { name: 'kit_account', label: 'Account', placeholder: 'Account' },
        { name: 'kit_pay', label: 'Pay only on Worked Days', type: 'check', placeholder: 'Pay only on Worked Days' },
        { name: 'car_rental', label: 'Car Rental', required: true, placeholder: 'Car Rental' },
        { name: 'car_schedule', label: 'Schedule', type: 'select', placeholder: 'Schedule' },
        { name: 'car_account', label: 'Account', placeholder: 'Account' },
        { name: 'car_pay', label: 'Pay only on Worked Days', type: 'check', placeholder: 'Pay only on Worked Days' },
        { name: 'cellphone_rental', label: 'Cellphone Rental', required: true, placeholder: 'Cellphone Rental' },
        { name: 'cell_phone_schedule', label: 'Schedule', type: 'select', placeholder: 'Schedule' },
        { name: 'cellphone_account', label: 'Account', placeholder: 'Account' },
        { name: 'cellphone_pay', label: 'Pay only on Worked Days', type: 'check', placeholder: 'Pay only on Worked Days' },
        { name: 'choose_oth', label: 'Choose OTH', required: true, placeholder: 'Choose OTH' },
        { name: 'oth_schedule', label: 'Schedule', type: 'select', placeholder: 'Schedule' },
        { name: 'oth_account', label: 'Account', placeholder: 'Account' },
        { name: 'oth_pay', label: 'Pay only on Worked Days', type: 'check', placeholder: 'Pay only on Worked Days' },
        { name: 'ee_type_override', label: 'EE Type Override', placeholder: 'EE Type Override' },
        { name: 'wc_class_override', label: 'WC Class Override', placeholder: 'WC Class Override' }
      ];

      return (
        <div>
          <Form>
            <Row>
              {formData.map((formField) => (
                <Col xl="3" key={formField.name}>
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
          </Form>
        </div>
      );
}

export default AllowancesForm;
