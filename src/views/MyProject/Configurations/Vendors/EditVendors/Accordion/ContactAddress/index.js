import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function ContactAddressForm() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="text-black">
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Contact Address Line 1
            </Label>
            <Input placeholder="Enter Contact Address Line 1" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Contact Address Line 2
            </Label>
            <Input placeholder="Enter Contact Address Line 2" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              State{" "}
            </Label>
            <Input placeholder="Enter State" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Postal Code
            </Label>
            <Input placeholder="Enter Postal Code" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              City
            </Label>
            <Input placeholder="Enter City" {...register} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ContactAddressForm;