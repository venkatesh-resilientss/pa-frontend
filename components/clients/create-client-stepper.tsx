import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CustomStepper = ({ handlePrev, handleNext, steps, activeStep }) => {
  //   useEffect(() => {
  //     // Initialize activeStep based on some logic, for example, URL parameter
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const initialStep = parseInt(urlParams.get("step"), 10) || 1;
  //     setActiveStep(initialStep);
  //   }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      {steps.map((step, index) => (
        <div
          key={step.label}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* <div
            style={{
              color: step.state === "completed" ? "#fff" : "#000",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          > */}
          <div
            className="d-flex flex-column text-center align-items-center"
            style={{ fontSize: "12px" }}
          >
            <img
              src={step.icon}
              alt={`Step ${index + 1}`}
              style={{ width: "30px", height: "30px" }}
            />
            <span>{step.label.split(" ")[0]}</span>
            <span>{step.label.split(" ")[1]}</span>
          </div>
          {/* </div> */}
          <div>
            {index < steps.length - 1 && (
              <div
                className="mt-3"
                style={{
                  height: "3px",
                  width: "50px",
                  backgroundColor: "#eaeaf0",
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomStepper;
