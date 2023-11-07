import { Button, Col, Input, Label, Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { UsersService } from "@src/services";

function index() {
  const history = useHistory();

  const [restricted, setRestricted] = useState(false);

  const {
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [activeStatus, setActiveStatus] = useState();

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      first_name: data.firstname,
      email: data.email,
      last_name: data.lastname,
      middle_name: data.middlename,
      is_active: activeStatus,
    };

    UsersService.create(backendFormat)
      .then((res) => {
        toast.success("User Added successfully");
        resetForm();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  return (
    <div
      style={{ fontFamily: "Segoe UI" }}
      className="overflow-auto text-black "
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
          <Button onClick={() => history.goBack()} color="white" size="sm">
            Dismiss
          </Button>
          <Button onClick={handleSubmit(onSubmit)} size="sm" color="info">
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <Form className=" mt-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex gap-2">
          <Col xl="4">
            <div className="mb-1">
              <Label> Last Name</Label>
              <Controller
                id="lastname"
                name="lastname"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Last Name"
                    invalid={errors.lastname && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label>First Name</Label>
              <Controller
                id="firstname"
                name="firstname"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="First Name"
                    invalid={errors.firstname && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </div>

        <div className="d-flex gap-2">
          <Col xl="4">
            <div className="mb-1">
              <Label> Middle Initial Name</Label>
              <Controller
                id="middlename"
                name="middlename"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Middle Name"
                    invalid={errors.middlename && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>

          <Col xl="4">
            <div className="mb-1">
              <Label> Email</Label>
              <Controller
                id="email"
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Email"
                    invalid={errors.email && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
        </div>

        <div className="d-flex flex-column mt-1">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
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

      {/* <div className="d-flex flex-column mt-1">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Access
        </Label>
        <div className="d-flex gap-1">
          <div className="d-flex gap-1">
            <input
              type="radio"
              id="ex1-active"
              name="ex1"
              onChange={() => {
                setRestricted(false);
              }}
            />
            <div>Full Access</div>
          </div>
          <div className="d-flex gap-1">
            <input
              type="radio"
              name="ex1"
              id="ex1-inactive"
              onChange={() => setRestricted(true)}
            />
            <div>Restricted (Assign Modules)</div>
          </div>
        </div>
      </div> */}

      {/* {restricted && (
        <div className="col-12 my-2 d-flex flex-column gap-1">
          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                Client management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              User can manage Client and all their information
            </div>
          </div>
          <div className="d-flex gap-1">
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Client
              </Label>
              <ReactSelect placeholder="Select Client" />
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Project
              </Label>
              <ReactSelect placeholder="Select Project" />
            </Col>
          </div>

          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                Configuration Management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur ma
            </div>
          </div>

          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                User Management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed qu
            </div>
          </div>

          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                Production Management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut al
            </div>
          </div>

          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                Transaction Management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatu
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default index;
