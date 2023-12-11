import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

// import { BankService } from "services";
// const bankService = new BankService();

function AGGridTable({
  columnDefs,
  searchText,
  fetchData,
  pageSize,
  noDataPage,
  rerender,
  rowData
}) {
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef(null);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);

  const gridOptions = {
    pagination: true,
    paginationPageSize: pageSize,
    noRowsOverlay: loading ? "Loading..." : noData ? noDataPage : null,
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  useEffect(() => {
    const fetchDataAndSetGridData = async () => {
      try {
        setLoading(true);
        const page = 0;
        const data = await fetchData(page);

        if (data.data.length > 0) {
          setNoData(false);
          gridApi.setDatasource({
            getRows: async (params) => {
              const page = params.endRow - pageSize;
              const newData = await fetchData(page);
              params.successCallback(newData.data, newData.totalRecords);
              setLoading(false);
            },
          });
        } else {
          setNoData(true);
          setLoading(false); // Make sure to set loading to false in this case
          gridApi.setDatasource({
            getRows: async (params) => {
              params.successCallback([], 0);
              setLoading(false);
            },
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    if (gridApi) {
      fetchDataAndSetGridData();
    }
  }, [gridApi, searchText, rerender]);

  const rowStyles = {
    rowHeight: 68,
    rowStyle: {
      maxHeight: "58px",
    },
  };

  const sizeColumnsToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  return (
    <div className="App">
      <div className="ag-theme-alpine ag-style">
        <AgGridReact
          pagination={true}
          ref={gridRef}
          rowData={rowData}
          rowModelType={"infinite"}
          paginationPageSize={pageSize}
          cacheBlockSize={pageSize}
          onGridReady={onGridReady}
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          onFirstDataRendered={sizeColumnsToFit}
          defaultColDef={columnDefs}
          {...rowStyles}
        />
      </div>
    </div>
  );
}

export default AGGridTable;
