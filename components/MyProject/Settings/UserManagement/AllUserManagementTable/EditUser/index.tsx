import React, { useEffect, useState } from "react";
import { Button as RButton, Col, Form, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { UsersService } from "services";
import Select from "react-select";
import { ClientsService, RoleService, AuthService } from "services";
import useSWR from "swr";
import AsyncSelect from "react-select/async";
import Button from "react-bootstrap-button-loader";

function EditUser() {
  const router = useRouter();
  const roleservice = new RoleService();
  const authService = new AuthService();
  const { id } = router.query;
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset, watch
  } = useForm();

  const watchRole = watch('role', '');
  const [showStaffUser, setShowStaffUser] = useState(true) as any;
  const [initialClientOptions, setInitialClientOptions] = useState() as any;
  const [isCheckedStaffUser, setIsCheckedStaffUser] = useState(false);
  const [roleOptions, setRoleOptions] = useState();
  const [loading, setLoading] = useState<any>(false);
  const [clientProductionsList, setClientProductionsList] = useState([
    {
      client: "client_1",
      production: "production_1",
      client_id: 0,
      production_id: [],
      productionOptions: [],
      disabledClient: true,
    },
  ]);
  const { data: userData } = useSWR("GET_USER_DETAILS", () =>
    authService.getUserDetails()
  );
  const [userDetails, setUserDetails] = useState() as any;

  useEffect(() => {
    setUserDetails(userData?.data);
  }, [userData]);



  useEffect(() => {
    if (watchRole?.label == "Client Admin" || !isCheckedStaffUser) {
      setClientProductionsList([clientProductionsList[0]])
    }
    if (["Payroll Accountant", "Production Accountant", "Client Admin"].includes(watchRole?.label)) {
      setIsCheckedStaffUser(false);
      setShowStaffUser(false);
    } else setShowStaffUser(true);
  }, [watchRole, isCheckedStaffUser])


  const getUserdetails = (id) => usersService.getuserbyid(id);

  const { data: eachclicntdata, isLoading: userLoading } = useSWR(
    id ? ["USER_DETAILS", id] : null,
    () => getUserdetails(id)
  );




  const fetchInitialClients = async () => {
    try {
      // const res = await currencyService.getCurrencies({ search: "", pageLimit: 25, offset: 0 });
      const res = await clientService.getClients({
        dateStart: "",
        dateEnd: "",
        clients: [],
        softwares: [],
        limit: 250,
        offset: 0,
        search: "",
        status: "true",
        is_active: true
      });
      const options = res.data?.map((item) => ({
        value: item.ID,
        label: item.Name,
      }));
      // const updatedClientOptions = options.filter((ele) => !selectedClietIds.includes(ele.value))

      setInitialClientOptions(options);
    } catch (error) {
      console.error("Error fetching initial options:", error);
    }
  };


  const [editMode, setEditMode] = useState(false);

  const clientService = new ClientsService();


  useEffect(() => {
    const params = {
      search: "",
      limit: 25,
      offset: 0,
      is_active: true,
    }
    roleservice.getRoles(params).then((response) => {

      const roleOptions = response?.result?.map((role) => ({
        value: role.ID,
        label: role.RoleName,
      }));
      setRoleOptions(roleOptions)
    })
  }, [])


  const [clientDetails, setClientDetails] = useState(null) as any;
  // const [selectedProduction, setSelectedProduction] = useState(null);

  const roleSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "100%",
    }),
  };


  const [activeStatus, setActiveStatus] = useState(
    eachclicntdata?.IsActive ? "active" : "inactive"
  );

  useEffect(() => {
    // Check if data is available and not currently fetching
    if (eachclicntdata && !userLoading) {
      reset({
        lastname: eachclicntdata?.last_name || "",
        firstname: eachclicntdata?.first_name || "",
        middlename: eachclicntdata?.middle_name || "",
        email: eachclicntdata?.email || "",
        IsActive: eachclicntdata?.IsActive ? "active" : "inactive",
        role: {
          value: eachclicntdata?.Role?.ID || "", // Assuming Role ID is the correct property
          label: eachclicntdata?.Role?.RoleName || "", // Assuming RollName is the correct property
        }
        // Add other fields with their default values
      });



      // setSelectedProduction({
      //   value: eachclicntdata?.production || "",
      //   label: eachclicntdata?.production || "",
      // });
      setIsCheckedStaffUser(eachclicntdata.IsStaffUser);
      const getdata = async () => {
        if (
          eachclicntdata.Meta?.userCPReference
        ) {
          const list = await Promise.all(
            eachclicntdata.Meta?.userCPReference.map(async (meta, index) => {
              const productionOptions = await ProductionOptions(meta.ClientID);
              return {
                client: `client_${index + 1}`,
                production: `production_${index + 1}`,
                client_id: meta.ClientID,
                production_id: meta.ProjectID,
                productionOptions,
                disabledClient: true,
              };
            })
          );
          if (list.length > 0) {
            // const clientIds = list.map(ele => ele.client_id)
            fetchInitialClients();
            setClientProductionsList([...list]);
          }
        }
      };
      getdata();

      // Update the initialization of activeStatus directly in the useState
      setActiveStatus(eachclicntdata?.IsActive ? "active" : "inactive");
    }
  }, [eachclicntdata, userLoading, reset]);

  const ProductionOptions = async (clientId) => {
    const data = await usersService.getProductionsByClient(clientId);
    const updatedData = data.map((ele) => ({
      label: ele.Name,
      value: ele.ID,
    }));
    return updatedData;
  };

  const getProductionOptions = (client, clientId) => {
    usersService
      .getProductionsByClient(clientId)
      .then((res) => {
        const productions = res.map((pr) => {
          return {
            label: pr.Name,
            value: pr.ID,
          };
        });
        setClientProductionsList((prevList) => {
          return prevList.map((item: any) => {
            if (item.client == client) {
              return {
                ...item,
                productionOptions: [...productions],
                client_id: clientId,
              };
            }
            return item;
          });
        });
      })
      .catch((error) => {
        toast.error(error?.error);
        setClientProductionsList((prevList) => {
          return prevList.map((item: any) => {
            if (item.client == client) {
              return {
                ...item,
                productionOptions: [],
                client_id: clientId,
              };
            }
            return item;
          });
        });
      });
  };

  const usersService = new UsersService();

  const onSubmit = (data) => {
    const userPayload = {
      first_name: data.firstname,
      last_name: data.lastname,
      middle_name: data.middlename,
      email: data.email,
      roleID: data?.role?.value,
      client_id: userDetails?.IsStaffUser
        ? isCheckedStaffUser
          ? 0
          : clientDetails?.value
        : userDetails.Client.ID,
      // "IsStaffUser": isCheckedStaffUser,
      Meta: {
        userCPReference: [],
      },
      IsActive: activeStatus === "active" ? true : false,
    };

    if (data.role.value === "Client Admin") {
      const userPreferences = clientProductionsList.map((list) => {
        return {
          ClientID: list.client_id,
          ProjectIDs: []
        };
      });
      userPayload.Meta.userCPReference = userPreferences;
    } else {
      const userPreferences = clientProductionsList.map((list) => {
        return {
          ClientID: list.client_id,
          ProjectIDs: [...list.production_id],
        };
      });
      userPayload.Meta.userCPReference = userPreferences;
    }

    // const userPreferences = clientProductionsList.map((list) => {
    //   return {
    //     ClientID: list.client_id,
    //     ProjectIDs: [...list.production_id],
    //   };
    // });
    // userPayload.Meta.userCPReference = userPreferences;
    setLoading(true)
    usersService
      .editUser(id, userPayload)
      .then(() => {
        router.push("/settings/usermanagement");
        toast.success("User Updated successfully");
        reset();
        setLoading(false)

      })
      .catch((error) => {
        toast.error(error?.error);
        setLoading(false)

      });
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const [saveClicked, setSaveClicked] = useState(false);

  const handleSaveClick = () => {
    setSaveClicked(true);

    // Call the onSubmit function when the "Save" Button as Rbutton is clicked
    handleSubmit(onSubmit)();
  };

  return (
    <div className="text-black mt-4 p-3">
      <div
        className="text-black"
        style={{
          fontSize: "16px",
          fontWeight: "600",
          fontFamily: "Segoe UI Semibold",
        }}
      >
        User Management
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{
            fontSize: "32px",
            fontWeight: "600",
            fontFamily: "Segoe UI Semibold",
          }}
        >
          Edit User
        </div>
        <div className="d-flex gap-1">
          <RButton onClick={() => router.back()} color="white">
            Dismiss
          </RButton>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="px-3 py-2"
            spinColor="#ffffff"
            onClick={editMode ? handleSaveClick : handleToggleEditMode}
          >
            {editMode && !saveClicked ? "Save" : "Edit"}
          </Button>

        </div>
      </div>

      <hr style={{ height: "2px" }} />
      <div className="text-black mt-2">
        <Form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Middle Name"
                        invalid={errors.middlename && true}
                        {...field}
                        disabled={!editMode}
                      />
                    </>
                  )}
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
                        placeholder="Email"
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
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <Select
                      isDisabled={!editMode}
                      {...field}
                      options={roleOptions}
                      styles={roleSelectStyles}
                    />
                  )}
                />
              </div>
            </Col>
            {userDetails?.IsStaffUser && showStaffUser && (
              <Col xl="4">
                <div className="my-auto h-100 py-auto d-flex align-items-end py-1 gap-2">
                  <input
                    type="checkbox"
                    name="customSwitch"
                    id="exampleCustomSwitch"
                    className="mb-1"
                    checked={isCheckedStaffUser}
                  // onChange={(e) => {
                  //   setIsCheckedStaffUser(e.target.checked)
                  // }}
                  />

                  <Label className="mb-0">Is Staff User</Label>
                </div>
              </Col>
            )}
          </Row>
          <Row className="mt-4 mb-2">
            <label> {"Assign Client(s) & Production(s)"}</label>
          </Row>
          {initialClientOptions &&
            clientProductionsList.map((CPlist, index) => (
              <Row key={index}>
                <Col xl="4">
                  <div className="mt-1">
                    <Label>Select Client</Label>
                    <Controller
                      disabled
                      name="Client"
                      control={control}
                      render={({ field }) => (
                        <AsyncSelect
                          isDisabled={!editMode}
                          {...field}
                          // isClearable={true}
                          className="react-select"
                          classNamePrefix="select"
                          // loadOptions={loadClientOptions}
                          placeholder="Select Client"
                          defaultOptions={initialClientOptions}
                          defaultValue={() => {
                            return initialClientOptions?.filter(
                              (option) => option.value === CPlist.client_id
                            );
                          }}
                          // defaultValue={initialClientOptionsfun(CPlist.client_id)}
                          // defaultValue={() => { return initialClientOptionsfun(CPlist.ClientID) }}
                          // defaultValue={() => { initialClientOptionsfun(CPlist.ClientID) }}
                          onChange={(client) => {
                            const updatedCLientOptions =
                              initialClientOptions.filter(
                                (ele) => ele.value !== client.value
                              );
                            if (index === 0) setClientDetails(client);
                            setInitialClientOptions([...updatedCLientOptions]);
                            const clientToUpdate = `client_${index + 1}`;
                            getProductionOptions(clientToUpdate, client.value);
                          }}
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

                <Col xl="4">
                  <div className="mt-1">
                    <Label>Select Productions</Label>
                    {watchRole?.label !== "Client Admin" ? (
                      <>
                        <Controller
                          name="productions"
                          control={control}
                          render={({ field }) => (
                            <Select
                              isDisabled={!editMode}
                              {...field}
                              closeMenuOnSelect={false}
                              isMulti
                              options={CPlist.productionOptions}
                              defaultValue={() => {
                                return CPlist.productionOptions.filter((item) =>
                                  CPlist?.production_id.includes(item.value)
                                );
                              }}
                              onChange={(e) => {
                                const temp = e.map((ele) => ele.value);
                                const productionToUpdate = `production_${index + 1
                                  }`;
                                setClientProductionsList((prevList) => {
                                  return prevList.map((item: any) => {
                                    if (item.production == productionToUpdate) {
                                      return {
                                        ...item,
                                        production_id: [...temp],
                                      };
                                    }
                                    return item;
                                  });
                                });
                              }}
                            />
                          )}
                        />
                      </>
                    ) : (
                      <div>
                        <Controller
                          disabled={true}
                          name={CPlist.client}
                          control={control}
                          render={() => (
                            <Select
                              isDisabled={true}
                              closeMenuOnSelect={false}
                            />
                          )}
                        />
                      </div>
                    )}
                  </div>
                </Col>
                {
                  <Col xl="1">
                    {index !== 0 && !CPlist.disabledClient && (
                      <div className="d-flex align-items-end h-100 py-2 cursor-pointer">
                        <img
                          src="/deletebin.svg"
                          alt=""
                          width={15}
                          onClick={() => {
                            const updatedData = clientProductionsList.filter(
                              (_, listIndex) => listIndex !== index
                            );
                            setClientProductionsList([...updatedData]);
                          }}
                        />
                      </div>
                    )}
                  </Col>
                }
                {isCheckedStaffUser && editMode && (
                  <Col xl="3">
                    {index === clientProductionsList.length - 1 && (
                      <div className="d-flex align-items-end h-100 justify-content-center cursor-pointer">
                        <p className="my-2"></p>
                        <p
                          className="mb-2"
                          onClick={() => {
                            const id = clientProductionsList.length + 1;
                            const tempObj = {
                              client: `client_${id}`,
                              production: `production_${id}`,
                              client_id: 0,
                              production_id: [],
                              productionOptions: [],
                              disabledClient: false,
                            };
                            setClientProductionsList([
                              ...clientProductionsList,
                              tempObj,
                            ]);
                          }}
                        >
                          {" "}
                          <img
                            src="/add-client-icon.svg"
                            alt=""
                            width={15}
                          />{" "}
                          Add Cient
                        </p>
                      </div>
                    )}
                  </Col>
                )}
              </Row>
            ))}

          {/* <Col xl="4">
            <div className="mb-1">
              <Label>Select Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={roleOptions}
                    value={selectedRole}
                    onChange={(selectedOption) =>
                      setSelectedRole(selectedOption)
                    }
                    styles={roleSelectStyles}
                    isDisabled={!editMode}
                  />
                )}
              />
            </div>
          </Col>

          <div className="d-flex gap-4 mt-2">
            <Col xl="4">
              <div className="mb-1">
                <Label>Select Client</Label>
                <Controller
                  name="client"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={clientOptions}
                      value={selectedClient}
                      onChange={(selectedOption) =>
                        setSelectedClient(selectedOption)
                      }
                      isDisabled={!editMode}
                    />
                  )}
                />
              </div>
            </Col>
            <Col xl="4">
              <div className="mb-1">
                <Label>Select Production</Label>
                <Controller
                  name="production"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={projectOptions}
                      value={selectedProduction}
                      onChange={(selectedOption) =>
                        setSelectedProduction(selectedOption)
                      }
                      isDisabled={!editMode}
                    />
                  )}
                />
              </div>
            </Col>
          </div> */}

          <div className="d-flex flex-column mt-2">
            <Label
              className="text-black"
              style={{ fontSize: "16px", fontWeight: "400" }}
            >
              Status
            </Label>
            <div className="d-flex gap-1">
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
                  disabled={!editMode} // Disable based on the edit mode
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
                  disabled={!editMode} // Disable based on the edit mode
                />
                <div>Inactive</div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditUser;
