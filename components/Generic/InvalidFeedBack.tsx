import React from "react";

const InvalidFeedBack = (props) => {
    return (
        <span className="invalid-feedback"> {props.message as React.ReactNode}</span>
    );
};
  
export default InvalidFeedBack;