import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import {
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

function WorkSpaceForm() {
  const { register } = useForm();

  return (
    <div>
      <div className="my-3">
        <p>Workspace</p>
      </div>
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Logo
            </Label>
            <Input type="file" {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Domain
            </Label>
            <InputGroup>
              <Input {...register} />
              <InputGroupText>.rssl.io</InputGroupText>
            </InputGroup>
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
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              RSSL Support User
            </Label>
            <Input type="select" name="select" id="exampleSelect">
              <option style={{ color: "grey" }} disabled>
                Select Admin
              </option>
              <option>Admin 1</option>
              <option>Admin 2</option>
            </Input>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default WorkSpaceForm;
