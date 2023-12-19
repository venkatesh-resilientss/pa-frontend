import React from "react";
import GridTable from "components/grid-tables/gridTable";
import CustomBadge from "@/components/Generic/CustomBadge";

const AllPaymentsTable = () => {
  const StateBadge = (props) => {
    const sateDir = {
      Printed: "success",
      Void: "danger",
      Draft: "warning",
    };
    return <CustomBadge bg={sateDir[props.value]} value={props.value} />;
  };

  const actionBadge = (props) => {
    return (
      <div>
        {props.data.status === "Draft" ? (
          <div
            style={{
              fontSize: "14px",
              fontWeight: "400",
              border: "none",
              padding: "5px",
              backgroundColor: "#F1F3FF",
              color: "#3341CD",
              borderRadius: "5px",
            }}
          >
            View Details
          </div>
        ) : props.data.status === "Printed" ? (
          <div
            style={{
              fontSize: "14px",
              fontWeight: "400",
              border: "none",
              padding: "5px",
              backgroundColor: "#F1F3FF",
              color: "#3341CD",
              borderRadius: "5px",
            }}
          >
            Make it void
          </div>
        ) : (
          <div>-</div>
        )}
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400", color: "#24AAE2" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Invoice Number",
      field: "invoiceNumber",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Vendor",
      field: "vendor",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Amount",
      field: "amount",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Bank",
      field: "bank",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Payment Type",
      field: "paymentType",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Processed",
      field: "processedDate",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Status",
      field: "status",
      cellRenderer: StateBadge,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Action",
      field: "id",
      cellRenderer: actionBadge,
      headerClass: "custom-header-class",
    },
  ];

  const rowData = {
    data: [
      {
        id: "123",
        invoiceNumber: "INV-001",
        vendor: "XYZ Company",
        amount: 1000.0,
        bank: "ABC Bank",
        paymentType: "Wire Transfer",
        processedDate: "2023-12-07",
        status: "Void",
      },
      {
        id: "123",
        invoiceNumber: "INV-001",
        vendor: "XYZ Company",
        amount: 1000.0,
        bank: "ABC Bank",
        paymentType: "Wire Transfer",
        processedDate: "2023-12-07",
        status: "Printed",
      },
      {
        id: "123",
        invoiceNumber: "INV-001",
        vendor: "XYZ Company",
        amount: 1000.0,
        bank: "ABC Bank",
        paymentType: "Wire Transfer",
        processedDate: "2023-12-07",
        status: "Draft",
      },
      {
        id: "123",
        invoiceNumber: "INV-001",
        vendor: "XYZ Company",
        amount: 1000.0,
        bank: "ABC Bank",
        paymentType: "Wire Transfer",
        processedDate: "2023-12-07",
        status: "Draft",
      },
    ],
  };

  return (
    <div className="my-5 m-auto" style={{ width: "100%" }}>
      <GridTable rowData={rowData} columnDefs={columnDefs} pageSize={10} />
    </div>
  );
};

export default AllPaymentsTable;
