import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { toast } from "react-toastify";
import Button from "react-bootstrap-button-loader";

import { ClientsService } from "services";
import { createClientPayload } from "@/commonFunctions/payloads";

const clientService = new ClientsService();

export default function FormFields(props: any) {
  const { fields, clientData, setClientData, step, setStep, hideUsers } = props;
  const { data, pStates, iStates, staffSupportUsers, loadOptions, hideBtns } =
    props;
  const { err, setErr, validate, disabled, cls, router, isEditing } = props;

  const [loading, setLoading] = useState(false);

  const selectStyle = {
    control: (base, state) => ({
      ...base,
      background: state.isDisabled ? "#e9ecef" : "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "0.375rem",
      minHeight: "40px",
      boxShadow: null,
      ":hover": {
        borderColor: "#A2CFFE",
      },
      borderColor:
        err &&
        !(
          (state.selectProps.instanceId || "").includes("MailingAddress") ||
          state.selectProps.placeholder === "Select Admin"
        ) &&
        !state.hasValue
          ? "#e50000 !important"
          : "#dee2e6",
    }),

    singleValue: (provided) => ({ ...provided, color: "#212529" }),

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
        ? staffSupportUsers
        : data) || [];
    const getName = (e) =>
      !e?.Name
        ? (e?.first_name || "") + " " + (e?.last_name || "")
        : e?.Name || "";
    return tempArr.map((e) => {
      return { label: getName(e), value: e.ID };
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
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const next = async () => {
    let tempErr = false;
    [...fields, ...(validate || [])].map((el) => {
      if (
        el.err &&
        (el.typ === "select"
          ? !getObjectValue(clientData, el.vl)
          : (el.vl === "Company.SecondaryContact.EmailID" &&
              getObjectValue(clientData, el.vl).toString().trim() &&
              (!emailRegex.test(
                getObjectValue(clientData, el.vl).toString().trim()
              ) ||
                getObjectValue(clientData, el.vl).toString().trim() ===
                  getObjectValue(clientData, "Company.PrimaryContact.EmailID")
                    .toString()
                    .trim())) ||
            (el.vl === "Company.PrimaryContact.EmailID" &&
              !emailRegex.test(getObjectValue(clientData, el.vl))) ||
            (el.vl === "Tenant.Slug" &&
              !new RegExp(/^[a-z0-9-_]{2,}$/).test(
                getObjectValue(clientData, el.vl)
              )) ||
            (el.vl !== "Company.SecondaryContact.EmailID" &&
              !getObjectValue(clientData, el.vl).toString().trim()))
      )
        tempErr = true;
    });

    setErr(tempErr);
    if (tempErr) return;
    else setStep((prev) => Math.min(prev + 1, 5));
    if (step == 5) {
      let url: any = "";
      try {
        setLoading(true);
        if (clientData.logoFile) {
          const formData = new FormData();
          formData.append("file", clientData.logoFile);
          formData.append("name", "uploadedFile");

          const fileUpload = await clientService.s3upload(formData);
          url = fileUpload.url;
        }

        const payload = createClientPayload({ ...clientData, LogoUrl: url });

        await clientService.createClient(payload);
        router.push(`/clients`);
        toast.success("Client created successfully");
        setLoading(false);
      } catch (e) {
        if (clientData.logoFile && !url) toast.error("Error Saving Logo");
        toast.error(e?.error || "Error");
        setLoading(false);
      }
    }
  };

  const back = () => {
    if (step != 1 && step > 1) {
      setStep(step - 1);
    } else if (step === 1) router.replace("/clients");
  };

  return (
    <>
      <div className="row">
        {fields.map((el, idx) => (
          <div
            className={
              "col-12 col-lg-4 py-1" +
              (cls ? " col-lg-6" : "") +
              (el.typ === "select" && hideUsers ? " d-none" : "")
            }
            key={idx}
          >
            <label className="form-label text-black f-12">
              {el.lb}
              {el.err && el.vl !== "Company.SecondaryContact.EmailID" && (
                <span className="ms-1 text-danger">*</span>
              )}
            </label>
            {el.vl === "PhysicalAddress.state" ? (
              <Select
                instanceId={`react-select-PhysicalState-${idx}`}
                styles={selectStyle}
                className="f-16"
                placeholder={el.ph}
                options={getOptions(el.lb, el.vl)}
                value={getObjectValue(clientData, el.vl)}
                onChange={(e) => updateValue(clientData, el.vl, e)}
                isDisabled={
                  disabled ||
                  (getObjectValue(clientData, "PhysicalAddress.country")?.value
                    ? false
                    : true) ||
                  false
                }
              />
            ) : el.vl === "MailingAddress.state" ? (
              <Select
                instanceId={`react-select-MailingAddressState-${idx}`}
                styles={selectStyle}
                className="f-16"
                placeholder={el.ph}
                options={getOptions(el.lb, el.vl)}
                value={getObjectValue(clientData, el.vl)}
                onChange={(e) => updateValue(clientData, el.vl, e)}
                isDisabled={
                  disabled ||
                  (getObjectValue(clientData, "MailingAddress.country")?.value
                    ? false
                    : true) ||
                  false
                }
              />
            ) : el.typ === "select" ? (
              <AsyncSelect
                instanceId={`react-select-${(el?.vl || "")?.replaceAll(
                  ".",
                  ""
                )}-${idx}`}
                styles={selectStyle}
                className="f-16"
                placeholder={el.ph}
                defaultOptions={getOptions(el.lb, el.vl)}
                loadOptions={(value) => loadOptions(value, el.vl)}
                value={getObjectValue(clientData, el.vl)}
                onChange={(e) => updateValue(clientData, el.vl, e)}
                isDisabled={disabled || false}
              />
            ) : el.typ === "phone" ? (
              <PhoneInput
                inputClass="react-tel-input w-100 phone-input"
                country={"us"}
                placeholder="Enter Mobile Number"
                value={getObjectValue(clientData, el.vl)}
                onChange={(e) => updateValue(clientData, el.vl, e)}
                disabled={disabled || false}
              />
            ) : el.typ === "file" ? (
              <div className="input-group file-div">
                <input
                  className={`form-control ${
                    err &&
                    el.err &&
                    !getObjectValue(clientData, el.vl).toString().trim()
                      ? "border-danger"
                      : ""
                  }`}
                  type={el.typ}
                  name={(el?.lb || "")?.replaceAll(" ", "") + idx}
                  accept="image/*"
                  onChange={async (e: any) => {
                    try {
                      const file = e.target.files[0];
                      if (!(file?.type || "").includes("image/")) {
                        toast.error("File rejected");
                        return;
                      }
                      setClientData({ ...clientData, logoFile: file });
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
                  name={(el?.lb || "")?.replaceAll(" ", "") + idx}
                  value={getObjectValue(clientData, el.vl)}
                  onChange={(e) =>
                    updateValue(clientData, el.vl, e.target.value)
                  }
                  disabled={disabled || isEditing || false}
                />
                <span className="input-group-text">
                  {process.env.NEXT_PUBLIC_REDIRECT}
                </span>
              </div>
            ) : el.typ === "number" ? (
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
                name={(el?.lb || "")?.replaceAll(" ", "") + idx}
                value={getObjectValue(clientData, el.vl)}
                onChange={(e) =>
                  updateValue(
                    clientData,
                    el.vl,
                    Math.abs(Number(e.target.value)) || ""
                  )
                }
                disabled={disabled || false}
                min={0}
              />
            ) : (
              <input
                className={`form-control ${
                  err &&
                  el.err &&
                  ((el.vl === "Company.SecondaryContact.EmailID" &&
                    getObjectValue(clientData, el.vl).trim() &&
                    getObjectValue(clientData, el.vl).toString().trim() ===
                      getObjectValue(
                        clientData,
                        "Company.PrimaryContact.EmailID"
                      )
                        .toString()
                        .trim()) ||
                    (el.vl !== "Company.SecondaryContact.EmailID" &&
                      !getObjectValue(clientData, el.vl).toString().trim()))
                    ? "border-danger"
                    : ""
                }`}
                placeholder={el.ph}
                type={el.typ}
                name={(el?.lb || "")?.replaceAll(" ", "") + idx}
                value={getObjectValue(clientData, el.vl)}
                onChange={(e) => updateValue(clientData, el.vl, e.target.value)}
                disabled={disabled || false}
              />
            )}

            {err &&
              (el.typ === "select"
                ? !getObjectValue(clientData, el.vl)
                : (el.vl === "Company.SecondaryContact.EmailID" &&
                    getObjectValue(clientData, el.vl).toString().trim() &&
                    (!emailRegex.test(
                      getObjectValue(clientData, el.vl).toString().trim()
                    ) ||
                      getObjectValue(clientData, el.vl).toString().trim() ===
                        getObjectValue(
                          clientData,
                          "Company.PrimaryContact.EmailID"
                        )
                          .toString()
                          .trim())) ||
                  (el.vl === "Company.PrimaryContact.EmailID" &&
                    !emailRegex.test(getObjectValue(clientData, el.vl))) ||
                  (el.vl === "Tenant.Slug" &&
                    !new RegExp(/^[a-z0-9-_]{2,}$/).test(
                      getObjectValue(clientData, el.vl)
                    )) ||
                  (el.vl !== "Company.SecondaryContact.EmailID" &&
                    !getObjectValue(clientData, el.vl).toString().trim())) && (
                <span className="text-danger f-12">
                  {el.vl === "Company.PrimaryContact.EmailID" &&
                  getObjectValue(clientData, el.vl).toString().trim()
                    ? "Email is invalid"
                    : el.vl === "Tenant.Slug" &&
                      getObjectValue(clientData, el.vl).toString().trim()
                    ? "Domain should contain at least two characters of lowercase,numeric or symbols(-, _)"
                    : el.vl === "Company.SecondaryContact.EmailID"
                    ? getObjectValue(clientData, el.vl).toString().trim()
                      ? !emailRegex.test(getObjectValue(clientData, el.vl))
                        ? "Email is invalid"
                        : getObjectValue(clientData, el.vl)
                            .toString()
                            .trim() ===
                          getObjectValue(
                            clientData,
                            "Company.PrimaryContact.EmailID"
                          )
                            .toString()
                            .trim()
                        ? el.err
                        : ""
                      : ""
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
              Submit
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
