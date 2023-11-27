import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";

function HandlingFeeForm() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <div>
        <CustomForm typeName={"HF-ALL EE TYPES"} />
      </div>

      <div>
        <CustomForm typeName={"HF-CR"} />
      </div>

      <div>
        <CustomForm typeName={"HF-CR"} />
      </div>

      <div>
        <CustomForm typeName={"HF-TAL"} />
      </div>

      <div>
        <CustomForm typeName={"HF-CL"} />
      </div>

      <div>
        <CustomForm typeName={"HF-EX"} />
      </div>

      <div>
        <CustomForm typeName={"HF-ST"} />
      </div>

      <div>
        <CustomForm typeName={"HF-L/O"} />
      </div>

      <div>
        <CustomForm typeName={"HF-"} />
      </div>

      <div>
        <CustomForm typeName={"HF NON-TAX"} />
      </div>

      <div className="bg-white rounded border p-1">
        <Row>
          <Col xl="3">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              HF FLAT INVOICE AMOUNT
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Delivery By
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Cost
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Per
            </Label>
            <ReactSelect {...register} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HandlingFeeForm;

const CustomForm = ({ typeName }) => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-white rounded border p-1">
      <Form>
        <div className="d-flex gap-1">
          <div style={{ width: "120px" }}>
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              {typeName}
            </Label>
            <Input {...register} />
          </div>

          <div className="d-flex gap-1 m-auto ">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              % Taxable Gross
            </Label>
          </div>

          <div className="d-flex gap-1 m-auto ">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Per Check
            </Label>
          </div>

          <div style={{ width: "120px" }}>
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Min. Amount{" "}
            </Label>
            <Input {...register} />
          </div>

          <div>
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Basis
            </Label>
            <ReactSelect {...register} />
          </div>

          <div style={{ width: "120px" }}>
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Max. Amount{" "}
            </Label>
            <Input {...register} />
          </div>

          <div>
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Basis
            </Label>
            <ReactSelect {...register} />
          </div>
        </div>
      </Form>
    </div>
  );
};
