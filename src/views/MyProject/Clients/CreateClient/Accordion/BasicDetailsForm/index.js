import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function BasicDetailsForm() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Client Name
            </Label>
            <Input placeholder="Enter Name" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Client Code
            </Label>
            <Input placeholder="Enter Client Code ex:102910381" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Client Legal Name (If different){" "}
            </Label>
            <Input placeholder="Enter Legal Name" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              FEIN
            </Label>
            <Input placeholder="Enter FEIN" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Physical Address
            </Label>
            <Input placeholder="Enter Address" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Invoice Address
            </Label>
            <Input placeholder="Enter Invoice Address" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Routing #
            </Label>
            <Input placeholder="Routing Number" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Bank Name
            </Label>
            <ReactSelect {...register} isClearable />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
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
