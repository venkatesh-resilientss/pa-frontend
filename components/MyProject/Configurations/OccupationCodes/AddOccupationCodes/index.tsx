import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import React, { useState } from "react";
import ExtendedMultiSelect from "@/components/ExtendedMultiSelect";
export type Option = {
  value: number | string;
  label: string;
};
function AddOccupationCodes() {

  const router = useRouter();
  const options = [
    { value: 0, label: "Goranboy" },
    { value: 1, label: "Safikurd" },
    { value: 2, label: "Baku" },
    { value: 3, label: "Ganja" },
  ];
  const [optionSelected, setSelected] = useState<Option[] | null>();
  const handleChange = (selected: Option[]) => {
    setSelected(selected);
  };
  const onSubmit = async () => {
    // Handle form submission logic here
    try {
      // Your logic to save the form data
      toast.success("Company added successfully");
      router.push("/configurations/company");
    } catch (error) {
      toast.error("Error adding company");
      console.error(error);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="section mt-4 occupation-codes">
        <div className="overflow-auto">
          <div
            className="text-black occupation-header"
          >
            Occupation Code
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black occupation-subheader"
            >
              Add Occupation Code
            </div>
          </div>

          <hr className="occupation-hr" />
          <Form
            className=" mt-2 d-flex flex-column occupation-form"
            onClick={handleSubmit(onSubmit)}
          >
            <Row>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">OCC Code<span className="text-danger">*</span></Label>
                  <Controller
                    name="OCCCode"
                    rules={{ required: "OCC Code is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="OCC Code"
                        invalid={errors.OCCCode && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.OCCCode && (
                    <span className="text-danger">
                      {errors.OCCCode.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Description<span className="text-danger">*</span></Label>
                  <Controller
                    name="Description"
                    rules={{ required: "Description is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Description"
                        invalid={errors.Description && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.Description && (
                    <span className="text-danger">
                      {errors.Description.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">WC Class<span className="text-danger">*</span></Label>
                  <Controller
                    name="WCClass"
                    rules={{ required: "WC Class is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Series Code"
                        invalid={errors.WCClass && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.WCClass && (
                    <span className="text-danger">
                      {errors.WCClass.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Employee Type<span className="text-danger">*</span></Label>
                  <Controller
                    name="EmployeeType"
                    rules={{ required: "Employee Type is required" }}
                    control={control}
                    render={() => (
                      <ExtendedMultiSelect
                        key="example_id"
                        options={options}
                        onChange={handleChange}
                        value={optionSelected}
                        isSelectAll={true}
                        menuPlacement={"top"}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col><div className="d-flex flex-column mt-1">
                <Label className="form-lable-font">Status </Label>
                <div className="d-flex gap-1">
                  <div className="d-flex gap-1">
                    <input
                      type="radio"
                      id="ex1-active"
                      checked={true}
                      name="ex1"
                    />
                    <div>Active</div>
                  </div>
                  <div className="d-flex gap-1">
                    <input
                      type="radio"
                      name="ex1"
                      id="ex1-inactive"
                    />
                    <div>In-Active</div>
                  </div>
                </div>
              </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Controller
                    name="OFFProduction"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        className="p-2 occupation-checkboox"
                        placeholder="OFF Production"
                        {...field}
                      />
                    )}
                  />
                  <Label className="form-lable-font occupation-checkbox-text">OFF Production</Label>
                </div>
              </Col>

            </Row>

            <Row className="occupation-button-header">
              <Col>
                <div className="d-flex me-2 gap-20">
                  <Button
                    onClick={() => router.back()}
                    className="buttonStyle"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    className="buttonStyle1"
                  >
                    Save
                  </Button>
                </div></Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddOccupationCodes;
