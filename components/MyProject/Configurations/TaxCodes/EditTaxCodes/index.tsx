import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { TaxCodesService, CountryService } from "services";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import { formValidationRules } from "@/constants/common";
import AsyncSelect from "react-select/async";
import { selectStyles } from "@/constants/common";
import { getLabel } from "@/commonFunctions/common";
import { hasPermission } from "@/commonFunctions/functions";
import { LoaderButton } from "@/components/Loaders";
function EditTaxCode() {
  const router = useRouter();
  const { id } = router.query;
  const taxCodeValidationRules = formValidationRules.taxCodes;
  const taxCodeService = new TaxCodesService();
  const countryService = new CountryService();
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  const fetchTaxCodeDetails = (id) => taxCodeService.taxCodeDetails(id);

  const { data: taxcodesData } = useSWR(
    id ? ["TAXCODE_DETAILS", id] : null,
    () => fetchTaxCodeDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [isLoading,setLoader] = useState(false);
  useEffect(() => {
    if (!taxcodesData) return;
    taxcodesData?.Code && setValue("taxcode", taxcodesData?.Code);
    taxcodesData?.Description &&
      setValue("description", taxcodesData?.Description);
    taxcodesData?.Name && setValue("taxcodename", taxcodesData.Name);
    const taxCodeCountry = {
      value: taxcodesData.Country.ID,
      label: taxcodesData.Country.Name,
    };
    setValue("country", taxCodeCountry);
    setActiveStatus(taxcodesData?.IsActive);
  }, [taxcodesData]);

  const { mutate: taxCodeMutate } = useSWR("LIST_TAXCODES", () =>
    taxCodeService.getTaxCodes({
      search: "",
      limit: 25,
      offset: 0,
      is_active: true,
    })
  );

  const [activeStatus, setActiveStatus] = useState(taxcodesData?.IsActive);
  const [initialCountryOptions, setInitialCountryOptions] = useState([]);
  useEffect(() => {
    const fetchInitialCountryOptions = async () => {
      try {
        const res = await countryService.getCountries({
          search: "",
          limit: 200,
          offset: 0,
          is_active: true,
        });
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: `${item.Code} - ${item.Name}`,
        }));
        setInitialCountryOptions(options);
      } catch (error) {
        toast.error(
          error?.Message || error?.error || "Error while fetching countries"
        );
      }
    };
    fetchInitialCountryOptions();
  }, []);
  const onSubmit = (data) => {
    const backendFormat = {
      name: getLabel(data.taxcodename),
      code: data.taxcode,
      description: data.description,
      countryID: parseInt(data.country.value),
      IsActive: activeStatus,
    };
    setLoader(true);
    taxCodeService
      .editTaxCode(id, backendFormat)
      .then(() => {
        toast.success("TaxCode Edited successfully");
        mutate(taxCodeMutate());
        router.push("/configurations/taxcodes");
        setLoader(false);
        reset();
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.error || error?.Message || "Unable to edit TaxCode");
      });
  };

  return (
    <div className="mt-4">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Tax Codes
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Edit Tax Code
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
          {hasEditConfigurationPermission && (
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
            )}
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
              Tax Code<span className="required">*</span>{" "}
            </Label>
            <Controller
              name="taxcode"
              rules={taxCodeValidationRules.code}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Tax Code"
                  invalid={errors.taxcode && true}
                  {...field}
                  disabled={!editMode}
                />
              )}
            />
            {errors.taxcode && (
              <span className="text-danger">
                {errors.taxcode.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">
              Tax Code Name<span className="required">*</span>{" "}
            </Label>
            <Controller
              name="taxcodename"
              rules={taxCodeValidationRules.name}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Tax Code"
                  invalid={errors.taxcodename && true}
                  {...field}
                  disabled={!editMode}
                />
              )}
            />
            {errors.taxcodename && (
              <span style={{ color: "red" }}>
                {errors.taxcodename.message as React.ReactNode}
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
              rules={taxCodeValidationRules.country}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Select Country"
                  defaultOptions={initialCountryOptions}
                  styles={selectStyles}
                  isDisabled={!editMode}
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
            <Label className="form-lable-font" f>
              Description
            </Label>
            <Controller
              name="description"
              control={control}
              rules={taxCodeValidationRules.description}
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
                  disabled={!editMode}
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
                disabled={!editMode}
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
                disabled={!editMode}
              />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditTaxCode;
