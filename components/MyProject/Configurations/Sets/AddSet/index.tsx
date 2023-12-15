import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { SetsService } from "services";
import { toast } from "react-toastify";
import { formValidationRules } from "@/constants/common";
import { getSessionVariables } from "@/constants/function";
import { getLabel } from "@/commonFunctions/common";
function AddSet() {
  const router = useRouter();
  const setsValidationRules = formValidationRules.sets;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const setsService = new SetsService();

  const onSubmit = (data) => {
    const { clientID, projectID } = getSessionVariables();
    const backendFormat = {
      name: getLabel(data.setname),
      code: data.setcode,
      description: data.description,
      clientID,
      projectID,
    };

    setsService
      .createSet(backendFormat)
      .then(() => {
        toast.success("Sets Added successfully");
        reset();
        router.back();
      })
      .catch((error) => {
        toast.error(error?.Message);
      });
  };

  return (
    <div>
      <div
        className="text-black mt-4"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Sets
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Add New Set
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
        {" "}
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">
              Set Name <span className="required">*</span>
            </Label>
            <Controller
              name="setname"
              rules={setsValidationRules.name}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Set Name"
                  invalid={errors.setname && true}
                  {...field}
                />
              )}
            />
            {errors.setname && (
              <span className="text-danger">
                {errors.setname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">
              Set Code <span className="required">*</span>
            </Label>
            <Controller
              name="setcode"
              rules={setsValidationRules.code}
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Set Code"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  invalid={errors.setcode && true}
                  {...field}
                />
              )}
            />
            {errors.setcode && (
              <span className="text-danger">
                {errors.setcode.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-lable-font">Description</Label>
            <Controller
              name="description"
              rules={setsValidationRules.description}
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

export default AddSet;
