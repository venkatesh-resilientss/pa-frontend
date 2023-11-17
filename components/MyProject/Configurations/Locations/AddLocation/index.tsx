import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { LocationsService } from "services";

function AddLocation() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [activeStatus, LocationActiveStatus] = useState(false);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.locationname,
      code: data.locationcode,
      description: data.description,
      IsActive: activeStatus,
    };

    LocationsService.create(backendFormat)
      .then((res) => {
        toast.success("Location Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="overflow-auto">
            <div
              className="text-black"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              All Locations
            </div>

            <div className="d-flex justify-content-between">
              <div
                className="text-black"
                style={{ fontSize: "32px", fontWeight: "600" }}
              >
                Add New Location
              </div>
              <div className="d-flex me-2 " style={{ gap: "10px" }}>
                <Button
                  onClick={() => router.back()}
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
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
              style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
              className=" mt-2 d-flex flex-column"
              onSubmit={handleSubmit(onSubmit)}
            >
              {" "}
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Location Name
                  </Label>
                  <Controller
                    name="locationname"
                    control={control}
                    render={({ field }) => (
                      <Input
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        placeholder="Location Name"
                        invalid={errors.locationname && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Location Code
                  </Label>
                  <Controller
                    name="locationcode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        placeholder="Location Code"
                        invalid={errors.locationcode && true}
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
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Input
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          height: "81px",
                        }}
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
                        LocationActiveStatus(true);
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
                        LocationActiveStatus(false);
                      }}
                    />
                    <div>In-Active</div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLocation;
