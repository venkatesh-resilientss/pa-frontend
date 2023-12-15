import { Button, Col, Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { WcclassService } from "services";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";

function EditWcclass() {
  const router = useRouter();
  const { id } = router.query;
  const wcclassService = new WcclassService();

  const fetchwcclassDetails = (id) => wcclassService.wcclassDetails(id);

  const { data: wcclass } = useSWR(
    id ? ["WCCLASS_DETAILS", id] : null,
    () => fetchwcclassDetails(id)
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

  const { mutate: wcclassMutate } = useSWR("LIST_WCCLASS", () =>
  wcclassService.getWcclass({ search: "", pageLimit: 25, offset: 0 })
  );

  useEffect(() => {
    if (!wcclass) return;
    wcclass?.Code && setValue("Code", wcclass?.Code);
    wcclass?.Description && setValue("Description", wcclass?.Description);
    setActiveStatus(wcclass?.IsActive);
  }, [wcclass]);

  const onSubmit = (data) => {
    if (isSaving) return
    data.IsActive = activeStatus
    setIsSaving(true)
    wcclassService
      .editWcclass(id, data)
      .then(() => {
        setIsSaving(false)
        toast.success("Wc Class Edited successfully");
        mutate(wcclassMutate());
        router.push("/configurations/wcclass");
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
            Wc Class
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black add-agents-subheader"
            >
              Edit Wc Class
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

export default EditWcclass;
