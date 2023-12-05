import React from "react";

const CustomBadge = (props) => {
  return (
    
      <span className={`${props.bg} custom-badge`}>&#9679; {props.value}</span>
  );
};

export default CustomBadge;
