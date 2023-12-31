import React from "react";
import GridTable from "components/grid-tables/gridTable";


const TotalAmountTable = () => {



  const columnDefs = [
    {
      headerName: "S.no",
      field: "po_number",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400", color: "#24AAE2" },
    },
    {
      headerName: "Account Number",
      field: "description",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
    },
    {
      headerName: "Account Name",
      field: "vendor",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
    },
    {
      headerName: "Description",
      field: "issued_on",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
    },
    {
      headerName: "Amount",
      field: "orginal_amount",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
    },

    {
      headerName: "Set",
      field: "approval_status",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
    },

    {
      headerName: "Series",
      field: "approval_status",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
    },

    {
      headerName: "Location",
      field: "approval_status",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
    },

    {
      headerName: "Tax Code",
      field: "approval_status",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
    },
  ];

  const rowData = [
    {
      po_number: 97652,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      actions: "",
      status: "open",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      orginal_amount: "$576.28",
      approval_status: "Fully Approved",
    },
    {
      po_number: 93457,
      title: "iPhone X",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      approval_status: "Fully Approved",

      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      actions: "",
      status: "open",
      orginal_amount: "$576.28",
    },
    {
      po_number: 93457,
      title: "Samsung Universe 9",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      approval_status: "Fully Approved",

      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      actions: "",
      status: "posted",
      orginal_amount: "$576.28",
    },
    {
      po_number: 93457,
      title: "OPPOF19",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      approval_status: "Fully Approved",

      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      actions: "",
      status: "open",
      orginal_amount: "$576.28",
    },
    {
      po_number: 93457,
      title: "Huawei P30",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      approval_status: "Fully Approved",

      description:
        "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: "Huawei",
      actions: "",
      orginal_amount: "$576.28",

      status: "posted",
    },
    {
      po_number: 93457,
      title: "MacBook Pro",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      orginal_amount: "$576.28",
      approval_status: "Fully Approved",

      description:
        "MacBook Pro 2021 with mini-LED display may launch between September, November",
      price: 1749,
      discountPercentage: 11.02,
      rating: 4.57,
      stock: 83,
      brand: "Apple",
      category: "laptops",
      status: "open",
    },
    {
      po_number: 93457,
      title: "Samsung Galaxy Book",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      approval_status: "Fully Approved",

      description:
        "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
      price: 1499,
      discountPercentage: 4.15,
      rating: 4.25,
      stock: 50,
      brand: "Samsung",
      category: "laptops",
      status: "open",
    },
  ];

  return (
    <div className="my-5 m-auto" style={{ width: "100%" }}>
      <GridTable
        rowData={rowData}
        columnDefs={columnDefs}
        pageSize={4} searchText={undefined}
        // components={{
        //   input: Input, // Use Input from reactstrap for editable fields
        // }}
      />
    </div>
  );
};

export default TotalAmountTable;
