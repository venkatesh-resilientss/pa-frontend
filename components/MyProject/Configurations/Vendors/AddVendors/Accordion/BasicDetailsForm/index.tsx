import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Input, Label, Row } from "reactstrap";

function BasicDetailsForm() {
  const {
    control,
    setError,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {};
  return (
    <div className="text-black">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Vendor Name
            </Label>
            <Controller
              name="AccountType"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="AccountType"
                  invalid={errors.AccountType && true}
                  {...field}
                />
              )}
            />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Vendor Code
            </Label>
            <Input placeholder="Enter Vendor Code ex:102910381" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Default Payment Type
            </Label>
            <ReactSelect {...register} isClearable />
          </Col>

          <Col xl="4">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Vendor Legal Name
            </Label>
            <Input placeholder="Enter Legal Name" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Vendor Email
            </Label>
            <Input placeholder="Enter Email" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Entity Type
            </Label>
            <ReactSelect {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Default Address
            </Label>
            <Input placeholder="Enter Address" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Work State
            </Label>
            <Input placeholder="Enter Work State" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Tax Id
            </Label>
            <Input placeholder=" Enter Tax Id" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Tax Id
            </Label>
            <Input placeholder=" Enter Tax Id" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Default Account{" "}
            </Label>
            <Input placeholder=" Enter Account" {...register} />
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              ACH Bank Routing Number{" "}
            </Label>
            <Input placeholder=" Enter Routing Number" {...register} />
          </Col>
          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              ACH Bank Acoount Number{" "}
            </Label>
            <Input placeholder=" Enter Account Number" {...register} />
          </Col>

          <Col xl="4">
            <Label
              className="text-black"
              style={{ fontSize: "14px", fontWeight: "400" }}
            >
              Payee Name
            </Label>
            <Input placeholder=" Enter Payee Name" {...register} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default BasicDetailsForm;
