import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
import AllPaymentProcessingTable from "./AllPaymentProcessingTable";
import CheckTable from "./CheckTable";
import EFTACHExportTable from "./EFTACHExportTable";
import EFTPostivePayTable from "./EFTPositivePayTable";
import WireTable from "./WireTable";
import ManualCheckTable from "./ManualCheckTable";

function Tabs() {
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div
      style={{ fontFamily: "Segoe UI", fontSize: "14px", fontWeight: "500" }}
    >
      <Nav
        className="bg-white "
        style={{ borderBottom: "1px solid", borderColor: "#DBDCDC" }}
      >
        <NavItem className="cursor-pointer">
          <NavLink
            style={{
              borderBottom: active === "1" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "1" ? "#293991" : "#C9C9C9",
            }}
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            All
          </NavLink>
        </NavItem>

        <NavItem className="cursor-pointer">
          <NavLink
            style={{
              borderBottom: active === "2" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "2" ? "#293991" : "#C9C9C9",
            }}
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Check
          </NavLink>
        </NavItem>

        <NavItem className="cursor-pointer">
          <NavLink
            style={{
              borderBottom: active === "3" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "3" ? "#293991" : "#C9C9C9",
            }}
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            EFT-ACH EXPORT
          </NavLink>
        </NavItem>

        <NavItem className="cursor-pointer">
          <NavLink
            style={{
              borderBottom: active === "4" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "4" ? "#293991" : "#C9C9C9",
            }}
            active={active === "4"}
            onClick={() => {
              toggle("4");
            }}
          >
            EFT-Positive Pay
          </NavLink>
        </NavItem>

        <NavItem className="cursor-pointer">
          <NavLink
            style={{
              borderBottom: active === "5" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "5" ? "#293991" : "#C9C9C9",
            }}
            active={active === "5"}
            onClick={() => {
              toggle("5");
            }}
          >
            Wire
          </NavLink>
        </NavItem>

        <NavItem className="cursor-pointer">
          <NavLink
            style={{
              borderBottom: active === "6" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "6" ? "#293991" : "#C9C9C9",
            }}
            active={active === "6"}
            onClick={() => {
              toggle("6");
            }}
          >
            Manual Check
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <Row>
            <Col>
              <AllPaymentProcessingTable />
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="2">
          <Row>
            <Col>
              <CheckTable />
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="3">
          <Row>
            <Col>
              <EFTACHExportTable />
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="4">
          <Row>
            <Col>
              <EFTPostivePayTable />
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="5">
          <Row>
            <Col>
              <WireTable />
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="6">
          <Row>
            <Col>
              <ManualCheckTable />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Tabs;
