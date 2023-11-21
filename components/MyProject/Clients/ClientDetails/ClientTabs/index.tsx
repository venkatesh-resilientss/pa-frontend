import React, { useState } from "react";
import {
  Badge,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import ProductionsCard from "../Productions";
import ClientControl from "../ClientControl";
import RSSSupportUserTable from "../RSSSupportUser";
import ClientAccordion from "../../CreateClient/Accordion";
import BasicDetailsForm from "../../CreateClient/Accordion/BasicDetailsForm";
import ContactInformationForm from "../../CreateClient/Accordion/ContactInformationForm";
import WorkSpaceForm from "../../CreateClient/Accordion/WorkSpaceForm";

function ClientTabs(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  //   const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div
      style={{ fontFamily: "Segoe UI", fontSize: "14px", fontWeight: "500" }}
    >
      <Nav
        className="bg-white "
        style={{ borderBottom: "1px solid", borderColor: "#DBDCDC" }}
      >
        <NavItem>
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
            Client Information
          </NavLink>
        </NavItem>
        <NavItem>
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
            Contact Information
          </NavLink>
        </NavItem>
        <NavItem>
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
            Workspace Details
          </NavLink>
        </NavItem>

        <NavItem>
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
            Productions
          </NavLink>
        </NavItem>

        {/* <NavItem>
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
            Approval Flow
          </NavLink>
        </NavItem> */}

        {/* <NavItem>
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
            RSS Support User
          </NavLink>
        </NavItem> */}

        <NavItem>
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
            Client Control
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          {/* <ClientAccordion /> */}
          <BasicDetailsForm />
        </TabPane>
        <TabPane tabId="2">
          <ContactInformationForm />
        </TabPane>
        <TabPane tabId="3">
          <WorkSpaceForm />
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col xl="6">
              <ProductionsCard />
            </Col>
            <Col xl="6">
              <ProductionsCard />
            </Col>
            <Col xl="6">
              <ProductionsCard />
            </Col>
            <Col xl="6">
              <ProductionsCard />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="5">
          <ClientControl />
        </TabPane>
        {/* <TabPane tabId="5">
          <Badge color="danger">Design Not Available</Badge>
        </TabPane>
        <TabPane tabId="6">
          <RSSSupportUserTable />
        </TabPane> */}
      </TabContent>
    </div>
  );
}

export default ClientTabs;
