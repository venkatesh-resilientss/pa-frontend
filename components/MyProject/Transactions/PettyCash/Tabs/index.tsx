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
import AllPettyCashTable from "./AllPettyCashTable";

function Tabs(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
            All Petty Cash
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <Row>
            <Col>
              <AllPettyCashTable />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Tabs;
