import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { WcclassService } from "services";
import { useState } from "react";
function AddWcclass() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const wcclassService = new WcclassService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if(isSaving) return
    setIsSaving(true)
    try {
      wcclassService
      .createWcclass(data)
      .then(() => {
        setIsSaving(false)
        toast.success("Wc Class added successfully");
        router.push("/configurations/wcclass");
        reset();
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error);
      });
    } catch (error) {
      toast.error("Error adding Wc Class");
      console.error(error);
    }
  };

 
  return (
    <>
      <div className="section mt-4">
        <div className="overflow-auto add-agents">
          <div
            className="text-black add-agents-header"
          >
            Wc Class
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black add-agents-subheader"
            >
              Add New Wc Class
            </div>
            <div className="d-flex me-2 " style={{ gap: "10px" }}>
              <Button
                onClick={() => router.back()}
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  height: "34px",
                  backgroundColor: "transparent",
                  color: "#2D2C2C",
                  border: "none",
                }}
              >
                Dismiss
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                color="primary"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  height: "34px",
                }}
              >
                Save
              </Button>
            </div>
          </div>

          <hr style={{ height: "2px" }} />
          <Form
            className=" mt-2 d-flex flex-column add-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Wc Class<span className="text-danger">*</span></Label>
                  <Controller
                    name="Code"
                    rules={{ required: "Wc Class is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Wc Class"
                        invalid={errors.Code && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.Code && (
                    <span className="text-danger">
                      {errors.Code.message as React.ReactNode}
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
                        invalid={errors.description && true}
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
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddWcclass;
