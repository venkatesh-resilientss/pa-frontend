import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { LocationsService } from "services";

function EditLocation() {
  const router = useRouter();
  const { id } = router.query;

  const fetchLocationDetails = (id) => LocationsService.details(id);

  const {
    data: locationData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["LOCATION_DETAILS", id] : null, () =>
    fetchLocationDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!locationData) return;

    locationData?.Name && setValue("name", locationData?.Name);
    locationData?.Code && setValue("code", locationData?.Code);

    locationData?.Description &&
      setValue("description", locationData?.Description);
  }),
    [locationData];

  const locationsService = new LocationsService();

  const { mutate: locationMutate } = useSWR("LIST_LOCATIONS", () =>
    locationsService.getLocations()
  );

  const [activeStatus, setActiveStatus] = useState(locationData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.name,
      description: data.description,
      is_active: activeStatus,
      code: data.code,
    };

    LocationsService.edit(id, backendFormat)
      .then((res) => {
        toast.success("Location Edited successfully");
        mutate(locationMutate());
        router.back();

        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div className="container mt-4  ">
      <div className="row">
        <div className="col-md-12">
          <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
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
                Edit Location
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
                  Edit
                </Button>
              </div>
            </div>

            <hr style={{ height: "2px" }} />

            <Form
              onSubmit={handleSubmit(onSubmit)}
              style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
              className=" mt-2 d-flex flex-column"
            >
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Location Name
                </Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Location Name"
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />{" "}
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Location Code
                </Label>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Location Code"
                      invalid={errors.code && true}
                      {...field}
                    />
                  )}
                />{" "}
              </Col>

              <Col xl="4">
                <Label
                  className="text-black form-lable"
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Description
                </Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="textarea"
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        height: "81px",
                      }}
                      placeholder="Description"
                      invalid={errors.description && true}
                      {...field}
                    />
                  )}
                />{" "}
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
                    <Controller
                      name="active"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          id="ex1-active"
                          name="ex1"
                          defaultChecked={locationData?.IsActive}
                          onChange={() => {
                            setActiveStatus(true);
                          }}
                        />
                      )}
                    />{" "}
                    <div>Active</div>
                  </div>
                  <div className="d-flex gap-1">
                    <Controller
                      name="inactive"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          name="ex1"
                          id="ex1-inactive"
                          defaultChecked={!locationData?.IsActive}
                          onChange={() => {
                            setActiveStatus(false);
                          }}
                        />
                      )}
                    />{" "}
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

export default EditLocation;
