import { useEffect, useState } from "react";
import { Col, Input, Label, Form, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Button from "react-bootstrap-button-loader";
import AsyncSelect from "react-select/async";

import { ClientsService, RoleService, UsersService } from "services";
import { groupAndConcatProjects } from "@/commonFunctions/common";

const clientService = new ClientsService();
const roleService = new RoleService();
const usersService = new UsersService();

export default function EditUser({ router, user: userData }) {
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  const handleToggleEditMode = () => setEditMode(!editMode);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const watchRole = watch("role", "");

  const [showStaffUser, setShowStaffUser] = useState(true) as any;
  const [initialClientOptions, setInitialClientOptions] = useState([]) as any;
  const [userDetails, setUserDetails] = useState(null) as any;
  const [roleOptions, setRoleOptions] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const defaultListItem = {
    client: "client_1",
    production: "production_1",
    client_id: 0,
    production_id: [],
    productionOptions: [],
    productions: [],
    clientData: null,
  };
  const [list, setList] = useState([{ ...defaultListItem }]);

  useEffect(() => {
    if (watchRole?.field) setShowStaffUser(true);
    else {
      setShowStaffUser(false);
      if (watchRole?.label == "Client Admin")
        setList([{ ...list[0], production_id: [], productions: [] }]);
      else setList([{ ...list[0] }]);
    }
  }, [watchRole]);

  useEffect(() => {
    roleService
      .getRoles({ search: "", limit: 100, offset: 0, is_active: true })
      .then((res) => {
        const temproleOptions = Array.isArray(res?.result)
          ? res?.result
              ?.filter((e) => e?.IsActive)
              .map((role) => ({
                value: role.ID,
                label: role.RoleName,
                field: role.IsStaff,
              }))
          : [];
        setRoleOptions(temproleOptions);
      });
    const fetchInitialClients = async () => {
      try {
        const res = await clientService.getClients({
          is_active: true,
          dateStart: "",
          dateEnd: "",
          clients: [],
          softwares: [],
          limit: 250,
          offset: 0,
          search: "",
          status: "true",
        });
        const options = (res?.data || [])
          ?.filter((e) => e?.IsActive)
          ?.map((item) => ({
            value: item.ID,
            label: item.Name,
          }));
        setInitialClientOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialClients();
  }, []);

  const getProductionOptions = (client, clientData) => {
    usersService
      .getProductionsByClient(clientData.value)
      .then((res) => {
        const productions = (res || [])
          ?.filter((e) => e?.IsActive)
          .map((pr) => {
            return {
              label: pr.Name,
              value: pr.ID,
            };
          });
        setList((prevList) => {
          return prevList.map((item: any) => {
            if (item.client == client) {
              return {
                ...item,
                productionOptions: [...productions],
                client_id: clientData.value,
                clientData: clientData,
                production_id: [],
                productions: [],
              };
            }
            return item;
          });
        });
      })
      .catch((error) => {
        toast.error(error?.error);
        setList((prevList) => {
          return prevList.map((item: any) => {
            if (item.client == client) {
              return {
                ...item,
                productionOptions: [],
                client_id: clientData.value,
                clientData: clientData,
              };
            }
            return item;
          });
        });
      });
  };

  const [activeStatus, setActiveStatus] = useState("inactive");

  const ProductionOptions = (clientId) => {
    if (clientId === 0) return [];
    return usersService
      .getProductionsByClient(clientId)
      .then((res) =>
        (res || [])
          ?.filter((e) => e?.IsActive)
          .map((pr) => ({ label: pr.Name, value: pr.ID }))
      )
      .catch(() => []);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const resp = await usersService.getuserbyid(id);
        reset({
          lastname: resp?.last_name || "",
          firstname: resp?.first_name || "",
          middlename: resp?.middle_name || "",
          email: resp?.email || "",
          IsActive: resp?.IsActive ? "active" : "inactive",
          role: {
            value: resp?.role_id || "",
            label: resp?.role_name || "",
            field: resp?.is_staff_role || false,
          },
        });
        setActiveStatus(resp?.IsActive ? "active" : "inactive");

        const tempList = groupAndConcatProjects(
          resp?.client_data || [],
          defaultListItem
        );
        setList(tempList);
        setLoading(false);

        const tempLt = await Promise.all(
          tempList.map(async (e: any) => {
            const optns = await ProductionOptions(e.client_id);
            return { id: e.client_id, optns };
          })
        );
        setList((pL) =>
          pL.map((e) => ({
            ...e,
            productionOptions:
              tempLt.find((el) => el.id === e.client_id)?.optns || [],
          }))
        );
      } catch (e) {
        setLoading(false);
        toast.error(e?.error || "Error");
        setList([{ ...defaultListItem }]);
      }
    };

    if (router.isReady && Number(id)) getData();
  }, [id, router.isReady, reset]);

  useEffect(() => {
    setUserDetails(userData);
  }, [userData]);

  const loadClientOptions: any = async (inputValue, callback) => {
    try {
      const res = await clientService.getClients({
        search: inputValue.toString(),
        limit: 25,
        offset: 0,
        is_active: true,
      });
      const options = res?.data
        .filter((e) => ![...list.map((el) => el.client_id)].includes(e.ID))
        .map((item) => ({
          value: item.ID,
          label: item.Name,
        }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  const roleSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      borderColor:
        errors?.role && !state.hasValue ? "#e50000 !important" : "#dee2e6",
    }),
  };

  const onSubmit = async (data) => {
    if (
      userDetails?.IsStaffUser &&
      !data?.role?.field &&
      list[0].client_id === 0
    ) {
      toast.error("Select Client");
      return;
    }

    const userPayload: any = {
      first_name: data.firstname,
      last_name: data.lastname,
      middle_name: data.middlename,
      email: data.email,
      client_id: userDetails?.IsStaffUser
        ? data?.role?.field
          ? 0
          : list[0].client_id
        : userDetails.Client.ID,
      roleID: data?.role?.value,
      IsStaffUser: data?.role?.field,
      Meta: {
        userCPReference: [],
      },
      IsActive: activeStatus === "active" ? true : false,
    };

    if (data?.role?.label === "Client Admin") {
      const userPreferences = list.map((lt) => ({
        ClientID: lt.client_id,
        ProjectIDs: [],
      }));
      userPayload.Meta.userCPReference = userPreferences;
    } else {
      const userPreferences = list
        .map((lt) => ({
          ClientID: lt.client_id,
          ProjectIDs: [...lt.production_id],
        }))
        .filter((e) => e.ClientID);
      userPayload.Meta.userCPReference = userPreferences;
    }

    setLoading(true);
    usersService
      .editUser(id, userPayload)
      .then(() => {
        router.push("/settings/users");
        toast.success("User updated successfully");
        reset();
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.error);
        setLoading(false);
      }) as Promise<any>;
  };

  return (
    <div className=" text-black mt-4 p-3">
      <div className="text-black font-size-16 fw-600">User Management</div>

      <div className="d-flex justify-content-between">
        <div className="text-black font-size-32 fw-600">Edit User</div>
        <div className="d-flex gap-1">
          <a
            href="#"
            onClick={() => router.back()}
            className="text-decoration-none text-secondary m-2"
          >
            Dismiss
          </a>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="px-3 py-2"
            spinColor="#ffffff"
            onClick={() => {
              if (editMode) handleSubmit(onSubmit)();
              else handleToggleEditMode();
            }}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        </div>
      </div>

      <hr className="height-2" />

      <Form className=" mt-2" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="d-flex gap-4"> */}
        <Row>
          <Col xl="4">
            <div className="mb-1">
              <Label>
                Last Name <span className="text-danger">*</span>
              </Label>
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="p-2"
                      placeholder="Enter Last Name"
                      invalid={errors.lastname && true}
                      {...field}
                      disabled={!editMode}
                    />
                    {errors.lastname && (
                      <div className="text-danger">
                        {String(errors.lastname.message)}
                      </div>
                    )}
                  </>
                )}
                rules={{ required: "Last Name is required" }}
              />
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1 mr-3">
              <Label>
                First Name <span className="text-danger">*</span>
              </Label>
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="p-2"
                      placeholder="Enter First Name"
                      invalid={errors.firstname && true}
                      {...field}
                      required={true}
                      disabled={!editMode}
                    />
                    {errors.firstname && (
                      <div className="text-danger">
                        {String(errors.firstname.message)}
                      </div>
                    )}
                  </>
                )}
                rules={{ required: "First Name is required" }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl="4">
            <div className="mb-1">
              <Label>Middle Initial Name</Label>
              <Controller
                name="middlename"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="p-2"
                      placeholder="Enter Middle Name"
                      // invalid={errors.middlename && true}
                      {...field}
                      disabled={!editMode}
                    />
                    {/* {errors.middlename && (
                      <div className="text-danger">
                        {String(errors.middlename.message)}
                      </div>
                    )} */}
                  </>
                )}
                // rules={{ required: "Middle Name is required" }}
              />
            </div>
          </Col>

          <Col xl={4}>
            <div className="mb-1">
              <Label>
                Email <span className="text-danger">*</span>
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="p-2"
                      placeholder="Enter Email Id"
                      invalid={errors.email && true}
                      {...field}
                      disabled={!editMode}
                    />
                    {errors.email && (
                      <div className="text-danger">
                        {String(errors.email.message)}
                      </div>
                    )}
                  </>
                )}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl="4">
            <div className="mt-1">
              <Label>
                Select Role <span className="text-danger">*</span>
              </Label>
              <Controller
                name="role"
                control={control}
                rules={{
                  required: "Select Role",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={roleOptions.filter((e) =>
                      userData?.IsStaffUser ? e : !e.field
                    )}
                    styles={roleSelectStyles}
                    isDisabled={!editMode}

                    // onChange={(e) => {
                    //   setSelectedRole(e.label);
                    // }}
                  />
                )}
              />
              {errors.role && (
                <div className="text-danger">{String(errors.role.message)}</div>
              )}
            </div>
          </Col>
          {showStaffUser && (
            <Col xl="4">
              <div className="my-auto h-100 py-auto d-flex align-items-end py-1 gap-2">
                <input
                  type="checkbox"
                  name="customSwitch"
                  id="exampleCustomSwitch"
                  className="mb-1"
                  checked={showStaffUser}
                  disabled={true}
                />

                <Label className="mb-0">Is Staff User</Label>
              </div>
            </Col>
          )}
        </Row>
        <Row className="mt-4 mb-2">
          <label> {"Assign Client(s) & Production(s)"}</label>
        </Row>
        {list.map((CPlist, index) => (
          <Row key={index}>
            {userDetails?.IsStaffUser ? (
              <Col xl="4">
                <div className="mt-1">
                  <Label>Select Client</Label>
                  <Controller
                    name="Client"
                    control={control}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        className="react-select"
                        classNamePrefix="select"
                        loadOptions={loadClientOptions}
                        placeholder="Select Client"
                        defaultOptions={initialClientOptions.filter(
                          (e) =>
                            ![...list.map((el) => el.client_id)].includes(
                              e.value
                            )
                        )}
                        value={CPlist.clientData || null}
                        onChange={(client) => {
                          const clientToUpdate = `client_${index + 1}`;
                          getProductionOptions(clientToUpdate, client);
                        }}
                        isDisabled={!editMode}
                      />
                    )}
                  />

                  {errors.mailingAddressState && (
                    <span className="text-danger">
                      {errors.mailingAddressState.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
            ) : (
              <Col xl="4">
                <div className="mt-1">
                  <Label>Select Client</Label>
                  <Controller
                    disabled
                    name="Client"
                    control={control}
                    render={({ field }) => (
                      <AsyncSelect
                        isDisabled={true}
                        {...field}
                        className="react-select"
                        classNamePrefix="select"
                        placeholder="Select Client"
                        defaultOptions={initialClientOptions}
                        onChange={(client) => {
                          const clientToUpdate = `client_${index + 1}`;
                          getProductionOptions(clientToUpdate, client);
                        }}
                        value={initialClientOptions?.filter(
                          (option) => option.value === userDetails?.client_id
                        )}
                      />
                    )}
                  />

                  {errors.mailingAddressState && (
                    <span className="text-danger">
                      {errors.mailingAddressState.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
            )}
            <Col xl="4">
              <div className="mt-1">
                <Label>Select Productions</Label>
                {watchRole?.label !== "Client Admin" ? (
                  <>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      options={CPlist.productionOptions}
                      value={CPlist.productions}
                      onChange={(e) => {
                        const temp = e.map((ele) => ele.value);
                        const productionToUpdate = `production_${index + 1}`;
                        setList((prevList) => {
                          return prevList.map((item: any) => {
                            if (item.production == productionToUpdate) {
                              return {
                                ...item,
                                production_id: [...temp],
                                productions: e,
                              };
                            }
                            return item;
                          });
                        });
                      }}
                      isDisabled={!editMode}
                    />
                  </>
                ) : (
                  <div>
                    <Controller
                      disabled={true}
                      name={CPlist.client}
                      control={control}
                      render={() => (
                        <Select isDisabled={true} closeMenuOnSelect={false} />
                      )}
                    />
                  </div>
                )}
              </div>
            </Col>
            {
              <Col xl="1">
                {index !== 0 && editMode && (
                  <div className="d-flex align-items-end h-100 py-2 cursor-pointer">
                    <img
                      src="/deletebin.svg"
                      alt=""
                      width={15}
                      onClick={() => {
                        const updatedData = list.filter(
                          (_, listIndex) => listIndex !== index
                        );
                        setList([...updatedData]);
                      }}
                    />
                  </div>
                )}
              </Col>
            }
            {showStaffUser && (
              <Col xl="3">
                {index === list.length - 1 && (
                  <div className="d-flex align-items-end h-100 justify-content-center cursor-pointer">
                    <p className="my-2"></p>
                    <button
                      className="btn border-0"
                      onClick={() => {
                        const id = list.length + 1;
                        const tempObj = {
                          client: `client_${id}`,
                          production: `production_${id}`,
                          client_id: 0,
                          production_id: [],
                          productionOptions: [],
                          productions: [],
                          clientData: null,
                        };
                        setList([...list, tempObj]);
                      }}
                      disabled={!editMode}
                    >
                      <img src="/add-client-icon.svg" alt="add" width={15} />{" "}
                      Add Client
                    </button>
                  </div>
                )}
              </Col>
            )}
          </Row>
        ))}
        <div className="d-flex flex-column mt-2">
          <Label
            className="text-black"
            style={{ fontSize: "16px", fontWeight: "400" }}
          >
            Status
          </Label>
          <div className="d-flex gap-3">
            <div className="d-flex gap-1">
              <input
                type="radio"
                id="ex1-active"
                name="ex1"
                value="active"
                checked={activeStatus === "active"}
                onChange={() => {
                  setActiveStatus("active");
                }}
                disabled={!editMode}
              />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input
                type="radio"
                name="ex1"
                id="ex1-inactive"
                value="inactive"
                checked={activeStatus === "inactive"}
                onChange={() => {
                  setActiveStatus("inactive");
                }}
                disabled={!editMode}
              />
              <div>Inactive</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
