import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SetsService } from "services";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";

function EditSet() {
  const router = useRouter();

  const { id } = router.query;

  const fetchSetDetails = (id) => SetsService.details(id);

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

    setData?.Name && setValue("name", setData?.Name);
    setData?.Description && setValue("description", setData?.Description);
  }),
    [setData];

  const setService = new SetsService();

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

    SetsService.edit(id, backendFormat)
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
    <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
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
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Set Name
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
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Set ID
          </Label>
          <Controller
            name="setId"
            control={control}
            render={({ field }) => (
              <Input
                style={{ fontSize: "12px", fontWeight: "400" }}
                placeholder="Set Id"
                invalid={errors.setId && true}
                {...field}
              />
            )}
          />{" "}
        </Col>

        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
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
                    defaultChecked={setData?.IsActive}
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
                    defaultChecked={!setData?.IsActive}
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
  );
}

export default EditSet;
