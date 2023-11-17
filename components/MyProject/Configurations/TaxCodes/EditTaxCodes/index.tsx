import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { TaxCodesService } from "services";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";

function EditTaxCode() {
  const router = useRouter();
  const { id } = router.query;

  const fetchTaxCodeDetails = (id) => TaxCodesService.details(id);

  const {
    data: taxcodesData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["TAXCODE_DETAILS", id] : null, () =>
    fetchTaxCodeDetails(id)
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
    if (!taxcodesData) return;

    taxcodesData?.Code && setValue("taxcode", taxcodesData?.Code);

    taxcodesData?.Description &&
      setValue("description", taxcodesData?.Description);
  }),
    [taxcodesData];

  const taxCodeService = new TaxCodesService();

  const { mutate: taxCodeMutate } = useSWR("LIST_TAXCODES", () =>
    taxCodeService.getTaxCodes()
  );

  const [activeStatus, setActiveStatus] = useState(taxcodesData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      code: data.taxcode,
      description: data.description,
      is_active: activeStatus,
    };

    TaxCodesService.edit(id, backendFormat)
      .then((res) => {
        toast.success("TaxCode Edited successfully");
        mutate(taxCodeMutate());
        router.back();

        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="overflow-auto">
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
                  color="primary"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    height: "34px",
                  }}
                  onClick={handleSubmit(onSubmit)}
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
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Tax Code
                </Label>
                <Controller
                  name="taxcode"
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
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Description
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
                      placeholder="Description"
                      type="textarea"
                      invalid={errors.description && true}
                      {...field}
                    />
                  )}
                />
              </Col>

              {/* <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Tax Rate
                </Label>
                <Controller
                  name="taxrate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Tax rate"
                      invalid={errors.taxrate && true}
                      {...field}
                    />
                  )}
                />
              </Col> */}

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
                          defaultChecked={taxcodesData?.IsActive}
                          onChange={() => {
                            setActiveStatus(true);
                          }}
                        />
                      )}
                    />

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
                          defaultChecked={!taxcodesData?.IsActive}
                          onChange={() => {
                            setActiveStatus(false);
                          }}
                        />
                      )}
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
  );
}

export default EditTaxCode;
