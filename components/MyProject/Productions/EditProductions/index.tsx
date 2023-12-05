import { Button, Col, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { ProjectService, UsersService } from "services";
import { toast } from "react-toastify";
import useSWR from "swr";

function EditProductions() {
  const router = useRouter();

  const { id } = router.query;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const clientService = new UsersService();

  const { data: clientData } = useSWR("LIST_CLIENTS", () =>
    clientService.getUsers()
  );

  const userSelectFormat = clientData?.data.map((b) => {
    return {
      value: b.id,
      label: b.adminname,
    };
  });

  const loadUserOptions = (values, callBack) => {
    callBack(userSelectFormat);
  };

  const projectService = new ProjectService();

  const { data: projectData } = useSWR(["PROJECT_DETAILS", id], () =>
    projectService.projectDetails(id)
  );

  useEffect(() => {
    if (!projectData) return;

    projectData?.Name && setValue("productionName", projectData?.Name);
    projectData?.Code && setValue("productionCode", projectData?.Code);
  }, [projectData]);

  const [purchaseOrderValue, setPurchaseOrderValue] = useState(false);
  const [accountPayableValue, setAccountPayableValue] = useState(false);

  const [selectedPurchaseOrderValues, setSelectedPurchaseOrderValues] =
    useState(["", ""]);

  const [selectedAPValues, setSelectedAPValues] = useState(["", ""]);

  const handleCheckboxChange = () => {
    setPurchaseOrderValue(!purchaseOrderValue);
  };

  const handleCheckboxAccountPayableChange = () => {
    setAccountPayableValue(!accountPayableValue);
  };

  const handleAddPurchaseOrderField = () => {
    setSelectedPurchaseOrderValues([...selectedPurchaseOrderValues, ""]);
  };

  const projectsService = new ProjectService();

  const onSubmit = (data) => {
    const backendFormat = {
      code: data.productionCode,
      Name: data.productionName,
    };

    projectsService
      .editProject(id, backendFormat)
      .then(() => {
        router.back();
        toast.success("Productions Updated successfully");
        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  const handleAddAccountPayableField = () => {
    setSelectedAPValues([...selectedAPValues, ""]);
  };

  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const [saveClicked, setSaveClicked] = useState(false);

  const handleSaveClick = () => {
    setSaveClicked(true);

    handleSubmit(onSubmit)();
  };

  return (
    <div className="my-3" style={{ fontSize: "14px", fontWeight: "400" }}>
      <div className="d-flex justify-content-between">
        <div>
          <div style={{ fontSize: "16px", fontWeight: "600" }}>
            All Productions
          </div>

          <div>
            <div
              style={{
                fontFamily: "Segoe UI",
                fontSize: "32px",
                fontWeight: 600,
                lineHeight: "50px",
                textAlign: "left",
              }}
            >
              Edit Production
            </div>
          </div>
        </div>
        <div className="d-flex my-auto " style={{ gap: "5px" }}>
          <Button
            onClick={() => router.back()}
            style={{
              height: "30px",
              color: "#2D2C2C",
              backgroundColor: "transparent",
              border: "none",
            }}
            size="sm"
            outline
          >
            Dismiss
          </Button>
          <Button
            onClick={editMode ? handleSaveClick : handleToggleEditMode}
            style={{
              height: "30px",
              color: "#ffffff",
              borderColor: "#00AEEF",
              backgroundColor: "#00AEEF",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            size="sm"
          >
            {editMode && !saveClicked ? "Save" : "Edit"}
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <div>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Basic Information
        </div>
        <Row style={{ fontSize: "14px", fontWeight: "400", marginTop: "10px" }}>
          <Col sm="4">
            <Label style={{ color: "#030229" }}>Production Code</Label>
            <Controller
              name="productionCode"
              rules={{ required: "Production Code is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter Production Code"
                  invalid={errors.productionCode && true}
                  disabled={!editMode}
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    height: "34px",
                  }}
                />
              )}
            />
            {errors.productionCode && (
              <span className="text-danger">
                {errors.productionCode.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col sm="4">
            <Label style={{ color: "#030229" }}>Production Name</Label>
            <Controller
              name="productionName"
              rules={{ required: "Production Name is required" }}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter Production Name"
                  invalid={errors.productionName && true}
                  disabled={!editMode}
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    height: "34px",
                  }}
                />
              )}
            />
            {errors.productionName && (
              <span className="text-danger">
                {errors.productionName.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
        {/* <div className="d-flex flex-column mt-1">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Status{" "}
          </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input type="radio" />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input type="radio" />
              <div>In-Active</div>
            </div>
          </div>
        </div> */}
      </div>

      <hr style={{ height: "2px" }} />

      <div>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Approval work flow for Transactions
        </div>
        <div className="">
          <div className="d-flex" style={{ gap: "5px" }}>
            <input
              type="checkbox"
              checked={purchaseOrderValue}
              onChange={handleCheckboxChange}
            />
            <div style={{ fontSize: "16px" }}>Purchase Order</div>
          </div>

          {purchaseOrderValue && (
            <div>
              <Row
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {selectedPurchaseOrderValues.map((value, index) => (
                  <Col xl="3" key={index}>
                    <Label>Level {index + 1} Approver</Label>
                    <AsyncSelect
                      isDisabled={!editMode}
                      isClearable={true}
                      className="react-select"
                      classNamePrefix="select"
                      // loadOptions={loadSeriesOptions}
                      placeholder="Select User"
                      // defaultOptions={seriesSelectFormat}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          height: "34px",
                          minHeight: "34px",
                        }),
                      }}
                    />
                  </Col>
                ))}
                <Col className="my-auto">
                  {" "}
                  <Button
                    style={{
                      height: "34px",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                    color="white"
                    onClick={handleAddPurchaseOrderField}
                  >
                    + Approver
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          <div className="d-flex" style={{ gap: "5px" }}>
            <input
              type="checkbox"
              checked={accountPayableValue}
              onChange={handleCheckboxAccountPayableChange}
            />
            <div style={{ fontSize: "16px" }}>Account Payable</div>
          </div>
        </div>

        {accountPayableValue && (
          <Row>
            {selectedAPValues.map((value, index) => (
              <Col xl="3" key={index}>
                <Label>Level {index + 1} Approver</Label>
                <AsyncSelect
                  isClearable={true}
                  isDisabled={!editMode}
                  className="react-select"
                  classNamePrefix="select"
                  // loadOptions={loadSeriesOptions}
                  placeholder="Select User"
                  // defaultOptions={seriesSelectFormat}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      height: "34px",
                      minHeight: "34px",
                    }),
                  }}
                />
              </Col>
            ))}
            <Col className="my-auto">
              {" "}
              <Button
                style={{
                  height: "34px",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
                color="white"
                onClick={handleAddAccountPayableField}
              >
                + Approver
              </Button>
            </Col>
          </Row>
        )}
      </div>

      <hr style={{ height: "2px" }} />

      <div className="d-flex flex-column" style={{ gap: "10px" }}>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Production Accountant{" "}
        </div>

        <Col sm="4">
          <Label style={{ color: "#030229" }}>User</Label>
          <Controller
            name="user"
            rules={{ required: "User is required" }}
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                isDisabled={!editMode}
                isClearable={true}
                className="react-select"
                classNamePrefix="select"
                loadOptions={loadUserOptions}
                placeholder="Select User"
                defaultOptions={userSelectFormat}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    height: "34px",
                    minHeight: "34px",
                  }),
                }}
              />
            )}
          />
          {errors.user && (
            <span className="text-danger">
              {errors.user.message as React.ReactNode}
            </span>
          )}
        </Col>
      </div>
    </div>
  );
}

export default EditProductions;
