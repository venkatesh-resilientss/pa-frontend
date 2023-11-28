import React, { useState } from "react";
import { Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { Col, Input, Label } from "reactstrap";

import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";

import ProductionsCard from "../Productions";
import ClientControl from "../ClientControl";

function ClientTabs(props) {
  const { clientData, setClientData } = props;
  const [active, setActive] = useState("1");

  const banks = [
    { label: "ICICI", value: "ICICI" },
    { label: "SBI", value: "SBI" },
  ];

  const countryData = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const selectStyle = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #dee2e6",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#21252966 !important",
    }),
  };
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  //   const toggle = () => setDropdownOpen(!dropdownOpen);

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
              color: active === "1" ? "#293991" : "#C9C9C9",
              cursor: "pointer",
            }}
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            Basic Information
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{
              borderBottom: active === "2" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "2" ? "#293991" : "#C9C9C9",
              cursor: "pointer",
            }}
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Address
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{
              borderBottom: active === "3" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "3" ? "#293991" : "#C9C9C9",
              cursor: "pointer",
            }}
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            Contact Information
          </NavLink>
        </NavItem>

        {/* <NavItem>
          <NavLink
            style={{
              borderBottom: active === "4" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "4" ? "#293991" : "#C9C9C9",
              cursor:"pointer"
            }}
            active={active === "4"}
            onClick={() => {
              toggle("4");
            }}
          >
            Productions
          </NavLink>
        </NavItem> */}

        {/* <NavItem>
          <NavLink
            style={{
              borderBottom: active === "3" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "3" ? "#293991" : "#C9C9C9",
              cursor:"pointer"
            }}
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            Approval Flow
          </NavLink>
        </NavItem> */}

        {/* <NavItem>
          <NavLink
            style={{
              borderBottom: active === "4" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "4" ? "#293991" : "#C9C9C9",
              cursor:"pointer"
            }}
            active={active === "4"}
            onClick={() => {
              toggle("4");
            }}
          >
            RSS Support User
          </NavLink>
        </NavItem> */}

        {/* <NavItem>
          <NavLink
            style={{
              borderBottom: active === "5" ? "2px solid #293991" : "none",
              transition: "border-bottom 0.3s ease",
              color: active === "5" ? "#293991" : "#C9C9C9",
              cursor:"pointer"
            }}
            active={active === "5"}
            onClick={() => {
              toggle("5");
            }}
          >
            Client Control
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <div>
            <p
              className="text-black "
              style={{ fontSize: "20px", fontWeight: "600" }}
            >
              Basic Information
            </p>
            <div className="row mb-5">
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Client Name
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter Client Name"
                  type="text"
                  value={clientData?.name}
                  onChange={(e) =>
                    setClientData({ ...clientData, name: e.target.value })
                  }
                />
                {/* {err && !clientData?.name.trim() && (
                  <small className="text-danger">Enter Client Name</small>
                )} */}
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Client Code
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter Client Code"
                  value={clientData?.code}
                  onChange={(e) =>
                    setClientData({ ...clientData, code: e.target.value })
                  }
                />
                {/* {err && !clientData?.code.trim() && (
                  <small className="text-danger">Enter Client Code</small>
                )} */}
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Client Legal Name (If different)
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter Legal Name"
                  type="text"
                  value={clientData?.legalName}
                  onChange={(e) =>
                    setClientData({ ...clientData, legalName: e.target.value })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  FEIN
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter FEIN"
                  type="number"
                  value={clientData?.FEIN}
                  onChange={(e) =>
                    setClientData({ ...clientData, FEIN: e.target.value })
                  }
                />
                {/* {err && !clientData?.FEIN.trim() && (
                  <small className="text-danger">Enter FEIN</small>
                )} */}
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Routing #
                </Label>
                <Input
                  disabled={true}
                  type="text"
                  placeholder="Routing Number"
                  value={clientData?.routing}
                  onChange={(e) =>
                    setClientData({ ...clientData, routing: e.target.value })
                  }
                />
              </Col>
              <Col xl="4">
                <Label className="f-12">Bank Name</Label>
                <Select
                  isDisabled={true}
                  className="w-100 mb-3 pr-5 f-12"
                  classNamePrefix="selectBank"
                  styles={selectStyle}
                  placeholder="Select Bank"
                  value={
                    banks.find((e) => e.label === clientData?.bankName) || null
                  }
                  options={banks}
                  name="banks"
                  onChange={(e: any) =>
                    setClientData({ ...clientData, bankName: e.value })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Account Number
                </Label>
                <Input
                  disabled={true}
                  type="text"
                  placeholder="Enter Account Number"
                  value={clientData?.accountNumber}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      accountNumber: e.target.value,
                    })
                  }
                />
              </Col>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div>
            <div>
              <p
                className="text-black "
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Physical Address
              </p>
              <div className="row">
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    Address Line 1
                  </Label>
                  <Input
                    disabled={true}
                    placeholder="Enter Address"
                    type="text"
                    value={clientData?.pAdd1}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        pAdd1: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    Address Line 2
                  </Label>
                  <Input
                    disabled={true}
                    placeholder="Enter Address"
                    type="text"
                    value={clientData?.pAdd2}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        pAdd2: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    Zip Code
                  </Label>
                  <Input
                    disabled={true}
                    placeholder="Enter Zip Code"
                    type="text"
                    value={clientData?.pZip1}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        pZip1: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    Country
                  </Label>
                  <Select
                    isDisabled={true}
                    className="w-100 mb-3 pr-5 f-12"
                    classNamePrefix="selectCountry1"
                    placeholder="Select Country"
                    styles={selectStyle}
                    value={clientData?.pCountry}
                    options={countryData}
                    name="countries1"
                    onChange={(e: any) =>
                      setClientData({ ...clientData, pCountry: e })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    State
                  </Label>
                  <Select
                    isDisabled={true}
                    className="w-100 mb-3 pr-5 f-12"
                    classNamePrefix="selectState1"
                    placeholder="Select State"
                    styles={selectStyle}
                    value={clientData?.pState}
                    options={(clientData?.pCountry
                      ? State.getStatesOfCountry(clientData?.pCountry.value)
                      : []
                    ).map((state) => ({
                      value: state.isoCode,
                      label: state.name,
                    }))}
                    name="states1"
                    onChange={(e: any) =>
                      setClientData({ ...clientData, pState: e })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    City
                  </Label>
                  <Select
                    isDisabled={true}
                    className="w-100 mb-3 pr-5 f-12"
                    classNamePrefix="selectCity1"
                    placeholder="Select City"
                    styles={selectStyle}
                    value={
                      banks.find((e) => e.label === clientData?.pCity) || null
                    }
                    options={(clientData?.pCountry && clientData?.pState
                      ? City.getCitiesOfState(
                          clientData?.pCountry.value,
                          clientData?.pState.value
                        )
                      : []
                    ).map((city) => ({
                      value: city.name,
                      label: city.name,
                    }))}
                    name="cities1"
                    onChange={(e: any) =>
                      setClientData({ ...clientData, pCity: e })
                    }
                  />
                </Col>
              </div>
            </div>

            <hr className="my-2" />

            <div>
              <p
                className="text-black "
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Invoice Address
              </p>
              <div className="row mb-5">
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    Address Line 1
                  </Label>
                  <Input
                    disabled={true}
                    placeholder="Enter Address"
                    type="text"
                    value={clientData?.iAdd1}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        iAdd1: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    Address Line 2
                  </Label>
                  <Input
                    disabled={true}
                    placeholder="Enter Address"
                    type="text"
                    value={clientData?.iAdd2}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        iAdd2: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    Zip Code
                  </Label>
                  <Input
                    disabled={true}
                    placeholder="Enter Zip Code"
                    type="text"
                    value={clientData?.iZip}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        iZip: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    Country
                  </Label>
                  <Select
                    isDisabled={true}
                    className="w-100 mb-3 pr-5 f-12"
                    classNamePrefix="selectCountry2"
                    placeholder="Select Country"
                    styles={selectStyle}
                    value={clientData?.iCountry}
                    options={countryData}
                    name="countries1"
                    onChange={(e: any) =>
                      setClientData({ ...clientData, iCountry: e })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    State
                  </Label>
                  <Select
                    isDisabled={true}
                    className="w-100 mb-3 pr-5 f-12"
                    classNamePrefix="selectState2"
                    placeholder="Select State"
                    styles={selectStyle}
                    value={clientData?.iState}
                    options={(clientData?.iCountry
                      ? State.getStatesOfCountry(clientData?.iCountry.value)
                      : []
                    ).map((state) => ({
                      value: state.isoCode,
                      label: state.name,
                    }))}
                    name="states1"
                    onChange={(e: any) =>
                      setClientData({ ...clientData, iState: e })
                    }
                  />
                </Col>
                <Col xl="4">
                  <Label
                    className="text-black"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    City
                  </Label>
                  <Select
                    isDisabled={true}
                    className="w-100 mb-3 pr-5 f-12"
                    classNamePrefix="selectCity2"
                    placeholder="Select City"
                    styles={selectStyle}
                    value={
                      banks.find((e) => e.label === clientData?.iCity) || null
                    }
                    options={(clientData?.iCountry && clientData?.iState
                      ? City.getCitiesOfState(
                          clientData?.iCountry.value,
                          clientData?.iState.value
                        )
                      : []
                    ).map((city) => ({
                      value: city.name,
                      label: city.name,
                    }))}
                    name="cities2"
                    onChange={(e: any) =>
                      setClientData({ ...clientData, iCity: e })
                    }
                  />
                </Col>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div>
            <p
              className="text-black "
              style={{ fontSize: "20px", fontWeight: "600" }}
            >
              Address
            </p>
            <div className="row mb-5">
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Company Primary Contact Name
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter POC Name"
                  value={clientData?.pContactName}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      pContactName: e.target.value,
                    })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Title
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter Role"
                  value={clientData?.pTitle}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      pTitle: e.target.value,
                    })
                  }
                />
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Office Phone
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter Office Number"
                  value={clientData?.pOffice}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      pOffice: e.target.value,
                    })
                  }
                />
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Cell Phone
                </Label>
                <PhoneInput
                  disabled={true}
                  inputClass="react-tel-input w-100"
                  country={"us"}
                  placeholder="Enter Mobile Number"
                  value={clientData?.pCell}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      pCell: e,
                    })
                  }
                />
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Email
                </Label>
                <Input
                  disabled={true}
                  type="email"
                  placeholder="Enter Email"
                  value={clientData?.pEmail}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      pEmail: e.target.value,
                    })
                  }
                />
              </Col>
            </div>

            <div className="row mb-5">
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Company Secondary Contact Name
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter POC Name"
                  value={clientData?.sContactName}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      sContactName: e.target.value,
                    })
                  }
                />
              </Col>
              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Title
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter Role"
                  value={clientData?.sTitle}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      sTitle: e.target.value,
                    })
                  }
                />
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Office Phone
                </Label>
                <Input
                  disabled={true}
                  placeholder="Enter Office Number"
                  value={clientData?.sOffice}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      sOffice: e.target.value,
                    })
                  }
                />
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Cell Phone
                </Label>
                <PhoneInput
                  disabled={true}
                  inputClass="react-tel-input w-100"
                  country={"us"}
                  placeholder="Enter Mobile Number"
                  value={clientData?.sCell}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      sCell: e,
                    })
                  }
                />
              </Col>

              <Col xl="4">
                <Label
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Email
                </Label>
                <Input
                  disabled={true}
                  type="email"
                  placeholder="Enter Email"
                  value={clientData?.sEmail}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      sEmail: e.target.value,
                    })
                  }
                />
              </Col>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col xl="6">
              <ProductionsCard />
            </Col>
            <Col xl="6">
              <ProductionsCard />
            </Col>
            <Col xl="6">
              <ProductionsCard />
            </Col>
            <Col xl="6">
              <ProductionsCard />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="5">
          <ClientControl />
        </TabPane>
        {/* <TabPane tabId="5">
          <Badge color="danger">Design Not Available</Badge>
        </TabPane>
        <TabPane tabId="6">
          <RSSSupportUserTable />
        </TabPane> */}
      </TabContent>
    </div>
  );
}

export default ClientTabs;
