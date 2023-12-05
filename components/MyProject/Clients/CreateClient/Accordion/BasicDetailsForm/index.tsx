import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function BasicDetailsForm() {
  const { register } = useForm();

  return (
    <div>
      <div className="my-3">
        <p>Basic Information</p>
      </div>
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Client Name
            </Label>
            <Input placeholder="Enter Name" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Client Code
            </Label>
            <Input placeholder="Enter Client Code ex:102910381" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Client Legal Name (If different){" "}
            </Label>
            <Input placeholder="Enter Legal Name" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              FEIN
            </Label>
            <Input placeholder="Enter FEIN" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Physical Address
            </Label>
            <Input placeholder="Enter Address" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Invoice Address
            </Label>
            <Input placeholder="Enter Invoice Address" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Routing #
            </Label>
            <Input placeholder="Routing Number" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Bank Name
            </Label>
            <ReactSelect {...register} isClearable />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Account Number
            </Label>
            <Input placeholder="Routing Number" {...register} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default BasicDetailsForm;
