import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function ProjectDetailsForm() {
  const { register } = useForm();

  return (
    <div>
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Project Types
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Departments
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Pay Frequency
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Period Ending Day
            </Label>
            <Input type="date" {...register} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProjectDetailsForm;
