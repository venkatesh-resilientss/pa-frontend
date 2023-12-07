import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { UsersService } from "services";
import Select from "react-select";
import { ClientsService, RoleService } from "services";
import useSWR from "swr";
import AsyncSelect from "react-select/async";

function EditUser() {
  const router = useRouter();
  const roleservice = new RoleService();
  const { id } = router.query;

  const getUserdetails = (id) => usersService.getuserbyid(id);

  const { data: eachclicntdata, isLoading: userLoading } = useSWR(
    id ? ["USER_DETAILS", id] : null,
    () => getUserdetails(id)
  );



  const [userDetails, setUserDetails] = useState() as any;
  const [initialClientOptions, setInitialClientOptions] = useState() as any
  const [isCheckedStaffUser, setIsCheckedStaffUser] = useState(false);
  const [clientProductionsList, setClientProductionsList] = useState([{
    client: "client_1", production: "production_1", client_id: 0, production_id: [], productionOptions: [], disabledClient: true
  }])

  useEffect(() => {

    setUserDetails(eachclicntdata)

  }, [eachclicntdata])

  useEffect(() => {
    if (userDetails) {
      if (!userDetails.IsStaffUser) {
        setClientProductionsList([{
          client: "client_1", production: "production_1", client_id: userDetails.Client.ID, production_id: [], productionOptions: [], disabledClient: true
        }])
        setInitialClientOptions([{ label: userDetails.Client.Name, value: userDetails.Client.ID }])
        usersService
          .getProductionsByClient(userDetails.Client.ID)
          .then((res) => {
            const productions = res.map((pr) => {
              return {
                label: pr.name, value: pr.id
              }
            })
            setClientProductionsList([{
              client: "client_1", production: "production_1", client_id: userDetails.Client.ID, production_id: [], productionOptions: [...productions], disabledClient: true
            }])
          })

      }
    }
  }, [userDetails])


  useEffect(() => {
    const fetchInitialClients = async () => {
      try {
        // const res = await currencyService.getCurrencies({ search: "", pageLimit: 25, offset: 0 });
        const res = await clientService.getClients({ search: "", pageLimit: 25, offset: 0 });
        const options = res?.map((item) => ({
          value: item.ID,
          label: item.Name,
        }));
        setInitialClientOptions(options);
      } catch (error) {
        console.error('Error fetching initial options:', error);
      }
    };

    fetchInitialClients();
  }, []);

  // const loadClientOptions: any = async (inputValue, callback) => {
  //   try {
  //     const res = await clientService.getClients({ search: inputValue.toString(), pageLimit: 25, offset: 0 });
  //     const options = res?.data.map((item) => ({
  //       value: item.ID,
  //       label: item.Name,
  //       country: item.Country
  //     }));

  //     callback(options);
  //   } catch (error) {
  //     console.error('Error loading options:', error);
  //   }
  // };
  const [editMode, setEditMode] = useState(false);

  const clientService = new ClientsService();
  // const { data: clientData } = useSWR("LIST_CLIENTS", () =>
  //   clientService.getClients()
  // );
  // const clientOptions = Array.isArray(clientData)
  //   ? clientData.map((client) => ({
  //     value: client.ID,
  //     label: client.Name,
  //   }))
  //   : [];


  const { data: rolesdata } = useSWR("LIST_ROLES", () =>
    roleservice.getRoles()
  );
  const roleOptions = Array.isArray(rolesdata)
    ? rolesdata.map((role) => ({
      value: role.ID,
      label: role.RoleName,
    }))
    : [];

  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  // const [selectedProduction, setSelectedProduction] = useState(null);

  //get projects
  // const projectservice = new ProjectService();
  // const { data: projectsdata } = useSWR("LIST_PROJECTS", () =>
  //   projectservice.getProjects()
  // );

  // const projectOptions = Array.isArray(projectsdata)
  //   ? projectsdata.map((project) => ({
  //     value: project.ID,
  //     label: project.Name,
  //   }))
  //   : [];

  const roleSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  const {
    handleSubmit,
    formState: { errors },

    control,
    reset,
  } = useForm();

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
        // Add other fields with their default values
      });

      // Set default values for select boxes
      setSelectedRole({
        value: eachclicntdata?.Role?.ID || "", // Assuming Role ID is the correct property
        label: eachclicntdata?.Role?.RoleName || "", // Assuming RollName is the correct property
      });

      setSelectedClient({
        value: eachclicntdata?.Client?.ID || "", // Assuming client_id is the correct property
        label: eachclicntdata?.Client?.Name || "",
      });

      // setSelectedProduction({
      //   value: eachclicntdata?.production || "",
      //   label: eachclicntdata?.production || "",
      // });
      setIsCheckedStaffUser(eachclicntdata.IsStaffUser)
      const getdata = async () => {

        if (eachclicntdata.Meta?.userCPReference && eachclicntdata.IsStaffUser) {
          const list = await Promise.all(eachclicntdata.Meta?.userCPReference.map(async (meta, index) => {
            const productionOptions = await ProductionOptions(meta.ClientID);
            return {
              client: `client_${index + 1}`,
              production: `production_${index + 1}`,
              client_id: meta.ClientID,
              production_id: meta.ProjectID,
              productionOptions,
              disabledClient: true,
            };
          }));

          if (list.length > 0) {
            setClientProductionsList([...list]);
          }
        }
      }
      getdata()



      // Update the initialization of activeStatus directly in the useState
      setActiveStatus(eachclicntdata?.IsActive ? "active" : "inactive");
    }
  }, [eachclicntdata, userLoading, reset]);

  const ProductionOptions = async (clientId) => {
    const data = await usersService
      .getProductionsByClient(clientId);
    const updatedData = data.map((ele) => ({
      label: ele.name, value: ele.id
    }))
    return updatedData
  }

  const getProductionOptions = (client, clientId) => {
    usersService
      .getProductionsByClient(clientId)
      .then((res) => {
        const productions = res.map((pr) => {
          return {
            label: pr.name, value: pr.id
          }
        })
        setClientProductionsList(prevList => {
          return prevList.map((item: any) => {
            if (item.client == client) {
              return {
                ...item,
                productionOptions: [...productions],
                client_id: clientId
              };
            }
            return item;
          });
        });
      })
      .catch((error) => {
        toast.error(error?.error);
        setClientProductionsList(prevList => {
          return prevList.map((item: any) => {
            if (item.client == client) {
              return {
                ...item,
                productionOptions: [],
                client_id: clientId
              };
            }
            return item;
          });
        });
      })

  }


  const usersService = new UsersService();

  const onSubmit = (data) => {
    const userPayload = {
      "first_name": data.firstname,
      "last_name": data.lastname,
      "middle_name": data.middlename,
      "email": data.email,
      "client_id": 2,
      "roleID": selectedRole?.value,
      // "IsStaffUser": isCheckedStaffUser,
      "Meta": {
        "userCPReference": []
      }
    }
    const userPreferences = clientProductionsList.map(list => {
      return {
        "ClientID": list.client_id,
        "ProjectIDs": [...list.production_id]
      }

    })
    userPayload.Meta.userCPReference = userPreferences;

    usersService
      .editUser(id, userPayload)
      .then(() => {
        router.push("/settings/usermanagement");
        toast.success("User Updated successfully");
        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const [saveClicked, setSaveClicked] = useState(false);

  const handleSaveClick = () => {
    setSaveClicked(true);

    // Call the onSubmit function when the "Save" button is clicked
    handleSubmit(onSubmit)();
  };

  return (
    <div className="overflow-auto text-black mt-4 p-3">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600", fontFamily: "Segoe UI Semibold" }}
      >
        User Management
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600", fontFamily: "Segoe UI Semibold" }}
        >
          Edit User
        </div>
        <div className="d-flex gap-1">
          <Button onClick={() => router.back()} color="white">
            Dismiss
          </Button>
          <Button
            onClick={editMode ? handleSaveClick : handleToggleEditMode}
            color="primary"
            className="px-4"
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
                <Label>Last Name</Label>
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
                <Label>First Name</Label>
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
                      {errors.middlename && (
                        <div className="text-danger">
                          {String(errors.middlename.message)}
                        </div>
                      )}
                    </>
                  )}
                  rules={{ required: "Middle Name is required" }}
                />
              </div>
            </Col>

            <Col xl={4}>
              <div className="mb-1">
                <Label>Email</Label>
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
                <Label>Select Role *</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select isDisabled={!editMode}
                      {...field}
                      options={roleOptions}
                      value={selectedRole}
                      onChange={(selectedOption) => setSelectedRole(selectedOption)}
                      styles={roleSelectStyles}
                    />
                  )}
                />
              </div>
            </Col>
            {/* {userDetails?.IsStaffUser && ( */}
            <Col xl="4">
              <div className="my-auto h-100 py-auto d-flex align-items-end py-1 gap-2">
                <input disabled
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
            {/* )} */}

          </Row>
          <Row className="mt-4 mb-2">
            <label> {"Assign Client(s) & Production(s)"}</label>
          </Row>
          {initialClientOptions && clientProductionsList.map((CPlist, index) => (
            <Row key={index}>

              <Col xl="4">
                <div className="mt-1">
                  <Label>Select Client</Label>
                  <Controller disabled
                    name="Client"
                    control={control}
                    render={({ field }) => (
                      <AsyncSelect isDisabled={!editMode || CPlist.disabledClient}
                        {...field}
                        isClearable={true}
                        className="react-select"
                        classNamePrefix="select"
                        // loadOptions={loadClientOptions}
                        placeholder="Select Client"
                        defaultOptions={initialClientOptions}
                        defaultValue={() => {
                          return initialClientOptions?.filter((option) => option.value === CPlist.client_id);
                        }}
                        // defaultValue={initialClientOptionsfun(CPlist.client_id)}
                        // defaultValue={() => { return initialClientOptionsfun(CPlist.ClientID) }}
                        // defaultValue={() => { initialClientOptionsfun(CPlist.ClientID) }}
                        onChange={(client) => {
                          const clientToUpdate = `client_${index + 1}`
                          getProductionOptions(clientToUpdate, client.value)
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
                  {selectedClient ? (
                    <>
                      <Controller
                        name="productions"
                        control={control}
                        render={({ field }) => (
                          <Select isDisabled={!editMode}
                            {...field}
                            closeMenuOnSelect={false}
                            isMulti
                            options={CPlist.productionOptions}
                            defaultValue={() => { return CPlist.productionOptions.filter(item => CPlist?.production_id.includes(item.value)); }}
                            onChange={(e) => {
                              const temp = e.map(ele => ele.value)
                              const productionToUpdate = `production_${index + 1}`
                              setClientProductionsList(prevList => {
                                return prevList.map((item: any) => {
                                  if (item.production == productionToUpdate) {
                                    return {
                                      ...item,
                                      production_id: [...temp]
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
                      < Controller disabled={true}
                        name={CPlist.client}
                        control={control}
                        render={() => (
                          <Select isDisabled={true}
                            closeMenuOnSelect={false}
                          />
                        )}
                      />
                    </div>
                  )}


                </div>
              </Col>
              {<Col xl="1">
                {index !== 0 && (<div className="d-flex align-items-end h-100 py-2 cursor-pointer">
                  <img src="/deletebin.svg" alt="" width={15} onClick={() => {
                    const updatedData = clientProductionsList.filter((_, listIndex) => listIndex !== index)
                    setClientProductionsList([...updatedData])
                  }} />
                </div>)}

              </Col>}
              {isCheckedStaffUser && editMode && (
                <Col xl="3">
                  {index === clientProductionsList.length - 1 && (
                    <div className="d-flex align-items-end h-100 justify-content-center cursor-pointer">
                      <p className="my-2" ></p>
                      <p className="mb-2" onClick={() => {
                        const id = clientProductionsList.length + 1
                        const tempObj = { client: `client_${id}`, production: `production_${id}`, client_id: 0, production_id: [], productionOptions: [], disabledClient: false }
                        setClientProductionsList([...clientProductionsList, tempObj]);

                      }}> <img src="/add-client-icon.svg" alt="" width={15} /> Add Cient</p>
                    </div>
                  )}

                </Col>
              )
              }
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
