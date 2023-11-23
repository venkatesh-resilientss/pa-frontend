import Image from "next/image";
import { Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { CountryService, UsersService } from "services";
import { useEffect, useState } from "react";
import { checkTenant } from "constants/function";
import useSWR from "swr";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useSelector, useDispatch } from "react-redux";
import {
  UserInfo,
} from "redux/slices/mySlices/roles";

export default function Profile() {
   const roleInfo = useSelector(UserInfo);

  const {
    control,
    setError,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const userService = new UsersService();

  const { data: usersData } = useSWR(["LIST_USERS",roleInfo ], () =>
    userService.getuserbyid(roleInfo.id)
  );

  console.log("USERSDATA", usersData);

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

  const [value, setValue] = useState();

  return (
    <Card className="mt-4">
      <CardBody className="d-flex flex-column" style={{ gap: "10px" }}>
        <div style={{ fontSize: "19px", fontWeight: "600" }}>Profile</div>
        <div>
          <img
            alt="profile-img"
            src={usersData?.profile_image}
            style={{ width: "60px", height: "60px" }}
            className="rounded-circle"
          />
        </div>
        <Form
          className="d-flex flex-column"
          style={{ fontSize: "12px", fontWeight: "400", gap: "8px" }}
        >
          <Row>
            <Col xl="4">
              <div className="mb-1 mt-1">
                <Label className="">First Name</Label>
                <Controller
                  name="firstName"
                  //   rules={{ required: "Department Name is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="First Name"
                      defaultValue={usersData?.first_name}
                      invalid={errors.firstName && true}
                      disabled
                      {...field}
                    />
                  )}
                />
                {/* {errors.departmentname && (
                  <span style={{ color: "red" }}>
                    {errors.departmentname.message as React.ReactNode}
                  </span>
                )} */}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1 mt-1">
                <Label className="">Last Name</Label>
                <Controller
                  name="lastName"
                  //   rules={{ required: "Department Name is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Last Name"
                      defaultValue={usersData?.last_name}
                      invalid={errors.lastName && true}
                      {...field}
                    />
                  )}
                />
                {/* {errors.departmentname && (
                  <span style={{ color: "red" }}>
                    {errors.departmentname.message as React.ReactNode}
                  </span>
                )} */}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1 mt-1">
                <Label className="">Contact Number</Label>
                <Controller
                  name="contactNumber"
                  //   rules={{ required: "Department Name is required" }}
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      placeholder="Enter phone number"
                      defaultValue={usersData?.phone}

                      //   value={value}
                      //   onChange={setValue}
                    />
                  )}
                />
                {/* {errors.departmentname && (
                  <span style={{ color: "red" }}>
                    {errors.departmentname.message as React.ReactNode}
                  </span>
                )} */}
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl="4">
              <div className="mb-1 mt-1">
                <Label className="">Email</Label>
                <Controller
                  name="email"
                  //   rules={{ required: "Department Name is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Email"
                      defaultValue={usersData?.email}
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {/* {errors.departmentname && (
                  <span style={{ color: "red" }}>
                    {errors.departmentname.message as React.ReactNode}
                  </span>
                )} */}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1 mt-1">
                <Label className="">Address</Label>
                <Controller
                  name="address"
                  //   rules={{ required: "Department Name is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Address"
                      invalid={errors.address && true}
                      {...field}
                    />
                  )}
                />
                {/* {errors.departmentname && (
                  <span style={{ color: "red" }}>
                    {errors.departmentname.message as React.ReactNode}
                  </span>
                )} */}
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
                    // loadOptions={loadSeriesOptions}
                    // defaultOptions={seriesSelectFormat}
                  />
                )}
              />
              {/* {errors.series && (
                <span
                  style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
                >
                  {" "}
                  {errors.series.message as React.ReactNode}
                </span>
              )} */}
            </Col>
          </Row>

          <Row>
            <Col xl="4">
              <div className="mb-1 mt-1">
                <Label className="">Zip Code</Label>
                <Controller
                  name="zipCode"
                  //   rules={{ required: "Department Name is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      style={{ fontSize: "12px", fontWeight: "400" }}
                      placeholder="Zip Code"
                      invalid={errors.zipCode && true}
                      {...field}
                    />
                  )}
                />
                {/* {errors.departmentname && (
                  <span style={{ color: "red" }}>
                    {errors.departmentname.message as React.ReactNode}
                  </span>
                )} */}
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
                    defaultOptions={countrySelectFormat}
                  />
                )}
              />
              {/* {errors.series && (
                <span
                  style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
                >
                  {" "}
                  {errors.series.message as React.ReactNode}
                </span>
              )} */}
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
