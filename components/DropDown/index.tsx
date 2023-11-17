import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";

function Example({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex p-5">
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        direction={direction}
        style={{
          width: "74px",
          height: "19px",
          fontSize: "11px",
          fontWeight: "600",
        }}
      >
        <DropdownToggle caret>Amount is All</DropdownToggle>
        <DropdownMenu {...args}>
          <DropdownItem>All</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

Example.propTypes = {
  direction: PropTypes.string,
};

export default Example;
