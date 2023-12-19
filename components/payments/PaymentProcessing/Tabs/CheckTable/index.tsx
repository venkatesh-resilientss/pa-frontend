import React from "react";
import PaymentsGridTable from "@/components/payments-grid-table/gridTable";

const CheckTable = () => {
  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400", color: "#24AAE2" },
      headerClass: "custom-header-class",
      checkboxSelection: true,
      headerCheckboxSelection: true,
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
      width: "300",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Amount",
      field: "amount",
      width: "300",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Bank",
      field: "bank",
      width: "230",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
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
        status: "Processed",
      },
      {
        id: "123",
        invoiceNumber: "INV-001",
        vendor: "XYZ Company",
        amount: 1000.0,
        bank: "ABC Bank",
        paymentType: "Wire Transfer",
        processedDate: "2023-12-07",
        status: "Processed",
      },
      {
        id: "123",
        invoiceNumber: "INV-001",
        vendor: "XYZ Company",
        amount: 1000.0,
        bank: "ABC Bank",
        paymentType: "Wire Transfer",
        processedDate: "2023-12-07",
        status: "Processed",
      },
      {
        id: "123",
        invoiceNumber: "INV-001",
        vendor: "XYZ Company",
        amount: 1000.0,
        bank: "ABC Bank",
        paymentType: "Wire Transfer",
        processedDate: "2023-12-07",
        status: "Processed",
      },
    ],
  };

  return (
    <div className="my-5 m-auto" style={{ width: "100%" }}>
      <PaymentsGridTable
        rowData={rowData}
        columnDefs={columnDefs}
        pageSize={10}
      />
    </div>
  );
};

export default CheckTable;
