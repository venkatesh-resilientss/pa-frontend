import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function AccountingInformationForm() {
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
              Parent Client Code
            </Label>
            <Input placeholder="Enter Parent Client Code" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Parent Client Name
            </Label>
            <Input placeholder="Enter Parent Client Name" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              RSSL Company
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              RSSL Invoice Address{" "}
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              RSSL Bank
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              PSA Signed Date{" "}
            </Label>
            <Input type="date" {...register} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AccountingInformationForm;
