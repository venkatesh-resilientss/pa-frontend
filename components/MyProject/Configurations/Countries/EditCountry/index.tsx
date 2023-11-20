import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { CountryService } from "services";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkTenant } from "constants/function";

function EditCountry() {
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
  const fetchCountryDetails = (id) => CountryService.details(tenantId, id);

  const {
    data: countryData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["COUNTRY_DETAILS", id] : null, () =>
    fetchCountryDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  console.log("countryData", countryData);

  useEffect(() => {
    if (!countryData) return;

    countryData?.Name && setValue("countryname", countryData?.Name);
  }),
    [countryData];

  const countryService = new CountryService();

  const { mutate: countryMutate } = useSWR("LIST_PERIODS", () =>
    countryService.getCountries(tenantId)
  );

  const [activeStatus, setActiveStatus] = useState(countryData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.countryname,
      description: data.description,
      is_active: activeStatus,
    };

    CountryService.edit(tenantId, id, backendFormat)
      .then((res) => {
        toast.success("Country Edited successfully");
        mutate(countryMutate());
        router.back();

        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <>
      <div className="mt-4">
        <div
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          All Countries
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="text-black"
            style={{ fontSize: "32px", fontWeight: "600" }}
          >
            Edit Country
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
          <Col xl="4">
            <div className="mb-1">
              <Label>Country name</Label>
              <Controller
                name="countryname"
                control={control}
                rules={{ required: "Country Name  is required" }}
                render={({ field }) => (
                  <Input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    placeholder="Country name"
                    invalid={errors.countryname && true}
                    {...field}
                  />
                )}
              />
              {errors.countryname && (
                <span style={{ color: "red" }}>
                  {errors.countryname.message as React.ReactNode}
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
                  style={{ fontSize: "12px", fontWeight: "400" }}
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
    </>
  );
}

export default EditCountry;
