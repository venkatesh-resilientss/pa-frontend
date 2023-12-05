import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

function EditBudget() {
  const [activeStatus, setActiveStatus] = useState(false);

  const router = useRouter();
  const [uploadExcel, setUploadExcel]: any = useState({});

  const currencyService = new CurrencyService();
  const { id } = router.query;

  const { data: currencyData } = useSWR("LIST_CURRENCIES", () =>
    currencyService.getCurrencies()
  );

  const currenciesSelectFormat = currencyData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadCurrencyOptions = (values, callBack) => {
    values;
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
      value: b.id,
      label: b.Name,
    };
  });

  const loadCompanyOptions = (values, callBack) => {
    callBack(companySelectFormat);
  };
  const fetchBudgetDetails = (id) => budgetService.budgetDetails(id);

  const { data: budgetData1 } = useSWR(id ? ["BUDGET_DETAILS", id] : null, () =>
    fetchBudgetDetails(id)
  );
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (!budgetData1) return;

    budgetData1?.Name && setValue("name", budgetData1?.Name);
    budgetData1?.Code && setValue("code", budgetData1?.Code);

    setActiveStatus(budgetData1?.IsActive);
  }, [budgetData, budgetData1]);
  const onSubmit = (data) => {
    const backendFormat = {
      Code: data?.code,
      Name: data?.name,
      Description: data?.description,
      CompanyID: data?.company?.value,
      ProjectID: data?.production?.value,
      CurrencyID: data?.currency?.value,
      SeriesID: parseInt(data?.series?.value),
      SetID: data?.set?.value,
      LocationID: data?.location?.value,
      BankID: 0,
      Amount: 0.0,
      budgetFile: uploadExcel.name,
      IsActive: activeStatus,
    };

    budgetService
      .editBudget(id, backendFormat)
      .then(() => {
        toast.success("Budget Edited successfully");
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
          Edit Budget
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
            rules={{ required: "Budget Name is required" }}
            render={({ field }) => (
              <Input
                placeholder="Budget Name"
                style={{ fontSize: "12px", fontWeight: "400" }}
                invalid={errors.name && true}
                {...field}
              />
            )}
          />
          {errors.name && (
            <span style={{ color: "red" }}>
              {errors.name.message as React.ReactNode}
            </span>
          )}
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
            rules={{ required: "Budget Code is required" }}
            render={({ field }) => (
              <Input
                placeholder="Budget Code"
                style={{ fontSize: "12px", fontWeight: "400" }}
                invalid={errors.code && true}
                {...field}
              />
            )}
          />
          {errors.code && (
            <span style={{ color: "red" }}>
              {errors.code.message as React.ReactNode}
            </span>
          )}
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
            rules={{ required: "Company is required" }}
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
            <span style={{ fontSize: "12px", fontWeight: "400", color: "red" }}>
              {" "}
              {errors.company.message as React.ReactNode}
            </span>
          )}
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
            rules={{ required: "Production is required" }}
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
            <span style={{ fontSize: "12px", fontWeight: "400", color: "red" }}>
              {" "}
              {errors.production.message as React.ReactNode}
            </span>
          )}
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
            rules={{ required: "Currency is required" }}
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
          {errors.currency && (
            <span style={{ fontSize: "12px", fontWeight: "400", color: "red" }}>
              {" "}
              {errors.currency.message as React.ReactNode}
            </span>
          )}
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
            rules={{ required: "Series is required" }}
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
          {errors.series && (
            <span style={{ fontSize: "12px", fontWeight: "400", color: "red" }}>
              {" "}
              {errors.series.message as React.ReactNode}
            </span>
          )}
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
            rules={{ required: "Location is required" }}
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
            <span style={{ fontSize: "12px", fontWeight: "400", color: "red" }}>
              {" "}
              {errors.location.message as React.ReactNode}
            </span>
          )}
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
            rules={{ required: "Set is required" }}
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
            <span style={{ fontSize: "12px", fontWeight: "400", color: "red" }}>
              {" "}
              {errors.set.message as React.ReactNode}
            </span>
          )}
        </Col>
      </Row>

      <Row className="mt-2">
        <Col xl="3">
          <Label className="form-lable-font">Upload Budget File</Label>
          <div className="d-flex flex-column gap-2 w-100">
            <input
              type="file"
              accept=".xls, xlsx"
              className="remove-value"
              onChange={(e: any) => setUploadExcel(e.target.files[0])}
            />
          </div>
        </Col>
      </Row>

      <div className="d-flex flex-column mt-1">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Status{" "}
        </Label>
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
                style={{ fontSize: "12px", fontWeight: "400" }}
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
                checked={!activeStatus}
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
    </div>
  );
}

export default EditBudget;
