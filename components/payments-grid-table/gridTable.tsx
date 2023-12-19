import React from "react";
import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback } from "react";

const PaymentsGridTable = ({
  rowData,
  columnDefs,
  pageSize,
}: any) => {
  const gridRef = useRef(null);



  // const [selectedDataRow, setSelectedData] = useState([]);



  const handleSelectionChanged = () => {
    // const selectedRows = gridApi.getSelectedRows();
    // setSelectedData(selectedRows);
  };

  // const [isGridReady, setIsGridReady] = useState(false);

  // /** Search */
  // useEffect(() => {
  //   if (isGridReady) gridRef.current.api.setQuickFilter(searchText);
  // }, [searchText]);

  // /**Row update */
  // useEffect(() => {
  //   if (isGridReady) gridRef.current.api.setRowData(rowData?.data || []);
  // }, [rowData]);

  const gridOptions: any = {
    pagination: true,
    paginationPageSize: pageSize,
    rowSelection: "multiple",
    onSelectionChanged: handleSelectionChanged,
  };

  const sizeColumnsToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const rowStyles = {
    rowHeight: 68,
    rowStyle: {
      maxHeight: "58px",
    },
  };

  return (
    <div className="ag-theme-alpine" style={{ width: "100%" }}>
      <AgGridReact
        ref={gridRef}
        gridOptions={gridOptions} // Pass the grid options
        rowData={rowData?.data || []}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        suppressRowClickSelection={true}
        onFirstDataRendered={sizeColumnsToFit}
        // suppressPaginationPanel={true}
        {...rowStyles}
      />
    </div>
  );
};

export default PaymentsGridTable;
