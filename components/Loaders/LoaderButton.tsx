import React from "react";
import { Button, Spinner } from "reactstrap";
const Index = (props) => {
  return (
    <Button
      onClick={props.handleClick}
      style={{
        fontSize: "14px",
        fontWeight: "400",
        backgroundColor: "#00AEEF",
        border: "none",
      }}
      disabled={props.isLoading || props.disabled}
    >
      {props.isLoading ? (
        <Spinner animation="border" role="status" size="sm" />
      ) : (
        props.buttonText
      )}
    </Button>
  );
};

export default Index;
