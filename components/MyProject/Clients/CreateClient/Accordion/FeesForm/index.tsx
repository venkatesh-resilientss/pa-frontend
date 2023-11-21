import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function FeesForm() {
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
              WC Table
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Weekly Cutoffs
            </Label>
          </Col>

          <Col xl="4" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Bill on Premium OT
            </Label>
          </Col>

          <Col xl="4" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Taxable Allow
            </Label>
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              SUTA Table
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              P/R Tax Cutoffs
            </Label>
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Breakage at
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              HF Rebate Amount
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              W/C Rebate Amount
            </Label>
            <Input {...register} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default FeesForm;
