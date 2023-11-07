import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { SetsService } from "@src/services";
import { toast } from "react-toastify";
import { useState } from "react";

function index() {
  const {
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [activeStatus, setActiveStatus] = useState();

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.setname,
      code: data.setcode,
      description: data.description,
      is_active: activeStatus,
    };

    SetsService.create(backendFormat)
      .then((res) => {
        toast.success("Sets Added successfully");
        resetForm();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  const history = useHistory();
  return (
    <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Sets
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Add New Set
        </div>
        <div className="d-flex gap-1">
          <Button onClick={() => history.goBack()} color="white" size="sm">
            Dismiss
          </Button>
          <Button onClick={handleSubmit(onSubmit)} size="sm" color="info">
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <Form className=" mt-2" onSubmit={handleSubmit(onSubmit)}>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Set Name
            </Label>
            <Controller
              id="setname"
              name="setname"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Set Name"
                  invalid={errors.departmenname && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Set Code
            </Label>
            <Controller
              id="setcode"
              name="setcode"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Set Code"
                  invalid={errors.setcode && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Description
            </Label>
            <Controller
              id="description"
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Description"
                  type="textarea"
                  invalid={errors.description && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>

        <div className="d-flex flex-column mt-1">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Status{" "}
          </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input
                type="radio"
                id="ex1-active"
                name="ex1"
                onChange={() => {
                  setActiveStatus(true);
                }}
              />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input
                type="radio"
                name="ex1"
                id="ex1-inactive"
                onChange={() => {
                  setActiveStatus(false);
                }}
              />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default index;
