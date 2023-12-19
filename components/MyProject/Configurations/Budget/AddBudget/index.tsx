import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import {
  BudgetService,
  CurrencyService,
  LocationsService,
  SeriesService,
  SetsService,
} from "services";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import { formValidationRules } from "constants/common";
import { getSessionVariables } from "@/constants/function";
import { useEffect, useState } from "react";
import { LoaderButton } from "@/components/Loaders";
function AddBudget() {
  const router = useRouter();
  const budgetValidationRules = formValidationRules.budgets;
  const currencyService = new CurrencyService();
  const seriesService = new SeriesService();
  const locationService = new LocationsService();
  const setsService = new SetsService();

  const [initialCurrencyOptions, setInitialCurrencyOptions] = useState([]);
  const [initialSeriesOptions, setInitialSeriesOptions] = useState([]);
  const [initialLocationOptions, setInitialLocationOptions] = useState([]);
  const [inititalSetOptions, setInitialSetOptions] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [customErrors, setCustomErrors] = useState({
    budgetFile: null,
  });
  /** Load Initial Options */
  useEffect(() => {
    const { clientID, projectID } = getSessionVariables();
    /**Currencies */
    const fetchInitialCurrencyOptions = async () => {
      try {
        const res = await currencyService.getCurrencies({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.result.filter(item => item.IsActive).map((item) => ({
          value: item.ID,
          label: `${item.Code} - ${item.Name}`
        }));
        setInitialCurrencyOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };
    fetchInitialCurrencyOptions();

    /** Series */
    const fetchInitalSeriesOptions = async () => {
      try {
        const res = await seriesService.getSeries(
          {
            search: "",
            pageLimit: 25,
            offset: 0,
          },
          {
            clientId: clientID,
            projectId: projectID,
          }
        );
        const options = res?.data.filter(item => item.IsActive).map((item) => ({
          value: item.ID,
          label: `${item.Code} - ${item.Name}`
        }));
        setInitialSeriesOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };
    fetchInitalSeriesOptions();

    /** Locations */
    const fetchLocationsOptions = async () => {
      try {
        const res = await locationService.getLocations(
          {
            search: "",
            pageLimit: 25,
            offset: 0,
          },
          {
            clientId: clientID,
            projectId: projectID,
          }
        );
        const options = res?.result.filter(item => item.IsActive).map((item) => ({
          value: item.ID,
          label: `${item.Code} - ${item.Name}`
        }));
        setInitialLocationOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchLocationsOptions();

    /** Sets */
    const fetchSetsOptions = async () => {
      const { clientID, projectID } = getSessionVariables();
      try {
        const res = await setsService.getSets(
          {
            search: "",
            pageLimit: 25,
            offset: 0,
          },
          {
            clientId: clientID,
            projectID: projectID
          });
        const options = res?.data.filter(item => item.IsActive).map((item) => ({
          value: item.ID,
          label: `${item.Code} - ${item.Name}`
        }));
        setInitialSetOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchSetsOptions();
  }, []);

  /**Currencies */
  const loadCurrencyOptions: any = async (inputValue, callback) => {
    try {
      const res = await currencyService.getCurrencies({
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      });
      const options = res?.result.filter(item => item.IsActive).map((item) => ({
        value: item.ID,
        label: `${item.Code} - ${item.Name}`
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  /** Series */
  const loadSeriesOptions: any = async (inputValue, callback) => {
    const { clientID, projectID } = getSessionVariables();
    try {
      const res = await seriesService.getSeries(
        {
          search: inputValue.toString(),
          pageLimit: 25,
          offset: 0,
        },
        {
          clientId: clientID,
          projectId: projectID,
        }
      );
      const options = res?.result.filter(item => item.IsActive).map((item) => ({
        value: item.ID,
        label: `${item.Code} - ${item.Name}`
      }));
      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  /** Locations */
  const loadLocationsOptions: any = async (inputValue, callback) => {
    const { clientID, projectID } = getSessionVariables();
    try {
      const res = await locationService.getLocations(
        {
          search: inputValue.toString(),
          pageLimit: 25,
          offset: 0,
        },
        {
          clientId: clientID,
          projectId: projectID,
        }
      );
      const options = res?.result.filter(item => item.IsActive).map((item) => ({
        value: item.ID,
        label: `${item.Code} - ${item.Name}`
      }));
      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  /** Sets */
  const loadSetsOptions: any = async (inputValue, callback) => {
    const { clientID, projectID } = getSessionVariables();
    try {
      const res = await setsService.getSets(
        {
          search: inputValue.toString(),
          pageLimit: 25,
          offset: 0,
        },
        {
          clientId: clientID,
          projectID: projectID
        });
      const options = res?.result.filter(item => item.IsActive).map((item) => ({
        value: item.ID,
        label: `${item.Code} - ${item.Name}`
      }));
      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  const budgetService = new BudgetService();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [budgetFile, setBudgetFile] = useState(null);
  const onSubmit = async (data) => {
    if(!budgetFile){
      setCustomErrors({
        ...customErrors,
        budgetFile : 'Budget file is required'
      });
      return;
    }else if( budgetFile.type !== 'text/plain'){
      setCustomErrors({
        ...customErrors,
        budgetFile : 'Only .txt files are allowed'
      });
      return;
    }
    setCustomErrors({
      ...customErrors,
      budgetFile : null
    })
    setLoader(true);
    try {
      const { clientID, projectID } = getSessionVariables();
      if (!clientID || !projectID) {
        throw new Error("Client and Project not found");
      }
      const payload = {
        Code: data?.code,
        Name: data?.name,
        CurrencyID: parseInt(data?.currency?.value),
        SeriesID: parseInt(data?.series?.value),
        SetID: parseInt(data?.set?.value),
        LocationID: parseInt(data?.location?.value),
        file: budgetFile,
        clientID,
        projectID,
      };
      await budgetService.createBudget(payload);
      toast.success("Budget Added successfully");
      setLoader(false);
      router.push("/configurations/budgets");
    } catch (error) {
      toast.error(
        error?.error ||
          error?.Message ||
          error?.message ||
          "Unable to add Budget"
      );
      setLoader(false);
    }
  };
  return (
    <div className="mt-4">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Budgets
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Add New Budget
        </div>
        <div className="d-flex me-2 align-items-center" style={{ gap: "10px" }}>
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
          <LoaderButton
            handleClick={handleSubmit(onSubmit)}
            buttonText={"Save"}
            isLoading={isLoading}
          />
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <Row className="gap-2">
          <Col xl="4" className="mt-2">
            <Label className="form-lable-font">
              Budget Name <span className="required">*</span>
            </Label>
            <Controller
              name="name"
              control={control}
              rules={budgetValidationRules.name}
              render={({ field }) => (
                <Input
                  placeholder="Budget Name"
                  invalid={errors.name && true}
                  {...field}
                  style={{ fontSize: "1rem" }}
                />
              )}
            />
            {errors.name && (
              <span style={{ fontSize: "12px", fontWeight: "400", color: "red" }}>
                {errors.name.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label className="form-lable-font">
              Budget Code <span className="required">*</span>
            </Label>
            <Controller
              name="code"
              control={control}
              rules={budgetValidationRules.code}
              render={({ field }) => (
                <Input
                  placeholder="Budget Code"
                  invalid={errors.code && true}
                  {...field}
                  style={{ fontSize: "1rem" }}
                />
              )}
            />
            {errors.code && (
              <span style={{ fontSize: "12px", fontWeight: "400", color: "red" }}>
                {errors.code.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label className="form-lable-font">
              Currency <span className="required">*</span>
            </Label>
            <Controller
              name={"currency"}
              rules={budgetValidationRules.currency}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadCurrencyOptions}
                  placeholder="Select Currency"
                  defaultOptions={initialCurrencyOptions}
                />
              )}
            />
            {errors.currency && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                {" "}
                {errors.currency.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label className="form-lable-font">
              Series <span className="required">*</span>
            </Label>
            <Controller
              name={"series"}
              rules={budgetValidationRules.series}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadSeriesOptions}
                  placeholder="Select Series"
                  defaultOptions={initialSeriesOptions}
                />
              )}
            />
            {errors.series && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                {" "}
                {errors.series.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label className="form-lable-font">
              Location <span className="required">*</span>
            </Label>
            <Controller
              name={"location"}
              control={control}
              rules={budgetValidationRules.location}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadLocationsOptions}
                  placeholder="Select Location"
                  defaultOptions={initialLocationOptions}
                />
              )}
            />
            {errors.location && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                {" "}
                {errors.location.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label className="form-lable-font">
              Set <span className="required">*</span>
            </Label>
            <Controller
              name={"set"}
              rules={budgetValidationRules.set}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadSetsOptions}
                  placeholder="Select Set"
                  defaultOptions={inititalSetOptions}
                />
              )}
            />
            {errors.set && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                {" "}
                {errors.set.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label className="form-lable-font">
              Upload Budget File <span className="required">*</span>
            </Label>
            <Controller
              name="budgetfile"
              control={control}
              render={() => (
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) => {
                    setBudgetFile(e.target.files[0]);
                  }}
                />
              )}
            />
            <br />
            {customErrors.budgetFile && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                {customErrors.budgetFile}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddBudget;
