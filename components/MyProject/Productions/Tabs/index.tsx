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
  Button,
  Popover,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import ActiveProductionsCard from "../ActiveProductions";
import PendingProductionsTable from "../PendingProductions";
import CompletedProductions from "../CompletedProductions";

function Tabs(props) {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState("1");
  // const [popoverOpen, setPopoverOpen] = useState(false);

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
        <NavItem>
          <NavLink
            style={{
              borderBottom: active === "1" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "1" ? "#030229" : "#C9C9C9",
              cursor: "pointer",
            }}
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
            style={{
              borderBottom: active === "2" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "2" ? "#030229" : "#C9C9C9",
              cursor: "pointer",
            }}
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
            style={{
              borderBottom: active === "3" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "3" ? "#030229" : "#C9C9C9",
              cursor: "pointer",
            }}
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
          <ActiveProductionsCard />
        </TabPane>
        <TabPane tabId="2">
          <PendingProductionsTable />
        </TabPane>
        <TabPane tabId="3">
          <CompletedProductions />
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Tabs;
