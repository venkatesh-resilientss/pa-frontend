import React, { useState } from "react";
import { useRouter } from "next/router";
import { Image } from "react-bootstrap";
import { BasicInformation } from "@/components/clients";
import { Address, ContactInformation } from "@/components/clients";
import { Documents, WorkSpaceDetails } from "@/components/clients";

const steps = [
  "Basic Information",
  "Address",
  "Contact Information",
  "Documents",
  "Workspace Details",
];

export default function CreateClient(props) {
  const { clientData, setClientData } = props;
  const router = useRouter();
  const [step, setStep] = useState(5);

  const back = () => {
    if (step > 1) setStep((prev) => Math.max(prev - 1, 1));
    else router.push("/clients");
  };

  const tabProps = { clientData, setClientData, back, step, setStep };
  return (
    <div className="p-4">
      <div className="text-black fw-600">All Clients</div>
      <div className="f-32 fw-600">Add New Client</div>

      <hr />

      <div className="d-flex align-items-center justify-content-center mb-3">
        {steps.map((lb, idx) => (
          <div key={idx} className="d-flex">
            <div className="d-flex flex-column text-center align-items-center f-12">
              <Image
                src={
                  step === idx + 1
                    ? "/currentStep.svg"
                    : step < idx + 1
                    ? "/notyetSelectedStep.svg"
                    : "/completedStep.svg"
                }
                alt={"Step" + idx}
                width={30}
                height={30}
              />
              <span>{lb.split(" ")[0]}</span>
              <span>{lb.split(" ")[1]}&nbsp;</span>
            </div>

            {idx < steps.length - 1 && <div className="mt-3 dash" />}
          </div>
        ))}
      </div>

      <BasicInformation {...tabProps} />
      <Address {...tabProps} />
      <ContactInformation {...tabProps} />
      <Documents {...tabProps} />
      <WorkSpaceDetails {...tabProps} {...{ router }} />
    </div>
  );
}
