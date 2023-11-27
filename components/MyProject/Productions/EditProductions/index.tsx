import ReactSelect from "react-select";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { useState } from "react";

function EditProductions() {
  const router = useRouter();
  const { id } = router.query;

  const [purchaseOrderValue, setPurchaseOrderValue] = useState(false);
  const [accountPayableValue, setAccountPayableValue] = useState(false);

  const {
    control,
    setError,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedPurchaseOrderValues, setSelectedPurchaseOrderValues] =
    useState(["", ""]);

  const [selectedAPValues, setSelectedAPValues] = useState(["", ""]);

  const handleInputChange = (index, value) => {
    const newValues = [...selectedPurchaseOrderValues];
    newValues[index] = value;
    setSelectedPurchaseOrderValues(newValues);
  };

  const handleCheckboxChange = () => {
    setPurchaseOrderValue(!purchaseOrderValue);
  };

  const handleCheckboxAccountPayableChange = () => {
    setAccountPayableValue(!accountPayableValue);
  };

  const handleAddPurchaseOrderField = () => {
    setSelectedPurchaseOrderValues([...selectedPurchaseOrderValues, ""]);
  };

  const handleAddAccountPayableField = () => {
    setSelectedAPValues([...selectedAPValues, ""]);
  };

  return (
    <div className="my-3" style={{ fontSize: "14px", fontWeight: "400" }}>
      <div className="d-flex justify-content-between">
        <div>
          <div style={{ fontSize: "16px", fontWeight: "600" }}>
            All Productions
          </div>

          <div>
            <div
              style={{
                fontFamily: "Segoe UI",
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: "50px",
                textAlign: "left",
              }}
            >
              Edit Production
            </div>
          </div>
        </div>
        <div className="d-flex my-auto " style={{ gap: "5px" }}>
          <Button
            onClick={() => router.back()}
            style={{
              height: "30px",
              color: "#2D2C2C",
              backgroundColor: "transparent",
              border: "none",
            }}
            size="sm"
            outline
          >
            Dismiss
          </Button>
          <Button
            style={{
              height: "30px",
              color: "#ffffff",
              borderColor: "#00AEEF",
              backgroundColor: "#00AEEF",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            size="sm"
          >
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <div>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Basic Information
        </div>
        <Row style={{ fontSize: "14px", fontWeight: "400", marginTop: "10px" }}>
          <Col sm="4">
            <Label style={{ color: "#030229" }}>Production Code</Label>
            <Controller
              name="productionCode"
              rules={{ required: "Production Code is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter Production Code"
                  invalid={errors.productionCode && true}
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    height: "34px",
                  }}
                />
              )}
            />
            {errors.productionCode && (
              <span style={{ color: "red" }}>
                {errors.productionCode.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col sm="4">
            <Label style={{ color: "#030229" }}>Production Name</Label>
            <Controller
              name="productionName"
              rules={{ required: "Production Name is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter Production Name"
                  invalid={errors.productionName && true}
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    height: "34px",
                  }}
                />
              )}
            />
            {errors.productionName && (
              <span style={{ color: "red" }}>
                {errors.productionName.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
        {/* <div className="d-flex flex-column mt-1">
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
        </div> */}
      </div>

      <hr style={{ height: "2px" }} />

      <div>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Approval work flow for Transactions
        </div>
        <div className="">
          <div className="d-flex" style={{ gap: "5px" }}>
            <input
              type="checkbox"
              checked={purchaseOrderValue}
              onChange={handleCheckboxChange}
            />
            <div style={{ fontSize: "16px" }}>Purchase Order</div>
          </div>

          {purchaseOrderValue && (
            <div>
              <Row
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {selectedPurchaseOrderValues.map((value, index) => (
                  <Col xl="3">
                    <Label>Level {index + 1} Approver</Label>
                    <AsyncSelect
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      // loadOptions={loadSeriesOptions}
                      placeholder="Select User"
                      // defaultOptions={seriesSelectFormat}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          height: "34px",
                          minHeight: "34px",
                        }),
                      }}
                    />
                  </Col>
                ))}
                <Col className="my-auto">
                  {" "}
                  <Button
                    style={{
                      height: "34px",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                    color="white"
                    onClick={handleAddPurchaseOrderField}
                  >
                    + Approver
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          <div className="d-flex" style={{ gap: "5px" }}>
            <input
              type="checkbox"
              checked={accountPayableValue}
              onChange={handleCheckboxAccountPayableChange}
            />
            <div style={{ fontSize: "16px" }}>Account Payable</div>
          </div>
        </div>

        {accountPayableValue && (
          <Row>
            {selectedAPValues.map((value, index) => (
              <Col xl="3">
                <Label>Level {index + 1} Approver</Label>
                <AsyncSelect
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  // loadOptions={loadSeriesOptions}
                  placeholder="Select User"
                  // defaultOptions={seriesSelectFormat}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      height: "34px",
                      minHeight: "34px",
                    }),
                  }}
                />
              </Col>
            ))}
            <Col className="my-auto">
              {" "}
              <Button
                style={{
                  height: "34px",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
                color="white"
                onClick={handleAddAccountPayableField}
              >
                + Approver
              </Button>
            </Col>
          </Row>
        )}
      </div>

      <hr style={{ height: "2px" }} />

      <div className="d-flex flex-column" style={{ gap: "10px" }}>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Production Accountant{" "}
        </div>

        <Col sm="4">
          <Label style={{ color: "#030229" }}>User</Label>
          <Controller
            name="production"
            rules={{ required: "Production is required" }}
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                isClearable={true}
                className="react-select"
                classNamePrefix="select"
                // loadOptions={loadSeriesOptions}
                placeholder="Select User"
                // defaultOptions={seriesSelectFormat}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    height: "34px",
                    minHeight: "34px",
                  }),
                }}
              />
            )}
          />
          {errors.production && (
            <span style={{ color: "red" }}>
              {errors.production.message as React.ReactNode}
            </span>
          )}
        </Col>
      </div>
    </div>
  );
}

export default EditProductions;
