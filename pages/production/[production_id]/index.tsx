import { Button as RButton, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { formValidationRules } from "@/constants/common";
import { ProjectService } from "services";

const productionService = new ProjectService();

function Production() {
  const router = useRouter();
  const productionRules = formValidationRules.productions;
  const [purchaseOrderValue, setPurchaseOrderValue] = useState(false);
  const [accountPayableValue, setAccountPayableValue] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [staffUser, setStaffUser] = useState<any>(false);
  const [err, setErr] = useState<any>(false);
  //   const [loading, setLoading] = useState<any>(false);
  const [client, setClient] = useState<any>(null);
  const [pAUser, setPAUser] = useState<any>(null);
  const [tenantId, setTenantId] = useState<any>("");
  const [poValues, setPoValues] = useState<any>([null, null]);
  const [apValues, setApValues] = useState<any>([null, null]);

  const handleAddPurchaseOrderField = () => setPoValues([...poValues, null]);
  const handleAddAccountPayableField = () => setApValues([...apValues, null]);

  const { data: clients } = useSWR("Clients", () =>
    productionService.getClients("")
  );
  const { data: users, mutate } = useSWR("Users", () =>
    client ? productionService.getClientUsers(client?.value, ``) : null
  );

  useEffect(() => {
    const getTenantDetails = async () => {
      try {
        const resp = await productionService.getProjectDetails(
          Number(router.query.production_id)
        );
        const name = window.location.hostname.split(".")[0];
        if (name === "app") setStaffUser(true);
        setClient({
          label: resp?.projects?.Client?.Name,
          value: resp?.projects?.Client?.ID,
          field: resp?.projects?.Client?.tenant_id,
        });
        setValue("productionCode", resp?.projects?.Code);
        setValue("productionName", resp?.projects?.Name);
        setPAUser(
          resp?.projects?.ProjectAccountantID
            ? {
              label:
                (resp?.projects?.ProjectAccountant?.first_name || "") +
                " " +
                (resp?.projects?.ProjectAccountant?.last_name || ""),
              value: resp?.projects?.ProjectAccountantID,
            }
            : null
        );
        const po = resp?.po_approvers.map((e) => ({
          label: (e?.User?.first_name || "") + " " + (e?.User?.last_name || ""),
          value: e.UserID,
        }));

        setPoValues(po);
        setPurchaseOrderValue(po.length > 0);
        const ap = resp?.ap_approvers.map((e) => ({
          label: (e?.User?.first_name || "") + " " + (e?.User?.last_name || ""),
          value: e.UserID,
        }));

        setApValues(ap);
        setAccountPayableValue(ap.length > 0);
      } catch (e) {
        toast.error(e?.error || e || "Error");
      }
    };
    if (Number(router.query.production_id)) getTenantDetails();
  }, [router.query.production_id]);

  useEffect(() => {
    mutate();
  }, [client]);

  const getOptions = (lb) => {
    const getName = (e) =>
      lb === "users"
        ? (e?.first_name || "") + " " + (e?.last_name || "")
        : e?.Name || "";

    if (lb === "users" && !client) return [];
    const tempArr: any = lb === "clients" ? clients : users?.data || [];
    return (tempArr || []).map((e) => {
      return { label: getName(e), value: e.ID, field: e.tenant_id };
    });
  };

  const onSubmit = async (data) => {
    if (
      !client ||
      poValues.filter((e) => !e).length > 0 ||
      apValues.filter((e) => !e).length > 0
    ) {
      setErr(true);
      return;
    }
    try {
      //   setLoading(true);
      const payload = {
        code: data.productionCode || "",
        name: data.productionName || "",
        ProjectAccountantID: pAUser?.value || 0,
        clientID: client?.value,
      };
      const resp = await productionService.createProject(tenantId, payload);
      for (const idx in poValues) {
        const index = Number(idx);
        const user_id = poValues[index]?.value;
        const pyld = {
          approverType: index,
          TransactionType: "PO",
          user_id,
          projectID: resp?.ID,
        };
        await productionService.createProjectApprover(tenantId, pyld);
      }
      for (const idx in apValues) {
        const index = Number(idx);
        const user_id = apValues[index]?.value;
        const pyld = {
          approverType: index,
          TransactionType: "AP",
          UserID: user_id,
          projectID: resp?.ID,
        };
        await productionService.createProjectApprover(tenantId, pyld);
      }
      router.push(`/productions/${resp?.ID}`);
    } catch (e) {
      //   setLoading(false);
      toast.error(e?.error || e || "Error");
    }
  };

  const selectStyle = {
    control: (base) => ({
      ...base,
      background: "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "0.375rem",
      minHeight: "32px",
      boxShadow: null,
      ":hover": {
        borderColor: "#A2CFFE",
      },
      // borderColor:
      //   err &&
      //   state.selectProps.placeholder !== "Select Admin" && !state.hasValue
      //     ? "#e50000 !important"
      //     : "#dee2e6",
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
  const loadOptions: any = (value, lb) => {
    if (lb === "clients") {
      return productionService.getClients(`?search=${value}&is_active:true`).then((res) => {
        return [...res].map((e) => {
          return { label: e.Name, value: e.ID, field: e.tenant_id };
        });
      });
    } else if (lb === "users" && client) {
      return productionService
        .getClientUsers(client?.value, `?search=${value}&is_active:true`)
        .then((res) => {
          return [...(res?.data || [])].map((e) => {
            return { label: e.Name, value: e.ID };
          });
        });
    } else {
      toast.error("Select Client");
      return new Promise((resolve) => setTimeout(() => resolve([]), 500));
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
            {/* <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="px-4"
              spinColor="#ffffff"
            >
              Save
            </Button> */}
          </div>
        </div>
        <hr />

        <div>
          <div className="fw-600">Basic Information</div>
          <div className="row f-14 m-0 mt-2">
            <div className="col-12 col-sm-4">
              <label className="form-label">Production Code</label>
              <Controller
                name="productionCode"
                rules={productionRules.code}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Enter Code"
                    className={
                      "form-control f-12 py-2" +
                      (errors.productionCode && true ? " border-danger" : "")
                    }
                    disabled
                  />
                )}
              />
              {errors.productionCode && (
                <span className="text-danger f-12">
                  {errors.productionCode.message as React.ReactNode}
                </span>
              )}
            </div>
            <div className="col-12 col-sm-4">
              <label className="form-label">Production Name</label>
              <Controller
                name="productionName"
                rules={productionRules.name}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Production Name"
                    className={
                      "form-control f-12 py-2" +
                      (errors.productionName && true ? " border-danger" : "")
                    }
                    disabled
                  />
                )}
              />
              {errors.productionName && (
                <span className="text-danger f-12">
                  {errors.productionName.message as React.ReactNode}
                </span>
              )}
            </div>
            {staffUser && (
              <div className="col-12 col-sm-4">
                <label className="form-label">Client</label>
                <AsyncSelect
                  instanceId={`react-select-client`}
                  styles={selectStyle}
                  placeholder={"Select Client"}
                  defaultOptions={getOptions("clients")}
                  loadOptions={(value) => loadOptions(value, "clients")}
                  value={client}
                  onChange={(e) => {
                    setClient(e);
                    setTenantId(e.field);
                    setApValues([null, null]);
                    setPoValues([null, null]);
                  }}
                  isDisabled={true}
                />
                {err && !client && (
                  <span className="text-danger f-12">Select Client</span>
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
              checked={purchaseOrderValue}
              onChange={(e) => {
                setPurchaseOrderValue(e.target.checked);
                if (!e.target.checked) setPoValues([null, null]);
              }}
              disabled
            />
            <label htmlFor={"Purchase Order"} className="ms-1">
              {"Purchase Order"}
            </label>
          </div>

          {purchaseOrderValue && (
            <div className="row f-14 mt-2 m-0 px-4">
              {poValues.map((val, index) => (
                <div className="col-12 col-md-4 col-lg-3 p-2" key={index}>
                  <label className="form-label d-flex justify-content-between">
                    Level {index + 1} Approver
                    <span
                      className="f-12 text-danger ms-auto cursor-pointer d-none"
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
                      loadOptions(value, "users").filter(
                        (e) =>
                          ![...poValues]
                            .filter((el) => el)
                            .map((el) => el?.value)
                            .includes(e.value)
                      )
                    }
                    value={val}
                    onChange={(e) => {
                      const tempArr = [...poValues];
                      tempArr[index] = e;
                      setPoValues(tempArr);
                    }}
                    isDisabled={true}
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
              checked={accountPayableValue}
              onChange={(e) => {
                setAccountPayableValue(e.target.checked);
                if (!e.target.checked) setApValues([null, null]);
              }}
              disabled
            />
            <label htmlFor={"Account Payable"} className="ms-1">
              {"Account Payable"}
            </label>
          </div>

          {accountPayableValue && (
            <div className="row f-14 mt-2 m-0 px-4">
              {apValues.map((val, index) => (
                <div className="col-12 col-md-4 col-lg-3 p-2" key={index}>
                  <label className="form-label d-flex justify-content-between">
                    Level {index + 1} Approver
                    <span
                      className="f-12 text-danger ms-auto cursor-pointer d-none"
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
                      loadOptions(value, "users").filter(
                        (e) =>
                          ![...apValues]
                            .filter((el) => el)
                            .map((el) => el?.value)
                            .includes(e.value)
                      )
                    }
                    value={val}
                    onChange={(e) => {
                      const tempArr = [...apValues];
                      tempArr[index] = e;
                      setApValues(tempArr);
                    }}
                    isDisabled={true}
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

        <div className="fw-600">Production Accountant</div>
        <div className="col-12 col-md-4 px-4 pt">
          <label className="form-label">User</label>
          <AsyncSelect
            instanceId={`react-select-user`}
            styles={selectStyle}
            placeholder={"Select User"}
            defaultOptions={getOptions("users")}
            loadOptions={(value) => loadOptions(value, "users")}
            value={pAUser}
            onChange={(e) => setPAUser(e)}
            isDisabled={true}
          />
        </div>
      </div>
    </Form>
  );
}

export default Production;
