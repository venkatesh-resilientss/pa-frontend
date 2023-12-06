import { useForm, Controller } from "react-hook-form";
import { Col, Form, Label, Row } from "reactstrap";
import AsyncSelect from "react-select/async";
import { LocationsService, SeriesService, SetsService } from "services";
import { useEffect, useState } from "react";

function OtherDetailsForm({ onSubmit, control, errors }) {
  const { handleSubmit } = useForm();

  const seriesService = new SeriesService();

  const locationsService = new LocationsService();

  const setsService = new SetsService();

  const [initialSets, setInitialSets] = useState([]);
  const [initialLocations, setInitialLocations] = useState([]);
  const [initialSeries, setInitialSeries] = useState([]);

  useEffect(() => {
    const fetchInitialOptions = async () => {
      try {
        const res = await setsService.getSets({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.result.map((item) => ({
          value: item.ID,
          label: item.Name,
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
      const res = await setsService.getSets({
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      });

      const options = res?.result.map((item) => ({
        value: item.ID,
        label: item.Name,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };

  useEffect(() => {
    const fetchInitialLocations = async () => {
      try {
        const res = await locationsService.getLocations({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.result.map((item) => ({
          value: item.ID,
          label: item.Name,
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
      const res = await locationsService.getLocations({
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      });

      const options = res?.result.map((item) => ({
        value: item.ID,
        label: item.Name,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };
  useEffect(() => {
    const fetchInitialSeries = async () => {
      try {
        const res = await seriesService.getSeries({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: item.Name,
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
      const res = await seriesService.getSeries({
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      });

      const options = res?.data.map((item) => ({
        value: item.ID,
        label: item.Name,
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
          <Col xl="4">
            <Label className="form-lable-font">Series</Label>
            <Controller
              name="series"
              control={control}
              rules={{ required: "Series is required" }}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadSeriesOptions}
                  placeholder="Select Series"
                  defaultOptions={initialSeries}
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

          <Col xl="4">
            <Label className="form-lable-font">Location</Label>
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
                  loadOptions={loadLocationOptions}
                  placeholder="Select Location"
                  defaultOptions={initialLocations}
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

          <Col xl="4">
            <Label className="form-lable-font">Set</Label>
            <Controller
              name="set"
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
                  defaultOptions={initialSets} // Provide an empty array initially
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

export default OtherDetailsForm;
