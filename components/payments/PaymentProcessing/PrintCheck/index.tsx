import { Button, Col, Row } from "reactstrap";
import React from "react";
import { useRouter } from "next/router";
import PrintTable from "../../PrintTable";

export default function PrintCheck() {
  const router = useRouter();
  const columns = [
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "700" }}>
          Invoice Number
        </div>
      ),
      selector: (row) => row.number,
    },

    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "700" }}>Invoice Date</div>
      ),
      selector: (row) => row.date,
    },
    {
      name: (
        <div style={{ fontSize: "14px", fontWeight: "700" }}>Description</div>
      ),
      selector: (row) => row.number,
    },
    {
      name: (
        <div className="" style={{ fontSize: "14px", fontWeight: "700" }}>
          Amount
        </div>
      ),
      selector: (row) => row.amount,
    },
  ];

  const data = [
    {
      id: 1,
      number: "PA-16-TEST-01",
      date: "2023-09-14",
      amount: "$ 1000.00",
    },

    {
      id: 2,
      number: "PA-16-TEST-01",
      date: "2023-09-14",
      amount: "$ 1000.00",
    },
  ];

  return (
    <div>
      <div
        className="d-flex  justify-content-between align-items-center"
        style={{ paddingTop: "18px", paddingBottom: "18px" }}
      >
        <div className="d-flex flex-column" style={{ gap: "10px" }}>
          <div style={{ fontSize: "16px", fontWeight: "600" }}>
            Payment Processing
          </div>
          <div style={{ fontSize: "32px", fontWeight: "600" }}>Check</div>
        </div>
        <div className="d-flex" style={{ gap: "10px" }}>
          <Button
            onClick={() => router.back()}
            color="white"
            style={{
              fontSize: "14px",
              fontWeight: "400",
              height: "34px",
              color: "#2D2C2C",
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              fontSize: "14px",
              fontWeight: "600",
              height: "34px",
              backgroundColor: "#00AEEF",
              border: "none",
            }}
          >
            Mark as Done
          </Button>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center">
        <div
          style={{
            width: "876px",
            height: "1240px",
            backgroundColor: "#FFFFFF",
            padding: "23.67px 20px 23.67px 20px ",
            margin: "20px 0px 20px 0px",
          }}
        >
          <div className="d-flex  justify-content-between">
            <div>
              <div style={{ fontSize: "17px", fontWeight: "700" }}>
                QA Studios
              </div>
              <div style={{ fontSize: "17px", fontWeight: "700" }}>
                ECHO Production
              </div>
              <div style={{ fontSize: "14px", fontWeight: "400" }}>000008</div>
              <div style={{ fontSize: "14px", fontWeight: "700" }}>ACRONY</div>
              <div style={{ fontSize: "14px", fontWeight: "700" }}>
                8011 Romaine St, 103 Los Angeles CA -90046
              </div>
            </div>
            <div style={{ fontSize: "23px", fontWeight: "700" }}>1841</div>
          </div>

          <div style={{ height: "685px" }}>
            <PrintTable columns={columns} data={data} />
          </div>

          <div className="d-flex flex-column" style={{ gap: "10px" }}>
            <div className="d-flex justify-content-end">
              <div className="col-6 d-flex justify-content-between">
                <div style={{ fontSize: "14px", fontWeight: "700" }}>
                  Total Amount:
                </div>
                <div style={{ fontSize: "14px", fontWeight: "400" }}>
                  $ 1000.00
                </div>
              </div>
            </div>

            <Row>
              <Col xl="4" style={{ fontSize: "14px", fontWeight: "400" }}>
                <div className="col-6">
                  QA Studios ECHO Production 1626 WILCOX AVENUE SUITE 648 Los
                  Angeles, CA 90028 3235551212
                </div>
              </Col>
              <Col xl="4" style={{ fontSize: "14px", fontWeight: "400" }}>
                <div className="col-6">
                  CNB REMOTE 5443{" "}
                  <span style={{ fontSize: "11px" }}>
                    400 N. Roxbury Beverly Hills, CA 90210 323 430-5200
                  </span>
                </div>
                <div className=" text-end">16-1606/1220</div>
              </Col>
              <Col xl="4" style={{ fontSize: "23px", fontWeight: "700" }}>
                <div className="text-end">
                  {" "}
                  <div>1841</div>
                  <div style={{ fontSize: "14px" }}>DATE: 2023-09-10</div>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-between">
              <div
                className="col-10"
                style={{ fontSize: "20px", fontWeight: "400" }}
              >
                ONE THOUSAND DOLLARS AND ZERO CENTS
                <span style={{ fontSize: "14px" }}>
                  ************************************
                  *************************************************
                </span>
              </div>
              <div style={{ fontSize: "17px", fontWeight: "400" }}>
                $ 1000.00
              </div>
            </div>

            <div className="d-flex flex-column" style={{ gap: "15px" }}>
              <div style={{ fontSize: "15px", fontWeight: "700" }}>
                PAY TO THE ORDER OF
              </div>

              <Row>
                <Col className="d-flex justify-content-center">
                  <div
                    className="col-6"
                    style={{ fontSize: "14px", fontWeight: "400" }}
                  >
                    ACRONY
                    <br /> 904 SILVER SPUR RD #121 <br />
                    ROLLING HILLS ESTATES, CA 90274
                  </div>
                </Col>
                <Col className="d-flex flex-column justify-content-between">
                  <hr />
                  <hr />
                </Col>
              </Row>
            </div>
          </div>

          <div
            className="text-center"
            style={{
              fontFamily: "MICR",
              fontSize: "29px",
              fontWeight: "400",
            }}
          >
            c1841c a122016066a 128805443c
          </div>
        </div>
      </div>
    </div>
  );
}
