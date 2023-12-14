import { Button, Col, Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { OccupationcodeService, WcclasscodeService, EmployeetypesService } from "services";
import AsyncSelect from "react-select/async";
import { selectStyles } from "constants/common";
import useSWR, { mutate } from "swr";

export type Option = {
  value: number | string;
  label: string;
};
function EditOccupationCodes() {
  const router = useRouter();
  const { id } = router.query;

  const occupationcodeService = new OccupationcodeService();
  const wcclasscodeService = new WcclasscodeService();
  const employeetypesService = new EmployeetypesService();

  const [wcclasscodeOptions, setwcclasscodeOptions] = useState([]);
  const [employeetypesOptions, setemployeetypesOptions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [offProduction, setOffProduction] = useState(false);

  const fetchoccupationcodeDetails = (id) => occupationcodeService.occupationCodeDetails(id);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();
  const { data: occupationcodeData } = useSWR(
    id ? ["OCCUPATIONCODE_DETAILS", id] : null,
    () => fetchoccupationcodeDetails(id)
  );

  useEffect(() => {
    if (!occupationcodeData) return;
    console.log('occupationcodeData', occupationcodeData)
    occupationcodeData?.Name && setValue("name", occupationcodeData?.Name);
    occupationcodeData?.Code && setValue("code", occupationcodeData?.Code);
    occupationcodeData?.Description &&
      setValue("description", occupationcodeData?.Description);
    occupationcodeData?.EmployeeType && setValue("EmployeeTypeID", {value: occupationcodeData?.EmployeeType.ID, label: occupationcodeData?.EmployeeType.Code});
    occupationcodeData?.WcClass && setValue("WcClassID", {value: occupationcodeData?.WcClass.ID, label: occupationcodeData?.WcClass.Code});
    occupationcodeData?.offProduction && setValue("offProduction", occupationcodeData?.offProduction);
    setActiveStatus(occupationcodeData?.IsActive);
  }, [occupationcodeData]);

  const [activeStatus, setActiveStatus] = useState(occupationcodeData?.IsActive);

  const { mutate: occupationcodeMutate } = useSWR("LIST_OCCUPATIONCODES", () =>
  occupationcodeService.getOccupationcodes({ search: "", pageLimit: 25, offset: 0 })
  );

  const onSubmit = async (data) => {
    data.offProduction = offProduction
    data.employeeTypeID = data.employeeTypeID.value
    data.wcClassID = data.wcClassID.value
    data.IsActive = activeStatus
    if(isSaving) return
    setIsSaving(true)
    try {
      occupationcodeService
      .editOccupationCode(id, data)
      .then(() => {
        setIsSaving(false)
        toast.success("Occupation Codes edited successfully");
        mutate(occupationcodeMutate());
        router.push("/configurations/OccupationCodes");
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error);
      });
    } catch (error) {
      toast.error("Error adding Occupation Codes");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchInitialEmpt = async () => {
      try {
        const res = await employeetypesService.getEmployeetypes({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: item.Code,
        }));
        setemployeetypesOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };
    fetchInitialEmpt();
  }, []);

  const loademployeeTypeOptions: any = async (inputValue, callback) => {
    try {
      const res = await employeetypesService.getEmployeetypes({
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      });
      const options = res?.data.map((item) => ({
        value: item.ID,
        label: item.Code,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  }

  useEffect(() => {
    const fetchInitialwc = async () => {
      try {
        const res = await wcclasscodeService.getWcclasscodes({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: item.WcCode,
        }));
        setwcclasscodeOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };
    fetchInitialwc();
  }, []);

  const loadwcOptions: any = async (inputValue, callback) => {
    try {
      const res = await wcclasscodeService.getWcclasscodes({
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      });
      const options = res?.data.map((item) => ({
        value: item.ID,
        label: item.WcCode,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  }
  return (
    <>
      <div className="overflow-auto mt-4 occupation-codes" >
        <div
          className="text-black occupation-header"
        >
          Occupation Code
        </div>

        <div className="d-flex justify-content-between">
          <div
            className="text-black occupation-subheader"
          >
            Edit Occupation Code
          </div>
          <div className="d-flex me-2 " style={{ gap: "10px" }}>
              <Button
                onClick={() => router.back()}
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  height: "34px",
                  backgroundColor: "transparent",
                  color: "#2D2C2C",
                  border: "none",
                }}
              >
                Dismiss
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                color="primary"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  height: "34px",
                }}
              >
                Save
              </Button>
            </div>

        </div>

        <hr className="occupation-hr" />

        <Form
          className=" mt-2 d-flex flex-column occupation-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row>
            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">OCC Code<span className="text-danger">*</span></Label>
                <Controller
                  name="code"
                  rules={{ required: "OCC Code is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="inputFeild"
                      placeholder="OCC Code"
                      invalid={errors.code && true}
                      {...field}
                    />
                  )}
                />
                {errors.code && (
                  <span className="text-danger">
                    {errors.code.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
              <div className="mb-1">
                <Label className="form-lable-font">Description<span className="text-danger">*</span></Label>
                <Controller
                  name="description"
                  rules={{ required: "Description is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="inputFeild"
                      placeholder="Description"
                      invalid={errors.description && true}
                      {...field}
                    />
                  )}
                />
                {errors.description && (
                  <span className="text-danger">
                    {errors.description.message as React.ReactNode}
                  </span>
                )}
              </div>
            </Col>

            <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">WC Class<span className="text-danger">*</span></Label>
                  <Controller
                    name="wcClassID"
                    rules={{ required: "WC Class is required" }}
                    control={control}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        isClearable={true}
                        className="react-select"
                        classNamePrefix="select"
                        loadOptions={loadwcOptions}
                        placeholder="Select Wc Class Code"
                        defaultOptions={wcclasscodeOptions}
                        styles={selectStyles}
                      />
                    )}
                  />
                  {errors.wcClassID && (
                    <span className="text-danger">
                      {errors.wcClassID.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
          </Row>
          <Row>
          <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Employee Type<span className="text-danger">*</span></Label>
                  <Controller
                    name="employeeTypeID"
                    rules={{ required: "Employee Type is required" }}
                    control={control}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        isClearable={true}
                        className="react-select"
                        classNamePrefix="select"
                        loadOptions={loademployeeTypeOptions}
                        placeholder="Select Wc Class Code"
                        defaultOptions={employeetypesOptions}
                        styles={selectStyles}
                      />
                    )}
                  />
                  {errors.employeeTypeID && (
                    <span className="text-danger">
                      {errors.employeeTypeID.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>
            <Col><div className="d-flex flex-column mt-1">
              <Label className="form-lable-font">Status </Label>
              <div className="d-flex gap-1">
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  id="ex1-active"
                  name="ex1"
                  checked={activeStatus}
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
                  checked={!activeStatus}
                  onChange={() => {
                    setActiveStatus(false);
                  }}
                />
                <div>In-Active</div>
              </div>
            </div>
            </div>
            </Col>
            <Col xl="4">
              <div className="mb-1">
              <Input
                checked={offProduction}
                onChange={(e) => setOffProduction(e.target.checked)}
                type="checkbox"
                className="p-2 occupation-checkboox"
                placeholder="OFF Production"
              />
                <Label className="form-lable-font occupation-checkbox-text">OFF Production</Label>
              </div>
            </Col>

          </Row>
        </Form>
      </div>
    </>
  );
}

export default EditOccupationCodes;
