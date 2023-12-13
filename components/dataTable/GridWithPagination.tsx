import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback } from "react";

const GridTable = (props) => {
  const { rowData, columnDefs, pageSize, searchText } = props;
  const { pageNumber, setPageNumber } = props;

  const gridRef = useRef<any>(null);

  const [isGridReady, setIsGridReady] = useState(false);

  /** Search */
  useEffect(() => {
    if (isGridReady) gridRef.current.api.setQuickFilter(searchText);
  }, [searchText]);

  /**Row update */
  useEffect(() => {
    if (isGridReady) {
      gridRef.current.api.setRowData(rowData?.data || []);
    }
  }, [rowData]);

  const gridOptions = {
    paginationPageSize: pageSize,
  };

  const gridReady = useCallback(() => {
    setIsGridReady(true);
  }, []);

  const rowStyles = {
    rowHeight: 68,
    rowStyle: {
      maxHeight: "58px",
    },
  };

  const sizeColumnsToFit = useCallback(() => {
    // gridRef.current.api.sizeColumnsToFit();
    gridRef.current.api.sizeColumnsToFit({
      defaultMinWidth: 100,
      columnLimits: [],
    });
  }, []);

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        ref={gridRef}
        gridOptions={gridOptions}
        rowData={rowData.data || [null]}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        onGridReady={gridReady}
        onFirstDataRendered={sizeColumnsToFit}
        {...rowStyles}
      />

      <div className="d-flex flex-row-reverse gap-5 my-3">
        <div className="d-flex gap-3">
          <img
            src="/previous-page.svg"
            className="mt-1"
            width={8}
            alt=""
            onClick={() => {
              if (pageNumber > 1)
                setPageNumber((pPN) => ({
                  ...pPN,
                  pageNumber: pageNumber - 1,
                }));
            }}
          />
          page {pageNumber} of{" "}
          {Math.ceil(rowData?.total_records / pageSize) || 0}
          <img
            src="/next-page.svg"
            width={8}
            className="mt-1"
            alt=""
            onClick={() => {
              if (pageNumber < rowData?.total_records)
                setPageNumber((pPN) => ({
                  ...pPN,
                  offset: pageNumber * pPN.limit,
                  pageNumber: pageNumber + 1,
                }));
            }}
          />
        </div>
        <div>
          {(pageNumber - 1) * pageSize + 1} to{" "}
          {(pageNumber - 1) * pageSize + rowData?.data?.length || 0} of{" "}
          {rowData?.total_records || 0}
        </div>
      </div>
    </div>
  );
};

export default GridTable;
