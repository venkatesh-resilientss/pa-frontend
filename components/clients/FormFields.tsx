import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import Button from "react-bootstrap-button-loader";

import { ClientsService } from "services";

const clientService = new ClientsService();

export default function FormFields(props: any) {
  const { fields, clientData, setClientData, back, step, setStep } = props;
  const { data, pStates, iStates, sUsers, loadOptions, hideBtns } = props;
  const { err, setErr, validate, disabled, cls, router } = props;

  const [loading, setLoading] = useState(false);

  const selectStyle = {
    control: (base, state) => ({
      ...base,
      background: "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "0.375rem",
      minHeight: "32px",
      boxShadow: null,
      ":hover": {
        borderColor: "#A2CFFE",
      },
      borderColor:
        err &&
        state.selectProps.placeholder !== "Select Admin" &&
        !state.hasValue
          ? "#e50000 !important"
          : "#dee2e6",
    }),

    valueContainer: (base) => ({ ...base, padding: "0 6px" }),

    input: (base) => ({ ...base, margin: "0" }),

    placeholder: (base: any) => ({
      ...base,
      position: "center",
      transform: "none",
      color: "#c9c9c9 !important",
    }),

    menu: (base: any) => ({ ...base, margin: "0 !important" }),
    menuList: (base: any) => ({ ...base, padding: "0 !important" }),

    option: (base: any, state: any) => ({
      ...base,
      cursor: "pointer",
      color: "#212529",
      ":hover": {
        backgroundColor: "#c9c9c97d",
      },
      backgroundColor: state.isSelected ? "#c9c9c97d !important" : "white",
    }),

    indicatorSeparator: () => ({ display: "none" }),
  };

  const getOptions = (lb, vl) => {
    const tempArr: any =
      (lb === "State"
        ? vl.includes("PhysicalAddress")
          ? pStates
          : iStates
        : lb === "RSSL Support User"
        ? sUsers
        : data) || [];

    return tempArr.map((e) => {
      return { label: e.Name, value: e.ID };
    });
  };

  const getObjectValue = (obj, path) => {
    const keys = path.split(".");

    return keys.reduce((acc, key) => {
      return acc ? acc[key] : undefined;
    }, obj);
  };

  const updateValue = (obj, path, newValue) => {
    const keys = path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = newValue;
    setClientData({ ...obj });
  };

  const next = async () => {
    let tempErr = false;
    [...fields, ...(validate || [])].map((el) => {
      if (
        el.err &&
        (el.typ === "select"
          ? !getObjectValue(clientData, el.vl)
          : (el.vl === "Company.PrimaryContact.EmailID" &&
              !new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(
                getObjectValue(clientData, el.vl)
              )) ||
            (el.vl === "Tenant.Slug" &&
              !new RegExp(/^[a-z0-9-_]{2,}$/).test(
                getObjectValue(clientData, el.vl)
              )) ||
            !getObjectValue(clientData, el.vl).toString().trim())
      )
        tempErr = true;
    });

    setErr(tempErr);
    if (tempErr) return;
    else setStep((prev) => Math.min(prev + 1, 5));
    if (step == 5) {
      try {
        setLoading(true);
        const payload = { ...clientData };
        if (clientData.clientType)
          payload["ClientTypeID"] = clientData.clientType.value;
        if (clientData.clientAdmin)
          payload["ClientAdminID"] = clientData.clientAdmin.value;
        if (clientData.rsslSupportUser)
          payload["RsslSupportUserID"] = clientData.rsslSupportUser.value;

        if (clientData.MailingAddress.country)
          payload["MailingAddress"]["CountryID"] =
            clientData.MailingAddress.country.value;
        if (clientData.MailingAddress.state)
          payload["MailingAddress"]["StateID"] =
            clientData.MailingAddress.state.value;
        if (clientData.MailingAddress.Zipcode)
          payload["MailingAddress"]["Zipcode"] =
            Number(clientData.MailingAddress.Zipcode) || 0;

        if (clientData.PhysicalAddress.country)
          payload["PhysicalAddress"]["CountryID"] =
            clientData.PhysicalAddress.country.value;
        if (clientData.PhysicalAddress.state)
          payload["PhysicalAddress"]["StateID"] =
            clientData.PhysicalAddress.state.value;
        if (clientData.PhysicalAddress.Zipcode)
          payload["PhysicalAddress"]["Zipcode"] =
            Number(clientData.PhysicalAddress.Zipcode) || 0;

        const resp = await clientService.createClient(payload);
        router.push(`/clients/edit-client/${resp.ID}`);
        setLoading(false);
      } catch (e) {
        toast.error(e?.error || "Error");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="row">
        {fields.map((el, idx) => (
          <div
            className={"col-12 col-lg-4 py-1" + (cls ? " col-lg-6" : "")}
            key={idx}
          >
            <label className="form-label text-black f-12">
              {el.lb}
              {el.err && <span className="ms-1 text-danger">*</span>}
            </label>
            {el.typ === "select" ? (
              <AsyncSelect
                instanceId={`react-select-${el.lb.replaceAll(" ", "")}-${idx}`}
                styles={selectStyle}
                placeholder={el.ph}
                defaultOptions={getOptions(el.lb, el.vl)}
                loadOptions={(value) => loadOptions(value, el.vl)}
                value={getObjectValue(clientData, el.vl)}
                onChange={(e) => updateValue(clientData, el.vl, e)}
                isDisabled={disabled || false}
              />
            ) : el.typ === "phone" ? (
              <PhoneInput
                inputClass="react-tel-input w-100"
                country={"us"}
                placeholder="Enter Mobile Number"
                value={getObjectValue(clientData, el.vl)}
                onChange={(e) => updateValue(clientData, el.vl, e)}
                disabled={disabled || false}
              />
            ) : el.typ === "file" ? (
              <div className="input-group">
                <input
                  className={`form-control ${
                    err &&
                    el.err &&
                    !getObjectValue(clientData, el.vl).toString().trim()
                      ? "border-danger"
                      : ""
                  }`}
                  type={el.typ}
                  name={el.lb.replaceAll(" ", "") + idx}
                  accept="image/*"
                  onChange={async (e: any) => {
                    try {
                      const file = e.target.files[0];
                      if (!(file?.type || "").includes("image/")) {
                        toast.error("File rejected");
                        return;
                      }
                      const formData = new FormData();
                      formData.append("file", file);
                      formData.append("name", "uploadedFile");
                      const fileUpload = await clientService.s3upload(formData);
                      const url = fileUpload.url;
                      setClientData({ ...clientData, LogoUrl: url });
                    } catch (e) {
                      toast.error("Error saving file");
                    }
                  }}
                  disabled={disabled || false}
                />
              </div>
            ) : el.typ === "domain" ? (
              <div className="input-group">
                <input
                  className={`form-control ${
                    err &&
                    el.err &&
                    !getObjectValue(clientData, el.vl).toString().trim()
                      ? "border-danger"
                      : ""
                  }`}
                  placeholder={el.ph}
                  type={"text"}
                  name={el.lb.replaceAll(" ", "") + idx}
                  value={getObjectValue(clientData, el.vl)}
                  onChange={(e) =>
                    updateValue(clientData, el.vl, e.target.value)
                  }
                  disabled={disabled || false}
                />
                <span className="input-group-text">
                  {process.env.NEXT_PUBLIC_REDIRECT}
                </span>
              </div>
            ) : (
              <input
                className={`form-control ${
                  err &&
                  el.err &&
                  !getObjectValue(clientData, el.vl).toString().trim()
                    ? "border-danger"
                    : ""
                }`}
                placeholder={el.ph}
                type={el.typ}
                name={el.lb.replaceAll(" ", "") + idx}
                value={getObjectValue(clientData, el.vl)}
                onChange={(e) => updateValue(clientData, el.vl, e.target.value)}
                disabled={disabled || false}
              />
            )}

            {err &&
              (el.typ === "select"
                ? !getObjectValue(clientData, el.vl)
                : (el.vl === "Company.PrimaryContact.EmailID" &&
                    !new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(
                      getObjectValue(clientData, el.vl)
                    )) ||
                  (el.vl === "Tenant.Slug" &&
                    !new RegExp(/^[a-z0-9-_]{2,}$/).test(
                      getObjectValue(clientData, el.vl)
                    )) ||
                  !getObjectValue(clientData, el.vl).toString().trim()) && (
                <span className="text-danger f-12">
                  {el.vl === "Company.PrimaryContact.EmailID" &&
                  getObjectValue(clientData, el.vl).toString().trim()
                    ? "Email is invalid"
                    : el.vl === "Tenant.Slug" &&
                      getObjectValue(clientData, el.vl).toString().trim()
                    ? "Domain should contain at least two characters of lowercase,numeric or symbols(-, _)"
                    : el.err}
                </span>
              )}
          </div>
        ))}
      </div>

      <hr />

      {!hideBtns && (
        <div className="d-flex row-reverse justify-content-end mb-5 gap-3">
          <button className="btn" onClick={back}>
            Back
          </button>
          {step == 5 ? (
            <Button loading={loading} disabled={loading} onClick={next}>
              Continue
            </Button>
          ) : (
            <button className="btn btn-primary" onClick={next}>
              Continue
            </button>
          )}
        </div>
      )}
    </>
  );
}
