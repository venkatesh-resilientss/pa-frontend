import ReactSelect from "react-select";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import Select from "react-select";
import { useState } from "react";
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

function AddBudget() {
  const [activeStatus, setActiveStatus] = useState(false);

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currency, setCurrency] = useState("");
  const [series, setSeries] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [set, setSet] = useState("");

  const currencyService = new CurrencyService();

  const {
    data: currencyData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_CURRENCIES", () => currencyService.getCurrencies());

  const currenciesSelectFormat = currencyData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadCurrencyOptions = (values, callBack) => {
    setCurrency(values);
    callBack(currenciesSelectFormat);
  };

  const seriesService = new SeriesService();

  const { data: seriesData } = useSWR("LIST_SERIES", () =>
    seriesService.getSeries()
  );

  const seriesSelectFormat = seriesData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadSeriesOptions = (values, callBack) => {
    setSeries(values);
    callBack(seriesSelectFormat);
  };

  const locationsService = new LocationsService();

  const { data: locationsData } = useSWR("LIST_LOCATIONS", () =>
    locationsService.getLocations()
  );

  const locationsSelectFormat = locationsData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadLocationsOptions = (values, callBack) => {
    setLocation(values);
    callBack(locationsSelectFormat);
  };

  const setsService = new SetsService();

  const { data: setsData } = useSWR("LIST_SETS", () => setsService.getSets());

  const setsSelectFormat = setsData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadSetsOptions = (values, callBack) => {
    setSet(values);
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

  const companySelectFormat = budgetData?.data.map((b) => {
    return {
      value: b.id,
      label: b.Name,
    };
  });

  const loadCompanyOptions = (values, callBack) => {
    callBack(companySelectFormat);
  };

  const {
    control,
    setError,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let backendFormat;

    backendFormat = {
      code: data.taxcode,
      name: data.name,
      description: data.description,
      company: data.company.value,
      production: data.production.value,
      currency: data.currency.value,
      series: data.series.value,

      set: data.set.value,
      location: data.location.value,
      is_active: activeStatus,
    };

    BudgetService.create(backendFormat)
      .then((res) => {
        toast.success("Budget Added successfully");
        router.back();
        reset();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };
  return (
    <div className="container mt-2">
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
              fontWeight: "600",
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
        onSubmit={handleSubmit(onSubmit)}
        style={{ fontSize: "12px", fontWeight: "400", gap: "10px" }}
        className=" mt-2 d-flex "
      >
        {" "}
        <Col xl="3">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Budget Name
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Budget Name"
                style={{ fontSize: "12px", fontWeight: "400" }}
                invalid={errors.name && true}
                {...field}
              />
            )}
          />
        </Col>
        <Col xl="3">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Budget Code
          </Label>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Budget Code"
                style={{ fontSize: "12px", fontWeight: "400" }}
                invalid={errors.code && true}
                {...field}
              />
            )}
          />
        </Col>
      </Form>
      <Row>
        <Col xl="3">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Company
          </Label>
          <Controller
            name="company"
            control={control}
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
        </Col>

        <Col xl="3">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Production
          </Label>
          <Controller
            name={"production"}
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
        </Col>
      </Row>
      <Row>
        <Col xl="3">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Currency
          </Label>
          <Controller
            name={"currency"}
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                isClearable={true}
                className="react-select"
                classNamePrefix="select"
                loadOptions={loadCurrencyOptions}
                placeholder="Select Series"
                defaultOptions={currenciesSelectFormat}
              />
            )}
          />
        </Col>

        <Col xl="3">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Series
          </Label>
          <Controller
            name={"series"}
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                isClearable={true}
                className="react-select"
                classNamePrefix="select"
                loadOptions={loadSeriesOptions}
                placeholder="Select Currency"
                defaultOptions={seriesSelectFormat}
              />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col xl="3">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Location
          </Label>
          <Controller
            name={"location"}
            control={control}
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
        </Col>

        <Col xl="3">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Set
          </Label>
          <Controller
            name={"set"}
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
        </Col>
      </Row>

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
    </div>
  );
}

export default AddBudget;
