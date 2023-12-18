import { Button as RButton } from "reactstrap";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import Button from "react-bootstrap-button-loader";
import { hasAccess } from "@/commonFunctions/hasAccess";
import { removeDuplicates } from "@/commonFunctions/common";

import { ClientsService, ProjectService } from "services";
import NoProductionPage from "@/components/productions/NoProductionPage";

const clientService = new ClientsService();
const productionService = new ProjectService();

export default function EditProductions({ router, clientData, user }) {
  const [isEditing, setEditing] = useState(false);
  const [poVal, setPOVal] = useState(false);
  const [apVal, setAPVal] = useState(false);

  const [staffUser, setStaffUser] = useState<any>(false);
  const [err, setErr] = useState<any>(false);
  const [payld, setPayld] = useState<any>({
    name: "",
    code: "",
    client: null,
    clientStatus: false,
  });
  const [loading, setLoading] = useState<any>(true);
  const [pAUser, setPAUser] = useState<any>(null);
  const [poValues, setPoValues] = useState<any>([null, null]);
  const [apValues, setApValues] = useState<any>([null, null]);

  const handleAddPurchaseOrderField = () => setPoValues([...poValues, null]);
  const handleAddAccountPayableField = () => setApValues([...apValues, null]);

  const getClientsPayload: any = {
    dateStart: "",
    dateEnd: "",
    clients: [],
    softwares: [],
    limit: 10,
    offset: 0,
    search: "",
    status: "true",
    pageNumber: 1,
  };

  const { data: clientsData } = useSWR("Clients", () =>
    productionService.getClients({ ...getClientsPayload })
  );
  const clients: any = clientsData?.data || [];
  const { data: users, mutate } = useSWR("Users", () =>
    payld.client
      ? clientService.getClientUsers(payld.client?.value, `?is_active=true`)
      : null
  );

  const {
    data: productionAccountantUsers,
    mutate: productionAccountantMutate,
  } = useSWR("ProductionUsers", () =>
    payld.client && staffUser
      ? clientService.getClientUsers(
          payld.client?.value,
          `?is_active=true&role_code=PRODUCTION_ACCOUNTANT`
        )
      : null
  );

  useEffect(() => {
    setStaffUser(clientData?.staffUser);
  }, [clientData]);

  useEffect(() => {
    mutate();
    productionAccountantMutate();
  }, [payld.client]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const resp = await productionService.getProjectDetails(
          Number(router.query.id)
        );

        setPayld({
          ...payld,
          id: resp?.data?.ID,
          name: resp?.data?.Name,
          code: resp?.data?.Code,
          IsActive: resp?.data?.IsActive,
          IsCompleted: resp?.data?.IsCompleted,
          client: resp?.data?.Client?.Name
            ? { label: resp?.data?.Client?.Name, value: resp?.data?.Client?.ID }
            : null,
          clientStatus: resp?.data?.Client?.IsActive,
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

        const po = (resp?.data?.Meta?.approvers || [])
          .filter((e) => e.TransactionType === "PO")
          .map((e) => (e.UserID ? { label: e.name, value: e.UserID } : null));

        setPoValues(po);
        setPOVal(po.length > 0 ? true : false);

        const ap = (resp?.data?.Meta?.approvers || [])
          .filter((e) => e.TransactionType === "AP")
          .map((e) => (e.UserID ? { label: e.name, value: e.UserID } : null));

        setApValues(ap);
        setAPVal(ap.length > 0 ? true : false);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        toast.error(e?.error || e || "Error");
      }
    };
    if (Number(router.query.id)) getDetails();
  }, [router.query.id]);

  const getOptions = (lb) => {
    if (["users", "productionAccountantUsers"].includes(lb) && !payld.client)
      return [];
    const tempArray: any =
      lb === "clients"
        ? clients
        : lb === "productionAccountantUsers"
        ? productionAccountantUsers?.data || []
        : users?.data || [];
    const tempArr: any = (tempArray || []).map((e) => ({
      label: lb === "clients" ? e?.Name || "" : e?.name || "",
      value: lb === "clients" ? e.ID : e.id,
    }));

    return removeDuplicates(tempArr, "value");
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
        if (poVal) {
          poValues.map((e, id) => {
            approvers.push({
              approverType: id + 1,
              TransactionType: "PO",
              UserID: e.value,
            });
          });
        }
        if (apVal) {
          apValues.map((e, id) => {
            approvers.push({
              approverType: id + 1,
              TransactionType: "AP",
              UserID: e.value,
            });
          });
        }

        const payload = {
          code: payld.code || "",
          name: payld.name || "",
          ProjectAccountantID: pAUser?.value || 0,
          clientID: payld.client?.value,
          meta: { approvers },
          IsCompleted: payld.IsCompleted || false,
          IsActive: payld.IsActive || false,
        };
        await productionService.updateProject(payld.id, payload);

        setEditing(false);
        setLoading(false);
        toast.success("Production updated successfully");
        router.replace(`/productions`);
      } catch (e) {
        setLoading(false);
        toast.error(e?.error || e || "Error");
      }
    } else {
      if (hasPermission && payld.clientStatus) setEditing(true);
      else if (hasPermission && !payld.clientStatus)
        toast.error("Access Denied - Client In-active");
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
        (state.selectProps.instanceId.includes("client") ||
          state.selectProps.instanceId.includes("po") ||
          state.selectProps.instanceId.includes("ap")) &&
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

  const loadOptions: any = (value, lb, opts?: any) => {
    if (lb === "clients") {
      return productionService
        .getClients({ ...getClientsPayload, search: value })
        .then((res) => {
          const tempArr: any = [...(res?.data || [])].map((e) => ({
            label: e.Name,
            value: e.ID,
          }));
          return removeDuplicates(tempArr, "value");
        });
    } else if (
      ["users", "productionAccountantUsers"].includes(lb) &&
      payld.client
    ) {
      return clientService
        .getClientUsers(
          payld.client?.value,
          `?search=${value}&is_active=true${
            lb === "productionAccountantUsers"
              ? "&role_code=PRODUCTION_ACCOUNTANT"
              : ""
          }`
        )
        .then((res) => {
          const tempArr: any = [...(res?.data || [])]
            .map((e) => ({ label: e.name, value: e.id }))
            .filter(
              (e) =>
                ![...opts]
                  .filter((el) => el)
                  .map((el) => el?.value)
                  .includes(e.value)
            );
          return removeDuplicates(tempArr, "value");
        });
    } else {
      toast.error("Select Client");
      return new Promise((resolve) => setTimeout(() => resolve([]), 500));
    }
  };

  const hasViewPermission = hasAccess(
    user,
    "production_management",
    "view_all_productions"
  );
  return (
    <>
      {user && !hasViewPermission ? (
        <NoProductionPage
          {...{ user }}
          typ={user && !hasViewPermission ? "Access Denied" : ""}
        />
      ) : (
        <div className="p-4">
          <div className="d-flex justify-content-between">
            <div>
              <div className="f-12">All Productions</div>
              <div className="fw-bold f-20">{payld.name || "-"}</div>
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
                size="sm"
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
                    defaultOptions={[]}
                    value={payld.client}
                    isDisabled
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
                        className={
                          isEditing ? "f-12 text-danger ms-auto cr-p" : "d-none"
                        }
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
                      loadOptions={(value) =>
                        loadOptions(value, "users", poValues)
                      }
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
                    className={isEditing ? "f-14 py-2" : "d-none"}
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
                        className={
                          isEditing ? "f-12 text-danger ms-auto cr-p" : "d-none"
                        }
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
                      loadOptions={(value) =>
                        loadOptions(value, "users", apValues)
                      }
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
                    className={isEditing ? "f-14 py-2" : "d-none"}
                    color="white"
                    onClick={handleAddAccountPayableField}
                  >
                    + Approver
                  </RButton>
                </div>
              </div>
            )}
          </div>

          {staffUser && (
            <>
              <hr />
              <div className="fw-600">Production Accountant</div>
              <div className="col-12 col-md-4 px-4 py-2">
                <label className="form-label">User</label>
                <AsyncSelect
                  instanceId={`react-select-pauser`}
                  styles={selectStyle}
                  placeholder={"Select User"}
                  defaultOptions={getOptions("productionAccountantUsers")}
                  loadOptions={(value) =>
                    loadOptions(value, "productionAccountantUsers", [])
                  }
                  value={pAUser}
                  onChange={(e) => setPAUser(e)}
                  isDisabled={!isEditing || false}
                  isClearable
                />
              </div>
            </>
          )}

          {staffUser && (
            <>
              <hr />
              <div className="fw-600">Production Control</div>
              <div className="col-12 col-md-4 px-4 py-2">
                <label className="form-label text-black f-12">Status</label>

                <div className="">
                  {["Active", "In-active"].map((e, idx) => (
                    <label
                      className="flex-center d-inline-flex gap-1 m-2"
                      key={idx}
                    >
                      <input
                        name="IsActive"
                        type="radio"
                        className=""
                        checked={!idx ? payld?.IsActive : !payld?.IsActive}
                        onChange={() =>
                          setPayld({
                            ...payld,
                            IsActive: idx ? false : true,
                            IsCompleted: idx ? payld.IsCompleted : false,
                          })
                        }
                        disabled={!isEditing || false}
                      />
                      <p className="text-nowrap cursor-pointer m-0">{e}</p>
                    </label>
                  ))}
                </div>
                <label className="flex-center d-inline-flex gap-1 m-2">
                  <input
                    name="IsCompleted"
                    type="checkbox"
                    className=""
                    checked={payld?.IsCompleted || false}
                    onChange={(e) =>
                      setPayld({
                        ...payld,
                        IsCompleted: e.target.checked,
                        IsActive: e.target.checked ? false : payld.IsActive,
                      })
                    }
                    disabled={!isEditing || false}
                  />
                  <p className="text-nowrap cursor-pointer m-0">
                    Mark as Completed
                  </p>
                </label>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
