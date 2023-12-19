import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { CountryService, StatesService } from "services";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import useSWR from "swr";
import { selectStyles } from "@/constants/common";
import { formValidationRules } from "@/constants/common";
import { getLabel } from "@/commonFunctions/common";
import { useState } from "react";
import { LoaderButton } from "@/components/Loaders/";

function AddState() {
  const router = useRouter();
  const statesValidationRules = formValidationRules.states;
  const [isLoading, setLoader] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const countryService = new CountryService();
  const statesService = new StatesService();

  const { data: countryData } = useSWR("LIST_COUNTRY", () =>
    countryService.getCountries({
      search: "",
      limit: 200,
      offset: 0,
      is_active: true,
    })
  );

  const countrySelectFormat = countryData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });


  const onSubmit = (data) => {
    const backendFormat = {
      name: getLabel(data.Statename),
      code: data.Statecode,
      Description: data.description,
      CountryID: data.country?.value,
    };
    setLoader(true);
    statesService
      .createState(backendFormat)
      .then(() => {
        toast.success("State Added successfully");
        reset();
        router.push("/configurations/states");
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.error || error?.Message || "Unable to add State");
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
            Add New State
          </div>
          <div
            className="d-flex me-2 align-items-center"
            style={{ gap: "10px" }}
          >
            <Button
              onClick={() => router.push("/configurations/states")}
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
            <LoaderButton
              handleClick={handleSubmit(onSubmit)}
              buttonText={"Save"}
              isLoading={isLoading}
            />
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
              <Label className="form-lable-font">
                State Name <span className="required">*</span>
              </Label>
              <Controller
                name="Statename"
                control={control}
                rules={statesValidationRules.name}
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
                <span className="text-danger">
                  {errors.Statename.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label className="fform-lable-font">
                State Code <span className="required">*</span>
              </Label>
              <Controller
                name="Statecode"
                rules={statesValidationRules.code}
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
                <span className="text-danger">
                  {errors.Statecode.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font">
                Country <span className="required">*</span>
              </Label>
              <Controller
                name="country"
                control={control}
                rules={statesValidationRules.country}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    isClearable={true}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="Select Country"
                    defaultOptions={countrySelectFormat}
                    styles={selectStyles}
                  />
                )}
              />
              {errors.country && (
                <span className="text-danger">
                  {errors.country.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font">Description</Label>
              <Controller
                name="description"
                control={control}
                rules={statesValidationRules.description}
                render={({ field }) => (
                  <Input
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      height: "81px",
                    }}
                    placeholder="Description"
                    invalid={errors.description && true}
                    {...field}
                    type="textarea"
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
        </Form>
      </div>
    </>
  );
}

export default AddState;
