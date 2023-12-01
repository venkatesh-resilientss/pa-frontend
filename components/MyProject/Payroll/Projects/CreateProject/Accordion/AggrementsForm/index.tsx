import { ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Col, Form, Label, Row } from "reactstrap";

function AgreementsForm() {
  const { register, handleSubmit } = useForm();

  const options = [
    { value: "agreement1", label: "Agreement 1" },
    { value: "agreement2", label: "Agreement 2" },
    { value: "agreement3", label: "Agreement 3" },
  ];

  return (
    <div>
      <div className="my-3">
        <p>Aggrements</p>
      </div>
      <Form>
        <Row>
          <Col xl="5">
            <div className="d-flex justify-content-between">
              <Label
                className="text-black form-label"
              >
                List of Agreements
              </Label>
              <div className="text-info cursor-pointer">
                Create New Agreements <ArrowRight />
              </div>
            </div>
            <ReactSelect options={options} isMulti {...register} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AgreementsForm;
