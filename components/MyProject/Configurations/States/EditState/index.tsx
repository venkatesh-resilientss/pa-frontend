import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CountryService, StatesService } from "services";
import AsyncSelect from "react-select/async";

function EditState() {
  const router = useRouter();
  const { id } = router.query;

  const fetchStateDetails = (id) => StatesService.details(id);

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

    stateData?.Name && setValue("name", stateData?.Name);
    stateData?.Description && setValue("description", stateData?.Description);
    stateData?.Country.Name && setValue("countryName", stateData?.Country.Name);
    stateData?.Code && setValue("code", stateData?.Code);
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
      name: data.name,
      description: data.description,
      is_active: activeStatus,
      code: data.code,
      CountryID: data.country?.value,
    };

    StatesService.edit(id, backendFormat)
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
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="overflow-auto">
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
                    EDIT
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
                    State Name
                  </Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        placeholder="State Name"
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
                    State Code
                  </Label>
                  <Controller
                    name="code"
                    control={control}
                    render={({ field }) => (
                      <Input
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        placeholder="State Code"
                        invalid={errors.code && true}
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
                    Country
                  </Label>
                  <Controller
                    name="country"
                    control={control}
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
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
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
                            defaultChecked={stateData?.IsActive}
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
                            defaultChecked={!stateData?.IsActive}
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
    </>
  );
}

export default EditState;
