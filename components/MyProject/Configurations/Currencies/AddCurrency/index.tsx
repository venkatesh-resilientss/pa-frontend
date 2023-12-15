import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { CurrencyService } from "services";
import { formValidationRules } from "@/constants/common";
import { getLabel } from "@/commonFunctions/common";
import { useState } from "react";
import {LoaderButton} from '@/components/Loaders/';
function AddCurrency() {
  const currencyService = new CurrencyService();
  const currencyValidationRules = formValidationRules.currencies;
  const [isLoading,setLoader] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    const backendFormat = {
      name: getLabel(data.currencyname),
      code: data.currencycode,
      currencySymbol: data.currencysymbol,
      currentRate: data.currentRate,
      description: data.description,
      BaseCurrency: data.BaseCurrency,
    };
    setLoader(true);
    currencyService
      .createCurrency(backendFormat)
      .then(() => {
        toast.success("Currency Added successfully");
        reset();
        setLoader(false);
        router.back();
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.error || error?.Message || "Unable to add Currency");
      });
  };

  return (
    <div className="section configuration-add">
      <div className="overflow-auto mt-4">
        <div className="title-head">All Currencies</div>
        <div className="d-flex justify-content-between">
          <div className="title">Add New Currency</div>
          <div className="d-flex me-2 align-items-center" style={{ gap: "10px" }}>
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
            <LoaderButton handleClick={handleSubmit(onSubmit)} buttonText={'Save'} isLoading={isLoading}/>
          </div>
        </div>
        <hr style={{ height: "2px" }} />
        <Form
          style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
          className=" mt-2 d-flex flex-column"
          onSubmit={handleSubmit(onSubmit)}
        >
          {" "}
          <Col xl="5">
            <div className="mb-1">
              <Label className="form-lable-font">
                Currency Code<span className="required">*</span>
              </Label>
              <Controller
                name="currencycode"
                rules={currencyValidationRules.code}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Currency Code"
                    invalid={errors.currencycode && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              {errors.currencycode && (
                <span className="text-danger">
                  {errors.currencycode.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 mt-2">
              <Label className="form-lable-font">
                Currency Name<span className="required">*</span>
              </Label>
              <Controller
                name="currencyname"
                rules={currencyValidationRules.name}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Currency Name"
                    invalid={errors.currencyname && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              {errors.currencyname && (
                <span className="text-danger">
                  {errors.currencyname.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 mt-2">
              <Label className="form-lable-font">
                Currency Symbol<span className="required">*</span>
              </Label>
              <Controller
                name="currencysymbol"
                rules={currencyValidationRules.symbol}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Currency Symbol"
                    invalid={errors.currencyname && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              {errors.currencysymbol && (
                <span style={{ color: "red" }}>
                  {errors.currencysymbol.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 mt-2 d-flex gap-2 align-items-center">
              <Controller
                name="BaseCurrency"
                control={control}
                render={({ field }) => (
                  <Input
                    type="checkbox"
                    invalid={errors.isBaseCurrency && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              <Label className="form-lable-font mb-0">Is Base Currency</Label>
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 mt-2">
              <Label className="form-lable-font">
                Decimal Value of 1 current rate vs 1.00 unit of base currency
                <span className="required">*</span>
              </Label>
              <Controller
                name="currentRate"
                rules={currencyValidationRules.currentRate}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Enter Value"
                    invalid={errors.currentRate && true}
                    style={{ fontSize: "12px", fontWeight: "400" }}
                    {...field}
                  />
                )}
              />
              {errors.currentRate && (
                <span style={{ color: "red" }}>
                  {errors.currentRate.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
          <Col xl="5">
            <div className="mb-1 ">
              <Label className="form-lable-font">Description</Label>
              <Controller
                name="description"
                control={control}
                rules={currencyValidationRules.description}
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
              {errors.description && (
                <span style={{ color: "red" }}>
                  {errors.description.message as React.ReactNode}
                </span>
              )}
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
}

export default AddCurrency;
