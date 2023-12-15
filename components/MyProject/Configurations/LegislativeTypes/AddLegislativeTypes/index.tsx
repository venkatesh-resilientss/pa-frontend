import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { LegislativesService } from "services";
function AddLegislativeType() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const legislativesService = new LegislativesService();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSaving) return
    setIsSaving(true)
    try {
      legislativesService
        .createlegislatives(data)
        .then(() => {
          setIsSaving(false)
          toast.success("Legislative Type added successfully");
          router.push("/configurations/legislative-type");
          reset();
        })
        .catch((error) => {
          setIsSaving(false)
          toast.error(error?.error);
        });
    } catch (error) {
      toast.error("Error adding Legislative Type");
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
            Legislative Type
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black add-agents-subheader"
            >
              Add New Legislative Type
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
                  <Label className="form-lable-font">Legislative Code<span className="text-danger">*</span></Label>
                  <Controller
                    name="code"
                    rules={{ required: "Legislative Code is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Legislative Code"
                        invalid={errors.code && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.code && (
                    <span className="text-danger">
                      {errors.code.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Legislative Name<span className="text-danger">*</span></Label>
                  <Controller
                    name="name"
                    rules={{ required: "Legislative Name is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Legislative Name"
                        invalid={errors.name && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.name && (
                    <span className="text-danger">
                      {errors.name.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Description</Label>
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

            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddLegislativeType;
