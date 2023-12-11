import React from "react";
import GridTable from "components/grid-tables/gridTable";
import { Badge } from "reactstrap";
import { PurchaseOrderService } from "services";
import useSWR from "swr";
import moment from "moment";

const AwaitingOrderTable = () => {
  const StateBadge = (props) => {
    return (
      <div>
        {props.value === "open" ? (
          <Badge
            color="#C9EFFF"
            className="text-black"
            style={{
              width: "54px",
              height: "22px",
              borderRadius: "3px",
              backgroundColor: "#C9EFFF",
              fontSize: "14px",
              fontWeight: "400",
              paddingTop: "4px",
              paddingRight: "6px",
              paddingBottom: "4px",
              paddingLeft: "6px",
            }}
          >
            Open
          </Badge>
        ) : (
          <Badge
            color="#C9EFFF"
            className="text-black"
            style={{
              width: "54px",
              height: "22px",
              borderRadius: "3px",
              backgroundColor: "#C9EFFF",
              fontSize: "14px",
              fontWeight: "400",
              paddingTop: "4px",
              paddingRight: "6px",
              paddingBottom: "4px",
              paddingLeft: "6px",
            }}
          >
            Posted
          </Badge>
        )}
      </div>
    );
  };

  const ActionsButton = () => {
    return (
      <div>
        <Badge
          color="#F1F3FF"
          style={{
            fontSize: "14px",
            fontWeight: "400",
            borderRadius: "3px",
            backgroundColor: "#F1F3FF",
            color: "#3341CD",
          }}
        >
          Open AP
        </Badge>
      </div>
    );
  };

  const searchText = "";

  const purchaseOrderService = new PurchaseOrderService();

  const { data: purchaseOrdersData } = useSWR(
    ["LIST_PURCHASE_ORDERS", searchText],
    () => purchaseOrderService.getPurchaseOrders()
  );

  const dataSource = purchaseOrdersData && purchaseOrdersData.data;

  const columnDefs = [
    {
      headerName: "PO Number",
      field: "Number",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400", color: "#24AAE2" },
      headerClass: "custom-header-class",
    },

    {
      headerName: " PO Description",
      field: "Description",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Vendor",
      field: "Vendor.Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Issued On",
      field: "CreatedDate",
      cellRenderer: (params) => {
        const formattedDate = moment(params.CreatedDate).format(
          "MM/DD/YYYY, HH:mm"
        );
        return <span>{formattedDate}</span>;
      },
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Amount",
      field: "Amount",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Approval Status",
      field: "Status",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "PO Status",
      field: "status",
      cellRenderer: StateBadge,
      headerClass: "custom-header-class",
    },

    {
      headerName: "Action",
      field: "ID",
      cellRenderer: ActionsButton,
      headerClass: "custom-header-class",
    },
  ];

  return (
    <div className="my-5 m-auto" style={{ width: "100%" }}>
      <GridTable
        rowData={dataSource}
        columnDefs={columnDefs}
        pageSize={4}
        searchText={searchText}
      />
    </div>
  );
};

export default AwaitingOrderTable;
