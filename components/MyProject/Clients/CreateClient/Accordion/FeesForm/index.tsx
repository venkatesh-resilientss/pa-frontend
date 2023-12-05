import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function FeesForm() {
  const { register } = useForm();

  return (
    <div>
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              WC Table
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              Weekly Cutoffs
            </Label>
          </Col>

          <Col xl="4" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              Bill on Premium OT
            </Label>
          </Col>

          <Col xl="4" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              Taxable Allow
            </Label>
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              SUTA Table
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              P/R Tax Cutoffs
            </Label>
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Breakage at
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              HF Rebate Amount
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
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
