import { useForm, Controller } from "react-hook-form";
import { Col, Form, Input, Label, Row } from "reactstrap";
import AsyncSelect from "react-select/async";
import { StatesService } from "services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formValidationRules } from "@/constants/common";

export default function PhysicalAddress(props) {
  const { onSubmit, control, errors, isEditing } = props;
  const bankValidationRules = formValidationRules.banks;
  const { handleSubmit } = useForm();
  const [initialStateOptions, setInitialStateOptions] = useState([]);

  const stateService = new StatesService();
  // const { data: states } = useSWR("LIST_STATES", () =>
  //   stateService.getStates()
  // );

  // const statesDropdownoptions = states?.data.map((b) => {
  //   return {
  //     value: b.ID,
  //     label: b.Name,
  //     country: b.Country,
  //   };
  // });

  useEffect(() => {
    const fetchInitialStates = async () => {
      try {
        const res = await stateService.getStates({
          search: "",
          limit: 25,
          offset: 0,
          is_active: true,
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
        limit: 25,
        offset: 0,
        is_active: true,
      });

      const options = res?.data.map((item) => ({
        value: item.ID,
        label: item.Name,
        country: item.Country,
      }));

      callback(options);
    } catch (error) {
      toast.error("Error loading options:", error);
    }
  };

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
      borderColor:
        errors.physicalAddressState &&
        errors.physicalAddressState?.message &&
        !state.hasValue
          ? "#e50000 !important"
          : "#dee2e6",
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
          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address Line 1
            </Label>
            <Controller
              rules={bankValidationRules.physicalAddressLine1}
              name="physicalAddress1"
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Physical Address Line 1"
                  invalid={errors.physicalAddress1 && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.physicalAddress1 && (
              <span className="text-danger">
                {errors.physicalAddress1.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address Line 2
            </Label>
            <Controller
              name="physicalAddress2"
              rules={bankValidationRules.physicalAddressLine2}
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Physical Address Line 2"
                  invalid={errors.physicalAddress2 && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.physicalAddress2 && (
              <span className="text-danger">
                {errors.physicalAddress2.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address City
            </Label>
            <Controller
              rules={bankValidationRules.physicalAddressCity}
              name="physicalAddressCity"
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter City"
                  invalid={errors.physicalAddressCity && true}
                  {...field}
                  disabled={!isEditing || false}
                />
              )}
            />
            {errors.physicalAddressCity && (
              <span className="text-danger">
                {errors.physicalAddressCity.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            {" "}
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address State{" "}
            </Label>
            <Controller
              name="physicalAddressState"
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isDisabled={!isEditing || false}
                  isClearable={true}
                  className="react-select"
                  classNamePrefix="select"
                  loadOptions={loadStateOptions}
                  placeholder="Select State"
                  defaultOptions={initialStateOptions}
                  styles={selectStyles}
                />
              )}
            />
            {errors.physicalAddressState && (
              <span className="text-danger">
                {errors.physicalAddressState.message as React.ReactNode}
              </span>
            )}
          </Col>

          <Col lg="4" className="my-2">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Physical Address Postal Code
            </Label>
            <Controller
              rules={bankValidationRules.physicalAddressPostalCode}
              name="physicalAddressPostalCode"
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  placeholder="Enter Postal Code"
                  invalid={errors.physicalAddressPostalCode && true}
                  {...field}
                  disabled={!isEditing || false}
                  type="number"
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
