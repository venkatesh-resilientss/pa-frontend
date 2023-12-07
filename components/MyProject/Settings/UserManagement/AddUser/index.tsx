import { Button, Col, Input, Label, Form, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { UsersService } from "services";
import Select from "react-select";
import { ClientsService, RoleService, AuthService } from "services";
const authService = new AuthService();


import useSWR from "swr";
import AsyncSelect from "react-select/async";

function AddUser() {
  const { data: userData } = useSWR("GET_USER_DETAILS", () =>
    authService.getUserDetails()
  );
  //get cleints
  const clientService = new ClientsService();


  // const { data: clientData } = useSWR("LIST_CLIENTS", () =>
  //   clientService.getClients()
  // );
  const [initialClientOptions, setInitialClientOptions] = useState([])
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedClient] = useState(true);
  const [userDetails, setUserDetails] = useState() as any;
  const [isCheckedStaffUser, setIsCheckedStaffUser] = useState(false);
  const [clientProductionsList, setClientProductionsList] = useState([{
    client: "client_1", production: "production_1", client_id: 0, production_id: [], productionOptions: []
  }])

  useEffect(() => {

    setUserDetails(userData?.data)

  }, [userData])

  useEffect(() => {
    if (userDetails) {
      if (!userDetails.IsStaffUser) {
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
              client: "client_1", production: "production_1", client_id: 0, production_id: [], productionOptions: [...productions]
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

  const loadClientOptions: any = async (inputValue, callback) => {
    try {
      const res = await clientService.getClients({ search: inputValue.toString(), pageLimit: 25, offset: 0 });
      const options = res?.data.map((item) => ({
        value: item.ID,
        label: item.Name,
        country: item.Country
      }));

      callback(options);
    } catch (error) {
      console.error('Error loading options:', error);
    }
  };

  // const clientOptions = Array.isArray(clientData)
  //   ? clientData.map((client) => ({
  //     value: client.ID,
  //     label: client.Name,
  //   }))
  //   : [];

  //get roles
  const roleservice = new RoleService();
  const { data: rolesdata } = useSWR("LIST_ROLES", () =>
    roleservice.getRoles()
  );


  const roleOptions = Array.isArray(rolesdata?.result)
    ? rolesdata.result.map((role) => ({
      value: role.ID,
      label: role.RoleName,
    }))
    : [];

  //get projects


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

  const roleSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const usersService = new UsersService();
  // {
  //   "lastname": "test",
  //     "firstname": "user",
  //       "middlename": "rssl",
  //         "email": "rssl@gmail.com"
  // }

  const onSubmit = (data) => {
    const userPayload = {
      "first_name": data.firstname,
      "last_name": data.lastname,
      "middle_name": data.middlename,
      "email": data.email,
      "client_id": userDetails.Client.ID,
      "roleID": selectedRole?.value,
      "tenant_id": userDetails.tenant_id,
      "IsStaffUser": isCheckedStaffUser,
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
      .postUsers(userPayload)
      .then(() => {
        toast.success("User Added successfully");
        router.push("/settings/usermanagement");
        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      }) as Promise<any>;
  };

  return (
    <div className=" text-black mt-4 p-3">
      <div
        className="text-black font-size-16 fw-600"

      >
        User Management
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black font-size-32 fw-600"

        >
          Add New User
        </div>
        <div className="d-flex gap-1">
          <a
            href="#"
            onClick={() => router.back()}
            className="text-decoration-none text-secondary m-2"
          >
            Dismiss
          </a>
          <Button
            onClick={handleSubmit(onSubmit)}
            color="primary"
            className="px-4"
          >
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <Form className=" mt-2" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="d-flex gap-4"> */}
        <Row>
          <Col xl="4">
            <div className="mb-1">
              <Label>Last Name *</Label>
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
              <Label>First Name *</Label>
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
              <Label>Middle Initial Name *</Label>
              <Controller
                name="middlename"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      className="p-2"
                      placeholder="Enter Middle Name"
                      invalid={errors.middlename && true}
                      {...field}
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
              <Label>Email *</Label>
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
                  <Select
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
          {userDetails?.IsStaffUser && (
            <Col xl="4">
              <div className="my-auto h-100 py-auto d-flex align-items-end py-1 gap-2">
                <input
                  type="checkbox"
                  name="customSwitch"
                  id="exampleCustomSwitch"
                  className="mb-1"
                  checked={isCheckedStaffUser}
                  onChange={(e) => {
                    setIsCheckedStaffUser(e.target.checked)
                  }}
                />

                <Label className="mb-0">Is Staff User</Label>
              </div>
            </Col>
          )}

        </Row>
        <Row className="mt-4 mb-2">
          <label> {"Assign Client(s) & Production(s)"}</label>
        </Row>
        {clientProductionsList.map((CPlist, index) => (
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
                        isClearable={true}
                        className="react-select"
                        classNamePrefix="select"
                        loadOptions={loadClientOptions}
                        placeholder="Select Client"
                        defaultOptions={initialClientOptions}
                        onChange={(client) => {
                          const updatedCLientOptions = initialClientOptions.filter((ele) => ele.value !== client.value)
                          setInitialClientOptions([...updatedCLientOptions])
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
            ) : (
              <Col xl="4">
                <div className="mt-1">
                  <Label>Select Client</Label>
                  <Controller disabled
                    name="Client"
                    control={control}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        isClearable={true}
                        className="react-select"
                        classNamePrefix="select"
                        placeholder="Select Client"
                        defaultOptions={initialClientOptions}
                        defaultValue={initialClientOptions[0]}
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
            )}
            <Col xl="4">
              <div className="mt-1">
                <Label>Select Productions</Label>
                {selectedClient ? (
                  <>
                    <Controller
                      name="productions"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          closeMenuOnSelect={false}
                          isMulti
                          options={CPlist.productionOptions}
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
            {isCheckedStaffUser && (
              <Col xl="3">
                {index === clientProductionsList.length - 1 && (
                  <div className="d-flex align-items-end h-100 justify-content-center cursor-pointer">
                    <p className="my-2" ></p>
                    <p className="mb-2" onClick={() => {
                      const id = clientProductionsList.length + 1
                      const tempObj = { client: `client_${id}`, production: `production_${id}`, client_id: 0, production_id: [], productionOptions: [] }
                      setClientProductionsList([...clientProductionsList, tempObj]);

                    }}> <img src="/add-client-icon.svg" alt="" width={15} /> Add Cient</p>
                  </div>
                )}

              </Col>
            )
            }
          </Row>
        ))}
      </Form>
    </div>
  );
}

export default AddUser;
