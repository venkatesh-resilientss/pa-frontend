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

    coaData?.Name && setValue("COAName", coaData?.Name);
    coaData?.Code && setValue("COACode", coaData?.Code);

    coaData?.Description && setValue("Description", coaData?.Description);
    coaData?.Type && setValue("AccountType", coaData?.Type);
    coaData?.Parent && setValue("COAParent", coaData?.Parent);
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
      name: data.COAName,
      description: data.Description,
      is_active: activeStatus,
      code: data.COACode,
      parent: data.COAParent,
      accountType: data.AccountType,
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
  
          <div className="mt-4">
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
                          <a href="#" onClick={() => router.back()} className='text-decoration-none text-secondary m-2'>Dismiss</a>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  color="primary" className="px-4">
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
              {" "}
              <Col xl="4">
                <div className="mb-1">
                  <Label>COA Name</Label>
                  <Controller
                    name="COAName"
                    rules={{ required: "COA Name  is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="COA Name"
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        invalid={errors.COAName && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.COAName && (
                    <span style={{ color: "red" }}>
                      {errors.COAName.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label>COA Code</Label>
                  <Controller
                    name="COACode"
                    rules={{ required: "COA Code  is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="COA Code"
                        invalid={errors.COACode && true}
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        {...field}
                      />
                    )}
                  />
                  {errors.COACode && (
                    <span style={{ color: "red" }}>
                      {errors.COACode.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label>COA Parent</Label>
                  <Controller
                    name="COAParent"
                    control={control}
                    rules={{ required: "COA Parent  is required" }}
                    render={({ field }) => (
                      <Input
                        placeholder="COA Parent"
                        invalid={errors.COAParent && true}
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        {...field}
                      />
                    )}
                  />
                  {errors.COAParent && (
                    <span style={{ color: "red" }}>
                      {errors.COAParent.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label> Account Type</Label>
                  <Controller
                    name="AccountType"
                    rules={{ required: "Account Type Name  is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="AccountType"
                        invalid={errors.AccountType && true}
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        {...field}
                      />
                    )}
                  />
                  {errors.AccountType && (
                    <span style={{ color: "red" }}>
                      {errors.AccountType.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label> Description</Label>
                  <Controller
                    name="Description"
                    rules={{ required: "Description  is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="textarea"
                        placeholder="Description"
                        invalid={errors.Description && true}
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          height: "81px",
                        }}
                        {...field}
                      />
                    )}
                  />
                  {errors.Description && (
                    <span style={{ color: "red" }}>
                      {errors.Description.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
              <Col xl="4">
                <div className="d-flex flex-column mt-1">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    Postable{" "}
                  </Label>
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
                      <div>Yes</div>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        type="radio"
                        id="ex1-active"
                        name="ex1"
                        onChange={() => {
                          setActiveStatus(false);
                        }}
                      />
                      <div>No</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex flex-column mt-1">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12x", fontWeight: "400" }}
                  >
                    Status{" "}
                  </Label>
                  <div className="d-flex gap-1">
                    <div className="d-flex gap-1">
                      <input type="radio" />
                      <div>Active</div>
                    </div>
                    <div className="d-flex gap-1">
                      <input type="radio" />
                      <div>In-Active</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Form>
          </div>
     
  );
}

export default EditChartOfAccounts;
