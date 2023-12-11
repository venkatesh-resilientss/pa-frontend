import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { CountryService, UsersService } from "services";
import { useEffect, useState } from "react";
import useSWR from "swr";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import { UserInfo } from "redux/slices/mySlices/roles";
import PhoneInput from "react-phone-input-2";


export default function Profile() {
  const roleInfo = useSelector(UserInfo);


  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
    
    // If transitioning from edit to save, submit the form
    if (editMode) {
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async () => {

    
    // After successfully saving, switch back to edit mode
    setEditMode(false);
  };

  const userService = new UsersService();

  const { data: usersData } = useSWR(["LIST_USERS", roleInfo], () =>
    userService.getuserbyid(roleInfo.responseData.ID)
  );

  const countryService = new CountryService();

  const { data: countryData } = useSWR("LIST_COUNTRIES", () =>
    countryService.getCountries()
  );

  const countrySelectFormat = countryData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadCountryOptions = (values, callBack) => {
    callBack(countrySelectFormat);
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (!usersData) return;
    usersData?.first_name && setValue("firstName", usersData.first_name);
    usersData?.last_name && setValue("lastName", usersData.last_name);
    usersData?.phone && setValue("contactNumber", usersData?.phone);
    usersData?.email && setValue("email", usersData?.email);
    usersData?.Address && setValue("address", usersData?.Address.Line1);
    usersData?.phone && setPhoneNumber(usersData?.phone);
    usersData?.Address.Zipcode &&
      setValue("zipCode", usersData?.Address.Zipcode);
    }),
    [usersData];



  return (

  <>

  <Card
        style={{
          backgroundColor: "#E7EFFF",
          boxShadow: "0px 2.53521px 10.14085px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
         <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div
                  className="m-2"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  My Profile
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <Button
                  onClick={toggleEditMode}
                  style={{
                    height: "38px",
                    backgroundColor: "#00AEEF",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "none",
                  }}
                >
                  {editMode ? "Save" : "Edit"}
                </Button>
              </div>
            </div>
          </CardBody>
      </Card>
    <Card className="mt-4">
      <CardBody className="d-flex flex-column" style={{ gap: "10px" }}>
        <div style={{ fontSize: "19px", fontWeight: "600",fontFamily: "Segoe UI Semibold" }}>Profile</div>
        <div>
          <img
            alt="profile-img"
            src="/default.svg"
            style={{ width: "60px", height: "60px" }}
            className="rounded-circle"
          />
        </div>
        <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column"
            style={{ fontSize: "12px", fontWeight: "400", gap: "8px" }}
          > 
          <Row>
           <Col xl="4">
                <div className="mb-1 mt-1">
                  <Label>First Name</Label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                        placeholder="First Name"
                        invalid={errors.firstName && true}
                        {...field}
                        disabled={!editMode} // Disable/enable based on edit mode
                      />
                    )}
                  />
                </div>
              </Col>
            

           <Col xl="4">
                <div className="mb-1 mt-1">
                  <Label className="">Last Name</Label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                        placeholder="Last Name"
                        defaultValue={usersData?.last_name}
                        invalid={errors.lastName && true}
                        {...field}
                        disabled={!editMode} // Disable/enable based on edit mode
                      />
                    )}
                  />
                </div>
              </Col>
          <Col xl="4">
                <Label className="text-black">Contact Number</Label>
                <PhoneInput
                  inputClass="react-tel-input w-100"
                  country={"us"}
                  placeholder="Enter Mobile Number"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                  disabled={!editMode} // Disable/enable based on edit mode
                />
              </Col>
          </Row>

          <Row>
           <Col xl="4">
                <div className="mb-1 mt-1">
                  <Label>Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="email"
                        className="p-2"
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                        placeholder="Email"
                        defaultValue={usersData?.email}
                        invalid={errors.email && true}
                        {...field}
                        disabled={!editMode} // Disable/enable based on edit mode
                      />
                    )}
                  />
                </div>
              </Col>

             <Col xl="4">
                <div className="mb-1 mt-1">
                  <Label>Address</Label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                        placeholder="Address"
                        invalid={errors.address && true}
                        {...field}
                        disabled={!editMode} // Disable/enable based on edit mode
                      />
                    )}
                  />
                </div>
              </Col>

             <Col xl="4">
                <Label className="">City</Label>
                <Controller
                  name={"city"}
                  control={control}
                  render={({ field }) => (
                    <AsyncSelect
                      {...field}
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      placeholder="Select City"
                      isDisabled={!editMode} // Disable/enable based on edit mode
                    />
                  )}
                />
              </Col>
          </Row>

          <Row>
             <Col xl="4">
                <div className="mb-1 mt-1">
                  <Label>Zip Code</Label>
                  <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="p-2"
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                        placeholder="Zip Code"
                        invalid={errors.zipCode && true}
                        {...field}
                        disabled={!editMode} // Disable/enable based on edit mode
                      />
                    )}
                  />
                </div>
              </Col>

            <Col xl="4">
                <Label className="">Country</Label>
                <Controller
                  name={"country"}
                  control={control}
                  render={({ field }) => (
                    <AsyncSelect
                      {...field}
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      placeholder="Select Country"
                      loadOptions={loadCountryOptions}
                      defaultOptions={
                        countrySelectFormat && countrySelectFormat.length
                          ? countrySelectFormat
                          : [{ value: 0, label: "No country selected" }]
                      }
                      isDisabled={!editMode} // Disable/enable based on edit mode
                    />
                  )}
                />
              </Col>
            
          </Row>
        </Form>

        <div style={{ fontSize: "12px", fontWeight: "400" }}>
          <Label>Productions</Label>
          <div className="d-flex" style={{ gap: "8px" }}>
            <CustomBadge title={"Production 1"} />
            <CustomBadge title={"Production 2"} />
            <CustomBadge title={"Production 3"} />
          </div>
        </div>
      </CardBody>
    </Card>
    
    </>
    
    
  );
}

const CustomBadge = ({ title }) => {
  return (
    <div
      className="text-center"
      style={{
        width: "79px",
        height: "20px",
        border: "0.39px solid",
        borderColor: "#4591B3",
        borderRadius: "2px",
      }}
    >
      {title}
    </div>
  );
};
