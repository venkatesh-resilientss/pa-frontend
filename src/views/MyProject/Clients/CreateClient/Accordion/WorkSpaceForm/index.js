import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function WorkSpaceForm() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <Form>
        <Row>
          <Col xl="3">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Logo
            </Label>
            <Input type="file" {...register} />
          </Col>

          <Col xl="3">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Domain
            </Label>
            <div className="d-flex">
              <Input {...register} />
              <div className="m-auto text-black">.rrsl.io</div>{" "}
            </div>
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Cleint Admin
            </Label>
            <ReactSelect {...register} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default WorkSpaceForm;
