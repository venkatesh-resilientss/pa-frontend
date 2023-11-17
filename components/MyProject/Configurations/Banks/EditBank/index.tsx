import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BankService } from "services";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
function EditBank() {
  const router = useRouter();
  const { id } = router.query;

  const fetchBankDetails = (id) => BankService.details(id);

  const {
    data: bankData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["BANK_DETAILS", id] : null, () => fetchBankDetails(id));

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (!bankData) return;

    bankData?.Code && setValue("taxcode", bankData?.Code);

    bankData?.Description && setValue("description", bankData?.Description);
  }),
    [bankData];

  const bankService = new BankService();

  const { mutate: bankMutate } = useSWR("LIST_BANKS", () =>
    bankService.getBanks()
  );

  const [activeStatus, setActiveStatus] = useState(bankData?.IsActive);

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      name: data.name,
      description: data.description,
      is_active: activeStatus,
      location: data.location,
    };

    BankService.edit(id, backendFormat)
      .then((res) => {
        toast.success("Bank Edited successfully");
        mutate(bankMutate());
        router.back();
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
        All Banks
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Edit Bank
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
            EDIT
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
            Bank Name
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                style={{ fontSize: "12px", fontWeight: "400" }}
                placeholder="Bank Name"
                invalid={errors.name && true}
                {...field}
              />
            )}
          />
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
          />
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
                    defaultChecked={bankData?.IsActive}
                    onChange={() => {
                      setActiveStatus(true);
                    }}
                  />
                )}
              />
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
                    defaultChecked={!bankData?.IsActive}
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

export default EditBank;
