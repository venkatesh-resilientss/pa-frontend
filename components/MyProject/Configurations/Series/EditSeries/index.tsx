import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SeriesService } from "services";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";
function EditSeries() {
  const router = useRouter();
  const seriesValidationRules = formValidationRules.series;
  const { id } = router.query;

  const fetchSeriesDetails = (id) => seriesService.seriesDetails(id);

  const { data: seriesData } = useSWR(id ? ["SERIES_DETAILS", id] : null, () =>
    fetchSeriesDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!seriesData) return;

    seriesData?.Name && setValue("seriesname", seriesData?.Name);
    seriesData?.Code && setValue("Seriescode", seriesData?.Code);

    seriesData?.Description && setValue("description", seriesData?.Description);
    setActiveStatus(seriesData?.IsActive);
  }, [seriesData]);

  const seriesService = new SeriesService();

  const { mutate: countryMutate } = useSWR("LIST_STATES", () =>
    seriesService.getSeries({ search: "", pageLimit: 25, offset: 0 })
  );

  const [activeStatus, setActiveStatus] = useState(seriesData?.IsActive);

  const onSubmit = (data) => {
    const {clientID,projectID} = getSessionVariables();
    const backendFormat = {
      name: data.seriesname,
      description: data.description,
      isActive: activeStatus,
      code: data.Seriescode,
      clientID,
      projectID
    };

    seriesService
      .editSeries(id, backendFormat)
      .then(() => {
        toast.success("Series Edited successfully");
        mutate(countryMutate());
        router.push('/configurations/series');

        reset();
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || 'Unable to add state');
      });
  };

  return (
    <>
      <div className="overflow-auto mt-4">
        <div
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          All Series
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="text-black"
            style={{ fontSize: "32px", fontWeight: "600" }}
          >
            Edit Series
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
                Series Name <span className="required">*</span>
              </Label>
              <Controller
                name="seriesname"
                rules={seriesValidationRules.name}
                control={control}
                render={({ field }) => (
                  <Input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    placeholder="Series Name"
                    invalid={errors.seriesname && true}
                    {...field}
                  />
                )}
              />
              {errors.seriesname && (
                <span className="text-danger">
                  {errors.seriesname.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label className="form-label" for="login-email">
                Series Code <span className="required">*</span>
              </Label>
              <Controller
                name="Seriescode"
                rules={seriesValidationRules.code}
                control={control}
                render={({ field }) => (
                  <Input
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    placeholder="Series Code"
                    invalid={errors.Seriescode && true}
                    {...field}
                  />
                )}
              />
              {errors.Seriescode && (
                <span className="text-danger">
                  {errors.Seriescode.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label className="form-label" for="login-email">
                Description
              </Label>
              <Controller
                name="description"
                control={control}
                rules={seriesValidationRules.description}
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

          <div className="d-flex flex-column mt-1">
            <Label className="text-black">Status </Label>
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

export default EditSeries;
