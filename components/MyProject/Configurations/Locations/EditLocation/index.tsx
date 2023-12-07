import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { LocationsService } from "services";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";

function EditLocation() {
  const router = useRouter();
  const { id } = router.query;
  const locationValidationRules = formValidationRules.locations;
  const locationService = new LocationsService();

  const fetchLocationDetails = (id) => locationService.locationDetails(id);

  const { data: locationData } = useSWR(
    id ? ["LOCATION_DETAILS", id] : null,
    () => fetchLocationDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!locationData) return;

    locationData?.Name && setValue("locationname", locationData?.Name);
    locationData?.Code && setValue("locationcode", locationData?.Code);

    locationData?.Description &&
      setValue("description", locationData?.Description);

    setActiveStatus(locationData?.IsActive);
  }, [locationData]);

  const locationsService = new LocationsService();

  const { mutate: locationMutate } = useSWR("LIST_LOCATIONS", () =>
    locationsService.getLocations({ search: "", pageLimit: 25, offset: 0 })
  );

  const [activeStatus, setActiveStatus] = useState(locationData?.IsActive);

  const onSubmit = (data) => {
    const {clientID,projectID} = getSessionVariables();
    const backendFormat = {
      name: data.locationname,
      description: data.description,
      isActive: activeStatus,
      code: data.locationcode,
      clientID,
      projectID
    };

    locationsService
      .editLocation(id, backendFormat)
      .then(() => {
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
    <div className="mt-4 configuration-add">
      <div className="title-head">All Locations</div>

      <div className="d-flex justify-content-between">
        <div className="title">Edit Location</div>

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
        style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
        className=" mt-2 d-flex flex-column"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Location Name <span className="required">*</span>
            </Label>
            <Controller
              name="locationname"
              rules={locationValidationRules.name}
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
              <span className="text-danger">
                {errors.locationname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Location Code <span className="required">*</span>
            </Label>
            <Controller
              name="locationcode"
              rules={locationValidationRules.code}
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
              <span className="text-danger">
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
              control={control}
              rules={locationValidationRules.description}
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
              <span className="text-danger">
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
                checked={activeStatus}
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
                checked={!activeStatus}
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

export default EditLocation;
