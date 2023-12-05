import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function AccountingInformationForm() {
  const { register } = useForm();

  return (
    <div>
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Parent Client Code
            </Label>
            <Input placeholder="Enter Parent Client Code" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Parent Client Name
            </Label>
            <Input placeholder="Enter Parent Client Name" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              RSSL Company
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              RSSL Invoice Address{" "}
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              RSSL Bank
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
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
