import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { SeriesService } from "services";

function AddSeries() {
  const router = useRouter();

  const seriesService = new SeriesService();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const backendFormat = {
      name: data.seriesname,
      code: data.Seriescode,
      description: data.description,
      is_active: false,
    };

    seriesService
      .createSeries(backendFormat)
      .then(() => {
        toast.success("Series Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <>
      <div className="section mt-4">
        <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
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
              Add New Series
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
                <Label className="form-lable-font">Series Name</Label>
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
                  <span className="text-danger">
                    {errors.seriesname.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Series Code</Label>
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
                  <span className="text-danger">
                    {errors.Seriescode.message as React.ReactNode}
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
                  <span className="text-danger">
                    {errors.description.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddSeries;
