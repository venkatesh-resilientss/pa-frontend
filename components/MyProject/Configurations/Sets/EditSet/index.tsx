import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SetsService } from "services";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import { checkTenant } from "constants/function";

function EditSet() {
  const router = useRouter();
   
  const setService = new SetsService();
  const { id } = router.query;

  const fetchSetDetails = (id) => setService.setsDetails(id);

  const {
    data: setData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["SETS_DETAILS", id] : null, () => fetchSetDetails(id));

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!setData) return;

    setData?.Name && setValue("setname", setData?.Name);
    setData?.Code && setValue("setcode", setData?.Code);

    setData?.Description && setValue("description", setData?.Description);
  }),
    [setData];

  const { mutate: countryMutate } = useSWR("LIST_SETS", () =>
    setService.getSets()
  );

  const [activeStatus, setActiveStatus] = useState(setData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.name,
      description: data.description,
      is_active: activeStatus,
      start: data.startDate,
      endDate: data.endDate,
    };

    setService
      .editSet(id, backendFormat)
      .then((res) => {
        toast.success("Set Edited successfully");
        mutate(countryMutate());
        router.back();

        reset();
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
        All Sets
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Edit Set
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
            <Label>Set Name</Label>
            <Controller
              name="setname"
              rules={{ required: "Set Name is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Set Name"
                  invalid={errors.departmenname && true}
                  {...field}
                />
              )}
            />
            {errors.setname && (
              <span style={{ color: "red" }}>
                {errors.setname.message as React.ReactNode}
              </span>
            )}
          </div>
        </Col>
        <Col xl="4">
          <div className="mb-1">
            <Label className="form-label" for="login-email">
              Set Code
            </Label>
            <Controller
              name="setcode"
              rules={{ required: "Set Code is required" }}
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
              <span style={{ color: "red" }}>
                {errors.setcode.message as React.ReactNode}
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
              rules={{ required: "Description is required" }}
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
              <input type="radio" id="ex1-active" name="ex1" value="active" />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input
                type="radio"
                name="ex1"
                id="ex1-inactive"
                value="inactive"
              />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditSet;
