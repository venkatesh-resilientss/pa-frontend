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
    <div style={{ fontFamily: "Segoe UI" }}>
      <Nav tabs className="">
        <NavItem>
          <NavLink
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
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Productions
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            Approval Flow
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "4"}
            onClick={() => {
              toggle("4");
            }}
          >
            RSS Support User
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
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
          <ClientAccordion />
        </TabPane>
        <TabPane tabId="2">
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
        <TabPane tabId="3">
          <Badge color="danger">Design Not Available</Badge>
        </TabPane>
        <TabPane tabId="4">
          <RSSSupportUserTable />
        </TabPane>
        <TabPane tabId="5">
          <ClientControl />
        </TabPane>
      </TabContent>
    </div>
  );
}

export default ClientTabs;
