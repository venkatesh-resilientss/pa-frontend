import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { Plus } from "react-feather";

function ContactInformationForm() {
  const { register, handleSubmit } = useForm();
  const [value, setValue] = useState();

  return (
    <div>
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Company Primary Contact
            </Label>
            <Input placeholder="Enter Name" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Title
            </Label>
            <Input placeholder="Enter Title" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Office Phone
            </Label>
            <Input placeholder="Enter Office Phone Number" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Phone Number
            </Label>
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
            />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Email
            </Label>
            <Input placeholder="Enter Email" {...register} />
          </Col>
          <Col xl="4"></Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Company Secondary Contact
            </Label>
            <Input placeholder="Enter Name" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Title
            </Label>
            <Input placeholder="Enter Title" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Office Phone
            </Label>
            <Input placeholder="Enter Office Phone Number" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Phone Number
            </Label>
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
            />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Email
            </Label>
            <Input placeholder="Enter Email" {...register} />
          </Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-end">
        <Button color="white">
          <Plus />
          Add New Contact
        </Button>
      </div>
    </div>
  );
}

export default ContactInformationForm;
