import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { Plus, Delete } from "react-feather";
import { useState } from "react";
import InvalidFeedBack from "components/Generic/InvalidFeedBack";

function FeesForm({ control, errors }) {
  const { register } = useForm();
  const [feeModal, setFeeModal] = useState(false);
  const toggle = () => setFeeModal(!feeModal);

  const form = [
    { name: 'wcMargin', label: 'WC Margin', type: 'select', placeholder: 'Enter WC Margin' },
    { name: 'sutaMargin', label: 'SUTA Margin', type: 'select', placeholder: 'Enter SUTA Margin' },
    { name: 'breakageat', label: 'Breakage at', type: 'select', placeholder: 'Breakage at' },
    { name: 'hfRebateAmount', label: 'HF Rebate Amount', required: true, placeholder: 'HF Rebate Amount' },
    { name: 'wcRebateAmount', label: 'W/C Rebate Amount', required: true, placeholder: 'W/C Rebate Amount' },
    { name: 'deliveryBy', label: 'Delivery By', type: 'select', placeholder: 'Delivery By' },
    { name: 'cost', label: 'Cost', required: true, placeholder: 'Cost' },
    { name: 'per', label: 'Per', type: 'select', placeholder: 'Per' },
    { name: 'weeklyCutoffs', label: 'Weekly Cutoffs', type: 'check', placeholder: 'Weekly Cutoffs' },
    { name: 'billonPremiumOT', label: 'Bill on Premium OT', type: 'check', placeholder: 'Bill on Premium OT' },
    { name: 'taxableAllow', label: 'Taxable Allow', type: 'check', placeholder: 'Taxable Allow' },
    { name: 'taxCutoffs', label: 'P/R Tax Cutoffs', type: 'check', placeholder: 'P/R Tax Cutoffs' },
    { name: 'reduceonPretax', label: 'Reduce on Pretax', type: 'check', placeholder: 'Reduce on Pretax' }
  ]


  const [formData, setFormData] = useState([
    { fieldName: 'Fee Type', value: '' }
  ]);

  const addNewForm = () => {
    setFormData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, fieldName: `Field ${prevData.length + 1}`, value: '' },
    ]);
  };

  const removeForm = (form) => {
    if (form === 0) {
      return
    }
    setFormData((prevData) => prevData.filter((data, index) => index !== form));
  };

  return (
    <div>
       <div className="my-3">
        <p>Fees</p>
      </div>
      <Form>
        <Row>
        {form.map((formField, index) => (
         <Col xl="4" className="p-2" key={index}>
          {formField.type !== 'check' && <Label className="form-lable-font text-black form-label">
                {formField.label}{formField.required && '*'}
        </Label>}
         {formField.type === 'select' ? (
            <Controller
            name={formField.name}
            control={control}
            rules={{ required: formField.required && `${formField.label} is required` }}
            render={({ field }) => (
              <ReactSelect {...field} isClearable />
            )}
            />
         ) : formField.type === 'check'? (
          <Controller
           name={formField.name}
           control={control}
           rules={{ required: formField.required && `${formField.label} is required` }}
           render={({ field }) => (
            <div className="m-4">
             <Input
               type="checkbox"
               className="p-2"
               placeholder={formField.placeholder}
               invalid={errors[`${formField.name}`] && formField.required && true}
               {...field}
             />
             <Label
              className="text-black checkbox-label"
            >
              {formField.label}
            </Label>
            </div>
           )}
         />
         ) : (
          <Controller
           name={formField.name}
           control={control}
           rules={{ required: formField.required && `${formField.label} is required` }}
           render={({ field }) => (
             <Input
               type="text"
               className="p-2"
               placeholder={formField.placeholder}
               invalid={errors[`${formField.name}`] && formField.required && true}
               {...field}
             />
           )}
         />
         )}
         {errors[`${formField.name}`] && formField.required && (
          <InvalidFeedBack message={errors[`${formField.name}`].message} />
         )}
       </Col>
      ))}
        </Row>
      </Form>
      <div>
        <div className="d-flex justify-content-end">
          <Button className="button-props my-3 gap-3" onClick={toggle}>
            Import from Client
          </Button>
        </div>
      </div>
      <div>
      {formData.map((formField, feeindex) => (
        <div key={feeindex} className="d-flex">
          <CustomForm typeName={formField.fieldName} />
          <Button
                color="link"
                className="text-decoration-none"
                onClick={() => {
                  removeForm((feeindex));
                }}
              >
            <Delete/>
          </Button>
        </div>
      ))}
      <div>
        <div className="d-flex justify-content-end">
          <Button className="button-props my-3 gap-3" onClick={addNewForm}>
          <Plus /> Add Fee
          </Button>
        </div>
      </div>
    </div>
    <Modal isOpen={feeModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Import Fees from Client</ModalHeader>
        <ModalBody>
          <div>
          <Label
              className="text-black form-label"
            >
              Fees
            </Label>
            <ReactSelect {...register} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              toggle();
            }}
          >
            Import
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FeesForm;

const CustomForm = ({ typeName }) => {
  const { register } = useForm();

  return (
    <div className="bg-white rounded border p-2">
      <Form>
        <div className="d-flex gap-1">
          <div>
            <Label
              className="text-black form-label"
            >
              {typeName}
            </Label>
            <ReactSelect {...register} />
          </div>

          <div className="width120">
            <Label
              className="text-black form-label"
            >
              Amount{" "}
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