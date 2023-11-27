"use client";
import React, { useState } from "react";
import { Row, Col, CardBody, Card } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, Popover } from "reactstrap";
import DataTable from "react-data-table-component";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import ImportExcelIcon from "assets/myIcons/importExel.svg";
import Image from "next/image";
import attchFileIcon from "assets/myIcons/attchfile.svg";
import ThreedotsIcon from "assets/myIcons/Threedotsicon.svg";
import controlPointIcon from "assets/myIcons/controlPointIcon.svg";
import deleteIcon from "assets/myIcons/deleteicon.svg";
import CopyIcon from "assets/myIcons/Copy.svg";
import SplitIcon from "assets/myIcons/Split.svg";
import PasteIcon from "assets/myIcons/paste.svg";
import { useRouter } from "next/router";
import AddVendorPopup from "../../AddVendorPopup";
import { openAddVendorPopup } from "redux/slices/mySlices/transactions";
import { useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const EditPurchaseOrder = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

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
          onChange={(e) => console.log(e.target.value)}
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
          onChange={(e) => console.log(e.target.value)}
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
          onChange={(e) => console.log(e.target.value)}
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
          onChange={(e) => console.log(e.target.value)}
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
          onChange={(e) => console.log(e.target.value)}
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
          onChange={(e) => console.log(e.target.value)}
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
          onChange={(e) => console.log(e.target.value)}
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
          onChange={(e) => console.log(e.target.value)}
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
          onChange={(e) => console.log(e.target.value)}
        />
      ),
    },
    {
      name: "Options",
      selector: "Options",
      cell: (row) => (
        <>
          <div className="d-flex">
            <Button
              id="Popover1"
              type="button"
              style={{
                backgroundColor: "transparent",
                border: "none",
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
        <div style={{ marginTop: "12px" }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div
                style={{
                  display: "flex",
                  gap: 30,
                }}
              >
                <p>Total amount</p>
                <input
                  value={"$100"}
                  style={{
                    width: "100px",
                    height: "25px",
                    borderColor: "#CCCCCC",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    color: "#000000",
                  }}
                />

                <div className="flex-column">
                  <p
                    style={{
                      marginTop: "-18px",
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
                      fontSize: "11px",
                      width: "43px",
                      height: "24px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      gap: "10px",
                      marginTop: "-3px",
                    }}
                  >
                    draft
                  </p>
                </div>
                <div className="flex-column">
                  <p
                    style={{
                      marginTop: "-18px",
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
                      fontSize: "11px",
                      width: "43px",
                      height: "25px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      gap: "10px",
                      marginTop: "-3px",
                    }}
                  >
                    $00.00
                  </p>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: "right", gap: 3 }}>
                <Button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    color: "#000",
                    cursor: "pointer",
                  }}
                >
                  <Image src={plusIcon} alt="" />
                  Add more lines
                </Button>

                <Button outline>
                  <span style={{ color: "#4C4C61", fontWeight: 400 }}>
                    <Image src={ImportExcelIcon} alt="" /> Import excel
                  </span>
                </Button>
              </div>
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
      <AddVendorPopup />
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              All Purchase order
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
                Edit Purchase order
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
              Back
            </Button>

            <Button
              onClick={() =>
                router.push(`/transactions/preview-purchase-order`)
              }
              style={{
                height: "30px",
                color: "#2D2C2C",
                backgroundColor: "transparent",
                borderRadius: "4px",
                border: "none",
              }}
              size="sm"
              outline
            >
              View Report
            </Button>

            <div>
              <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
                <DropdownToggle
                  style={{
                    height: "30px",
                    color: "#2D2C2C",
                    borderColor: "#00AEEF",
                    backgroundColor: "#ffffff",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                  caret
                >
                  Other Actions
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    Enable Distribution Lines
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

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
                  <div className="d-flex flex-column" style={{ gap: "10px" }}>
                    <div
                      style={{
                        color: "#030229",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Vendor information
                    </div>

                    <Row className="">
                      <Col sm="4">
                        <FormGroup>
                          <div className="d-flex justify-content-between">
                            <Label style={{ color: "#030229", height: "17px" }}>
                              Select vendor
                            </Label>
                            <Button
                              onClick={() =>
                                dispatch(openAddVendorPopup("open"))
                              }
                              className="d-flex align-items-center"
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: "4px",
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "17px",
                                gap: "5px",
                              }}
                            >
                              <Image src={plusIcon} alt="" />
                              Add Vendor
                            </Button>
                          </div>
                          <AsyncSelect
                            isClearable={true}
                            className="react-select"
                            classNamePrefix="select"
                            // loadOptions={loadSeriesOptions}
                            placeholder="Select Vendor"
                            // defaultOptions={seriesSelectFormat}
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                height: "34px",
                                minHeight: "34px",
                              }),
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            Vendor address
                          </Label>
                          <Input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter Vendor address"
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              height: "34px",
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            Vendor type
                          </Label>
                          <Input
                            type="text"
                            name="type"
                            id="type"
                            placeholder="Enter Vendor type"
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              height: "34px",
                            }}
                          />
                        </FormGroup>
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
                      PO Details
                    </div>
                    <div>
                      {" "}
                      <Row>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>
                              PO Number
                            </Label>
                            <Input
                              type="text"
                              placeholder="Enter PO Number"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>
                              PO Description
                            </Label>
                            <Input
                              type="text"
                              name="address"
                              id="address"
                              placeholder="Enter PO Description"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>
                              PO Amount
                            </Label>
                            <Input
                              type="number"
                              name="type"
                              id="type"
                              placeholder="Enter PO Amount"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>PO Date</Label>
                            <Input
                              type="date"
                              name="date"
                              id="exampleEmail1"
                              placeholder="Enter email 1"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>
                              PO Effective Date
                            </Label>
                            <Input
                              type="date"
                              name="POEffectiveDate"
                              id="address"
                              placeholder="Enter Vendor address"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>
                              PO Expiry Date
                            </Label>
                            <Input
                              type="date"
                              name="POExpiryDate"
                              id="type"
                              placeholder="Enter Vendor type"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
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

                    <div>
                      <Row>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>
                              Client Name
                            </Label>

                            <AsyncSelect
                              isClearable={true}
                              className="react-select"
                              classNamePrefix="select"
                              // loadOptions={loadSeriesOptions}
                              placeholder="Select Client"
                              // defaultOptions={seriesSelectFormat}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  height: "34px",
                                  minHeight: "34px",
                                }),
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>
                              Production
                            </Label>
                            <AsyncSelect
                              isClearable={true}
                              className="react-select"
                              classNamePrefix="select"
                              // loadOptions={loadSeriesOptions}
                              placeholder="Select Production"
                              // defaultOptions={seriesSelectFormat}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  height: "34px",
                                  minHeight: "34px",
                                }),
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>Bank</Label>
                            <AsyncSelect
                              isClearable={true}
                              className="react-select"
                              classNamePrefix="select"
                              // loadOptions={loadSeriesOptions}
                              placeholder="Select Bank"
                              // defaultOptions={seriesSelectFormat}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  height: "34px",
                                  minHeight: "34px",
                                }),
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>Currency</Label>
                            <AsyncSelect
                              isClearable={true}
                              className="react-select"
                              classNamePrefix="select"
                              // loadOptions={loadSeriesOptions}
                              placeholder="Select Currency"
                              // defaultOptions={seriesSelectFormat}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  height: "34px",
                                  minHeight: "34px",
                                }),
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>
                              Department
                            </Label>
                            <AsyncSelect
                              isClearable={true}
                              className="react-select"
                              classNamePrefix="select"
                              // loadOptions={loadSeriesOptions}
                              placeholder="Select Department"
                              // defaultOptions={seriesSelectFormat}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  height: "34px",
                                  minHeight: "34px",
                                }),
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label style={{ color: "#030229" }}>Period</Label>
                            <AsyncSelect
                              isClearable={true}
                              className="react-select"
                              classNamePrefix="select"
                              // loadOptions={loadSeriesOptions}
                              placeholder="Select Period"
                              // defaultOptions={seriesSelectFormat}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  height: "34px",
                                  minHeight: "34px",
                                }),
                              }}
                            />
                          </FormGroup>
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
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            gap: 4,
            marginTop: "20px",
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
            Add more lines
          </Button>

          <Button outline>
            <span style={{ color: "#4C4C61", fontWeight: 400 }}>
              <Image src={ImportExcelIcon} alt="" /> Import excel
            </span>
          </Button>
        </div>
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
                backgroundColor: "#F5F5F5",
                fontSize: "14px",
                fontWeight: "400",
              }}
              placeholder="Enter AdditionalNote"
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
        <div style={{ display: "flex", justifyContent: "end", gap: 4 }}>
          <Button
            style={{
              height: "30px",
              color: "#2D2C2C",
              borderColor: "#00AEEF",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            size="sm"
            outline
          >
            Save as Draft
          </Button>
          <Button
            style={{
              height: "30px",
              borderColor: "#00AEEF",
              borderWidth: "1px",
              borderStyle: "solid",
              backgroundColor: "#00AEEF",
              color: "#FFF",
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

export default EditPurchaseOrder;

import { useRef } from "react";

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
          backgroundColor: "#F5F5F5",
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
