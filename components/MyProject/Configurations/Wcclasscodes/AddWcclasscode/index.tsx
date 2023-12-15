import { Button, Col, Row, Input, Label, Form } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { StatesService, WcclasscodeService, WcclassService } from "services";
import AsyncSelect from "react-select/async";
import { selectStyles } from "constants/common";
function AddWcclasscode() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const wcclasscodeService = new WcclasscodeService();
  const wcclassService = new WcclassService();
  const statesService = new StatesService();

  const [wcclassOptions, setwcclassOptions] = useState([]);
  const [stateOptions, setstateOptions] = useState([]);

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
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if(isSaving) return
    setIsSaving(true)
    data.stateID = data.stateID.value
    data.wcClassID = data.wcClassID.value
    data.hourlyRate = parseInt(data.hourlyRate)
    data.rate = parseInt(data.rate)
    data.subjectWages = parseInt(data.subjectWages)
 
    try {
      wcclasscodeService
      .createWcclassCode(data)
      .then(() => {
        setIsSaving(false)
        toast.success("Wc Class Code added successfully");
        router.push("/configurations/wcclasscodes");
        reset();
      })
      .catch((error) => {
        setIsSaving(false)
        toast.error(error?.error);
      });
    } catch (error) {
      toast.error("Error adding Wc Class Code");
      console.error(error);
    }
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
              Add New Wc Code
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
              {/* <Col xl="4">
                <div className="mb-1">
                  <Label className="form-lable-font">GL Code<span className="text-danger">*</span></Label>
                  <Controller
                    name="code"
                    rules={{ required: "GL Code is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="GL Code"
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
                  <Label className="form-lable-font">COG<span className="text-danger">*</span></Label>
                  <Controller
                    name="code"
                    rules={{ required: "COG is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="COG"
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
                  <Label className="form-lable-font">Liability<span className="text-danger">*</span></Label>
                  <Controller
                    name="code"
                    rules={{ required: "Liability is required" }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="inputFeild"
                        placeholder="Liability"
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
              </Col> */}
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
                        placeholder="Subject Wages"
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddWcclasscode;
