import { Button, Col, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { UsersService } from "services";
import Select from 'react-select';
import { ClientsService,RoleService,ProjectService } from "services";


import useSWR from "swr";


function AddUser() {

  //get cleints
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
  
    //get roles
    const roleservice = new RoleService();
    const { data: rolesdata } = useSWR("LIST_ROLES", () =>
      roleservice.getRoles()
      );

    const roleOptions = Array.isArray(rolesdata)
      ? rolesdata.map((role) => ({
          value: role.ID,
          label: role.RollName,
        }))
      : [];

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
    
  const router=useRouter()
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProduction, setSelectedProduction] = useState(null);

 

  const roleSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
    }),
  };


  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [activeStatus, setActiveStatus] = useState(false);
  
 const onSubmit = (data) => {
  let backendFormat;

  backendFormat = {
    last_name: data.lastname,
    first_name: data.firstname,
    middle_name: data.middlename,
    email: data.email,
    client_id: selectedClient?.value,
    roleID: selectedRole?.value,
    is_active: activeStatus
  };

  UsersService.create(backendFormat)
      .then((res) => {
        toast.success("User Added successfully");
        router.push('/settings/usermanagement');
        reset();
      })
    .catch((error) => {
      toast.error(error?.error);
    });
};

  return (
    <div
      
      className=" text-black mt-4 p-3"
    >
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
          Add New User
        </div>
        <div className="d-flex gap-1">
         <a href="#" onClick={() => router.back()} className='text-decoration-none text-secondary m-2'>Dismiss</a>
          <Button onClick={handleSubmit(onSubmit)}  color="primary" className="px-4">
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <Form className=" mt-2" onSubmit={handleSubmit(onSubmit)}>
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
                    />
                    {errors.lastname && <div className="text-danger">{String(errors.lastname.message)}</div>}
                  </>
                )}
                rules={{ required: 'Last Name is required' }}
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
                    />
                    {errors.firstname && <div className="text-danger">{String(errors.firstname.message)}</div>}
                  </>
                )}
                rules={{ required: 'First Name is required' }}
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
                />
                {errors.middlename && (
                  <div className="text-danger">{String(errors.middlename.message)}</div>
                )}
              </>
            )}
            rules={{ required: 'Middle Name is required' }}
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
          />
          {errors.email && (
            <div className="text-danger">{String(errors.email.message)}</div>
          )}
        </>
      )}
      rules={{ 
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address'
        }
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
                  onChange={(selectedOption) => setSelectedRole(selectedOption)}
                  styles={roleSelectStyles}
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
                  onChange={(selectedOption) => setSelectedClient(selectedOption)}
                  // Add styles as needed
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
                  onChange={(selectedOption) => setSelectedProduction(selectedOption)}
                  
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
            Status{" "}
          </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input
                type="radio"
                id="ex1-active"
                name="ex1"
                onChange={() => {
                  setActiveStatus(true);
                }}
              />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input
                type="radio"
                name="ex1"
                id="ex1-inactive"
                onChange={() => {
                  setActiveStatus(false);
                }}
              />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>

      
    </div>
  );
}

export default AddUser;
