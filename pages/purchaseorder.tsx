"use client";
import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, Popover } from "reactstrap";
import DataTable from "react-data-table-component";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import ImportExcelIcon from "assets/myIcons/importExel.svg";
import Image from "next/image";
import attchFileIcon from "assets/myIcons/attchfile.svg";

import CopyIcon from "assets/myIcons/Copy.svg";
import SplitIcon from "assets/myIcons/Split.svg";
import PasteIcon from "assets/myIcons/paste.svg";

const Purchaseorder = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

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
                      marginTop: "-15px",
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
                      height: "25px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      gap: "10px",
                      marginTop: "-10px",
                    }}
                  >
                    draft
                  </p>
                </div>
                <div className="flex-column">
                  <p
                    style={{
                      marginTop: "-15px",
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
                      marginTop: "-10px",
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
    <div className="m-4" style={{ backgroundColor: "#F9FAFB" }}>
      <div style={{ padding: "30.42px 60.85px 0 60.85px", gap: "60.85px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              padding: "24px 38px 38px 38px",
              borderRadius: "12px",
              gap: "25px",
            }}
          >
            <div className="font-segoe-ui text-41 font-semibold leading-57 tracking-tighter text-left">
              All purchase order
            </div>

            <div className="w-2127.41 h-114">
              <div
                style={{
                  fontFamily: "Segoe UI",
                  fontSize: "26px",
                  fontWeight: 600,
                  lineHeight: "50px",
                  textAlign: "left",
                }}
              >
                Create New Purchase order
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 3,
              padding: "24px 38px 38px 38px",
              borderRadius: "12px",
            }}
          >
            <Button
              style={{
                height: "30px",
                color: "#2D2C2C",
                backgroundColor: "transparent",
                border: "1px solid #fff",
                borderRadius: "4px",
                cursor: "pointer",
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
      <hr style={{ marginTop: "-20px" }} />
      <div
        style={{
          padding: "30.42px 60.85px 0 60.85px",
          gap: "60.85px",
        }}
      >
        <div
          style={{
            // width: "2793.39px",
            // height: "293.85px",
            padding: "24px 38px 38px 38px",
            borderRadius: "12px",
            gap: "25px",
            backgroundColor: "#FFFFFF",
            marginTop: "-20px",
          }}
        >
          <div
          //   style={{ height: "57px" }}
          >
            <Form>
              <p style={{ color: "#030229", fontWeight: 600 }}>
                Vendor information
              </p>

              <Row>
                <Col sm="4">
                  <FormGroup>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Label style={{ color: "#030229" }}>Select vendor</Label>
                      <Button
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid #fff",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          marginTop: "-5px",
                          color: "#000",
                          cursor: "pointer",
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
                    <Label style={{ color: "#030229" }}>Vendor address</Label>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter Vendor address"
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <FormGroup>
                    <Label style={{ color: "#030229" }}>Vendor type</Label>
                    <Input
                      type="text"
                      name="type"
                      id="type"
                      placeholder="Enter Vendor type"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div style={{ marginTop: "20px", backgroundColor: "#FFFFFF" }}>
                <p style={{ color: "#030229", fontWeight: 600 }}>PO Details</p>
                <Row>
                  <Col sm="4">
                    <FormGroup>
                      <Label style={{ color: "#030229" }}>PO Number</Label>
                      <Input
                        type="text"
                        name="Date"
                        id="exampleEmail1"
                        placeholder="Enter email 1"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <FormGroup>
                      <Label style={{ color: "#030229" }}>PO Description</Label>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter Vendor address"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <FormGroup>
                      <Label style={{ color: "#030229" }}>PO Amount</Label>
                      <Input
                        type="text"
                        name="type"
                        id="type"
                        placeholder="Enter Vendor type"
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
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <FormGroup>
                      <Label style={{ color: "#030229" }}>PO Expiry Date</Label>
                      <Input
                        type="date"
                        name="POExpiryDate"
                        id="type"
                        placeholder="Enter Vendor type"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "20px", backgroundColor: "#FFFFFF" }}>
                <p style={{ color: "#030229", fontWeight: 600 }}>
                  Other information
                </p>
                <Row>
                  <Col sm="4">
                    <FormGroup>
                      <Label style={{ color: "#030229" }}>Client Name</Label>
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
              // columns={columns}
              data={data}
              //   pagination
              customStyles={customStyles}
              columns={[]}
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
                // placeholder="Enter AdditionalNote"
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

export default Purchaseorder;
