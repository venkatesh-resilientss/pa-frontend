import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";
function BasicDetailsForm({ control, errors }) {

  const childFields = [
    { name: 'name', label: 'Client Name', required: true, placeholder: 'Client Name' },
    { name: 'code', label: 'Client Code', required: true, placeholder: 'Enter Client Code ex:102910381' },
    { name: 'legal', label: 'Client Legal Name (If different)', placeholder: 'Enter Legal Name' },
    { name: 'fein', label: 'FEIN', placeholder: 'Enter FEIN' },
    { name: 'routing', label: 'Routing Number', placeholder: 'Enter Routing Number' },
    { name: 'bank_name', label: 'Bank Name', placeholder: 'Enter Bank Name', type: 'select' },
    { name: 'account_number', label: 'Account Number', placeholder: 'Enter Account Number' }
  ];

  return (
    <div>
      <div className="my-3">
        <p>Basic Information</p>
      </div>
      <Form>
        <Row>
          {childFields.map((formField) => (
            <Col xl="4" key={formField.name}>
              <Label className="text-black" style={{ fontSize: "14px", fontWeight: "400" }}>{formField.label}{formField.required && '*'}</Label>
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
                <span style={{ color: "red" }}>
                  {errors[`${formField.name}`].message as React.ReactNode}
                </span>
              )}
            </Col>
          ))}
          {/* <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Client Legal Name (If different){" "}
            </Label>
            <Input placeholder="Enter Legal Name" {...register} />
          </Col> */}

          {/* <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              FEIN
            </Label>
            <Input placeholder="Enter FEIN" {...register} />
          </Col> */}
          {/* <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Routing #
            </Label>
            <Input placeholder="Routing Number" {...register} />
          </Col> */}

          {/* <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Bank Name
            </Label>
            <ReactSelect {...register} isClearable />
          </Col> */}

          {/* <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Account Number
            </Label>
            <Input placeholder="Routing Number" {...register} />
          </Col> */}
        </Row>
      </Form>
    </div>
  );
}

export default BasicDetailsForm;
