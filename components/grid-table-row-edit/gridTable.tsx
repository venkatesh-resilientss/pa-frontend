import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useCallback } from "react";

const GridTableRowEdit = ({
  rowData,
  columnDefs,
  pageSize,
  searchText,
  setArray,
}) => {
  const gridRef = useRef(null);

  const [isGridReady, setIsGridReady] = useState(false);

  /** Search */
  useEffect(() => {
    if (isGridReady) gridRef.current.api.setQuickFilter(searchText);
  }, [searchText]);

  /**Row update */
  useEffect(() => {
    if (isGridReady) gridRef.current.api.setRowData(rowData);
  }, [rowData]);

  const gridOptions = {
    // Enable pagination
    pagination: false,
    // Set the number of rows per page
    paginationPageSize: pageSize, // Change this to your desired page size
  };

  const gridReady = useCallback(() => {
    setIsGridReady(true);

    /**
     * Initialize Pagination
     */
    // initPagination();
  }, []);

  const sizeColumnsToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onCellValueChanged = (params) => {
    const newData = params.api.getModel().rowsToDisplay.map((row) => row.data);
    setArray(newData);
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      cellDataType: false,
      resizable: false,
    };
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%" }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        gridOptions={gridOptions}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        singleClickEdit={true}
        onCellValueChanged={onCellValueChanged}
        // onRowValueChanged={onRowValueChanged}
        domLayout="autoHeight"
        onGridReady={gridReady}
        onFirstDataRendered={sizeColumnsToFit}
      />
    </div>
  );
};

export default GridTableRowEdit;
