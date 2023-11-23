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
import ApprovePettyCashPopup from "./ApprovePettyCashPopup";
import RejectPettyCashPopup from "./RejectPettyCashPopup";
import { useDispatch } from "react-redux";
import {
  openApprovePettyCashPopup,
  openRejectPettyCashPopup,
} from "redux/slices/mySlices/transactions";

const ApprovePettyCashDetails = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const columns:any = [
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
      <ApprovePettyCashPopup />
      <RejectPettyCashPopup />
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              All Petty Cash
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
                Approve Petty Cash
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
                border: "1px solid #fff",
                borderRadius: "4px",
              }}
              size="sm"
              outline
            >
              Back
            </Button>
            <Button
              onClick={() => dispatch(openRejectPettyCashPopup("dummy"))}
              style={{
                height: "30px",
                color: "#2D2C2C",
                borderColor: "#EF3900",
                backgroundColor: "#ffffff",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              size="sm"
            >
              Reject
            </Button>
            <Button
              onClick={() => dispatch(openApprovePettyCashPopup("dummy"))}
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
              Approve
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
                  <div>
                    <div
                      style={{
                        color: "#030229",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Vendor information
                    </div>

                    <Row className="mt-2">
                      <Col sm="4">
                        <FormGroup>
                          <div className="d-flex justify-content-between">
                            <Label style={{ color: "#030229" }}>
                              Select vendor
                            </Label>
                            <Button
                              style={{
                                backgroundColor: "transparent",
                                border: "1px solid #fff",
                                padding: "8px 16px",
                                borderRadius: "4px",
                                marginTop: "-5px",
                                color: "#000",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <Image src={plusIcon} alt="" />
                              Add vendor
                            </Button>
                          </div>
                          <Input
                            name="select"
                            type="select"
                            placeholder="Select vendor "
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
                            style={{ fontSize: "12px", fontWeight: "400" }}
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
                            style={{ fontSize: "12px", fontWeight: "400" }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
              <Card style={{ border: "none" }}>
                <CardBody>
                  <div>
                    <div
                      style={{
                        color: "#030229",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Petty Cash Data
                    </div>
                    <Row className="mt-2">
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            Envelope Number
                          </Label>
                          <Input
                            type="text"
                            name="Date"
                            id="exampleEmail1"
                            placeholder="Enter Envelope Number"
                            style={{ fontSize: "12px", fontWeight: "400" }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            Description
                          </Label>
                          <Input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter Description"
                            style={{ fontSize: "12px", fontWeight: "400" }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}> Amount</Label>
                          <Input
                            type="text"
                            name="type"
                            id="type"
                            placeholder="$"
                            style={{ fontSize: "12px", fontWeight: "400" }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            Transaction Date
                          </Label>
                          <Input
                            type="date"
                            name="date"
                            id="exampleEmail1"
                            placeholder="Enter email 1"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            PC Effective Date
                          </Label>
                          <Input
                            type="date"
                            name="POEffectiveDate"
                            id="address"
                            placeholder="Enter Vendor address"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>Period</Label>
                          <Input
                            type="select"
                            placeholder="Select Period"
                            style={{ fontSize: "12px", fontWeight: "400" }}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            Envelope Amount
                          </Label>
                          <Input
                            type="text"
                            name="type"
                            id="type"
                            placeholder="$"
                            style={{ fontSize: "12px", fontWeight: "400" }}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            Advanced Amount
                          </Label>
                          <Input
                            type="text"
                            name="type"
                            id="type"
                            placeholder="$"
                            style={{ fontSize: "12px", fontWeight: "400" }}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            {" "}
                            Beginning PC Balance
                          </Label>
                          <Input
                            type="text"
                            name="type"
                            id="type"
                            placeholder="Enter PC Balance"
                            style={{ fontSize: "12px", fontWeight: "400" }}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            {" "}
                            Remaining PC Balance
                          </Label>
                          <Input
                            type="text"
                            name="type"
                            id="type"
                            placeholder="Enter Remaining Balance"
                            style={{ fontSize: "12px", fontWeight: "400" }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
              <Card style={{ border: "none" }}>
                <CardBody>
                  {" "}
                  <div>
                    <div
                      style={{
                        color: "#030229",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Other Information
                    </div>

                    <Row className="mt-2">
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>
                            Client Name
                          </Label>
                          <Input
                            type="select"
                            name="ClientName"
                            id="exampleEmail1"
                            placeholder="Enter email 1"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>Production</Label>
                          <Input
                            type="select"
                            name="Production"
                            id="address"
                            placeholder="Enter Vendor address"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>Bank</Label>
                          <Input
                            type="select"
                            name="Bank"
                            id="type"
                            placeholder="Enter Vendor type"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>Currency</Label>
                          <Input
                            type="select"
                            name="Currency"
                            id="exampleEmail1"
                            placeholder="Enter email 1"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>Department</Label>
                          <Input
                            type="select"
                            name="Department"
                            id="address"
                            placeholder="Enter Vendor address"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label style={{ color: "#030229" }}>Period</Label>
                          <Input
                            type="select"
                            name="Period"
                            id="type"
                            placeholder="Enter Vendor type"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "calc(100% - 58px)",
            height: "106px",
            padding: "0px 24px",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "calc(100% - 8px)",
              height: "106px",
              gap: "8px",
            }}
          >
            <FormGroup>
              <Label style={{ color: "#030229" }}>Additional Notes</Label>
              <Input
                type="text"
                name="AdditionalNote"
                id="AdditionalNote"
                style={{
                  height: "80px",
                  width: "500px",
                  borderColor: "#CCCCCC",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                placeholder="Enter AdditionalNote"
              />
            </FormGroup>
          </div>
          <div
            style={
              {
                //   display: "flex",
                //   justifyContent: "space-between",
                //   alignItems: "center",
                //   width: "fit-content",
                //   height: "63px",
                //   gap: "8px",
              }
            }
          >
            <FormGroup>
              <Label style={{ color: "#030229" }}>
                <Image
                  src={attchFileIcon}
                  alt=""
                  style={{ marginLeft: "90px" }}
                />
                Attchments
              </Label>
              <div
                style={{
                  height: "38px",
                  width: "500px",
                  borderRadius: "3%",
                  borderColor: "#CCCCCC",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  marginLeft: "18%",
                }}
                placeholder="Enter AdditionalNote"
              >
                <span
                  style={{
                    color: "#030229",
                    fontWeight: 400,
                    fontSize: "12px",
                    margin: "10px",
                  }}
                >
                  Star-Lights-LLxlm
                </span>
                <Button
                  outline
                  size="sm"
                  style={{
                    float: "right",
                    margin: "5px",

                    textAlign: "center",
                  }}
                >
                  upload
                </Button>
              </div>
            </FormGroup>
          </div>
        </div>

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

export default ApprovePettyCashDetails;
