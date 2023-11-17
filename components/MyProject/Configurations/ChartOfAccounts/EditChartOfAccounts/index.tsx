import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { COAAccountsService } from "services";

function EditChartOfAccounts() {
  const router = useRouter();

  const { id } = router.query;

  const fetchCOADetails = (id) => COAAccountsService.details(id);

  const {
    data: coaData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["COA_DETAILS", id] : null, () => fetchCOADetails(id));

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!coaData) return;

    coaData?.Name && setValue("name", coaData?.Name);
    coaData?.Code && setValue("code", coaData?.Code);

    coaData?.Description && setValue("description", coaData?.Description);
    coaData?.Type && setValue("accountType", coaData?.Type);
    coaData?.Parent && setValue("parent", coaData?.Parent);
  }),
    [coaData];

  const cOAAccountsService = new COAAccountsService();

  const { mutate: currencyMutate } = useSWR("LIST_COA", () =>
    cOAAccountsService.getCoasAccounts()
  );

  const [activeStatus, setActiveStatus] = useState(coaData?.IsActive);
  const [postable, setPostable] = useState(coaData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.name,
      description: data.description,
      is_active: activeStatus,
      code: data.code,
      parent: data.parent,
      accountType: data.accountType,
      postable: postable,
    };

    COAAccountsService.edit(id, backendFormat)
      .then((res) => {
        toast.success("COA Edited successfully");
        mutate(currencyMutate());
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
          <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
            <div
              className="text-black"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              All Chart Of Accounts
            </div>

            <div className="d-flex justify-content-between">
              <div
                className="text-black"
                style={{ fontSize: "32px", fontWeight: "600" }}
              >
                Edit Chart Of Accounts
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
                <Label className="text-black">COA Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="COA Name"
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />{" "}
              </Col>

              <Col xl="4">
                <Label className="text-black">COA Code</Label>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="COA Code"
                      invalid={errors.code && true}
                      {...field}
                    />
                  )}
                />{" "}
              </Col>
              <Col xl="4">
                <Label className="text-black">COA Parent</Label>
                <Controller
                  name="parent"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="COA Parent"
                      invalid={errors.parent && true}
                      {...field}
                    />
                  )}
                />{" "}
              </Col>
              <Col xl="4">
                <Label className="text-black">Account Type</Label>
                <Controller
                  name="accountType"
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Account Type"
                      invalid={errors.accountType && true}
                      {...field}
                    />
                  )}
                />{" "}
              </Col>

              <Col xl="4">
                <Label className="text-black">Description</Label>
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
                  Postable
                </Label>
                <div className="d-flex gap-1">
                  <div className="d-flex gap-1">
                    <Controller
                      name="yes"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          id="ex1-yes"
                          name="ex1-yes"
                          onChange={() => {
                            setPostable(true);
                          }}
                        />
                      )}
                    />{" "}
                    <div>Yes</div>
                  </div>
                  <div className="d-flex gap-1">
                    <Controller
                      name="no"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          name="ex1-yes"
                          id="ex1-no"
                          onChange={() => {
                            setPostable(false);
                          }}
                        />
                      )}
                    />{" "}
                    <div>No</div>
                  </div>
                </div>
              </div>

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
                          defaultChecked={coaData?.IsActive}
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
                          defaultChecked={!coaData?.IsActive}
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
  );
}

export default EditChartOfAccounts;
