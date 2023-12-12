import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
import {
  BudgetService,
  CurrencyService,
  DashboardService,
  LocationsService,
  SeriesService,
  SetsService,
} from "services";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import { formValidationRules } from "constants/common";
import { getSessionVariables } from "@/constants/function";
import { useEffect, useRef, useState } from "react";
function AddBudget() {
  const router = useRouter();
  const budgetValidationRules = formValidationRules.budgets;
  const [sessionData, setSessionData] = useState() as any;
  const [setsData, setSetsData] = useState() as any;
  const currencyService = new CurrencyService();

  const { data: currencyData } = useSWR("LIST_CURRENCIES", () =>
    currencyService.getCurrencies({ search: "", limit: 25, offset: 0, is_active: true })
  );

  const currenciesSelectFormat = currencyData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadCurrencyOptions = (values, callBack) => {
    callBack(currenciesSelectFormat);
  };

  const seriesService = new SeriesService();

  const { data: seriesData } = useSWR("LIST_SERIES", () =>
    seriesService.getSeries({ search: "", pageLimit: 25, offset: 0 })
  );

  const seriesSelectFormat = seriesData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadSeriesOptions = (values, callBack) => {
    callBack(seriesSelectFormat);
  };

  const locationsService = new LocationsService();

  const { data: locationsData } = useSWR("LIST_LOCATIONS", () =>
    locationsService.getLocations({ search: "", pageLimit: 25, offset: 0 })
  );

  const locationsSelectFormat = locationsData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadLocationsOptions = (values, callBack) => {
    callBack(locationsSelectFormat);
  };

  const setsService = new SetsService();

  // const { data: setsData } = useSWR("LIST_SETS", () =>
  //   setsService.getSets({ search: "", limit: 25, offset: 0 })
  // );



  const intervalIdRef = useRef(null);
  const attemptsCountRef = useRef(0);
  const maxAttempts = 10;

  useEffect(() => {
    const retrieveSessionData = () => {
      // Retrieve data from sessionStorage
      const clientID = parseInt(sessionStorage.getItem("clientid"));
      const projectID = parseInt(sessionStorage.getItem("projectid"));

      if ((clientID && projectID) || attemptsCountRef.current >= maxAttempts) {
        clearInterval(intervalIdRef.current);
        if (clientID && projectID) {
          setSessionData({ clientID: clientID, projectID: projectID });
        }
      }

      // Increment the attempts count
      attemptsCountRef.current += 1;
    };

    // Retrieve session data initially
    retrieveSessionData();

    // Set up interval to check for session data every 1 second
    intervalIdRef.current = setInterval(retrieveSessionData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalIdRef.current);
  }, []);


  useEffect(() => {
    if (sessionData) {
      const queryParams = {
        search: "",
        pageLimit: 25,
        offset: 0,
        is_active: true
      };
      const payload = { clientId: sessionData.clientID, projectId: sessionData.projectID };
      setsService.getSets(queryParams, payload).then((response) => {
        setSetsData(response)
      }).catch((e) => {
        console.error(e)
      })
    }

  }, [sessionData])



  const setsSelectFormat = setsData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadSetsOptions = (values, callBack) => {
    callBack(setsSelectFormat);
  };

  const statsService = new DashboardService();

  const { data: statsData } = useSWR("GET_RECENET", () =>
    statsService.getRecentProductions()
  );

  const productionSelectFormat = statsData?.data.map((b) => {
    return {
      value: b.id,
      label: b.project_name,
    };
  }); 

  const loadProductionOptions = (values, callBack) => {
    callBack(productionSelectFormat);
  };

  const budgetService = new BudgetService();

  const { data: budgetData } = useSWR("LIST_COMPANY", () =>
    budgetService.getCompany()
  );

  const companySelectFormat = budgetData?.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadCompanyOptions = (values, callBack) => {
    callBack(companySelectFormat);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [budgetFile,setBudgetFile] = useState(null);
  const onSubmit = (data) => {
    const { clientID, projectID } = getSessionVariables();
    const backendFormat = {
      Code: data?.code,
      Name: data?.name,
      CompanyID: parseInt(data?.company?.value),
      ProjectID: parseInt(data?.production?.value),
      CurrencyID: parseInt(data?.currency?.value),
      SeriesID: parseInt(data?.series?.value),
      SetID: parseInt(data?.set?.value),
      LocationID: parseInt(data?.location?.value),
      budgetFile: budgetFile,
      clientID,
      projectID,
    };

    // console.log(backendFormat);

    budgetService
      .createBudget(backendFormat)
      .then(() => {
        toast.success("Budget Added successfully");
        router.back();
        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
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
                />
              )}
            />
            {errors.name && (
              <span className="text-danger">
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
                />
              )}
            />
            {errors.code && (
              <span className="text-danger">
                {errors.code.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label className="form-lable-font">
              Company <span className="required">*</span>
            </Label>
            <Controller
              name="company"
              control={control}
              rules={budgetValidationRules.company}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadCompanyOptions}
                  placeholder="Select Company"
                  defaultOptions={companySelectFormat}
                />
              )}
            />
            {errors.company && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                {" "}
                {errors.company.message as React.ReactNode}
              </span>
            )}
          </Col>
          <Col xl="4" className="mt-2">
            <Label className="form-lable-font">
              Production <span className="required">*</span>
            </Label>
            <Controller
              name={"production"}
              rules={budgetValidationRules.production}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadProductionOptions}
                  placeholder="Select Productions"
                  defaultOptions={productionSelectFormat}
                />
              )}
            />
            {errors.production && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                {" "}
                {errors.production.message as React.ReactNode}
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
                  defaultOptions={currenciesSelectFormat}
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
                  defaultOptions={seriesSelectFormat}
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
                  defaultOptions={locationsSelectFormat}
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
                  defaultOptions={setsSelectFormat}
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
              render={() => <input type="file" accept=".txt" onChange={(e)=>{
                setBudgetFile(e.target.files[0])
              }} />}
            />
            <br />
            {!budgetFile && (
              <span
                style={{ fontSize: "12px", fontWeight: "400", color: "red" }}
              >
                Budget file is required
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddBudget;
