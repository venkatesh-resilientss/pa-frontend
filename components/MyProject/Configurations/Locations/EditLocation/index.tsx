import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { LocationsService } from "services";
import { checkTenant } from "constants/function";

function EditLocation() {
  const router = useRouter();
  const { id } = router.query;
  const [tenantId, setTenantId] = useState("");
  useEffect(() => {
    const getTenant = async () => {
      const tenant = await checkTenant();
      // console.log(tenant, "tenant");
      if (tenant) {
        setTenantId(tenant.id);
      }
    };
    getTenant();
  }, []);
  const fetchLocationDetails = (id) => LocationsService.details(tenantId, id);

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

    locationData?.Name && setValue("locationname", locationData?.Name);
    locationData?.Code && setValue("locationcode", locationData?.Code);

    locationData?.Description &&
      setValue("description", locationData?.Description);
  }),
    [locationData];

  const locationsService = new LocationsService();

  const { mutate: locationMutate } = useSWR("LIST_LOCATIONS", () =>
    locationsService.getLocations(tenantId)
  );

  const [activeStatus, setActiveStatus] = useState(locationData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.locationname,
      description: data.description,
      is_active: activeStatus,
      code: data.locationcode,
    };

    LocationsService.edit(tenantId, id, backendFormat)
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
    <div className="mt-4">
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

export default EditLocation;
