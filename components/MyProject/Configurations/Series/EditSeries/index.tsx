import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SeriesService } from "services";

function EditSeries() {
  const router = useRouter();

  const { id } = router.query;

  const fetchSeriesDetails = (id) => SeriesService.details(id);

  const {
    data: seriesData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["SERIES_DETAILS", id] : null, () => fetchSeriesDetails(id));

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!seriesData) return;

    seriesData?.Name && setValue("name", seriesData?.Name);
    seriesData?.Description && setValue("description", seriesData?.Description);
  }),
    [seriesData];

  const seriesService = new SeriesService();

  const { mutate: countryMutate } = useSWR("LIST_STATES", () =>
    seriesService.getSeries()
  );

  const [activeStatus, setActiveStatus] = useState(seriesData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.name,
      description: data.description,
      is_active: activeStatus,
      start: data.startDate,
      endDate: data.endDate,
    };

    SeriesService.edit(id, backendFormat)
      .then((res) => {
        toast.success("Series Edited successfully");
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
                    Edit
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
                    Series Name
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
                            defaultChecked={seriesData?.IsActive}
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
                            defaultChecked={!seriesData?.IsActive}
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

export default EditSeries;
