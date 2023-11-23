import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CountryService, StatesService } from "services";
import AsyncSelect from "react-select/async";
import { checkTenant } from "constants/function";

function EditState() {
  const router = useRouter();
  const { id } = router.query;
   

  const statesService = new StatesService();
  const fetchStateDetails = (id) => statesService.stateDetails(id);

  const {
    data: stateData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["STATE_DETAILS", id] : null, () => fetchStateDetails(id));

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!stateData) return;

    stateData?.Name && setValue("Statename", stateData?.Name);
    stateData?.Description && setValue("description", stateData?.Description);
    stateData?.Country.Name && setValue("country", stateData?.Country.Name);
    stateData?.Code && setValue("Statecode", stateData?.Code);
    stateData?.Country.Name && setValue("country", stateData?.Country.Name);
  }),
    [stateData];

  const countryService = new CountryService();

  const { data: countryData } = useSWR("LIST_COUNTRY", () =>
    countryService.getCountries()
  );

  const countrySelectFormat = countryData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadCountryOptions = (values, callBack) => {
    callBack(countrySelectFormat);
  };

  const stateService = new StatesService();

  const { mutate: countryMutate } = useSWR("LIST_STATES", () =>
    stateService.getStates()
  );

  const [activeStatus, setActiveStatus] = useState(stateData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.Statename,
      description: data.description,
      is_active: activeStatus,
      code: data.Statecode,
      CountryID: data.country?.value,
    };

    statesService
      .editState(id, backendFormat)
      .then((res) => {
        toast.success("State Edited successfully");
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
          All States
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="text-black"
            style={{ fontSize: "32px", fontWeight: "600" }}
          >
            Edit State
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
              <Label className="form-label" for="login-email">
                State Name
              </Label>
              <Controller
                name="Statename"
                control={control}
                rules={{ required: "State Name  is required" }}
                render={({ field }) => (
                  <Input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    placeholder="State Name"
                    invalid={errors.Statename && true}
                    {...field}
                  />
                )}
              />
              {errors.Statename && (
                <span style={{ color: "red" }}>
                  {errors.Statename.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label className="form-label" for="login-email">
                State Code
              </Label>
              <Controller
                name="Statecode"
                rules={{ required: "State Code  is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    placeholder="State Code"
                    invalid={errors.Statecode && true}
                    {...field}
                  />
                )}
              />
              {errors.Statecode && (
                <span style={{ color: "red" }}>
                  {errors.Statecode.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label className="form-label" for="login-email">
                Country
              </Label>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country  is required" }}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    isClearable={true}
                    className="react-select"
                    classNamePrefix="select"
                    loadOptions={loadCountryOptions}
                    placeholder="Select Country"
                    defaultOptions={countrySelectFormat}
                  />
                )}
              />
              {errors.country && (
                <span style={{ color: "red" }}>
                  {errors.country.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label className="form-label" for="login-email">
                Desccription
              </Label>
              <Controller
                name="description"
                rules={{ required: "Dscription  is required" }}
                control={control}
                render={({ field }) => (
                  <Input
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      height: "81px",
                    }}
                    placeholder="Desccription"
                    invalid={errors.description && true}
                    {...field}
                    type="textarea"
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

export default EditState;
