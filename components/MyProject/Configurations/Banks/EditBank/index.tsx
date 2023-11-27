import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BankService } from "services";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { checkTenant } from "constants/function";

function EditBank() {
  const router = useRouter();
  const { id } = router.query;
  const [tenantId, setTenantId] = useState("");

  useEffect(() => {
    const getTenant = async () => {
      const tenant = await checkTenant();
      // console.log(tenant, "tenant");
      if (tenant) {
        setTenantId(tenant.id);
      }
    };
    getTenant();
  }, []);

  const fetchBankDetails = (id) => BankService.details(tenantId, id);

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

    bankData?.Code && setValue("bankName", bankData?.Code);

    bankData?.Description && setValue("description", bankData?.Description);
  }),
    [bankData];

  const bankService = new BankService();

  const { mutate: bankMutate } = useSWR("LIST_BANKS", () =>
    bankService.getBanks(tenantId)
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

    BankService.edit(tenantId, id, backendFormat)
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
    <div className="mt-4">
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
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Bank Name
          </Label>

          <Controller
            name="bankName"
            control={control}
            rules={{ required: "Bank Name is required" }}
            render={({ field }) => (
              <Input
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                }}
                placeholder="Bank Name"
                invalid={errors.bankName && true}
                {...field}
              />
            )}
          />
          {errors.bankName && (
            <span style={{ color: "red" }}>
              {errors.bankName.message as React.ReactNode}
            </span>
          )}
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
            rules={{ required: "Description  is required" }}
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
              <input type="radio" />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input type="radio" />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditBank;
