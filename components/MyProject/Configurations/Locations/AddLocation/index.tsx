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
   
          <div className="overflow-auto mt-4">
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
                  <a href="#" onClick={() => router.back()} className='text-decoration-none text-secondary m-2'>Dismiss</a>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  color="primary" className="px-4"             
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
                    rules={{ required: "Location Name is required" }}
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

                  {errors.locationname && (
                    <span style={{ color: "red" }}>
                      {errors.locationname.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Location Code
                  </Label>
                  <Controller
                    name="locationcode"
                    rules={{ required: "Location Code is required" }}
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
                  {errors.locationcode && (
                    <span style={{ color: "red" }}>
                      {errors.locationcode.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Description
                  </Label>
                  <Controller
                    name="description"
                    rules={{ required: "Description  is required" }}
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
                  {errors.description && (
                    <span style={{ color: "red" }}>
                      {errors.description.message as React.ReactNode}
                    </span>
                  )}
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
      
  );
}

export default AddLocation;
