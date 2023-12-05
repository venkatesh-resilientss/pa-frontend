import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { CountryService } from "services";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EditCountry() {
  const router = useRouter();
  const { id } = router.query;

  const fetchCountryDetails = (id) => countryService.countryDetails(id);

  const { data: countryData } = useSWR(
    id ? ["COUNTRY_DETAILS", id] : null,
    () => fetchCountryDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const [activeStatus, setActiveStatus] = useState(countryData?.IsActive);

  useEffect(() => {
    if (!countryData) return;

    countryData?.Name && setValue("countryname", countryData?.Name);
    setActiveStatus(countryData?.IsActive);
  }, [countryData]);

  const countryService = new CountryService();

  const { mutate: countryMutate } = useSWR("LIST_PERIODS", () =>
    countryService.getCountries()
  );

  const onSubmit = (data) => {
    const backendFormat = {
      name: data.countryname,
      description: data.description,
      isActive: activeStatus,
    };

    countryService
      .editCountry(id, backendFormat)
      .then(() => {
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
                <span className="text-danger">
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
                  checked={!activeStatus}
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