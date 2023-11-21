import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useCallback } from "react";

const GridTable = ({ rowData, columnDefs, pageSize }: any) => {
  const gridRef: any = useRef(null);
  const gridOptions = {
    // Enable pagination
    pagination: true,
    // Set the number of rows per page
    paginationPageSize: pageSize, // Change this to your desired page size
  };
  const gridReady = useCallback(() => {
    /**
     * Initialize Pagination
     */
    // initPagination();
  }, []);
  const sizeColumnsToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, [])
  const rowStyles = {
    rowHeight: 58,
    rowStyle: {
      maxHeight: "48px",
    },
  };
  /**
   * Page variables
   */
  const [pageCount, setPageCount] = useState(0);
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
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        onGridReady={gridReady}
        onFirstDataRendered={sizeColumnsToFit}
        // suppressPaginationPanel={true}
        {...rowStyles}
      />
      {/* 
        Custom Pagination
      */}
      {/* <div className="w-75 m-auto">
        {gridReady ? (
          <>
            <select
              name=""
              id=""
              // onChange={(e) => {
              //   changePage(parseInt(e.target.value));
              // }}
            >
              <option value={0} disabled>
                select page
              </option>
              {Array.from(Array(pageCount)).map((page, i) => {
                return (
                  <option value={i} key={`page-${i}`}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
          </>
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
};

export default GridTable;
