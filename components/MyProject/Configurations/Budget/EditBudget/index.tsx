import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
import { getSessionVariables } from "@/constants/function";
import {
  BudgetService,
  CurrencyService,
  LocationsService,
  SeriesService,
  SetsService,
} from "services";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import { formValidationRules } from "@/constants/common";
import { LoaderButton } from "@/components/Loaders";
import { hasPermission } from "@/commonFunctions/functions";
function EditBudget() {
  const [activeStatus, setActiveStatus] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const budgetValidationRules = formValidationRules.budgets;
  const currencyService = new CurrencyService();
  const seriesService = new SeriesService();
  const locationService = new LocationsService();
  const setsService = new SetsService();
  const budgetService = new BudgetService();

  const [isLoading,setLoader] = useState(false);
  const [editMode,setEditMode] = useState(false);
  const [initialCurrencyOptions, setInitialCurrencyOptions] = useState([]);
  const [initialSeriesOptions, setInitialSeriesOptions] = useState([]);
  const [initialLocationOptions, setInitialLocationOptions] = useState([]);
  const [inititalSetOptions, setInitialSetOptions] = useState([]);
  const [budgetFileUrl, setBudgetFileUrl] = useState(null);
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  /** Load Initial Options */
  useEffect(() => {
    /**Currencies */
    const fetchInitialCurrencyOptions = async () => {
      try {
        const res = await currencyService.getCurrencies({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.result.filter(item=>item.IsActive).map((item) => ({
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
      const { clientID, projectID } = getSessionVariables();
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
        const options = res?.data.map((item) => ({
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
        const res = await locationService.getLocations({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.result.filter(item=>item.IsActive).map((item) => ({
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
            projectID: projectID,
          }
        );
        const options = res?.data.map((item) => ({
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
      const options = res?.result.filter(item=>item.IsActive).map((item) => ({
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
      const options = res?.result.filter(item=>item.IsActive).map((item) => ({
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
    try {
      const res = await locationService.getLocations({
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      });
      const options = res?.result.filter(item=>item.IsActive).map((item) => ({
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
          projectID: projectID,
        }
      );
      const options = res?.result.filter(item=>item.IsActive).map((item) => ({
        value: item.ID,
        label: `${item.Code} - ${item.Name}`
      }));
      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  // const [budgetFile, setBudgetFile] = useState(null);

  const { data: budgetData } = useSWR(id ? ["STATE_DETAILS", id] : null, () =>
    budgetService.budgetDetails(id)
  );

  useEffect(() => {
    if (!budgetData) return;

    setValue("name", budgetData?.Name);
    setValue("code", budgetData?.Code);
    setValue("currency", {
      value: budgetData?.Currency?.ID,
      label: `${budgetData?.Currency?.Code} - ${budgetData?.Currency?.Name}`,
    });
    setValue("series", {
      value: budgetData?.Series?.ID,
      label: `${budgetData?.Series?.Code} - ${budgetData?.Series?.Name}`,
    });
    setValue("set", {
      value: budgetData?.Set?.ID,
      label: `${budgetData?.Set?.Code} - ${budgetData?.Set?.Name}`,
    });
    setValue("location", {
      value: budgetData?.Location?.ID,
      label: `${budgetData?.Location?.Code} - ${budgetData?.Location?.Name}`
    })
    setActiveStatus(budgetData?.IsActive);
    setBudgetFileUrl(budgetData?.BudgetFile);
  }, [budgetData]);

  const onSubmit = () => {
    const backendFormat = {
      IsActive: activeStatus,
    };
    setLoader(true);
    budgetService
      .editBudget(id, backendFormat)
      .then(() => {
        toast.success("Budget updated successfully");
        router.push('/configurations/budgets');
        reset();
        setLoader(false);
      })
      .catch((error) => {
        toast.error(error?.error || error?.Message || "Unable to edit Budget");
        setLoader(false);
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
          {hasEditConfigurationPermission && (
              <LoaderButton
                buttonText={editMode ? "Save" : "Edit"}
                isLoading={isLoading}
                handleClick={() => {
                  if (!editMode) {
                    setEditMode(true);
                    return;
                  }
                  handleSubmit(onSubmit)();
                }}
              />
            )}
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <Form onSubmit={handleSubmit(onSubmit)}>
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
                  style={{ fontSize : '1rem'}}
                  disabled={true}
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
                  style={{ fontSize : '1rem'}}
                  disabled={true}
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
                  isDisabled={true}
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
                  isDisabled={true}
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
                  isDisabled={true}
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
                  isDisabled={true}
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
            {budgetFileUrl ? (
              <>
              <span>
                Uploaded Budget file: 
              </span>
              <span className="link-primary cursor-pointer text-decoration-underline ps-2" onClick={() => {
                window.open(budgetFileUrl);
              }}>
                
                Download File
              </span></>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        <div className="d-flex flex-column mt-3">
          <Label className="text-black">Status </Label>
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
                disabled={!editMode}
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
                disabled={!editMode}
              />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditBudget;
