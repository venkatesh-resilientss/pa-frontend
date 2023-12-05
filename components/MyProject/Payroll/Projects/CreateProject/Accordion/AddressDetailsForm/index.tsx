import { Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";

function BasicDetailsForm({ control, errors }) {

  const physicalAddress = [
    { name: 'physicalAddressLine1', label: 'Address Line 1', required: true, placeholder: 'Enter Address Line 1' },
    { name: 'physicalAddressLine2', label: 'Address Line 2', required: true, placeholder: 'Enter Address Line 2' },
    { name: 'physicalCity', label: 'City', required: true, placeholder: 'Enter City' },
    { name: 'physicalState', label: 'State', required: true, placeholder: 'Enter State' },
    { name: 'physicalZip', label: 'Zip', required: true, placeholder: 'Enter Zip' },
    { name: 'worklocation', label: 'All Work Location Address', type: 'select', required: false, placeholder: 'Select Work Location' },
    { name: 'checkDeliveryMethod', label: 'Check Delivery Method', type: 'select', required: false, placeholder: 'Select Delivery Method' }
  ]

  const invoiceAddress = [
    { name: 'invoiceAddressLine1', label: 'Address Line 1', required: true, placeholder: 'Enter Address Line 1' },
    { name: 'invoiceAddressLine2', label: 'Address Line 2', required: true, placeholder: 'Enter Address Line 2' },
    { name: 'invoiceCity', label: 'City', required: true, placeholder: 'Enter City' },
    { name: 'invoiceState', label: 'State', required: true, placeholder: 'Enter State' },
    { name: 'invoiceZip', label: 'Zip', required: true, placeholder: 'Enter Zip' }
  ]

  const officeAddress = [
    { name: 'officeAddressLine1', label: 'Address Line 1', placeholder: 'Enter Address Line 1' },
    { name: 'officeAddressLine2', label: 'Address Line 2', placeholder: 'Enter Address Line 2' },
    { name: 'officeCity', label: 'City', placeholder: 'Enter City' },
    { name: 'officeState', label: 'State', placeholder: 'Enter State' },
    { name: 'officeZip', label: 'Zip', required: false, placeholder: 'Enter Zip' }
  ]

  return (
    <div>
      <div className="my-3">
        <p>Address Information</p>
      </div>
      <Form>
        <div className="my-3">
          <p>Physical Address Information</p>
        </div>
        <Row>
          {physicalAddress.map((formField) => (
            <Col xl="4" className="p-2" key={formField.name}>
              <Label className="form-lable-font">{formField.label}{formField.required && '*'}</Label>
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
                <span className="text-danger">
                  {errors[`${formField.name}`].message as React.ReactNode}
                </span>
              )}
            </Col>
          ))}
          {/* <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Address Line 1*
            </Label>
            <Input placeholder="Enter Address Line 1" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Address Line 2
            </Label>
            <Input placeholder="Enter Address Line 2" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              City*
            </Label>
            <Input placeholder="Enter City" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              State*
            </Label>
            <Input placeholder="Enter State" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Zip*
            </Label>
            <Input placeholder="Enter Zip" {...register} />
          </Col> */}
        </Row>
        <div className="my-3">
          <p>Invoice Address Information</p>
        </div>
        <Row>
          {invoiceAddress.map((formField) => (
            <Col xl="4" className="p-2" key={formField.name}>
              <Label className="text-black" style={{ fontSize: "14px", fontWeight: "400" }}>{formField.label}{formField.required && '*'}</Label>
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
                <span className="text-danger">
                  {errors[`${formField.name}`].message as React.ReactNode}
                </span>
              )}
            </Col>
          ))}
          {/* <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Address Line 1*
            </Label>
            <Input placeholder="Enter Address Line 1" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Address Line 2
            </Label>
            <Input placeholder="Enter Address Line 2" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              City*
            </Label>
            <Input placeholder="Enter City" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              State*
            </Label>
            <Input placeholder="Enter State" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Zip*
            </Label>
            <Input placeholder="Enter Zip" {...register} />
          </Col> */}
        </Row>
        <div className="my-3">
          <p>Production Office Address (if different from above)</p>
        </div>
        <Row>
          {officeAddress.map((formField) => (
            <Col xl="4" className="p-2" key={formField.name}>
              <Label className="form-lable-font">{formField.label}{formField.required && '*'}</Label>
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
                <span className="text-danger">
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

export default BasicDetailsForm;
