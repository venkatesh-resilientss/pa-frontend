import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { OccupationcodeService, WcclassService, EmployeetypesService } from "services";
import AsyncSelect from "react-select/async";
import { selectStyles } from "constants/common";

export type Option = {
  value: number | string;
  label: string;
};
function AddOccupationCodes() {

  const router = useRouter();

  const occupationcodeService = new OccupationcodeService();
  
  const wcclassService = new WcclassService();
  const employeetypesService = new EmployeetypesService();

  const [wcclassOptions, setwcclassOptions] = useState([]);
  const [employeetypesOptions, setemployeetypesOptions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if(isSaving) return
    setIsSaving(true)
    data.employeeTypeID = data.employeeTypeID.value
    data.wcClassID = data.wcClassID.value
    try {
      occupationcodeService
      .createOccupationCode(data)
      .then(() => {
        setIsSaving(false)
        toast.success("Occupation Codes added successfully");
        router.push("/configurations/OccupationCodes");
        reset();
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
        const res = await wcclassService.getWcclass({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: item.Code,
        }));
        setwcclassOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };
    fetchInitialwc();
  }, []);

  const loadwcOptions: any = async (inputValue, callback) => {
    try {
      const res = await wcclassService.getWcclass({
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
  return (
    <>
      <div className="section mt-4 occupation-codes">
        <div className="overflow-auto">
          <div
            className="text-black occupation-header"
          >
            Occupation Code
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black occupation-subheader"
            >
              Add Occupation Code
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
                    name="Code"
                    rules={{ required: "OCC Code is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="OCC Code"
                        invalid={errors.Code && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.Code && (
                    <span className="text-danger">
                      {errors.Code.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Description<span className="text-danger">*</span></Label>
                  <Controller
                    name="Description"
                    rules={{ required: "Description is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Description"
                        invalid={errors.Description && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.Description && (
                    <span className="text-danger">
                      {errors.Description.message as React.ReactNode}
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
                        placeholder="Select Wc Class"
                        defaultOptions={wcclassOptions}
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
                        placeholder="Select Wc Class"
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
              <Col xl="4">
                <div className="mb-1">
                  <Controller
                    name="offProduction"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        className="p-2 occupation-checkboox"
                        placeholder="OFF Production"
                        {...field}
                      />
                    )}
                  />
                  <Label className="form-lable-font occupation-checkbox-text">OFF Production</Label>
                </div>
              </Col>

            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddOccupationCodes;
