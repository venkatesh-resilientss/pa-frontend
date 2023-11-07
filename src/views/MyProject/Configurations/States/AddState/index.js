import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { StatesService } from "../../../../../services";
import { toast } from "react-toastify";
import { useState } from "react";

function index() {
  const {
    control,
    StateError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [activeStatus, StateActiveStatus] = useState();

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.Statename,
      code: data.Statecode,
      description: data.description,
      country: data.countryname,
      is_active: activeStatus,
    };

    StatesService.create(backendFormat)
      .then((res) => {
        toast.success("State Added successfully");
        reStateForm();
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
        All States
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Add New State
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
              State Name
            </Label>
            <Controller
              id="Statename"
              name="Statename"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="State Name"
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
              State Code
            </Label>
            <Controller
              id="Statecode"
              name="Statecode"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="State Code"
                  invalid={errors.Statecode && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Country
            </Label>
            <Controller
              id="countryname"
              name="countryname"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="country"
                  invalid={errors.countryname && true}
                  {...field}
                />
              )}
            />
          </div>
        </Col>

        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Desccription
            </Label>
            <Controller
              id="desccription"
              name="desccription"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Desccription"
                  invalid={errors.desccription && true}
                  {...field}
                  type="textarea"
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
                  StateActiveStatus(true);
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
                  StateActiveStatus(false);
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
