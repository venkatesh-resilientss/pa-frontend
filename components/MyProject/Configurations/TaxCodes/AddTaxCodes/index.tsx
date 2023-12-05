import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { TaxCodesService } from "services";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { formValidationRules } from "@/constants/common";
import { CountryService } from "services";
import { selectStyles } from "@/constants/common";
import AsyncSelect from "react-select/async";
import useSWR from "swr";
function AddTaxCode() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const taxCodeValidationRules = formValidationRules.taxCodes;
  const taxCodeService = new TaxCodesService();
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
    const backendFormat = {
      code: data.taxcode,
      description: data.description,
      
    };

    taxCodeService
      .createTaxCode(backendFormat)
      .then(() => {
        toast.success("TaxCode Added successfully");
        reset();
        router.back();
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
        All Tax Codes
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Add New Tax Code
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
            <Label className="form-lable-font">Tax Code<span className="required">*</span> </Label>
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
            <Label className="form-lable-font">Tax Code Name<span className="required">*</span> </Label>
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
              <Label className="form-lable-font">Country <span className="required">*</span></Label>
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
                    loadOptions={loadCountryOptions}
                    placeholder="Select Country"
                    defaultOptions={countrySelectFormat}
                    styles={selectStyles}
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
  );
}

export default AddTaxCode;
