import { useForm } from "react-hook-form";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { Plus } from "react-feather";

function ContactInformationForm() {
  const { register } = useForm();

  return (
    <div>
      <div className="my-3">
        <p>Contact Information</p>
      </div>
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Company Primary Contact
            </Label>
            <Input placeholder="Enter Name" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Title
            </Label>
            <Input placeholder="Enter Title" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Office Phone
            </Label>
            <Input placeholder="Enter Office Phone Number" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Phone Number
            </Label>
            <Input
              placeholder="Enter phone number"
              // value={value}
              // onChange={setValue}
              {...register}
            />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Email
            </Label>
            <Input placeholder="Enter Email" {...register} />
          </Col>
          <Col xl="4"></Col>
          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Company Secondary Contact
            </Label>
            <Input placeholder="Enter Name" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Title
            </Label>
            <Input placeholder="Enter Title" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Office Phone
            </Label>
            <Input placeholder="Enter Office Phone Number" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Phone Number
            </Label>
            <Input
              placeholder="Enter phone number"
              // value={value}
              {...register}
            // onChange={setValue}
            />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
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
