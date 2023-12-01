import { Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";

function DocumentsForm({ control, errors }) {
    const formData =  { name: 'ndafile', label: 'NDA/NCA', required: false, type: 'file', placeholder: 'Select NDA/NCA' }

      return (
        <div>
          <div className="my-3">
            <p>Documents</p>
          </div>
          <Form>
            <Row>
                <Col>
                    <Label className="form-lable-font text-black"
                        style={{ fontSize: "14px", fontWeight: "400" }}>
                            {formData.label}
                    </Label>
                    <Controller
                    name={formData.name}
                    control={control}
                    rules={{ required: formData.required && `${formData.label} is required` }}
                    render={({ field }) => (
                        <Input
                        type="file"
                        className="p-2"
                        placeholder={formData.placeholder}
                        invalid={errors[`${formData.name}`] && formData.required && true}
                        {...field}
                        />
                    )}
                    />
                </Col>
            </Row>
          </Form>
        </div>
      );
}

export default DocumentsForm;
