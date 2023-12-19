import { useForm, Controller } from "react-hook-form";
import { Col, Form, Label, Row } from "reactstrap";
import AsyncSelect from "react-select/async";
import { LocationsService, SeriesService, SetsService } from "services";
import { useEffect, useState } from "react";
import { getSessionVariables } from "constants/function";

export default function OtherDetails({ onSubmit, control, errors }) {
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
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadSeriesOptions}
                  placeholder="Select Series"
                  defaultOptions={initialSeries}
                  menuPlacement="top"
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
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadLocationOptions}
                  placeholder="Select Location"
                  defaultOptions={initialLocations}
                  menuPlacement="top"
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
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadSetsOptions}
                  placeholder="Select Set"
                  defaultOptions={initialSets}
                  menuPlacement="top"
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
      </Form>
    </div>
  );
}
