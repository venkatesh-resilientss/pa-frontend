import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback } from "react";

const GridTable = ({ rowData, columnDefs, pageSize, searchText, pageNumber, setPageNumber }: any) => {
  const gridRef = useRef(null);

  const [isGridReady, setIsGridReady] = useState(false);

  /** Search */
  useEffect(() => {
    if (isGridReady) gridRef.current.api.setQuickFilter(searchText);
  }, [searchText]);

  /**Row update */
  useEffect(() => {
    if (isGridReady) {
      gridRef.current.api.setRowData(rowData?.data || [])
    };
  }, [rowData]);

  const gridOptions = {
    // Enable pagination
    // pagination: true,
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
        rowData={rowData.data || [null]}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        onGridReady={gridReady}
        onFirstDataRendered={sizeColumnsToFit}
        // suppressPaginationPanel={true}
        {...rowStyles}
      />
      {<div className="d-flex flex-row-reverse gap-5 my-3">
        <div className="d-flex gap-3">
          <img src="/previous-page.svg" className="mt-1" width={8} alt="" onClick={() => { setPageNumber(pageNumber - 1) }} />
          page {pageNumber} of {Math.ceil(rowData?.total_records / pageSize) || 0}
          <img src="/next-page.svg" width={8} className="mt-1" alt="" onClick={() => { setPageNumber(pageNumber + 1) }} />
        </div>
        <div>
          {((pageNumber - 1) * pageSize) + 1} to {((pageNumber - 1) * pageSize) + rowData?.data?.length || 0} of {rowData?.total_records || 0}
        </div>
      </div>}
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
