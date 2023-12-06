import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { Col, Form, Input, Label, Row } from "reactstrap";
// import useSWR from "swr";
import { StatesService } from "services";
import { useEffect, useState } from "react";

const stateService = new StatesService();
function PhysicalAddressForm({ onSubmit, control, errors }) {
  const { handleSubmit } = useForm();
  const [initialStateOptions, setInitialStateOptions] = useState([]);

  useEffect(() => {
    const fetchInitialStates = async () => {
      try {
        const res = await stateService.getStates({
          search: "",
          pageLimit: 25,
          offset: 0,
        });
        const options = res?.data.map((item) => ({
          value: item.ID,
          label: item.Name,
          country: item.Country,
        }));
        setInitialStateOptions(options);
      } catch (error) {
        console.error("Error fetching initial options:", error);
      }
    };

    fetchInitialStates();
  }, []);

  const loadStateOptions: any = async (inputValue, callback) => {
    try {
      const res = await stateService.getStates({
        search: inputValue.toString(),
        pageLimit: 25,
        offset: 0,
      });
      // console.log(res, 'sets responseee');

      const options = res?.data.map((item) => ({
        value: item.ID,
        label: item.Name,
        country: item.Country,
      }));

      callback(options);
    } catch (error) {
      console.error("Error loading options:", error);
    }
  };
  return (
    <div className="text-black">
      <Form
        style={{ fontSize: "12px", fontWeight: "400" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row>
          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address Line 1
            </Label>
            <Controller
              name="physicalAddress1"
              rules={{
                required: "Physical Address Line 1 is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Physical Address Line 1"
                  invalid={errors.physicalAddress1 && true}
                  {...field}
                />
              )}
            />
            {errors.physicalAddress1 && (
              <span className="text-danger">
                {errors.physicalAddress1.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address Line 2
            </Label>
            <Controller
              name="physicalAddress2"
              rules={{
                required: "  Physical Address Line 2 is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Physical Address Line 2"
                  invalid={errors.physicalAddress2 && true}
                  {...field}
                />
              )}
            />
            {errors.physicalAddress2 && (
              <span className="text-danger">
                {errors.physicalAddress2.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address City
            </Label>
            <Controller
              name="physicalAddressCity"
              rules={{
                required: "  City is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter City"
                  invalid={errors.physicalAddressCity && true}
                  {...field}
                />
              )}
            />
            {errors.physicalAddressCity && (
              <span className="text-danger">
                {errors.physicalAddressCity.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address State{" "}
            </Label>
            <Controller
              name="physicalAddressState"
              rules={{
                required: " State is required",
              }}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadStateOptions}
                  placeholder="Select State"
                  defaultOptions={initialStateOptions}
                />
              )}
            />
            {errors.physicalAddressState && (
              <span className="text-danger">
                {errors.physicalAddressState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col xl="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address Postal Code
            </Label>
            <Controller
              name="physicalAddressPostalCode"
              rules={{
                required: " Postal Code is required",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Postal Code"
                  invalid={errors.physicalAddressPostalCode && true}
                  {...field}
                />
              )}
            />
            {errors.physicalAddressPostalCode && (
              <span className="text-danger">
                {errors.physicalAddressPostalCode.message as React.ReactNode}
              </span>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default PhysicalAddressForm;
