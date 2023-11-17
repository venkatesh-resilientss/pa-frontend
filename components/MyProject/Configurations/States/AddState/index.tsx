import ReactSelect from "react-select";
import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { CountryService, StatesService } from "services";
import { toast } from "react-toastify";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import useSWR from "swr";

function AddState() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const [activeStatus, StateActiveStatus] = useState(false);

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

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.Statename,
      code: data.Statecode,
      Description: data.description,
      CountryID: data.country?.value,
      is_active: activeStatus,
    };

    StatesService.create(backendFormat)
      .then((res) => {
        toast.success("State Added successfully");
        reset();
        router.back();
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
                  Add New State
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
                <Col xl="4">
                  <div className="mb-1">
                    <Label className="form-label" for="login-email">
                      State Name
                    </Label>
                    <Controller
                      name="Statename"
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
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
                      name="Statecode"
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
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1">
                    <Label className="form-label" for="login-email">
                      Desccription
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
                        style={{ fontSize: "12px", fontWeight: "400" }}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default AddState;
