import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { LocationsService } from "services";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";
import { getLabel } from "@/commonFunctions/common";

function AddLocation() {
  const router = useRouter();
  const locationValidationRules = formValidationRules.locations;
  const locationService = new LocationsService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { clientID, projectID } = getSessionVariables();
    const backendFormat = {
      name: getLabel(data.locationname),
      code: data.locationcode,
      description: data.description,
      IsActive: false,
      clientID,
      projectID,
    };

    locationService
      .createLocation(backendFormat)
      .then(() => {
        toast.success("Location Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || "Unable to add Location");
      });
  };

  return (
    <div className="overflow-auto mt-4 configuration-add">
      <div className="title-head">All Locations</div>

      <div className="d-flex justify-content-between">
        <div className="title">Add New Location</div>
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
        {" "}
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">
              Location Name<span className="required">*</span>
            </Label>
            <Controller
              name="locationname"
              rules={locationValidationRules.name}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Location Name"
                  invalid={errors.locationname && true}
                  {...field}
                />
              )}
            />

            {errors.locationname && (
              <span className="text-danger">
                {errors.locationname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">
              Location Code<span className="required">*</span>
            </Label>
            <Controller
              name="locationcode"
              rules={locationValidationRules.code}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Location Code"
                  invalid={errors.locationcode && true}
                  {...field}
                />
              )}
            />
            {errors.locationcode && (
              <span className="text-danger">
                {errors.locationcode.message as React.ReactNode}
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
              rules={locationValidationRules.description}
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

export default AddLocation;
