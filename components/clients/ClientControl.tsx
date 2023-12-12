import Select from "react-select";

export default function ClientControl(props) {
  const { clientData, setClientData, disabled } = props;
  const selectStyle = {
    control: (base) => ({
      ...base,
      background: "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "0.375rem",
      minHeight: "40px",
      boxShadow: null,
      ":hover": {
        borderColor: "#A2CFFE",
      },
      //   borderColor:
      //     err &&
      //     !(
      //       state.selectProps.instanceId.includes("MailingAddress") ||
      //       state.selectProps.placeholder === "Select Admin"
      //     ) &&
      //     !state.hasValue
      //       ? "#e50000 !important"
      //       : "#dee2e6",
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

  const getObjectValue = (obj, path) => {
    const keys = path.split(".");

    return keys.reduce((acc, key) => {
      return acc ? acc[key] : undefined;
    }, obj);
  };

  return (
    <div>
      <p className="text-black f-20 fw-600">Deactivate Client Account</p>
      <p className="mt-3">
        Deactivating an account suspends the client&apos;s access to our system
      </p>
      <hr />

      <div className="col-12 col-lg-4 py-1">
        <label className="form-label text-black f-12">
          Deactivation Reason
          {!clientData?.IsActive && <span className="ms-1 text-danger">*</span>}
        </label>

        <Select
          instanceId={`react-select-deactivate`}
          styles={selectStyle}
          placeholder={"Select"}
          options={[
            { label: "Completed", value: "Completed" },
            { label: "Hold", value: "Hold" },
          ]}
          value={
            getObjectValue(clientData, "DeactivationReason")
              ? {
                  label: getObjectValue(clientData, "DeactivationReason"),
                  value: getObjectValue(clientData, "DeactivationReason"),
                }
              : null
          }
          onChange={(e) =>
            setClientData({ ...clientData, DeactivationReason: e.value })
          }
          isDisabled={disabled || false}
        />

        {/* {err && !getObjectValue(clientData, "IsActive") && (
          <span className="text-danger f-12">Select Reason</span>
        )} */}
      </div>

      <div className="col-12 col-lg-4 py-1">
        <label className="form-label text-black f-12">Status</label>

        <div className="">
          {["Active", "In-active"].map((e, idx) => (
            <label className="flex-center d-inline-flex gap-1 m-2" key={idx}>
              <input
                name="IsActive"
                type="radio"
                className=""
                checked={!idx ? clientData?.IsActive : !clientData?.IsActive}
                onChange={() =>
                  setClientData({
                    ...clientData,
                    IsActive: idx ? false : true,
                    DeactivationReason: !idx
                      ? ""
                      : clientData?.DeactivationReason || "",
                  })
                }
                disabled={disabled || false}
              />
              <p className="text-nowrap cursor-pointer m-0">{e}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
