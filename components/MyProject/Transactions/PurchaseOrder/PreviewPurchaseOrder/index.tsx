import React from "react";
import { Button, Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import Image from "next/image";
import downloadIcon from "assets/myIcons/downloadWhiteIcon.svg";
import logo from "assets/MyImages/Logo.svg";
import starImage from "assets/MyImages/Star Lights LLC 1.svg";
import PurchaseOrderTable from "./PurchaseOrderTable";

const PreviewPurchaseOrder = () => {
  const router = useRouter();
  return (
    <div className="my-3">
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
                Preview Purchase order
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
                fontSize: "14px",
                fontWeight: "400",
              }}
              size="sm"
              outline
            >
              Back
            </Button>

            <Button
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "30px",
                backgroundColor: "#00AEEF",
                color: "#FFF",
                borderColor: "#00AEEF",
                borderWidth: "1px",
                borderStyle: "solid",
                fontSize: "14px",
                fontWeight: "600",
                gap: "5px",
              }}
              size="sm"
            >
              <Image
                style={{ width: "14px", height: "14px" }}
                alt=""
                src={downloadIcon}
              />
              Download PO
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center">
        <Card style={{ width: "876px", border: "none" }}>
          <CardBody className="d-flex flex-column" style={{ gap: "12px" }}>
            <div className="d-flex justify-content-between">
              <div>
                <Image
                  alt=""
                  src={logo}
                  style={{ width: "63px", height: "23px" }}
                />
                <div style={{ fontSize: "35px", fontWeight: "700" }}>
                  Purchase Order
                </div>
              </div>
              <div>
                <div className="d-flex align-items-end" style={{ gap: "8px" }}>
                  <Image
                    alt=""
                    src={starImage}
                    className=""
                    style={{ width: "68px", height: "68px" }}
                  />
                  <div className="">
                    <div style={{ fontSize: "10px", fontWeight: "400" }}>
                      Billed by
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: "600" }}>
                      Star Lights LLC
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: "400" }}>
                      29100, #3806 Burbank Blvd,
                      <br /> Woodland Hills, CA - 91367
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Row
                style={{ fontSize: "12px", fontWeight: "400", width: "781px" }}
              >
                <Col
                  xl="4"
                  className="d-flex flex-column"
                  style={{ gap: "5px" }}
                >
                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>Vendor</div>
                    <div className="col-6">Star Lights LLC</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>Address</div>
                    <div className="col-6">
                      8011 Romaine St, 103 <br /> Los Angeles CA -90046
                    </div>
                  </div>{" "}
                </Col>

                <Col
                  xl="4"
                  className="d-flex flex-column"
                  style={{ gap: "5px" }}
                >
                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>Company</div>
                    <div className="col-6">Company 1</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>Bank</div>
                    <div className="col-6">Wells Fargo </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>Period</div>
                    <div className="col-6">Quarter 3 </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>Department</div>
                    <div className="col-6">
                      8011 Romaine St, 103 <br /> Los Angeles CA -90046
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>Production</div>
                    <div className="col-6">- </div>
                  </div>
                </Col>

                <Col
                  xl="4"
                  className="d-flex flex-column"
                  style={{ gap: "5px" }}
                >
                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>PO Number</div>
                    <div className="col-6">PO-10281920</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>PO Description</div>
                    <div className="col-6">- </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>PO Date</div>
                    <div className="col-6">10/22/2023 </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>PO Effective Date</div>
                    <div className="col-6">10/22/2023 </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "600" }}>PO Expiry Date</div>
                    <div className="col-6">10/22/2023</div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="d-flex justify-content-center">
              <div style={{ width: "781px" }}>
                <PurchaseOrderTable />
              </div>
            </div>
            <div
              style={{ fontSize: "12px", fontWeight: "400" }}
              className="d-flex justify-content-center"
            >
              <Row style={{ width: "781px" }}>
                <Col
                  xl="8"
                  className="d-flex flex-column"
                  style={{ gap: "22px" }}
                >
                  <div>
                    <div className="d-flex" style={{ gap: "5px" }}>
                      <div style={{ fontWeight: "600" }}>
                        Country of Supplier
                      </div>
                      <div>United States</div>
                    </div>
                    <div className="d-flex" style={{ gap: "5px" }}>
                      <div style={{ fontWeight: "600" }}>Place of Supplier</div>
                      <div>Oakbrook Terrace, IL</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: "600" }}>
                      Invoice Total in words
                    </div>
                    <div style={{ fontWeight: "600", fontSize: "14px" }}>
                      Four Thousand Five Hundred Dollars only
                    </div>
                  </div>
                </Col>
                <Col
                  xl="4"
                  className="d-flex flex-column"
                  style={{ gap: "4px" }}
                >
                  <div className="d-flex justify-content-between">
                    <div>Sub Total</div>
                    <div style={{ fontWeight: "600" }}>$ 5000.00</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div>Discount(10%)</div>
                    <div style={{ fontWeight: "600" }}>$ 5000.00</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div>STaxable Amount</div>
                    <div style={{ fontWeight: "600" }}>$ 500.00</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div>SGST</div>
                    <div style={{ fontWeight: "600" }}>$ 50.00</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div>CGST</div>
                    <div style={{ fontWeight: "600" }}>$ 000.00</div>
                  </div>
                  <hr />

                  <div className="d-flex justify-content-between">
                    <div>Total Due</div>
                    <div style={{ fontWeight: "600" }}>$4500.00</div>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
          <CardFooter
            className="d-flex justify-content-center"
            style={{
              backgroundColor: "#EFEFEF",
              paddingTop: "23.67px",
              paddingBottom: "15.79px",
            }}
          >
            <Row
              style={{ fontSize: "12px", fontWeight: "400", width: "781px" }}
              className="mb-3"
            >
              <Col className="d-flex flex-column" style={{ gap: "10px" }}>
                <div style={{ fontSize: "14px", fontWeight: "600" }}>
                  Terms and Conditions{" "}
                </div>
                <div>
                  1.Please pay within 15 days from the date of invoice, overdue
                  interest @ 14% will be charged on delayed payments.
                </div>
                <div>2. Please quote invoice number when remitting funds.</div>
              </Col>
              <Col className="d-flex flex-column" style={{ gap: "10px" }}>
                <div style={{ fontSize: "14px", fontWeight: "600" }}>
                  Additional Notes
                </div>
                <div>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using dummy text is that it has more-or-less
                  normal distribution of letters, as opposed to using ‘Content
                  here, content here.
                </div>
                <div>
                  For any enquiries, email us on{" "}
                  <span style={{ fontWeight: "700" }}>
                    {" "}
                    support@starlights.com{" "}
                  </span>{" "}
                  or call us on <br />
                  <span style={{ fontWeight: "700" }}>(207) 555-0119</span>
                </div>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PreviewPurchaseOrder;
