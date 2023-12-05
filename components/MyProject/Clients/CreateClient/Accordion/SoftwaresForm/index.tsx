import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function SoftwaresForm() {
  const { register } = useForm();
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "120px",
    }),
  };
  return (
    <div>
      <Form>
        <Row>
          <Col xl="12" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              Onboarding
            </Label>
          </Col>

          <Col xl="12" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              Production Account{" "}
            </Label>
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black form-label"
            >
              Features
            </Label>
            <ReactSelect isMulti {...register} />
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Costs
            </Label>
            <Input style={{ width: "120px" }} {...register} />
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Per Invoice
            </Label>
            <ReactSelect styles={customStyles} {...register} />
          </Col>

          <Col xl="12" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              Electronic Time Capture
            </Label>
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Costs
            </Label>
            <Input style={{ width: "120px" }} {...register} />
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Per
            </Label>
            <ReactSelect styles={customStyles} {...register} />
          </Col>

          <Col xl="12" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              COA
            </Label>
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Costs
            </Label>
            <Input style={{ width: "120px" }} {...register} />
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Per
            </Label>
            <ReactSelect styles={customStyles} {...register} />
          </Col>

          <Col xl="12" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              ACA
            </Label>
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Costs
            </Label>
            <Input style={{ width: "120px" }} {...register} />
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Per
            </Label>
            <ReactSelect styles={customStyles} {...register} />
          </Col>
          <Col xl="6"></Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Credit Terms
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              # Days +- Release
            </Label>
            <Input type="number" {...register} />
          </Col>

          <Col xl="12" className="d-flex gap-1 m-auto">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              Allow Direct Deposits
            </Label>
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Costs
            </Label>
            <Input style={{ width: "120px" }} {...register} />
          </Col>

          <Col xl="3" className="d-flex gap-1 mt-auto">
            <Label
              className="text-black mt-2"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Per
            </Label>
            <ReactSelect styles={customStyles} {...register} />
          </Col>
          <Col xl="4"></Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Invoice Format{" "}
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black form-label"
            >
              Copy from Client{" "}
            </Label>
            <ReactSelect {...register} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SoftwaresForm;
