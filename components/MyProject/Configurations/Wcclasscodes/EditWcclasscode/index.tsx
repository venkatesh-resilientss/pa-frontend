import { Button, Col, Row, Form, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { StatesService, WcclasscodeService, WcclassService } from "services";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { selectStyles } from "constants/common";

function EditWcclasscode() {
  const router = useRouter();
  const { id } = router.query;
  const wcclasscodeService = new WcclasscodeService();
  const wcclassService = new WcclassService();
  const statesService = new StatesService();
  const [wcclassOptions, setwcclassOptions] = useState([]);
  const [stateOptions, setstateOptions] = useState([]);

  const fetchwcclasscodeDetails = (id) => wcclasscodeService.wcclassCodeDetails(id);

  const { data: wcClassCode } = useSWR(
    id ? ["WCCLASSCODE_DETAILS", id] : null,
    () => fetchwcclasscodeDetails(id)
  );

  const { mutate: wcclassMutate } = useSWR("LIST_WCCLASSCODES", () =>
  wcclasscodeService.getWcclasscodes({ search: "", pageLimit: 25, offset: 0 })
  );

  useEffect(() => {
    const fetchInitialEmpt = async () => {
      try {
        const res = await statesService.getStates({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: item.Code,
        }));
        setstateOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };
    fetchInitialEmpt();
  }, []);

  const loadstatesOptions: any = async (inputValue, callback) => {
    try {
      const res = await statesService.getStates({
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
          label: item.Code
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
        label: item.Code
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  }


  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  const [activeStatus, setActiveStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!wcClassCode) return;

    wcClassCode?.State && setValue("stateID", {value: wcClassCode?.State.ID, label: wcClassCode?.State.Code});
    wcClassCode?.WcClass && setValue("wcClassID", {value: wcClassCode?.WcClass.ID, label: wcClassCode?.WcClass.Code});
    wcClassCode?.WcCode && setValue("wcCode", wcClassCode?.WcCode);

    wcClassCode?.Rate && setValue("rate", wcClassCode?.Rate);
    wcClassCode?.HourlyRate && setValue("hourlyRate", wcClassCode?.HourlyRate);
    wcClassCode?.SubjectWages && setValue("subjectWages", wcClassCode?.SubjectWages);
    
    setActiveStatus(wcClassCode?.IsActive);
  }, [wcClassCode]);

  const onSubmit = (data) => {
    if (isSaving) return
    data.IsActive = activeStatus
    data.hourlyRate = parseInt(data.hourlyRate)
    data.rate = parseInt(data.rate)
    data.subjectWages = parseInt(data.subjectWages)
    data.stateID = data.stateID.value
    data.wcClassID = data.wcClassID.value

    setIsSaving(true)
    wcclasscodeService
      .editWcclassCode(id, data)
      .then(() => {
        setIsSaving(false)
        toast.success("Wc Code Edited successfully");
        mutate(wcclassMutate());
        router.push("/configurations/wcclasscodes");
        reset();
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error);
      });
  };

  return (
    <>
      <div className="section mt-4">
        <div className="overflow-auto add-agents">
          <div
            className="text-black add-agents-header"
          >
            Wc Code
          </div>

          <div className="d-flex justify-content-between">
            <div
              className="text-black add-agents-subheader"
            >
              Edit Wc Code
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
          <hr style={{ height: "2px" }} />
          <Form
            className=" mt-2 d-flex flex-column add-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row>
            <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">WK State<span className="text-danger">*</span></Label>
                  <Controller
                    name="stateID"
                    rules={{ required: "WK State is required" }}
                    control={control}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        isClearable={true}
                        className="react-select"
                        classNamePrefix="select"
                        loadOptions={loadstatesOptions}
                        placeholder="Select Wk state"
                        defaultOptions={stateOptions}
                        styles={selectStyles}
                      />
                    )}
                  />
                  {errors.stateID && (
                    <span className="text-danger">
                      {errors.stateID.message as React.ReactNode}
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
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">State Wc Code<span className="text-danger">*</span></Label>
                  <Controller
                    name="wcCode"
                    rules={{ required: "State Wc Code is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="State Wc Code"
                        invalid={errors.wcCode && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.wcCode && (
                    <span className="text-danger">
                      {errors.wcCode.message as React.ReactNode}
                    </span>
                  )}
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">%Rate</Label>
                  <Controller
                    name="rate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        type="number"
                        pattern='[0-9]{0,5}'
                        placeholder="%Rate"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Hourly Rate</Label>
                  <Controller
                    name="hourlyRate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        type="number"
                        pattern='[0-9]{0,5}'
                        placeholder="Hourly Rate"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">Subject Wages</Label>
                  <Controller
                    name="subjectWages"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        type="number"
                        pattern='[0-9]{0,5}'
                        placeholder="Subject Wages"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-flex flex-column mt-1">
                  <Label className="form-lable-font">Status </Label>
                  <div className="d-flex gap-1">
                    <div className="d-flex gap-1">
                      <input
                        className="custom-radio-input"
                        type="radio"
                        id="ex1-active"
                        name="ex1"
                        checked={activeStatus}
                        onChange={() => {
                          setActiveStatus(true);
                        }}
                      />
                      <div className="radio-text">Active</div>
                    </div>
                    <div className="d-flex gap-1">
                      <input
                        type="radio"
                        className="custom-radio-input"
                        name="ex1"
                        id="ex1-inactive"
                        checked={!activeStatus}
                        onChange={() => {
                          setActiveStatus(false);
                        }}
                      />
                      <div className="radio-text">In-Active</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditWcclasscode;
