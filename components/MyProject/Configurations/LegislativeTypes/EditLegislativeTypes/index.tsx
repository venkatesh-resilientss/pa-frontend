import { Button, Col, Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LegislativesService } from "services";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";

function EditLegislativeType() {
  const router = useRouter();
  const { id } = router.query;

  const legislativesService = new LegislativesService();

  const fetchlegislativesDetails = (id) => legislativesService.legislativesDetails(id);

  const { data: legislative } = useSWR(
    id ? ["LEGISLATIVE_DETAILS", id] : null,
    () => fetchlegislativesDetails(id)
  );
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const [activeStatus, setActiveStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { mutate: legislativeMutate } = useSWR("LIST_LEGISLATIVES", () =>
  legislativesService.getlegislatives({ search: "", pageLimit: 25, offset: 0 })
  );

  useEffect(() => {
    if (!legislative) return;
    legislative?.Code && setValue("code", legislative?.Code);
    legislative?.Description && setValue("description", legislative?.Description);
    legislative?.Name && setValue("name", legislative?.Name);
    setActiveStatus(legislative?.IsActive);
  }, [legislative]);

  const onSubmit = (data) => {
    if (isSaving) return
    data.IsActive = activeStatus
    setIsSaving(true)
    legislativesService
      .editlegislatives(id, data)
      .then(() => {
        setIsSaving(false)
        toast.success("Legislative Edited successfully");
        mutate(legislativeMutate());
        router.push("/configurations/legislative-type");
        reset();
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error);
      });
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
              Edit Legislative Type
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
                      {...field}
                        className="inputFeild"
                        placeholder="Description"
                      />
                    )}
                  />
                </div>
              </Col>

            </Row>
            <Row>
              <Col>
                <div className="d-flex flex-column mt-1">
                  <Label className="form-lable-font">Status </Label>
                  <div className="d-flex gap-1">
                    <div className="d-flex gap-1">
                      <input
                        className="custom-radio-input"
                        type="radio"
                        id="ex1-active"
                        name="ex1"
                        checked={activeStatus}
                        onChange={() => {
                          setActiveStatus(true);
                        }}
                      />
                      <div className="radio-text">Active</div>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        type="radio"
                        className="custom-radio-input"
                        name="ex1"
                        id="ex1-inactive"
                        checked={!activeStatus}
                        onChange={() => {
                          setActiveStatus(false);
                        }}
                      />
                      <div className="radio-text">In-Active</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditLegislativeType;
