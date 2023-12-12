import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BankService } from "services";
import useSWR from "swr";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
const bankService = new BankService();

function EditBank() {
  const router = useRouter();
  const { id } = router.query;

  const fetchBankDetails = (id) => bankService.bankDetails(id);

  const { data: bankData } = useSWR(id ? ["BANK_DETAILS", id] : null, () =>
    fetchBankDetails(id)
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (!bankData) return;

    bankData?.Code && setValue("bankName", bankData?.Code);

    bankData?.Description && setValue("description", bankData?.Description);
  }),
    [bankData];

  const onSubmit = (data) => {
    const backendFormat = {
      name: data.name,
      description: data.description,
      is_active: bankData?.IsActive,
      location: data.location,
    };

    bankService
      .editBank(id, backendFormat)
      .then(() => {
        toast.success("Bank Edited successfully");
        router.push('/configurations/banks');
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || 'Unable to add state');
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
            <span className="text-danger">
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
            <span className="text-danger">
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
