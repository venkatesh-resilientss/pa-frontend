import GridTable from "../GridTable/gridTable";

const PurchaseOrderTable = () => {
  const data = [
    {
      Account_Number: "10190900",
      Account_Name: "Example Company",
      Description: "This is a description.",
      Series: "A",
      Set: "Set1",
      Location: "City, Country",
      Tax_Code: "ABC123",
      Amount: 1000.0,
    },

    {
      Account_Number: "DE656D1244",
      Account_Name: "Example Company",
      Description: "This is a description.",
      Series: "A",
      Set: "Set1",
      Location: "City, Country",
      Tax_Code: "ABC123",
      Amount: 1000.0,
    },
    {
      Account_Number: "DE656D1244",
      Account_Name: "Example Company",
      Description: "This is a description.",
      Series: "A",
      Set: "Set1",
      Location: "City, Country",
      Tax_Code: "ABC123",
      Amount: 1000.0,
    },
    {
      Account_Number: "DE656D1244",
      Account_Name: "Example Company",
      Description: "This is a description.",
      Series: "A",
      Set: "Set1",
      Location: "City, Country",
      Tax_Code: "ABC123",
      Amount: 1000.0,
    },
    {
      Account_Number: "10190900",
      Account_Name: "Example Company",
      Description: "This is a description.",
      Series: "A",
      Set: "Set1",
      Location: "City, Country",
      Tax_Code: "ABC123",
      Amount: 1000.0,
    },

    {
      Account_Number: "10190900",
      Account_Name: "Example Company",
      Description: "This is a description.",
      Series: "A",
      Set: "Set1",
      Location: "City, Country",
      Tax_Code: "ABC123",
      Amount: 1000.0,
    },
  ];

  const columnDefs = [
    {
      headerName: "Account Number",
      field: "Account_Number",
      sortable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Account Name",
      field: "Account_Name",
      sortable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Description",
      field: "Description",
      sortable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Set",
      field: "Set",
      sortable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Series",
      field: "Series",

      sortable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Location",
      field: "Location",

      sortable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Tax Code",
      field: "Tax_Code",

      sortable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Amount",
      field: "Amount",

      sortable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
  ];

  return (
    <div className="section mt-4">
      <div className="mt-3">
        <GridTable
          rowData={data}
          columnDefs={columnDefs}
          pageSize={10}
          searchText={undefined}
        />
      </div>
    </div>
  );
};

export default PurchaseOrderTable;
