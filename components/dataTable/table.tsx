import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback } from "react";

const GridTable = ({ rowData, columnDefs, pageSize, searchText }: any) => {
  const gridRef = useRef(null);

  const [isGridReady, setIsGridReady] = useState(false);

  /** Search */
  useEffect(() => {
    if (isGridReady) gridRef.current.api.setQuickFilter(searchText);
  }, [searchText]);

  /**Row update */
  useEffect(() => {
    if (isGridReady) gridRef.current.api.setRowData(rowData?.data || []);
  }, [rowData]);

  const gridOptions = {
    // Enable pagination
    pagination: true,
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

  const rowStyles = {
    rowHeight: 68,
    rowStyle: {
      maxHeight: "58px",
    },
  };
  /**
   * Page variables
   */
  //  const changePage = (page: number) => {
  //   if (gridRef.current) {
  //     gridRef.current.api.paginationGoToPage(page);
  //   }
  // };

  //   const getPageCount = (page: number) => {
  //   if (gridRef.current) {
  //     gridRef.current.api.paginationGoToPage(page);
  //   }
  // };
  //   const initPagination = () => {
  //     // setGridReady(true);
  //     setPageCount(getPageCount());
  //   };
  return (
    <div className="ag-theme-alpine" style={{ width: "100%" }}>
      <AgGridReact
        ref={gridRef}
        gridOptions={gridOptions} // Pass the grid options
        rowData={rowData?.data || []}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        onGridReady={gridReady}
        onFirstDataRendered={sizeColumnsToFit}
        // suppressPaginationPanel={true}
        {...rowStyles}
      />
    </div>
  );
};

export default GridTable;
