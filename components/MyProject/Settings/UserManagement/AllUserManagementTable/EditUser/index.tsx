import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { UsersService } from "services";
import Select from "react-select";
import { ClientsService, RoleService, ProjectService } from "services";
import useSWR from "swr";
import { checkTenant } from "constants/function";

function EditUser() {
  const router = useRouter();
  const { id } = router.query;


  const getUserdetails = (id) => usersService.getuserbyid(id);

  const {
    data: eachclicntdata,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(id ? ["USER_DETAILS", id] : null, () => getUserdetails(id));

  const [editMode, setEditMode] = useState(false); // Initial edit mode state

  const clientService = new ClientsService();
  const { data: clientData } = useSWR("LIST_CLIENTS", () =>
    clientService.getClients()
  );
  const clientOptions = Array.isArray(clientData)
    ? clientData.map((client) => ({
      value: client.ID,
      label: client.Name,
    }))
    : [];

  const roleservice = new RoleService();
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
  const [selectedProduction, setSelectedProduction] = useState(null);

  //get projects

  const projectservice = new ProjectService();
  const { data: projectsdata } = useSWR("LIST_PROJECTS", () =>
    projectservice.getProjects()
  );

  const projectOptions = Array.isArray(projectsdata)
    ? projectsdata.map((project) => ({
      value: project.ID,
      label: project.Name,
    }))
    : [];

  const roleSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
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

      setSelectedProduction({
        value: eachclicntdata?.production || "",
        label: eachclicntdata?.production || "",
      });

      // Update the initialization of activeStatus directly in the useState
      setActiveStatus(eachclicntdata?.IsActive ? "active" : "inactive");
    }
  }, [eachclicntdata, userLoading, reset]);


  const usersService = new UsersService();

  const onSubmit = (data) => {
    let backendFormat = {
      last_name: data.lastname,
      first_name: data.firstname,
      middle_name: data.middlename,
      email: data.email,
      client_id: selectedClient?.value,
      roleID: selectedRole?.value,
      IsActive: activeStatus === "active" ? true : false
    };

    usersService
      .editUser(id, backendFormat)
      .then((res) => {
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
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        User Management
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
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
          <div className="d-flex gap-4">
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
          </div>

          <div className="d-flex gap-4 mt-2">
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
          </div>

          <Col xl="4">
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
          </div>

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
