import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback } from "react";

export default function GridWithPagination(props) {
  const { rowData, columnDefs, limit } = props;
  const { pageNumber, setPageNumber } = props;

  const gridRef = useRef<any>(null);

  const [isGridReady, setIsGridReady] = useState(false);

  useEffect(() => {
    if (isGridReady) gridRef.current.api.setRowData(rowData?.data || []);
  }, [rowData]);

  const gridOptions = { paginationPageSize: limit };

  const gridReady = useCallback(() => setIsGridReady(true), []);

  const rowStyles = { rowHeight: 68, rowStyle: { maxHeight: "58px" } };

  const sizeColumnsToFit = useCallback(
    () =>
      gridRef.current.api.sizeColumnsToFit({
        defaultMinWidth: 100,
        columnLimits: [],
      }),
    []
  );

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

      <div className="d-flex gap-3 my-3 align-items-center">
        <span className="ms-auto">
          {(pageNumber - 1) * limit + 1} to{" "}
          {(pageNumber - 1) * limit + rowData?.data?.length || 0} of{" "}
          {rowData?.total_records || 0}
        </span>
        <img
          src="/previous-page.svg"
          className={pageNumber > 1 ? "cr-p" : "cr-d op-5"}
          width={8}
          alt="previous"
          onClick={() => {
            if (pageNumber > 1)
              setPageNumber((pPN) => ({
                ...pPN,
                offset: (pageNumber - 2) * pPN.limit,
                pageNumber: pageNumber - 1,
              }));
          }}
        />
        <span className="mb-1">
          page {pageNumber} of {Math.ceil(rowData?.total_records / limit) || 0}
        </span>
        <img
          src="/previous-page.svg"
          width={8}
          className={
            pageNumber < Math.ceil(rowData?.total_records / limit)
              ? "cr-p rot-180"
              : "cr-d op-5 rot-180"
          }
          alt="next"
          onClick={() => {
            if (pageNumber < Math.ceil(rowData?.total_records / limit))
              setPageNumber((pPN) => ({
                ...pPN,
                offset: pageNumber * pPN.limit,
                pageNumber: pageNumber + 1,
              }));
          }}
        />
      </div>
    </div>
  );
}
