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

    seriesData?.Name && setValue("seriesname", seriesData?.Name);
    seriesData?.Code && setValue("Seriescode", seriesData?.Code);

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
      name: data.seriesname,
      description: data.description,
      is_active: activeStatus,
      code: data.Seriescode,
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
                   <a href="#" onClick={() => router.back()} className='text-decoration-none text-secondary m-2'>Dismiss</a>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    color="primary" className="px-4 p-2">
                    Edit
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
                      Series Name
                    </Label>
                    <Controller
                      name="seriesname"
                      rules={{ required: "Series Name is required" }}
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
                      <span style={{ color: "red" }}>
                        {errors.seriesname.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1">
                    <Label className="form-label" for="login-email">
                      Series Code
                    </Label>
                    <Controller
                      name="Seriescode"
                      rules={{ required: "Series Code is required" }}
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
                      <span style={{ color: "red" }}>
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
                      rules={{ required: "Description is required" }}
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
                      <span style={{ color: "red" }}>
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

export default EditSeries;
