import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function PayratesForm({ control, errors }) {
    const formData = [{
      label: "Studio", fields: [
        { name: 'studio_daily', label: 'DAILY', type: 'check', placeholder: 'Schedule' },
        { name: 'studio_hourly_rate', label: 'Hourly Rate', placeholder: 'Hourly Rate' },
        { name: 'studio_daily_rate', label: 'Daily Rate', placeholder: 'Daily Rate' },
        { name: 'studio_average_daily_hours', label: 'Average Daily Hours', placeholder: 'Average Daily Hours' },
        { name: 'studio_weekly', label: 'WEEKLY', type: 'check', placeholder: 'Schedule' },
        { name: 'studio_weekly_hourly_rate', label: 'Hourly Rate', placeholder: 'Hourly Rate' },
        { name: 'studio_weekly_daily_rate', label: 'Weekly Rate', placeholder: 'Daily Rate' },
        { name: 'studio_weekly_hours', label: 'Hours', placeholder: 'Average Daily Hours' },
        { name: 'studio_oncall', label: 'On-Call or Exempt', type: 'check', placeholder: 'Schedule' },
        { name: 'studio_oncall_daily_rate', label: 'Daily Rate', placeholder: 'Daily Rate' },
        { name: 'studio_oncall_weekly_rate', label: 'Weekly Rate', placeholder: 'Hourly Rate' },
        { name: 'studio_oncall_hours', label: 'Hours', placeholder: 'Average Daily Hours' },
        { name: 'studio_6th_day', label: '6th Day', placeholder: '6th Day' },
        { name: 'studio_7th_day', label: '7th Day', required: false, placeholder: '7th Day' },
        { name: 'studio_dga_production_fee', label: 'DGA Production Fee', placeholder: 'DGA Production Fee' },
        { name: 'studio_overscale', label: 'Overscale %', placeholder: 'Overscale %' }
      ]
    },
    {
      label: "Distant", fields: [
        { name: 'distant_daily', label: 'DAILY', type: 'check', placeholder: 'Schedule' },
        { name: 'distant_hourly_rate', label: 'Hourly Rate', placeholder: 'Hourly Rate' },
        { name: 'distant_daily_rate', label: 'Daily Rate', placeholder: 'Daily Rate' },
        { name: 'distant_average_daily_hours', label: 'Average Daily Hours', placeholder: 'Average Daily Hours' },
        { name: 'distant_weekly', label: 'WEEKLY', type: 'check', placeholder: 'Schedule' },
        { name: 'distant_weekly_hourly_rate', label: 'Hourly Rate', placeholder: 'Hourly Rate' },
        { name: 'distant_weekly_daily_rate', label: 'Weekly Rate', placeholder: 'Daily Rate' },
        { name: 'distant_weekly_hours', label: 'Hours', placeholder: 'Average Daily Hours' },
        { name: 'distant_oncall', label: 'On-Call or Exempt', type: 'check', placeholder: 'Schedule' },
        { name: 'distant_oncall_daily_rate', label: 'Daily Rate', placeholder: 'Daily Rate' },
        { name: 'distant_oncall_weekly_rate', label: 'Weekly Rate', placeholder: 'Hourly Rate' },
        { name: 'distant_oncall_hours', label: 'Hours', placeholder: 'Average Daily Hours' },
        { name: 'distant_6th_day', label: '6th Day', placeholder: '6th Day' },
        { name: 'distant_7th_day', label: '7th Day', required: false, placeholder: '7th Day' },
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
                <Col xl="3" key={formField.name}>
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
