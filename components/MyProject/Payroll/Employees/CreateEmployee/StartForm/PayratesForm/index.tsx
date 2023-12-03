import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function PayratesForm({ control, errors }) {
    const formData = [{
      label: "Studio", fields: [
        { name: 'studio_schedule', label: 'Schedule', type: 'select', placeholder: 'Schedule' },
        { name: 'studio_hourly_rate', label: 'Hourly Rate', required: true, placeholder: 'Hourly Rate' },
        { name: 'studio_hours', label: 'Hours', placeholder: 'Hours' },
        { name: 'studio_daily_rate', label: 'Daily Rate', required: true, placeholder: 'Daily Rate' },
        { name: 'studio_average_daily_hours', label: 'Average Daily Hours', placeholder: 'Average Daily Hours' },
        { name: 'studio_weekly_rate', label: 'Weekly Rate', required: true, placeholder: 'Weekly Rate' },
        { name: 'studio_week_hours', label: 'Hours', placeholder: 'Hours' },
        { name: 'studio_6th_day', label: '6th Day', required: true, placeholder: '6th Day' },
        { name: 'studio_7th_day', label: '7th Day', required: true, placeholder: '7th Day' },
        { name: 'studio_dga_production_fee', label: 'DGA Production Fee', placeholder: 'DGA Production Fee' },
        { name: 'studio_overscale', label: 'Overscale %', placeholder: 'Overscale %' }
      ]
    },
    {
      label: "Distant", fields: [
        { name: 'distant_schedule', label: 'Schedule', type: 'select', placeholder: 'Schedule' },
        { name: 'distant_hourly_rate', label: 'Hourly Rate', required: true, placeholder: 'Hourly Rate' },
        { name: 'distant_daily_hours', label: 'Hours', placeholder: 'Hours' },
        { name: 'distant_daily_rate', label: 'Daily Rate', required: true, placeholder: 'Daily Rate' },
        { name: 'distant_average_daily_hours', label: 'Average Daily Hours', placeholder: 'Average Daily Hours' },
        { name: 'distant_weekly_rate', label: 'Weekly Rate', required: true, placeholder: 'Weekly Rate' },
        { name: 'distant_weekly_hours', label: 'Hours', placeholder: 'Hours' },
        { name: 'distant_6th_day', label: '6th Day', required: true, placeholder: '6th Day' },
        { name: 'distant_7th_day', label: '7th Day', required: true, placeholder: '7th Day' },
        { name: 'distant_dga_production_fee', label: 'DGA Production Fee', placeholder: 'DGA Production Fee' },
        { name: 'distant_overscale', label: 'Overscale %', placeholder: 'Overscale %' }
      ]
    }
      ];

      return (
        <div>
          <Form>
          {formData.map((form, index) => (
            <div key={index}>
              <div className="my-3">
                <p>{form.label}</p>
              </div>
               <Row key={form.label}>
              {form.fields.map((formField) => (
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
            </div>
            ))}
          </Form>
        </div>
      );
}

export default PayratesForm;
