import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { CountryService } from "services";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formValidationRules } from "@/constants/common";
import { getLabel } from "@/commonFunctions/common";
import { LoaderButton } from "@/components/Loaders";
import { hasPermission } from "@/commonFunctions/functions";
function EditCountry() {
  const router = useRouter();
  const { id } = router.query;
  const countryValidations = formValidationRules.countries;
  const fetchCountryDetails = (id) => countryService.countryDetails(id);
  const countryService = new CountryService();
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  const [editMode,setEditMode] = useState(false);
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
    countryData?.Code && setValue("countrycode", countryData?.Code);
    countryData?.Description &&
      setValue("description", countryData?.Description);

    setActiveStatus(countryData?.IsActive);
  }, [countryData]);

  

  const { mutate: countryMutate } = useSWR("LIST_PERIODS", () =>
    countryService.getCountries()
  );
  const [isLoading,setLoader] = useState(false);
  const onSubmit = (data) => {
    setLoader(true);
    const backendFormat = {
      name: getLabel(data.countryname),
      code: data.countrycode,
      description: data.description,
      isActive: activeStatus,
    };

    countryService
      .editCountry(id, backendFormat)
      .then(() => {
        toast.success("Country Edited successfully");
        mutate(countryMutate());
        router.push("/configurations/countries");
        setLoader(false)
        reset();
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || "Unable to edit Country");
        setLoader(false);
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
          <div className="d-flex me-2 align-items-center" style={{ gap: "10px" }}>
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
            {
              hasEditConfigurationPermission && (
                <LoaderButton
                buttonText={editMode ? "Save" : "Edit"}
                isLoading={isLoading}
                handleClick={() => {
                  if (!editMode) {
                    setEditMode(true);
                    return;
                  }
                  handleSubmit(onSubmit)();
                }}
              />
              )
            }
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
              <Label>
                Country Name <span className="required">*</span>
              </Label>
              <Controller
                name="countryname"
                control={control}
                rules={countryValidations.name}
                render={({ field }) => (
                  <Input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    placeholder="Country Name"
                    invalid={errors.countryname && true}
                    {...field}
                    disabled={!editMode}
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
          <Col xl="4">
            <div className="mb-1">
              <Label className="form-lable-font">
                Country Code <span className="required">*</span>
              </Label>
              <Controller
                name="countrycode"
                control={control}
                rules={countryValidations.code}
                render={({ field }) => (
                  <Input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    placeholder="Country Code"
                    invalid={errors.countrycode && true}
                    {...field}
                    disabled={!editMode}
                  />
                )}
              />
              {errors.countrycode && (
                <span style={{ color: "red" }}>
                  {errors.countrycode.message as React.ReactNode}
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
                rules={countryValidations.description}
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
                    disabled={!editMode}
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
                  checked={activeStatus}
                  onChange={() => {
                    setActiveStatus(true);
                  }}
                  disabled={!editMode}
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
                  disabled={!editMode}
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
