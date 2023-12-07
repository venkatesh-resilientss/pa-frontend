"use client";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { Button, Form, Label, Input } from "reactstrap";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import ImportExcelIcon from "assets/myIcons/importExel.svg";
import Image from "next/image";
import attchFileIcon from "assets/myIcons/attchfile.svg";
import controlPointIcon from "assets/myIcons/splitIcon.svg";
import CopyIcon from "assets/myIcons/Copy.svg";
import SplitIcon from "assets/myIcons/Split.svg";
import { useRouter } from "next/router";
import deleteIcon from "assets/myIcons/IconDelete.svg";
import AddVendorPopup from "../../AddVendorPopup";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import PasteIcon from "assets/myIcons/paste.svg";
import {
  openAddMoreLinesPopup,
  openAddVendorPopup,
  openImportFromExcelPurchaseOrderPopup,
  openSplitAmountPopup,
} from "redux/slices/mySlices/transactions";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import Select from "react-select";

const CreatePurchaseOrder = () => {
  const ActionsButton = (props) => {
    const id = `action-popover-${props.value}`;

    const Action = ({ icon, name, action }) => {
      return (
        <div onClick={action} className="d-flex align-items-center gap-2">
          <Image src={icon} alt={name} />

          <p>{name}</p>
        </div>
      );
    };

    return (
      <div className="d-flex align-items-center" style={{ gap: "2px" }}>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <Image src={actionIcon} alt="" width={14} id={id} />
          </DropdownToggle>
          <DropdownMenu end container="body">
            <DropdownItem className="w-100" onClick={handleAdd}>
              <Action icon={plusIcon} name={"Add More Lines"} action={""} />
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => handleCopy(props.rowIndex)}
            >
              <Action icon={CopyIcon} name={"Copy"} action={""} />
            </DropdownItem>

            <DropdownItem
              className="w-100"
              onClick={() => handlePaste(props.rowIndex)}
            >
              <Action icon={PasteIcon} name={"Paste"} action={""} />
            </DropdownItem>
            <DropdownItem
              className="w-100 cursor-pointer"
              onClick={() => dispatch(openSplitAmountPopup(props.rowIndex))}
            >
              <Action icon={SplitIcon} name={"Split"} action={""} />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div>
          <Image
            onClick={() => handleDuplicate(props.rowIndex)}
            src={controlPointIcon}
            alt=""
            style={{ width: "14px", height: "14px" }}
          />
        </div>
        <div>
          <Image
            onClick={() => handleDelete(props.data.id)}
            src={deleteIcon}
            alt=""
            style={{ width: "14px", height: "14px" }}
            className="cursor-pointer"
          />
        </div>
      </div>
    );
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const vendorsService = new VendorsService();

  const selectedVendor = watch("vendor");
  const selectedBank = watch("bank");

  const vendorId = selectedVendor?.value;

  const bankId = selectedBank?.value;

  const { data: bankDetailsForCurrencyData } = useSWR(
    bankId ? ["BANK_DETAILS", bankId] : null,
    () => fetchBankDetails(bankId)
  );

  const fetchVendorDetails = (vendorId) =>
    vendorsService.getVendorDetails(vendorId);

  const { data: vendorDetailsData } = useSWR(
    vendorId ? ["VENDOR_DETAILS", vendorId] : null,
    () => fetchVendorDetails(vendorId)
  );

  const { data: vendorsData } = useSWR("LIST_VENDORS", () =>
    vendorsService.getVendors()
  );
  const vendorSelectFormat = vendorsData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadVendorOptions = (values, callBack) => {
    callBack(vendorSelectFormat);
  };

  const statsService = new DashboardService();

  const { data: statsData } = useSWR("GET_RECENET", () =>
    statsService.getRecentProductions()
  );

  const productionSelectFormat = statsData?.data?.map((b) => {
    return {
      value: b.ID,
      label: b.project_name,
    };
  });

  const loadProductionOptions = (values, callBack) => {
    callBack(productionSelectFormat);
  };

  const bankService = new BankService();

  const { data: bankData } = useSWR("LIST_BANKS", () => bankService.getBanks());

  const bankSelectFormat = bankData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const accountNumberSelectFormat = bankData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.AccountNumber,
    };
  });

  const loadBankOptions = (values, callBack) => {
    callBack(bankSelectFormat);
  };

  const departmentsService = new DepartmentsService();

  const { data: departmentsData } = useSWR("LIST_DEPARTMENTS", () =>
    departmentsService.getDepartments()
  );

  const departmentSelectFormat = departmentsData?.result?.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadDepartmentOptions = (values, callBack) => {
    callBack(departmentSelectFormat);
  };

  const periodsService = new PeriodsService();

  const { data: periodData } = useSWR("LIST_USERS", () =>
    periodsService.getPeriods()
  );

  const periodSelectFormat = periodData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadPeriodOptions = (values, callBack) => {
    callBack(periodSelectFormat);
  };

  const clientService = new ClientsService();

  const { data: clientData } = useSWR("LIST_CLIENTS", () =>
    clientService.getClients({ search: "", pageLimit: 25, offset: 0 })
  );

  const clientSelectFormat = clientData?.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

  const loadClientOptions = (values, callBack) => {
    callBack(clientSelectFormat);
  };

  const [status, setStatus] = useState("");

  const purchaseOrderService = new PurchaseOrderService();

  const handleonSave = () => {
    handleSubmit(onSubmit)();
    setStatus("SAVE");
  };

  const handleonAudit = () => {
    handleSubmit(onSubmit)();
    setStatus("AUDIT");
  };

  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dd = String(currentDate.getDate()).padStart(2, "0");
    const yyyy = String(currentDate.getFullYear());

    // Set the value of the input to the current date in "MM/DD/YY" format
    setTodayDate(`${mm}/${dd}/${yyyy}`);
  }, []);

  const handleonPost = () => {
    handleSubmit(onSubmit)();
    setStatus("POSTED");
  };

  const onSubmit = (data) => {
    const backendFormat = {
      vendorID: data.vendor.value,
      status: status,
      number: parseFloat(data.poNumber),
      description: data.poDescription,
      bankID: data.bank.value,
      currencyID: data.currency.value,
      periodID: data.period.value,
      projectID: data.production.value,
      companyID: data.client.value,
      effectiveDate: moment(data.poEffectiveDate).format(
        "YYYY-MM-DDTHH:mm:ss[Z]"
      ),
      date: moment(data.poDate).format("YYYY-MM-DDTHH:mm:ss[Z]"),
      amount: data.poAmount,
      debitsAmount: totalPositiveAmount,
      creditsAmount: totalNegativeAmount,
    };

    purchaseOrderService
      .createPurchaseOrder(backendFormat)
      .then(() => {
        toast.success("Purchase Order Created successfully");
        // router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });

    const backendFormatForTransactionLines = array
      .filter(
        (obj) => obj.Amount !== undefined && obj.Description !== undefined
      )
      .map((obj) => ({
        amount: obj.Amount,
        setID: obj.SetValue || undefined,
        taxCodeID: obj.TaxcodeValue || undefined,
        locationID: obj.LocationValue || undefined,
        description: obj.Description,
        seriesID: obj.SeriesValue || undefined,
        accountId: obj.AccountNumberValue,
      }));

    purchaseOrderService
      .createTransactionLines(backendFormatForTransactionLines)
      .then(() => {
        toast.success("Purchase Order Lines successfully");
        router.back();
      })
      .catch((error) => {
        toast.error(error?.error);
      });
  };

  const dispatch = useDispatch();

  const router = useRouter();

  const [accountId, setAccountId] = useState();

  const fetchBankDetails = (accountId) => bankService.bankDetails(accountId);

  const { data: bankDetailsData } = useSWR(
    accountId ? ["BANK_DETAILS", accountId] : null,
    () => fetchBankDetails(accountId)
  );

  const ReactSelectEditor = ({
    value,
    onValueChange,
    options,
    rowIndex,
    columnField,
  }) => {
    const handleChange = (selectedOption) => {
      const newValue = selectedOption ? selectedOption.value : null;
      const label = selectedOption ? selectedOption.label : null;

      onValueChange(rowIndex, columnField, newValue, label);
    };

    return (
      <div style={{ width: "100%" }}>
        <Select value={value} onChange={handleChange} options={options} />
      </div>
    );
  };

  const handleValueChange = (rowIndex, columnField, newValue, label) => {
    const updatedArray = array.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          [columnField]: label,
          [`${columnField}Value`]: newValue,
          AccountName: getAccountNameByAccountNumber(),
        };
      }
      return row;
    });
    setArray(updatedArray);
    {
      columnField === "AccountNumber" ? setAccountId(newValue) : null;
    }
  };

  const getAccountNameByAccountNumber = () => {
    const accountName = bankDetailsData?.Name;

    return accountName || null;
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

  const setsService = new SetsService();

  const { data: setsData } = useSWR("LIST_SETS", () => setsService.getSets());

  const setsSelectFormat = setsData?.result.map((b) => {
    return {
      value: b.ID,
      label: b.Name,
    };
  });

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

  const taxcodesService = new TaxCodesService();

  const { data: taxcodesData } = useSWR("LIST_TAXCODES", () =>
    taxcodesService.getTaxCodes()
  );

  const taxcodeSelectFormat = taxcodesData?.data.map((b) => {
    return {
      value: b.ID,
      label: b.Code,
    };
  });

  const columnDefs = [
    {
      headerName: "S.no",
      maxWidth: 70,
      minWidth: 70,
      editable: false,
      field: "index",
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
        border: "1px solid #CCCCCC",
        margin: "10px",
        width: "37px",
        maxWidth: "37px",
        height: "34px",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        text: "center",
      },
      headerClass: "custom-header-class",
      cellEditor: "agTextCellEditor",
    },

    {
      headerName: "Account Number",
      field: "AccountNumber",
      minWidth: 140,
      sortable: true,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
        border: "1px solid #CCCCCC",
        margin: "10px",
        width: "122px",
        maxWidth: "122px",
        height: "34px",
        borderRadius: "4px",
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      headerClass: "custom-header-class",
      cellEditor: ReactSelectEditor,
      cellEditorParams: {
        options: accountNumberSelectFormat,
        onValueChange: handleValueChange,
        columnField: "AccountNumber",
      },
    },

    {
      headerName: "Account Name",
      field: "AccountName",
      minWidth: 140,
      sortable: true,
      editable: false,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
        border: "1px solid #CCCCCC",
        margin: "10px",
        width: "122px",
        maxWidth: "122px",
        height: "34px",
        borderRadius: "4px",
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      headerClass: "custom-header-class",
      cellEditor: "agTextCellEditor",
    },

    {
      headerName: "Description",
      minWidth: 140,
      field: "Description",
      sortable: true,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
        border: "1px solid #CCCCCC",
        margin: "10px",
        width: "122px",
        maxWidth: "122px",
        height: "34px",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      headerClass: "custom-header-class",
      cellEditor: "agTextCellEditor",
    },

    {
      headerName: "Amount",
      field: "Amount",
      minWidth: 140,
      sortable: true,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
        border: "1px solid #CCCCCC",
        margin: "10px",
        width: "122px",
        maxWidth: "122px",
        height: "34px",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },

      headerClass: "custom-header-class",
      cellEditor: "agNumberCellEditor",
    },

    {
      headerName: "Set",
      field: "Set",
      maxWidth: 100,
      minWidth: 100,

      sortable: true,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
        border: "1px solid #CCCCCC",
        margin: "10px",
        width: "82px",
        maxWidth: "82px",
        height: "34px",
        borderRadius: "4px",
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      headerClass: "custom-header-class",
      cellEditor: ReactSelectEditor,
      cellEditorParams: {
        options: setsSelectFormat,
        onValueChange: handleValueChange,
        columnField: "Set",
      },
    },

    {
      headerName: "Series",
      field: "Series",
      minWidth: 130,
      sortable: true,
      editable: true,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
        border: "1px solid #CCCCCC",
        margin: "10px",
        width: "115px",
        maxWidth: "115px",
        height: "34px",
        borderRadius: "4px",
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      headerClass: "custom-header-class",
      cellEditor: ReactSelectEditor,
      cellEditorParams: {
        options: seriesSelectFormat,
        onValueChange: handleValueChange,
        columnField: "Series",
      },
    },

    {
      headerName: "Location",
      field: "Location",
      sortable: true,
      minWidth: 100,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
        border: "1px solid #CCCCCC",
        margin: "10px",
        width: "87px",
        maxWidth: "87px",
        height: "34px",
        borderRadius: "4px",
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      headerClass: "custom-header-class",
      cellEditor: ReactSelectEditor,
      cellEditorParams: {
        options: locationsSelectFormat,
        onValueChange: handleValueChange,
        columnField: "Location",
      },
    },

    {
      headerName: "Tax Code",
      field: "Taxcode",
      sortable: true,
      minWidth: 110,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
        border: "1px solid #CCCCCC",
        margin: "10px",
        width: "97px",
        maxWidth: "97px",
        height: "34px",
        borderRadius: "4px",
        overflow: "visible",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      headerClass: "custom-header-class",
      cellEditor: ReactSelectEditor,
      cellEditorParams: {
        options: taxcodeSelectFormat,
        onValueChange: handleValueChange,
        columnField: "Taxcode",
      },
    },

    {
      headerName: "Options",
      field: "id",
      minWidth: 100,
      editable: false,
      cellRenderer: ActionsButton,
      cellStyle: {
        fontSize: "12px",
        fontWeight: "400",
      },
      headerClass: "custom-header-class",
    },
  ];

  const defaultLength = 10;
  const [array, setArray] = useState(new Array(defaultLength).fill(""));
  const [copiedObject, setCopiedObject] = useState(null);

  const totalAmount = array
    .filter((obj) => obj && typeof obj.Amount === "number")
    .reduce((sum, obj) => sum + obj.Amount, 0);

  const totalNegativeAmount = array
    .filter((obj) => obj && typeof obj.Amount === "number" && obj.Amount < 0)
    .reduce((sum, obj) => sum + Math.abs(obj.Amount), 0);

  const totalPositiveAmount = array
    .filter((obj) => obj && typeof obj.Amount === "number" && obj.Amount >= 0)
    .reduce((sum, obj) => sum + obj.Amount, 0);

  const handleCopy = (index) => {
    const copiedObj = { ...array[index] };
    setCopiedObject(copiedObj);
  };

  const handlePaste = (index) => {
    if (copiedObject) {
      const newArray = [...array];
      newArray[index] = { ...copiedObject };
      setArray(newArray);
    }
  };

  const handleAdd = () => {
    setArray([...array, ""]);
  };

  const handleDelete = (index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  const handleDuplicate = (index) => {
    const newArray = [...array];

    newArray.splice(index + 1, 0, { ...array[index] });

    setArray(newArray);
  };

  return (
    <div className="my-3">
      <AddVendorPopup />
      <AddMoreLinesPopup array={array} setArray={setArray} />
      <ImportExcelPopup array={array} setArray={setArray} />
      <SplitAmountPopup array={array} setArray={setArray} />

      <div>
        <div className="d-flex justify-content-between">
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              All Purchase order
            </div>

            <div>
              <div
                style={{
                  fontFamily: "Segoe UI",
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "50px",
                  textAlign: "left",
                }}
              >
                Create New Purchase order
              </div>
            </div>
          </div>
          <div className="d-flex my-auto " style={{ gap: "5px" }}>
            <Button
              onClick={() => router.back()}
              style={{
                height: "30px",
                color: "#2D2C2C",
                backgroundColor: "transparent",
                border: "none",
              }}
              size="sm"
              outline
            >
              Dismiss
            </Button>
            <Button
              style={{
                height: "30px",
                color: "#2D2C2C",
                borderColor: "#00AEEF",
                backgroundColor: "#ffffff",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              size="sm"
              onClick={handleonSave}
            >
              Save
            </Button>

            {status === "SAVE" ? (
              <Button
                style={{
                  height: "30px",
                  color: "#2D2C2C",
                  borderColor: "#00AEEF",
                  backgroundColor: "#ffffff",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                size="sm"
                onClick={handleonAudit}
              >
                Audit
              </Button>
            ) : (
              <Button
                style={{
                  height: "30px",
                  color: "#C9C9C9",
                  borderColor: "#C9C9C9",

                  borderWidth: "1px",
                  backgroundColor: "#ffffff",
                  borderStyle: "solid",
                }}
                size="sm"
              >
                Audit
              </Button>
            )}

            <Button
              onClick={handleonPost}
              style={{
                height: "30px",
                backgroundColor: "#00AEEF",
                color: "#FFF",
                borderColor: "#00AEEF",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              size="sm"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <div
        style={{
          // padding: "30.42px 60.85px 0 60.85px",
          gap: "60.85px",
        }}
      >
        <div>
          <div>
            <Form
              className="d-flex flex-column"
              style={{ gap: "10px", fontSize: "12px", fontWeight: "400" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Card style={{ border: "none" }}>
                <CardBody>
                  <div className="d-flex flex-column" style={{ gap: "10px" }}>
                    <div
                      style={{
                        color: "#030229",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Vendor information
                    </div>

                    <Row className="">
                      <Col sm="4">
                        <div className="d-flex justify-content-between">
                          <Label style={{ color: "#030229", height: "17px" }}>
                            Select Vendor
                          </Label>
                          <Button
                            onClick={() => dispatch(openAddVendorPopup("open"))}
                            className="d-flex align-items-center"
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid #fff",
                              borderRadius: "4px",
                              color: "#000",
                              fontSize: "12px",
                              fontWeight: "400",
                              height: "17px",
                              gap: "5px",
                            }}
                          >
                            <Image src={plusIcon} alt="" />
                            Add Vendor
                          </Button>
                        </div>
                        <Controller
                          name="vendor"
                          rules={{ required: "Vendor is required" }}
                          control={control}
                          render={({ field }) => (
                            <AsyncSelect
                              {...field}
                              isClearable={true}
                              className="react-select"
                              classNamePrefix="select"
                              loadOptions={loadVendorOptions}
                              placeholder="Select Vendor"
                              defaultOptions={vendorSelectFormat}
                              // onChange={handleVendorChange}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  height: "34px",
                                  minHeight: "34px",
                                }),
                              }}
                            />
                          )}
                        />
                        {errors.vendor && (
                          <span style={{ color: "red" }}>
                            {errors.vendor.message as React.ReactNode}
                          </span>
                        )}
                      </Col>

                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>
                          Vendor Address
                        </Label>
                        <Controller
                          name="VendorAddress"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              disabled={true}
                              defaultValue={vendorDetailsData?.defaultAddress}
                              name="address"
                              id="address"
                              placeholder="Vendor Address"
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                      </Col>

                      <Col sm="4">
                        <Label style={{ color: "#030229" }}>Vendor Type</Label>
                        <Controller
                          name="vendorType"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              name="type"
                              id="type"
                              placeholder="Vendor Type"
                              disabled={true}
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "34px",
                              }}
                            />
                          )}
                        />
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Card style={{ border: "none" }}>
                <CardBody>
                  <div className="d-flex flex-column" style={{ gap: "10px" }}>
                    <div
                      style={{
                        color: "#030229",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      PO Details
                    </div>
                    <div>
                      {" "}
                      <div
                        className="d-flex flex-column"
                        style={{ gap: "10px" }}
                      >
                        <Row>
                          <Col sm="4">
                            <Label style={{ color: "#030229" }}>
                              PO Number
                            </Label>
                            <Controller
                              name="poNumber"
                              rules={{
                                required: "PO Number is required",
                              }}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="number"
                                  invalid={errors.poNumber && true}
                                  {...field}
                                  placeholder="Enter PO Number"
                                  min={1}
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    height: "34px",
                                  }}
                                />
                              )}
                            />
                            {errors.poNumber && (
                              <span style={{ color: "red" }}>
                                {errors.poNumber.message as React.ReactNode}
                              </span>
                            )}
                          </Col>
                          <Col sm="4">
                            <Label style={{ color: "#030229" }}>
                              PO Description
                            </Label>
                            <Controller
                              name="poDescription"
                              rules={{
                                required: "PO Description is required",
                              }}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="text"
                                  invalid={errors.poDescription && true}
                                  {...field}
                                  placeholder="Enter PO Description"
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    height: "34px",
                                  }}
                                />
                              )}
                            />
                            {errors.poDescription && (
                              <span style={{ color: "red" }}>
                                {
                                  errors.poDescription
                                    .message as React.ReactNode
                                }
                              </span>
                            )}
                          </Col>
                          <Col sm="4">
                            <Label style={{ color: "#030229" }}>
                              PO Amount
                            </Label>
                            <Controller
                              name="poAmount"
                              rules={{
                                required: "PO Amount is required",
                              }}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="number"
                                  invalid={errors.poAmount && true}
                                  {...field}
                                  placeholder="Enter PO Amount"
                                  min={1}
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    height: "34px",
                                  }}
                                />
                              )}
                            />
                            {errors.poAmount && (
                              <span style={{ color: "red" }}>
                                {errors.poAmount.message as React.ReactNode}
                              </span>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="4">
                            <Label style={{ color: "#030229" }}>PO Date</Label>
                            <Controller
                              name="poDate"
                              rules={{
                                required: "PO Date is required",
                              }}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="date"
                                  defaultValue={todayDate}
                                  invalid={errors.poDate && true}
                                  {...field}
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    height: "34px",
                                  }}
                                />
                              )}
                            />
                            {errors.poDate && (
                              <span style={{ color: "red" }}>
                                {errors.poDate.message as React.ReactNode}
                              </span>
                            )}
                          </Col>
                          <Col sm="4">
                            <Label style={{ color: "#030229" }}>
                              PO Effective Date
                            </Label>
                            <Controller
                              name="poEffectiveDate"
                              rules={{
                                required: "PO Effective Date is required",
                              }}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="date"
                                  invalid={errors.poEffectiveDate && true}
                                  {...field}
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    height: "34px",
                                  }}
                                />
                              )}
                            />
                            {errors.poEffectiveDate && (
                              <span style={{ color: "red" }}>
                                {
                                  errors.poEffectiveDate
                                    .message as React.ReactNode
                                }
                              </span>
                            )}
                          </Col>
                          <Col sm="4">
                            <Label style={{ color: "#030229" }}>
                              PO Expiry Date
                            </Label>
                            <Controller
                              name="poExpiryDate"
                              rules={{
                                required: "PO Expiry Date is required",
                              }}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  type="date"
                                  invalid={errors.poExpiryDate && true}
                                  {...field}
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    height: "34px",
                                  }}
                                />
                              )}
                            />
                            {errors.poExpiryDate && (
                              <span style={{ color: "red" }}>
                                {errors.poExpiryDate.message as React.ReactNode}
                              </span>
                            )}{" "}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card style={{ border: "none" }}>
                <CardBody>
                  <div className="d-flex flex-column" style={{ gap: "10px" }}>
                    <div
                      style={{
                        color: "#030229",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Other Information
                    </div>

                    <div className="d-flex flex-column" style={{ gap: "10px" }}>
                      <Row>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>
                            Client Name
                          </Label>
                          <Controller
                            name="client"
                            rules={{ required: "Client is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                loadOptions={loadClientOptions}
                                placeholder="Select Client"
                                defaultOptions={clientSelectFormat}
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.client && (
                            <span style={{ color: "red" }}>
                              {errors.client.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Production</Label>
                          <Controller
                            name="production"
                            rules={{ required: "Production is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                placeholder="Select Production"
                                loadOptions={loadProductionOptions}
                                defaultOptions={productionSelectFormat}
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.production && (
                            <span style={{ color: "red" }}>
                              {errors.production.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Bank</Label>
                          <Controller
                            name="bank"
                            rules={{ required: "Bank is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                loadOptions={loadBankOptions}
                                placeholder="Select Bank"
                                defaultOptions={bankSelectFormat}
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.bank && (
                            <span style={{ color: "red" }}>
                              {errors.bank.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Currency</Label>
                          <Controller
                            name="currency"
                            control={control}
                            render={({ field }) => (
                              // <AsyncSelect
                              //   {...field}
                              //   isClearable={true}
                              //   className="react-select"
                              //   classNamePrefix="select"
                              //   loadOptions={loadCurrencyOptions}
                              //   placeholder="Select Currency"
                              //   defaultOptions={currenciesSelectFormat}
                              //   styles={{
                              //     control: (provided) => ({
                              //       ...provided,
                              //       height: "34px",
                              //       minHeight: "34px",
                              //     }),
                              //   }}
                              // />

                              <Input
                                {...field}
                                type="text"
                                disabled={true}
                                value={
                                  bankDetailsForCurrencyData?.Currency.Name
                                }
                                name="address"
                                id="address"
                                placeholder="Currency"
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "400",
                                  height: "34px",
                                }}
                              />
                            )}
                          />
                        </Col>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Department</Label>
                          <Controller
                            name="department"
                            rules={{ required: "Department is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                loadOptions={loadDepartmentOptions}
                                placeholder="Select Department"
                                defaultOptions={departmentSelectFormat}
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.department && (
                            <span style={{ color: "red" }}>
                              {errors.department.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                        <Col sm="4">
                          <Label style={{ color: "#030229" }}>Period</Label>
                          <Controller
                            name="period"
                            rules={{ required: "Period is required" }}
                            control={control}
                            render={({ field }) => (
                              <AsyncSelect
                                {...field}
                                isClearable={true}
                                className="react-select"
                                classNamePrefix="select"
                                loadOptions={loadPeriodOptions}
                                placeholder="Select Period"
                                defaultOptions={periodSelectFormat}
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    height: "34px",
                                    minHeight: "34px",
                                  }),
                                }}
                              />
                            )}
                          />
                          {errors.period && (
                            <span style={{ color: "red" }}>
                              {errors.period.message as React.ReactNode}
                            </span>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Form>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <div className="mt-3 d-flex flex-column" style={{ gap: "10px" }}>
              <>
                <div
                  className="d-flex flex-column justify-content-center "
                  style={{ height: "46px" }}
                >
                  <Row>
                    <Col xl="6">
                      <div
                        className="d-flex align-items-center "
                        style={{ gap: "10px" }}
                      >
                        <div style={{ fontSize: "24px", fontWeight: "600" }}>
                          Total Amount{" "}
                        </div>
                        <div
                          style={{
                            width: "200px",
                            height: "34px",
                            fontSize: "21px",
                            fontWeight: "600",
                            borderColor: "#CCCCCC",
                            borderWidth: "1px",
                            color: "#000000",
                            borderRadius: "4px",
                          }}
                          className="border d-flex justify-content-between"
                        >
                          $
                          <span className=" text-end">
                            {totalAmount.toFixed(2)}
                          </span>
                        </div>

                        <div
                          className=" flex flex-column mb-2"
                          style={{ gap: "4px" }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#030229",
                              fontWeight: 600,
                            }}
                          >
                            Status
                          </p>
                          <p
                            style={{
                              backgroundColor: "#B5DEF0",
                              fontSize: "12px",
                              fontWeight: "400",
                              width: "43px",
                              height: "24px",
                              padding: "4px 8px",
                              borderRadius: "4px",
                            }}
                          >
                            Draft
                          </p>
                        </div>

                        <div
                          className=" flex flex-column mb-2"
                          style={{ gap: "4px" }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#030229",
                              fontWeight: 600,
                            }}
                          >
                            Credits
                          </p>
                          <p
                            style={{
                              backgroundColor: "#EBEBEB",
                              fontSize: "12px",
                              fontWeight: "400",
                              width: "77px",
                              height: "25px",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              gap: "10px",
                            }}
                          >
                            ${totalNegativeAmount}
                          </p>
                        </div>

                        <div
                          className=" flex flex-column mb-2"
                          style={{ gap: "4px" }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#030229",
                              fontWeight: 600,
                            }}
                          >
                            Debits
                          </p>
                          <p
                            style={{
                              backgroundColor: "#EBEBEB",
                              fontSize: "12px",
                              fontWeight: "400",
                              width: "77px",
                              height: "25px",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              gap: "10px",
                            }}
                          >
                            ${totalPositiveAmount}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col
                      xl="6"
                      className="d-flex justify-content-end align-items-center"
                      style={{ gap: "6px" }}
                    >
                      <Button
                        className=""
                        onClick={() => dispatch(openAddMoreLinesPopup("id"))}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          color: "#000",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        <Image
                          src={plusIcon}
                          alt=""
                          style={{ width: "14px", height: "14px" }}
                        />{" "}
                        Add more lines{" "}
                      </Button>

                      <Button
                        style={{
                          color: "#4C4C61",
                          fontSize: "14px",
                          backgroundColor: "transparent",
                          fontWeight: 400,
                          height: "34px",
                          border: "none",
                        }}
                      >
                        <Image
                          src={CopyIcon}
                          alt=""
                          style={{ width: "14px", height: "14px" }}
                        />{" "}
                        Paste Values
                      </Button>

                      <Button
                        onClick={() =>
                          dispatch(openImportFromExcelPurchaseOrderPopup("id"))
                        }
                        style={{
                          color: "#4C4C61",
                          fontSize: "14px",
                          backgroundColor: "#ffff",
                          fontWeight: 400,
                          height: "34px",
                        }}
                      >
                        <Image
                          src={ImportExcelIcon}
                          alt=""
                          style={{ width: "14px", height: "14px" }}
                        />{" "}
                        Import Excel
                      </Button>
                    </Col>
                  </Row>
                </div>
              </>
              <GridTableRowEdit
                rowData={array}
                columnDefs={columnDefs}
                pageSize={10}
                searchText={undefined}
                setArray={setArray}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            gap: 4,
            marginTop: "20px",
          }}
        >
          <Button
            className=""
            onClick={() => dispatch(openAddMoreLinesPopup("id"))}
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              color: "#000",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            <Image
              src={plusIcon}
              alt=""
              style={{ width: "14px", height: "14px" }}
            />{" "}
            Add more lines{" "}
          </Button>

          <Button
            style={{
              color: "#4C4C61",
              fontSize: "14px",
              fontWeight: 400,
              backgroundColor: "transparent",
              height: "34px",
              border: "none",
            }}
          >
            <Image
              src={CopyIcon}
              alt=""
              style={{ width: "14px", height: "14px" }}
            />{" "}
            Paste Values
          </Button>

          <Button
            onClick={() =>
              dispatch(openImportFromExcelPurchaseOrderPopup("id"))
            }
            style={{
              color: "#4C4C61",
              fontSize: "14px",
              backgroundColor: "#ffff",
              fontWeight: 400,
              height: "34px",
            }}
          >
            <Image
              src={ImportExcelIcon}
              alt=""
              style={{ width: "14px", height: "14px" }}
            />{" "}
            Import Excel
          </Button>
        </div>
        <hr />
        <Row>
          <Col xl="8">
            <Label style={{ color: "#030229" }}>Additional Notes</Label>
            <Input
              type="textarea"
              name="AdditionalNote"
              id="AdditionalNote"
              style={{
                height: "80px",
                width: "500px",
                borderColor: "#CCCCCC",
                borderWidth: "1px",
                borderStyle: "solid",
                fontSize: "14px",
                fontWeight: "400",
              }}
              placeholder="Enter Additional Note"
            />
          </Col>
          <Col xl="4" className="d-flex flex-column">
            <div>
              {" "}
              <Label style={{ color: "#030229" }}>
                <Image
                  src={attchFileIcon}
                  alt=""
                  style={{ height: "14px", width: "14px" }}
                />
                Attachments
              </Label>
              <FileUpload />
            </div>
          </Col>
        </Row>

        <hr />
        <div style={{ display: "flex", justifyContent: "end", gap: 4 }}>
          <Button
            style={{
              height: "30px",
              color: "#2D2C2C",
              borderColor: "#00AEEF",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            size="sm"
            outline
          >
            Save as Draft
          </Button>
          <Button
            style={{
              height: "30px",
              borderColor: "#00AEEF",
              borderWidth: "1px",
              borderStyle: "solid",
              backgroundColor: "#00AEEF",
              color: "#FFF",
            }}
            size="sm"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;

import { useRef } from "react";
import AddMoreLinesPopup from "../AddMoreLinesPopup";
import ImportExcelPopup from "./ImportExcelPopup";
import GridTableRowEdit from "components/grid-table-row-edit/gridTable";
import SplitAmountPopup from "../SplitAmountPopup";
import useSWR from "swr";
import {
  BankService,
  ClientsService,
  DashboardService,
  DepartmentsService,
  LocationsService,
  PeriodsService,
  PurchaseOrderService,
  SeriesService,
  SetsService,
  TaxCodesService,
  VendorsService,
} from "services";
import { toast } from "react-toastify";
import moment from "moment";

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setSelectedFileName(selectedFile ? selectedFile.name : "");
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div
        className="d-flex justify-content-between cursor-pointer"
        onClick={handleUploadButtonClick}
        style={{
          width: "400px",
          height: "38px",
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingRight: "12px",
          paddingLeft: "12px",
          fontSize: "12px",
          fontWeight: "400",
          borderRadius: "4px",
          border: "1px solid",
          borderColor: "#CCCCCC",
        }}
      >
        {!selectedFileName && <p>Attach files</p>}
        {selectedFileName && <p> {selectedFileName}</p>}
        <div
          style={{
            paddingTop: "2px",
            paddingBottom: "2px",
            paddingRight: "4px",
            paddingLeft: "4px",
            borderRadius: "4px",
          }}
          className="border"
        >
          Upload{" "}
        </div>
      </div>

      {/* Display selected file name */}
    </div>
  );
};
