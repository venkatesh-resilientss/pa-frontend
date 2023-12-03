import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function HandlingFeeForm() {
  const { register } = useForm();

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
              className="text-black form-label"
            >
              HF FLAT INVOICE AMOUNT
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="2">
            {" "}
            <Label
              className="text-black form-label"
            >
              Delivery By
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="2">
            <Label
              className="text-black form-label"
            >
              Cost
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="2">
            {" "}
            <Label
              className="text-black form-label"
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
          <div className="width120">
            <Label
              className="text-black form-label"
            >
              {typeName}
            </Label>
            <Input {...register} />
          </div>

          <div className="d-flex gap-1 m-auto ">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              % Taxable Gross
            </Label>
          </div>

          <div className="d-flex gap-1 m-auto ">
            <Input type="checkbox" {...register} />
            <Label
              className="text-black form-label"
            >
              Per Check
            </Label>
          </div>

          <div className="width120">
            <Label
              className="text-black form-label"
            >
              Min. Amount{" "}
            </Label>
            <Input {...register} />
          </div>

          <div>
            <Label
              className="text-black form-label"
            >
              Basis
            </Label>
            <ReactSelect {...register} />
          </div>

          <div className="width120">
            <Label
              className="text-black form-label"
            >
              Max. Amount{" "}
            </Label>
            <Input {...register} />
          </div>

          <div>
            <Label
              className="text-black form-label"
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
