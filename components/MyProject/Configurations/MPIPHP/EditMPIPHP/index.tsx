import { Button, Col,Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";

function EditMPIPHPTable() {
  const router = useRouter();


  const onSubmit = async () => {
    // Handle form submission logic here
    try {
      // Your logic to save the form data
      toast.success("MPIPHP Code saved successfully");
      router.push("/configurations/MPIPHP");
    } catch (error) {
      toast.error("Error adding MPIPHP code");
      console.error(error);
    }
  };
  const options = [
    { value: 0, label: "Goranboy" },
    { value: 1, label: "Safikurd" },
    { value: 2, label: "Baku" },
    { value: 4, label: "Shusha" },
    { value: 5, label: "Agdam" },
  ];
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  return (
    <>
      <div className="overflow-auto mt-4 add-agents ">
        <div
          className="text-black add-agents-header"
        >
          MPIPHP Production Code
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="text-black add-agents-subheader"
          >
            Edit MPIPHP Production Code
          </div>
          
        </div>

        <hr className="height-2"/>

        <Form
            className=" mt-2 d-flex flex-column add-form"
            onClick={handleSubmit(onSubmit)}
          >
            <Row>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Project Type<span className="text-danger">*</span></Label>
                  <Controller
                    name="ProjectType"
                    rules={{ required: "Project Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="inputFeild"
                        placeholder="Project Type"
                        options={options}
                        {...field}
                      />
                    )}
                  />
                  {errors.ProjectType && (
                    <span className="text-danger">
                      {errors.ProjectType.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Project Description</Label>
                  <Controller
                    name="Description"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Description"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">UNION/GUILD</Label>
                  <Controller
                    name="UNION"
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="inputFeild"
                        placeholder="UNION/GUILD"
                        options={options}
                        {...field}

                      />
                    )}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">MPIPHP Production Code<span className="text-danger">*</span></Label>
                  <Controller
                    name="MPIPHPProductionCode"
                    rules={{ required: "MPIPHP Production Code is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="MPIPHP Production Code"
                        invalid={errors.MPIPHPProductionCode && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.MPIPHPProductionCode && (
                    <span className="text-danger">
                      {errors.MPIPHPProductionCode.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col><div className="d-flex flex-column mt-1">
                <Label className="form-lable-font">Status </Label>
                <div className="d-flex gap-1">
                  <div className="d-flex gap-1">
                    <input
                      type="radio"
                      id="ex1-active"
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
            </Row>
            <Row className="margin-t-20">
              <Col>
                <div className="d-flex me-2 gap-20 ">
                  <Button
                    onClick={() => router.back()}
                    className="buttonStyle buttons-width"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    className="buttonStyle1 buttons-width"
                  >
                    Save
                  </Button>
                </div></Col>
            </Row>
          </Form>
      </div>
    </>
  );
}

export default EditMPIPHPTable;
