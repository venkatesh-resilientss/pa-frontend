import React, { useState } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
import ActiveProductionsCard from "../ActiveProductions";
import PendingProductionsTable from "../PendingProductions";

function Tabs(props) {
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
            Active Productions
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Pending Action Productions
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            Completed Productions
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <Row>
            <Col xl="6">
              <ActiveProductionsCard />
            </Col>
            <Col xl="6">
              <ActiveProductionsCard />
            </Col>
            <Col xl="6">
              <ActiveProductionsCard />
            </Col>
            <Col xl="6">
              <ActiveProductionsCard />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <PendingProductionsTable />
        </TabPane>
        {/* <TabPane tabId="3">
          <CompletedProductions />
        </TabPane> */}
      </TabContent>
    </div>
  );
}

export default Tabs;
