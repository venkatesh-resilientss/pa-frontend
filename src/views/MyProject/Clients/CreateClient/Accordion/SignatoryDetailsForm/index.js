import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { Plus } from "react-feather";
import { LiaGreaterThanSolid } from "react-icons/lia";

function SignatoryDetailsForm() {
  const { register, handleSubmit } = useForm();
  const [value, setValue] = useState();

  return (
    <div>
      <Form>
        <Row>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              MPIPHP Signatory Code
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Signatory Name
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4"></Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              SAG Signatory Code
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Signatory Name
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4"></Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              DGA Signatory Code
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Signatory Name
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4"></Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              WGA Signatory Code
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Signatory Name
            </Label>
            <Input {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              MPIPHP <LiaGreaterThanSolid /> 15 Million
            </Label>
            <div
              className="text-black d-flex gap-1 "
              style={{ marginTop: "10px" }}
            >
              {" "}
              <div>
                <input type="radio" {...register} /> Yes
              </div>
              <input type="radio" {...register} /> No
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SignatoryDetailsForm;
