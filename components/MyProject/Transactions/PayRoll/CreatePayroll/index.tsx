"use client";
import React, { useState } from "react";
import { Row, Col, CardBody, Card } from "reactstrap";
import { Button, Form, Label, Input, Popover } from "reactstrap";
import DataTable from "react-data-table-component";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import Image from "next/image";
import attchFileIcon from "assets/myIcons/attchfile.svg";
import ThreedotsIcon from "assets/myIcons/Threedotsicon.svg";
import controlPointIcon from "assets/myIcons/controlPointIcon.svg";
import deleteIcon from "assets/myIcons/deleteicon.svg";
import CopyIcon from "assets/myIcons/Copy.svg";
import SplitIcon from "assets/myIcons/Split.svg";
import PasteIcon from "assets/myIcons/paste.svg";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

const CreatePayroll = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
  } = useForm();

  const columns: any = [
    {
      name: "S.No",
      selector: "S.No",
      sortable: true,
      cell: (row) => (
        <input
          style={{
            width: "30px",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          type="text"
          value={row.inputValue}
        />
      ),
    },
    {
      name: "Account Number",
      selector: "AccountNumber",
      sortable: true,
      cell: (row) => (
        <input
          type="text"
          style={{
            width: "90px",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          value={row.inputValue}
        />
      ),
    },
    {
      name: "Account Name",
      selector: "AccountName",
      sortable: true,
      cell: (row) => (
        <input
          type="text"
          style={{
            width: "90px",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          value={row.inputValue}
        />
      ),
    },
    {
      name: "Description",
      selector: "Description",
      sortable: true,
      cell: (row) => (
        <input
          type="text"
          style={{
            width: "100px",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          value={row.inputValue}
        />
      ),
    },
    {
      name: "Amount",
      sortable: true,
      selector: "Amount",
      cell: (row) => (
        <input
          type="text"
          style={{
            width: "90px",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          value={row.inputValue}
        />
      ),
    },
    {
      name: "Set",
      selector: "Set",
      cell: (row) => (
        <select
          style={{
            width: "70px",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          value={row.inputValue}
        />
      ),
    },
    {
      name: "Series",
      selector: "Series",
      cell: (row) => (
        <select
          style={{
            width: "80px",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          value={row.inputValue}
        />
      ),
    },
    {
      name: "Location",
      selector: "Location",
      cell: (row) => (
        <select
          style={{
            width: "80px",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          value={row.inputValue}
        />
      ),
    },
    {
      name: "Tax Code",
      selector: "TaxCode",
      cell: (row) => (
        <select
          style={{
            width: "80px",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          value={row.inputValue}
        />
      ),
    },
    {
      name: "Options",
      selector: "Options",
      cell: () => (
        <>
          <div className="d-flex">
            <Button
              id="Popover1"
              type="button"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #fff",
                padding: "8px 16px",
                borderRadius: "4px",
                color: "#000",
                cursor: "pointer",
              }}
            >
              <Image src={ThreedotsIcon} alt="" style={{ cursor: "pointer" }} />
            </Button>

            <Image
              src={controlPointIcon}
              alt=""
              style={{
                cursor: "pointer",
                marginTop: "14px",
                marginLeft: "-10px",
              }}
            />
            <Image
              src={deleteIcon}
              alt=""
              style={{
                height: "20px",
                width: "30px",
                cursor: "pointer",
                marginTop: "14px",
                marginLeft: "-2px",
              }}
            />
          </div>
        </>
      ),
    },
  ];

  const data = [
    { id: 1, name: "John Doe", age: 28 },
    { id: 2, name: "Jane Doe", age: 35 },
    { id: 3, name: "John Doe", age: 28 },
    { id: 4, name: "Jane Doe", age: 35 },
    { id: 5, name: "John Doe", age: 28 },
    { id: 6, name: "Jane Doe", age: 35 },
    { id: 7, name: "John Doe", age: 28 },
    { id: 8, name: "Jane Doe", age: 35 },
    { id: 9, name: "John Doe", age: 28 },
    { id: 0, name: "Jane Doe", age: 35 },
  ];
  const customStyles = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#030229",
      },
    },
    headRow: {
      style: {
        background: "#D9D9D9",
      },
    },
    rows: {
      style: {
        background: "#F9FAFB",
      },
    },
  };

  const customTitle = () => {
    return (
      <>
        <div
          className="d-flex flex-column justify-content-center "
          style={{ height: "46px" }}
        >
          <Row>
            <Col xl="6">
              <div
                className="d-flex align-items-center "
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "24px", fontWeight: "600" }}>
                  Total Amount{" "}
                </div>
                <input
                  defaultValue={"$100"}
                  style={{
                    width: "100px",
                    height: "25px",
                    fontSize: "21px",
                    fontWeight: "600",
                    borderColor: "#CCCCCC",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    color: "#000000",
                  }}
                />

                <div className=" flex flex-column" style={{ gap: "4px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#030229",
                      fontWeight: 600,
                    }}
                  >
                    Status
                  </p>
                  <p
                    style={{
                      backgroundColor: "#B5DEF0",
                      fontSize: "12px",
                      fontWeight: "400",
                      width: "43px",
                      height: "24px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Draft
                  </p>
                </div>
                <div className=" flex flex-column" style={{ gap: "4px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#030229",
                      fontWeight: 600,
                    }}
                  >
                    Distributed
                  </p>
                  <p
                    style={{
                      backgroundColor: "#EBEBEB",
                      fontSize: "12px",
                      fontWeight: "400",
                      width: "77px",
                      height: "25px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      gap: "10px",
                    }}
                  >
                    $00.00
                  </p>
                </div>

                <div className=" flex flex-column" style={{ gap: "4px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#030229",
                      fontWeight: 600,
                    }}
                  >
                    Transaction no.
                  </p>
                  <p
                    style={{
                      backgroundColor: "#EBEBEB",
                      fontSize: "12px",
                      fontWeight: "400",
                      width: "77px",
                      height: "25px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      gap: "10px",
                    }}
                  >
                    -
                  </p>
                </div>
              </div>
            </Col>
            <Col
              xl="6"
              className="d-flex justify-content-end align-items-center"
              style={{ gap: "6px" }}
            >
              <Button
                className=""
                onClick={() => dispatch(openAddMoreLinesToPayrollPopup("id"))}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  color: "#000",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                <Image
                  src={plusIcon}
                  alt=""
                  style={{ width: "14px", height: "14px" }}
                />{" "}
                Add more lines{" "}
              </Button>

              <Button
                style={{
                  color: "#4C4C61",
                  fontSize: "14px",
                  backgroundColor: "#ffff",
                  fontWeight: 400,
                  height: "34px",
                  border: "none",
                }}
              >
                <Image
                  src={CopyIcon}
                  alt=""
                  style={{ width: "14px", height: "14px" }}
                />{" "}
                Paste Values
              </Button>
              {/* 
              <Button
                // onClick={() =>
                //   // dispatch(openImportFromExcelPurchaseOrderPopup("id"))
                // }
                style={{
                  color: "#4C4C61",
                  fontSize: "14px",
                  backgroundColor: "#ffff",
                  fontWeight: 400,
                  height: "34px",
                }}
              >
                <Image
                  src={ImportExcelIcon}
                  alt=""
                  style={{ width: "14px", height: "14px" }}
                />{" "}
                Import Excel
              </Button> */}
            </Col>
          </Row>
        </div>
      </>
    );
  };

  const TheeDotsClickItems = () => {
    return (
      <>
        <div
          className="flex-column"
          style={{
            height: "150px",
            width: "150px",
            backgroundColor: "#FFFFFF",
            borderRadius: "10%",
            borderColor: "#CCCCCC",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <Button
            style={{
              backgroundColor: "transparent",
              border: "1px solid #fff",
              padding: "8px 16px",
              borderRadius: "4px",
              color: "#000",
              cursor: "pointer",
            }}
          >
            <Image src={plusIcon} alt="" />

            <span style={{ fontSize: "12px" }}> Add more lines</span>
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              border: "1px solid #fff",
              padding: "8px 16px",
              borderRadius: "4px",
              color: "#000",
              cursor: "pointer",
              marginTop: "-10px",
            }}
          >
            <Image src={CopyIcon} alt="" />
            <span style={{ fontSize: "12px" }}>Copy</span>
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              border: "1px solid #fff",
              padding: "8px 16px",
              borderRadius: "4px",
              color: "#000",
              cursor: "pointer",
              marginTop: "-10px",
            }}
          >
            <Image src={PasteIcon} alt="" />
            <span style={{ fontSize: "12px" }}>Paste</span>
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              border: "1px solid #fff",
              padding: "8px 16px",
              borderRadius: "4px",
              color: "#000",
              cursor: "pointer",
              marginTop: "-10px",
            }}
          >
            <Image src={SplitIcon} alt="" />
            <span style={{ fontSize: "12px" }}> Split</span>
          </Button>
        </div>
      </>
    );
  };
  return (
    <div className="my-3">
      <AddMoreLinesToPayrollPopup />
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              All Payroll
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
                Create New Payroll
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
                borderRadius: "4px",
              }}
              size="sm"
              outline
            >
              Dismiss
            </Button>
            <Button
              style={{
                height: "30px",
                color: "#2D2C2C",
                borderColor: "#00AEEF",
                backgroundColor: "#ffffff",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              size="sm"
            >
              Save
            </Button>
            <Button
              style={{
                height: "30px",
                color: "#2D2C2C",
                borderColor: "#00AEEF",
                backgroundColor: "#ffffff",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              size="sm"
            >
              Unbalanced
            </Button>
            <Button
              style={{
                height: "30px",
                backgroundColor: "#00AEEF",
                color: "#FFF",
                borderColor: "#00AEEF",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              size="sm"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <div
        style={{
          // padding: "30.42px 60.85px 0 60.85px",
          gap: "60.85px",
        }}
      >
        <div>
          <div>
            <Form
              className="d-flex flex-column"
              style={{ gap: "10px", fontSize: "12px", fontWeight: "400" }}
            >
              <Card style={{ border: "none" }}>
                <CardBody>
                  <div className="d-flex flex-column " style={{ gap: "10px" }}>
                    <div
                      style={{
                        color: "#030229",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Transaction Data
                    </div>
                    <Row>
                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>
                          Payroll Number
                        </Label>
                        <Controller
                          name="PayrollNumber"
                          rules={{
                            required: "Payroll Number is required",
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              invalid={errors.PayrollNumber && true}
                              {...field}
                              placeholder="Enter Payroll Number"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                        {errors.PayrollNumber && (
                          <span className="text-danger">
                            {errors.PayrollNumber.message as React.ReactNode}
                          </span>
                        )}
                      </Col>

                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>Description</Label>
                        <Controller
                          name="Description"
                          rules={{
                            required: "Description is required",
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              invalid={errors.Description && true}
                              {...field}
                              placeholder="Enter Description"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                        {errors.Description && (
                          <span className="text-danger">
                            {errors.Description.message as React.ReactNode}
                          </span>
                        )}
                      </Col>

                      <Col sm="4">
                        <Label style={{ color: "#030229" }}> Amount</Label>
                        <Controller
                          name="Amount"
                          rules={{
                            required: "Amount is required",
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              invalid={errors.Amount && true}
                              {...field}
                              placeholder="$"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                        {errors.Amount && (
                          <span className="text-danger">
                            {errors.Amount.message as React.ReactNode}
                          </span>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>Week Ending</Label>
                        <Controller
                          name="WeekEnding"
                          rules={{
                            required: "Week Ending is required",
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="date"
                              invalid={errors.WeekEnding && true}
                              {...field}
                              placeholder="$"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                        {errors.WeekEnding && (
                          <span className="text-danger">
                            {errors.WeekEnding.message as React.ReactNode}
                          </span>
                        )}
                      </Col>

                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>
                          Effective Date
                        </Label>
                        <Controller
                          name="EffectiveDate"
                          rules={{
                            required: " Effective Date is required",
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="date"
                              invalid={errors.EffectiveDate && true}
                              {...field}
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                        {errors.EffectiveDate && (
                          <span className="text-danger">
                            {errors.EffectiveDate.message as React.ReactNode}
                          </span>
                        )}
                      </Col>

                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>
                          Confirmation Number
                        </Label>
                        <Controller
                          name="ConfirmationNumber"
                          rules={{
                            required: "Confirmation Number is required",
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              invalid={errors.ConfirmationNumber && true}
                              {...field}
                              placeholder="Enter Confirmation Number"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                        {errors.ConfirmationNumber && (
                          <span className="text-danger">
                            {
                              errors.ConfirmationNumber
                                .message as React.ReactNode
                            }
                          </span>
                        )}
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>
                          Original TRX Number
                        </Label>
                        <Controller
                          name="OriginalTRXNumber"
                          rules={{
                            required: " Original TRX Number is required",
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              invalid={errors.OriginalTRXNumber && true}
                              {...field}
                              placeholder="Enter Original TRX Number"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                        {errors.OriginalTRXNumber && (
                          <span className="text-danger">
                            {
                              errors.OriginalTRXNumber
                                .message as React.ReactNode
                            }
                          </span>
                        )}
                      </Col>

                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>Source Code</Label>
                        <Controller
                          name="SourceCode"
                          rules={{
                            required: " Source Code is required",
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="text"
                              invalid={errors.SourceCode && true}
                              {...field}
                              placeholder="Enter Source Code"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                        {errors.SourceCode && (
                          <span className="text-danger">
                            {errors.SourceCode.message as React.ReactNode}
                          </span>
                        )}
                      </Col>

                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>Period</Label>
                        <Controller
                          name="Period"
                          rules={{ required: "Period is required" }}
                          control={control}
                          render={({ field }) => (
                            <AsyncSelect
                              {...field}
                              isClearable={true}
                              className="react-select"
                              classNamePrefix="select"
                              // loadOptions={loadSeriesOptions}
                              placeholder="Select Period"
                              // defaultOptions={seriesSelectFormat}
                              styles={{
                                control: (provided: any) => ({
                                  ...provided,
                                  height: "34px",
                                  minHeight: "34px",
                                }),
                              }}
                            />
                          )}
                        />
                        {errors.Period && (
                          <span className="text-danger">
                            {errors.Period.message as React.ReactNode}
                          </span>
                        )}
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Card style={{ border: "none" }}>
                <CardBody>
                  <div className="d-flex flex-column" style={{ gap: "10px" }}>
                    <div
                      style={{
                        color: "#030229",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Other Information
                    </div>

                    <div className="d-flex flex-column" style={{ gap: "10px" }}>
                      <Row>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>
                            Client Name
                          </Label>
                          <Controller
                            name="client"
                            rules={{ required: "Client is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                // loadOptions={loadSeriesOptions}
                                placeholder="Select Client"
                                // defaultOptions={seriesSelectFormat}
                                styles={{
                                  control: (provided: any) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.client && (
                            <span className="text-danger">
                              {errors.client.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Production</Label>
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
                                placeholder="Select Production"
                                // defaultOptions={seriesSelectFormat}
                                styles={{
                                  control: (provided: any) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.production && (
                            <span className="text-danger">
                              {errors.production.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Bank</Label>
                          <Controller
                            name="bank"
                            rules={{ required: "Bank is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                // loadOptions={loadSeriesOptions}
                                placeholder="Select Bank"
                                // defaultOptions={seriesSelectFormat}
                                styles={{
                                  control: (provided: any) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.bank && (
                            <span className="text-danger">
                              {errors.bank.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Currency</Label>
                          <Controller
                            name="currency"
                            rules={{ required: "Currency is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                // loadOptions={loadSeriesOptions}
                                placeholder="Select Currency"
                                // defaultOptions={seriesSelectFormat}
                                styles={{
                                  control: (provided: any) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.currency && (
                            <span className="text-danger">
                              {errors.currency.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Department</Label>
                          <Controller
                            name="department"
                            rules={{ required: "Department is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                // loadOptions={loadSeriesOptions}
                                placeholder="Select Department"
                                // defaultOptions={seriesSelectFormat}
                                styles={{
                                  control: (provided: any) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.department && (
                            <span className="text-danger">
                              {errors.department.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Period</Label>
                          <Controller
                            name="period"
                            rules={{ required: "Period is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                // loadOptions={loadSeriesOptions}
                                placeholder="Select Period"
                                // defaultOptions={seriesSelectFormat}
                                styles={{
                                  control: (provided: any) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.period && (
                            <span className="text-danger">
                              {errors.period.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Form>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <Popover
              placement="left-start"
              isOpen={popoverOpen}
              target="Popover1"
              toggle={() => setPopoverOpen(!popoverOpen)}
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: "-150px, 0",
                },
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                {TheeDotsClickItems()}
              </div>
            </Popover>

            <DataTable
              title={customTitle()}
              columns={columns}
              data={data}
              //   pagination
              customStyles={customStyles}
            />
          </div>
        </div>

        <Col
          xl="12"
          className="d-flex justify-content-end"
          style={{ gap: "6px" }}
        >
          <Button
            className=""
            onClick={() => dispatch(openAddMoreLinesToPayrollPopup("id"))}
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              color: "#000",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            <Image
              src={plusIcon}
              alt=""
              style={{ width: "14px", height: "14px" }}
            />{" "}
            Add more lines{" "}
          </Button>

          <Button
            style={{
              color: "#4C4C61",
              fontSize: "14px",
              backgroundColor: "transparent",
              fontWeight: 400,
              height: "34px",
              border: "none",
            }}
          >
            <Image
              src={CopyIcon}
              alt=""
              style={{ width: "14px", height: "14px" }}
            />{" "}
            Paste Values
          </Button>

          {/* <Button
            // onClick={() =>
            //   // dispatch(openImportFromExcelPurchaseOrderPopup("id"))
            // }
            style={{
              color: "#4C4C61",
              fontSize: "14px",
              backgroundColor: "#ffff",
              fontWeight: 400,
              height: "34px",
            }}
          >
            <Image
              src={ImportExcelIcon}
              alt=""
              style={{ width: "14px", height: "14px" }}
            />{" "}
            Import Excel
          </Button> */}
        </Col>

        <hr />

        <Row>
          <Col xl="8">
            <Label style={{ color: "#030229" }}>Additional Notes</Label>
            <Input
              type="textarea"
              name="AdditionalNote"
              id="AdditionalNote"
              style={{
                height: "80px",
                width: "500px",
                borderColor: "#CCCCCC",
                borderWidth: "1px",
                borderStyle: "solid",
                fontSize: "14px",
                fontWeight: "400",
              }}
              placeholder="Enter Additional Note"
            />
          </Col>
          <Col xl="4" className="d-flex flex-column">
            <div>
              {" "}
              <Label style={{ color: "#030229" }}>
                <Image
                  src={attchFileIcon}
                  alt=""
                  style={{ height: "14px", width: "14px" }}
                />
                Attachments
              </Label>
              <FileUpload />
            </div>
          </Col>
        </Row>

        <hr />

        <div className="d-flex justify-content-end " style={{ gap: "5px" }}>
          <Button
            onClick={() => router.back()}
            style={{
              height: "30px",
              color: "#2D2C2C",
              backgroundColor: "transparent",
              border: "none",
              borderRadius: "4px",
            }}
            size="sm"
            outline
          >
            Dismiss
          </Button>
          <Button
            style={{
              height: "30px",
              color: "#2D2C2C",
              borderColor: "#00AEEF",
              backgroundColor: "#ffffff",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            size="sm"
          >
            Save
          </Button>
          <Button
            style={{
              height: "30px",
              color: "#2D2C2C",
              borderColor: "#00AEEF",
              backgroundColor: "#ffffff",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            size="sm"
          >
            Unbalanced
          </Button>
          <Button
            style={{
              height: "30px",
              backgroundColor: "#00AEEF",
              color: "#FFF",
              borderColor: "#00AEEF",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            size="sm"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePayroll;

import { useRef } from "react";
import { openAddMoreLinesToPayrollPopup } from "redux/slices/mySlices/transactions";
import { useDispatch } from "react-redux";
import AddMoreLinesToPayrollPopup from "../AddMoreLinesPopup";

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setSelectedFileName(selectedFile ? selectedFile.name : "");
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div
        className="d-flex justify-content-between cursor-pointer"
        onClick={handleUploadButtonClick}
        style={{
          width: "400px",
          height: "38px",
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingRight: "12px",
          paddingLeft: "12px",
          fontSize: "12px",
          fontWeight: "400",
          borderRadius: "4px",
          border: "1px solid",
          borderColor: "#CCCCCC",
        }}
      >
        {!selectedFileName && <p>Click To Upload</p>}
        {selectedFileName && <p> {selectedFileName}</p>}
        <div
          style={{
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingRight: "4px",
            paddingLeft: "4px",
            borderRadius: "4px",
          }}
          className="border"
        >
          Upload{" "}
        </div>
      </div>

      {/* Display selected file name */}
    </div>
  );
};
