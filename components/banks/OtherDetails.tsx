import { useForm, Controller } from "react-hook-form";
import { Col, Form, Label, Row } from "reactstrap";
import AsyncSelect from "react-select/async";
import { LocationsService, SeriesService, SetsService } from "services";
import { useEffect, useState } from "react";
import { getSessionVariables } from "constants/function";

export default function OtherDetails(props) {
  const { control, onSubmit, errors, isEditing } = props;
  const { edit, activeStatus, setActiveStatus } = props;
  const { handleSubmit } = useForm();

  const seriesService = new SeriesService();

  const locationsService = new LocationsService();

  const setsService = new SetsService();

  const [initialSets, setInitialSets] = useState([]);
  const [initialLocations, setInitialLocations] = useState([]);
  const [initialSeries, setInitialSeries] = useState([]);

  useEffect(() => {
    const { clientID, projectID } = getSessionVariables();
    const fetchInitialOptions = async () => {
      try {
        const res = await setsService.getSets(
          {
            search: "",
            pageLimit: 25,
            offset: 0,
          },
          { clientId: clientID, projectId: projectID }
        );
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: item.Code + " - " + item.Name,
        }));
        setInitialSets(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialOptions();
  }, []);

  const loadSetsOptions: any = async (inputValue, callback) => {
    try {
      const { clientID, projectID } = getSessionVariables();
      const queryParams = {
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      };
      const data = { clientId: clientID, projectId: projectID };
      const res = await setsService.getSets(queryParams, data);

      const options = res?.data.map((item) => ({
        value: item.ID,
        label: item.Code + " - " + item.Name,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  useEffect(() => {
    const fetchInitialLocations = async () => {
      try {
        const { clientID, projectID } = getSessionVariables();
        const queryParams = {
          search: "",
          pageLimit: 25,
          offset: 0,
        };
        const data = { clientId: clientID, projectId: projectID };
        const res = await locationsService.getLocations(queryParams, data);
        const options = res?.result.map((item) => ({
          value: item.ID,
          label: item.Code + " - " + item.Name,
        }));
        setInitialLocations(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialLocations();
  }, []);

  const loadLocationOptions: any = async (inputValue, callback) => {
    try {
      const { clientID, projectID } = getSessionVariables();
      const queryParams = {
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      };
      const data = { clientId: clientID, projectId: projectID };
      const res = await locationsService.getLocations(queryParams, data);

      const options = res?.result.map((item) => ({
        value: item.ID,
        label: item.Code + " - " + item.Name,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };
  useEffect(() => {
    const fetchInitialSeries = async () => {
      try {
        const { clientID, projectID } = getSessionVariables();
        const queryParams = {
          search: "",
          pageLimit: 25,
          offset: 0,
        };
        const data = { clientId: clientID, projectId: projectID };
        const res = await seriesService.getSeries(queryParams, data);
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: item.Code + " - " + item.Name,
        }));
        setInitialSeries(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialSeries();
  }, []);

  const loadSeriesOptions: any = async (inputValue, callback) => {
    try {
      const { clientID, projectID } = getSessionVariables();
      const data = { clientId: clientID, projectId: projectID };
      const queryParams = {
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      };
      const res = await seriesService.getSeries(queryParams, data);
      const options = res?.data.map((item) => ({
        value: item.ID,
        label: item.Code + " - " + item.Name,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  // const loadSetsOptions = (values, callBack) => {
  //   callBack(setsSelectFormat);
  // };
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      background: state.isDisabled ? "#e9ecef" : "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "0.375rem",
      minHeight: "40px",
      boxShadow: null,
      ":hover": {
        borderColor: "#A2CFFE",
      },
    }),

    singleValue: (provided) => ({ ...provided, color: "#212529" }),

    valueContainer: (base) => ({ ...base, padding: "0 6px" }),

    input: (base) => ({ ...base, margin: "0" }),

    placeholder: (base: any) => ({
      ...base,
      position: "center",
      transform: "none",
      color: "#c9c9c9 !important",
    }),

    menu: (base: any) => ({ ...base, margin: "0 !important" }),
    menuList: (base: any) => ({ ...base, padding: "0 !important" }),

    option: (base: any, state: any) => ({
      ...base,
      cursor: "pointer",
      color: "#212529",
      ":hover": {
        backgroundColor: "#c9c9c97d",
      },
      backgroundColor: state.isSelected ? "#c9c9c97d !important" : "white",
    }),

    indicatorSeparator: () => ({ display: "none" }),
  };

  return (
    <div className="text-black">
      <Form
        style={{ fontSize: "12px", fontWeight: "400" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row>
          <Col lg="4">
            <Label className="form-lable-font">Series</Label>
            <Controller
              name="series"
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isDisabled={!isEditing || false}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadSeriesOptions}
                  placeholder="Select Series"
                  defaultOptions={initialSeries}
                  menuPlacement="top"
                  styles={selectStyles}
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

          <Col lg="4">
            <Label className="form-lable-font">Location</Label>
            <Controller
              name={"location"}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isDisabled={!isEditing || false}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadLocationOptions}
                  placeholder="Select Location"
                  defaultOptions={initialLocations}
                  menuPlacement="top"
                  styles={selectStyles}
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

          <Col lg="4">
            <Label className="form-lable-font">Set</Label>
            <Controller
              name="set"
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isDisabled={!isEditing || false}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadSetsOptions}
                  placeholder="Select Set"
                  defaultOptions={initialSets}
                  menuPlacement="top"
                  styles={selectStyles}
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
        </Row>
        {edit && (
          <div className="d-flex flex-column mt-1">
            <Label className="form-lable-font">Status </Label>
            <div className="d-flex gap-4">
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  id="ex1-active"
                  checked={activeStatus}
                  name="ex1"
                  onChange={() => setActiveStatus(true)}
                  disabled={!isEditing || false}
                />
                <div>Active</div>
              </div>
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  checked={activeStatus === false}
                  name="ex1"
                  id="ex1-inactive"
                  onChange={() => setActiveStatus(false)}
                  disabled={!isEditing || false}
                />
                <div>In-Active</div>
              </div>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
