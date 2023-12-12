import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { BasicInformation } from "@/components/clients";
import { Address, ContactInformation } from "@/components/clients";
import { Documents, WorkSpaceDetails } from "@/components/clients";
import { ClientControl, Productions } from "@/components/clients";

const steps = [
  "Basic Information",
  "Address",
  "Contact Information",
  "Documents",
  "Workspace Details",
  "Productions",
  "Client Control",
];

export default function ClientTabs(props) {
  const [step, setStep] = useState(1);

  const toggle = (tab) => setStep(tab);

  const tabProps = { ...props, step, setStep, hideBtns: true };

  return (
    <div className="f-14">
      <Nav
        className="bg-white "
        style={{ borderBottom: "1px solid", borderColor: "#DBDCDC" }}
      >
        {steps.map((e, id) => (
          <NavItem key={id}>
            <NavLink
              className={
                step === id + 1 ? "client-nav-active" : "client-nav-inactive"
              }
              active={step === id + 1}
              onClick={() => toggle(id + 1)}
            >
              {e}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent className="py-3 client-fields" activeTab={step}>
        <TabPane tabId={1}>
          <BasicInformation {...tabProps} />
        </TabPane>
        <TabPane tabId={2}>
          <Address {...tabProps} />
        </TabPane>
        <TabPane tabId={3}>
          <ContactInformation {...tabProps} />
        </TabPane>
        <TabPane tabId={4}>
          <Documents {...tabProps} />
        </TabPane>
        <TabPane tabId={5}>
          <WorkSpaceDetails {...tabProps} />
        </TabPane>
        <TabPane tabId={6}>
          <Productions {...tabProps} />
        </TabPane>
        <TabPane tabId={7}>
          <ClientControl {...tabProps} />
        </TabPane>
      </TabContent>
    </div>
  );
}
