import { Button as RButton } from "reactstrap";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import Button from "react-bootstrap-button-loader";
import { ProjectService } from "services";
import { hasAccess } from "@/commonFunctions/hasAccess";

const productionService = new ProjectService();

function EditProductions({ router, clientData, user }) {
  const [isEditing, setEditing] = useState(false);
  const [poVal, setPOVal] = useState(false);
  const [apVal, setAPVal] = useState(false);

  const [staffUser, setStaffUser] = useState<any>(false);
  const [err, setErr] = useState<any>(false);
  const [payld, setPayld] = useState<any>({ name: "", code: "", client: null });
  const [loading, setLoading] = useState<any>(false);
  const [pAUser, setPAUser] = useState<any>(null);
  const [poValues, setPoValues] = useState<any>([null, null]);
  const [apValues, setApValues] = useState<any>([null, null]);

  const handleAddPurchaseOrderField = () => setPoValues([...poValues, null]);
  const handleAddAccountPayableField = () => setApValues([...apValues, null]);

  const { data: clientsData } = useSWR("Clients", () =>
    productionService.getClients({
      dateStart: "",
      dateEnd: "",
      clients: [],
      softwares: [],
      limit: 10,
      offset: 0,
      search: "",
      status: "true",
      pageNumber: 1,
    })
  );
  const clients: any = clientsData?.data || [];
  const { data: users, mutate } = useSWR("Users", () =>
    payld.client
      ? productionService.getClientUsers(payld.client?.value, `?is_active=true`)
      : null
  );

  useEffect(() => {
    setStaffUser(clientData?.staffUser);
  }, [clientData]);

  useEffect(() => {
    mutate();
  }, [payld.client]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const resp = await productionService.getProjectDetails(
          Number(router.query.production_id)
        );

        setPayld({
          ...payld,
          id: resp?.data?.ID,
          name: resp?.data?.Name,
          code: resp?.data?.Code,
          client: resp?.data?.Client?.Name
            ? { label: resp?.data?.Client?.Name, value: resp?.data?.Client?.ID }
            : null,
        });

        setPAUser(
          resp?.data?.ProjectAccountantID
            ? {
                label:
                  (resp?.data?.ProjectAccountant?.first_name || "") +
                  " " +
                  (resp?.data?.ProjectAccountant?.last_name || ""),
                value: resp?.data?.ProjectAccountantID,
              }
            : null
        );
        const getApproverName = (id) => {
          const txt = (resp?.data?.Meta?.data || []).find((e) => {
            return e?.UserID?.value === id;
          })?.UserID?.label;

          return txt;
        };

        const po = resp?.approvers?.approvers
          .filter((e) => e.TransactionType === "PO")
          .map((e) => ({
            label: getApproverName(e.UserID),
            value: e.UserID,
            field: "",
          }));

        setPoValues(po);
        setPOVal(po.length > 0 ? true : false);

        const ap = resp?.approvers?.approvers
          .filter((e) => e.TransactionType === "AP")
          .map((e) => ({
            label: getApproverName(e.UserID),
            value: e.UserID,
            field: "",
          }));

        setApValues(ap);
        setAPVal(ap.length > 0 ? true : false);
      } catch (e) {
        toast.error(e?.error || e || "Error");
      }
    };
    if (Number(router.query.production_id)) getDetails();
  }, [router.query.production_id]);

  const getOptions = (lb) => {
    const getName = (e) =>
      lb === "users"
        ? (e?.first_name || "") + " " + (e?.last_name || "")
        : e?.Name || "";

    if (lb === "users" && !payld.client) return [];
    const tempArr: any = lb === "clients" ? clients : users?.data || [];
    return (tempArr || []).map((e) => {
      return { label: getName(e), value: e.ID, field: e.tenant_id };
    });
  };

  const hasPermission = hasAccess(
    user,
    "production_management",
    "edit_production"
  );
  const onSubmit = async () => {
    if (isEditing) {
      if (
        !payld.name ||
        !payld.code ||
        !payld.client ||
        (poVal && poValues.filter((e) => !e).length > 0) ||
        (apVal && apValues.filter((e) => !e).length > 0)
      ) {
        setErr(true);
        return;
      }
      try {
        setLoading(true);
        const approvers: any = [];
        const data: any = [];
        if (poVal) {
          poValues.map((e, id) => {
            const pyld: any = {
              approverType: id + 1,
              TransactionType: "PO",
              UserID: e.value,
            };
            approvers.push(pyld);
            data.push({ ...pyld, UserID: e });
          });
        }
        if (apVal) {
          apValues.map((e, id) => {
            const pyld: any = {
              approverType: id + 1,
              TransactionType: "AP",
              UserID: e.value,
            };
            approvers.push(pyld);
            data.push({ ...pyld, UserID: e });
          });
        }
        const payload = {
          code: payld.code || "",
          name: payld.name || "",
          ProjectAccountantID: pAUser?.value || 0,
          clientID: payld.client?.value,
          meta: { approvers, data },
        };
        await productionService.updateProject(payld.id, payload);

        setEditing(false);
        setLoading(false);
        toast.success("Production Updated Successfully");
      } catch (e) {
        setLoading(false);
        toast.error(e?.error || e || "Error");
      }
    } else {
      if (hasPermission) setEditing(true);
      else toast.error("Access Denied");
    }
  };

  const selectStyle = {
    control: (base, state) => ({
      ...base,
      background: state.isDisabled ? "#e9ecef" : "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "0.375rem",
      minHeight: "32px",
      boxShadow: null,
      ":hover": {
        borderColor: "#A2CFFE",
      },
      borderColor:
        err &&
        state.selectProps.instanceId.includes("client") &&
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

  const loadOptions: any = (value, lb, opts?: any) => {
    if (lb === "clients") {
      return productionService
        .getClients({
          dateStart: "",
          dateEnd: "",
          clients: [],
          softwares: [],
          limit: 10,
          offset: 0,
          search: value,
          status: "true",
          pageNumber: 1,
        })
        .then((res) => {
          return [...(res?.data || [])].map((e) => {
            return { label: e.Name, value: e.ID, field: e.tenant_id };
          });
        });
    } else if (lb === "users" && payld.client) {
      return productionService
        .getClientUsers(payld.client?.value, `?search=${value}&is_active=true`)
        .then((res) => {
          return [...(res?.data || [])]
            .map((e) => {
              return { label: e.Name, value: e.ID };
            })
            .filter(
              (e) =>
                ![...opts]
                  .filter((el) => el)
                  .map((el) => el?.value)
                  .includes(e.value)
            );
        });
    } else {
      toast.error("Select Client");
      return new Promise((resolve) => setTimeout(() => resolve([]), 500));
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between">
        <div>
          <div className="text-black fw-600">All Productions</div>
          <div className="f-32 fw-600">Create New Production</div>
        </div>

        <div className="my-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn f-14"
          >
            Dismiss
          </button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="px-3 py-2"
            spinColor="#ffffff"
            onClick={onSubmit}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </div>
      <hr />

      <div>
        <div className="fw-600">Basic Information</div>
        <div className="row f-14 m-0 mt-2">
          <div className="col-12 col-sm-4">
            <label className="form-label">
              Production Code <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="code"
              id="code"
              placeholder="Enter Code"
              className={
                "form-control f-12 py-2" +
                (err && !payld.code && true ? " border-danger" : "")
              }
              value={payld.code}
              onChange={(e) => setPayld({ ...payld, code: e.target.value })}
              disabled
            />

            {err && !payld.code && (
              <span className="text-danger f-12">
                Production Code is required
              </span>
            )}
          </div>

          <div className="col-12 col-sm-4">
            <label className="form-label">
              Production Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Production Name"
              className={
                "form-control f-12 py-2" +
                (err && !payld.name && true ? " border-danger" : "")
              }
              value={payld.name}
              onChange={(e) => setPayld({ ...payld, name: e.target.value })}
              disabled={!isEditing || false}
            />

            {err && !payld.name && (
              <span className="text-danger f-12">
                Production Name is required
              </span>
            )}
          </div>
          {staffUser && (
            <div className="col-12 col-sm-4">
              <label className="form-label">
                Client <span className="text-danger">*</span>
              </label>
              <AsyncSelect
                instanceId={`react-select-client`}
                styles={selectStyle}
                placeholder={"Select Client"}
                defaultOptions={getOptions("clients")}
                loadOptions={(value) => loadOptions(value, "clients")}
                value={payld.client}
                onChange={(e) => {
                  setPayld({ ...payld, client: e });
                  setApValues([null, null]);
                  setPoValues([null, null]);
                }}
                isDisabled={!isEditing || false}
              />
              {err && !payld?.client && (
                <span className="text-danger f-12">
                  Production Client is required
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <hr />

      <div>
        <div className="fw-600">Approval work flow for Transactions</div>

        <div className="d-flex align-items-center p-2">
          <input
            type="checkbox"
            className="mt-1"
            id={"Purchase Order"}
            checked={poVal}
            onChange={(e) => {
              setPOVal(e.target.checked);
              if (!e.target.checked) setPoValues([null, null]);
            }}
            disabled={!isEditing || false}
          />
          <label htmlFor={"Purchase Order"} className="ms-1">
            {"Purchase Order"}
          </label>
        </div>

        {poVal && (
          <div className="row f-14 mt-2 m-0 px-4">
            {poValues.map((val, index) => (
              <div className="col-12 col-md-4 col-lg-3 p-2" key={index}>
                <label className="form-label d-flex justify-content-between">
                  Level {index + 1} Approver
                  <span
                    className="f-12 text-danger ms-auto cursor-pointer"
                    onClick={() => {
                      const tempArr = [...poValues];
                      tempArr.splice(index, 1);
                      setPoValues(tempArr);
                    }}
                  >{`( - )`}</span>
                </label>
                <AsyncSelect
                  instanceId={`react-select-po-${index}`}
                  styles={selectStyle}
                  placeholder={"Select User"}
                  defaultOptions={getOptions("users").filter(
                    (e) =>
                      ![...poValues]
                        .filter((el) => el)
                        .map((el) => el?.value)
                        .includes(e.value)
                  )}
                  loadOptions={(value) => loadOptions(value, "users", poValues)}
                  value={val}
                  onChange={(e) => {
                    const tempArr = [...poValues];
                    tempArr[index] = e;
                    setPoValues(tempArr);
                  }}
                  isDisabled={!isEditing || false}
                />
                {err && !val && (
                  <span className="text-danger f-12">Select User</span>
                )}
              </div>
            ))}
            <div className="col-12 col-md-4 col-lg-3 d-flex align-items-end p-2">
              <RButton
                className="f-14 py-2"
                color="white"
                onClick={handleAddPurchaseOrderField}
              >
                + Approver
              </RButton>
            </div>
          </div>
        )}

        <div className="d-flex align-items-center p-2">
          <input
            type="checkbox"
            className="mt-1"
            id={"Account Payable"}
            checked={apVal}
            onChange={(e) => {
              setAPVal(e.target.checked);
              if (!e.target.checked) setApValues([null, null]);
            }}
            disabled={!isEditing || false}
          />
          <label htmlFor={"Account Payable"} className="ms-1">
            {"Account Payable"}
          </label>
        </div>

        {apVal && (
          <div className="row f-14 mt-2 m-0 px-4">
            {apValues.map((val, index) => (
              <div className="col-12 col-md-4 col-lg-3 p-2" key={index}>
                <label className="form-label d-flex justify-content-between">
                  Level {index + 1} Approver
                  <span
                    className="f-12 text-danger ms-auto cursor-pointer"
                    onClick={() => {
                      const tempArr = [...apValues];
                      tempArr.splice(index, 1);
                      setApValues(tempArr);
                    }}
                  >{`( - )`}</span>
                </label>
                <AsyncSelect
                  instanceId={`react-select-ap-${index}`}
                  styles={selectStyle}
                  placeholder={"Select User"}
                  defaultOptions={getOptions("users").filter(
                    (e) =>
                      ![...apValues]
                        .filter((el) => el)
                        .map((el) => el?.value)
                        .includes(e.value)
                  )}
                  loadOptions={(value) => loadOptions(value, "users", apValues)}
                  value={val}
                  onChange={(e) => {
                    const tempArr = [...apValues];
                    tempArr[index] = e;
                    setApValues(tempArr);
                  }}
                  isDisabled={!isEditing || false}
                />
                {err && !val && (
                  <span className="text-danger f-12">Select User</span>
                )}
              </div>
            ))}

            <div className="col-12 col-md-4 col-lg-3 d-flex align-items-end p-2">
              <RButton
                className="f-14 py-2"
                color="white"
                onClick={handleAddAccountPayableField}
              >
                + Approver
              </RButton>
            </div>
          </div>
        )}
      </div>

      <hr style={{ height: "2px" }} />

      {staffUser && (
        <>
          <div className="fw-600">Production Accountant</div>
          <div className="col-12 col-md-4 px-4 pt">
            <label className="form-label">User</label>
            <AsyncSelect
              instanceId={`react-select-user`}
              styles={selectStyle}
              placeholder={"Select User"}
              defaultOptions={getOptions("users")}
              loadOptions={(value) => loadOptions(value, "users", [])}
              value={pAUser}
              onChange={(e) => setPAUser(e)}
              isDisabled={!isEditing || false}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default EditProductions;
