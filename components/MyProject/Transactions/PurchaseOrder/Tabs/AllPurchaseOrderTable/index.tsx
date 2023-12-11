import React from "react";
import GridTable from "components/grid-tables/gridTable";
import Image from "next/image";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIcon from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import approveIcon from "assets/myIcons/check_circle.svg";

import detailsIocn from "assets/myIcons/list.svg";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import { openDeletePurchaseOrderPopup } from "redux/slices/mySlices/transactions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { PurchaseOrderService } from "services";
import useSWR from "swr";
import moment from "moment";

const AllPurchaseTable = () => {
  const searchText = "";

  const purchaseOrderService = new PurchaseOrderService();

  const { data: purchaseOrdersData } = useSWR(
    ["LIST_PURCHASE_ORDERS", searchText],
    () => purchaseOrderService.getPurchaseOrders()
  );

  const dataSource = purchaseOrdersData && purchaseOrdersData.data;

  const router = useRouter();
  const dispatch = useDispatch();

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

  const ActionsButton = (props) => {
    const id = `action-popover-${props.value}`;

    const Action = ({ icon, name, action }) => {
      return (
        <div onClick={action} className="d-flex align-items-center gap-2">
          <Image src={icon} alt={name} />
          <p>{name}</p>
        </div>
      );
    };
    return (
      <div>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <Image
              src={actionIcon}
              alt=""
              width={14}
              id={id}
              style={{ marginLeft: "20px" }}
            />
          </DropdownToggle>
          <DropdownMenu end container="body">
            <DropdownItem
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                router.push({
                  pathname: `/transactions/edit-purchase-order/1`,
                });
              }}
            >
              <Action icon={detailsIocn} name={"View Details"} action={""} />
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                router.push({
                  pathname: `/transactions/edit-purchase-order/1`,
                });
              }}
            >
              <Action icon={editIcon} name={"Edit"} action={""} />
            </DropdownItem>

            <DropdownItem
              className="w-100"
              onClick={() =>
                router.push(
                  `/transactions/approve-purchase-order/${props?.data?.ID}`
                )
              }
            >
              <Action icon={approveIcon} name={"Approve"} action={""} />
            </DropdownItem>
            <DropdownItem
              className="w-100 cursor-pointer"
              onClick={() =>
                dispatch(openDeletePurchaseOrderPopup(props.data?.ID))
              }
            >
              <Action icon={deleteIcon} name={"Delete"} action={""} />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

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

      headerClass: "custom-header-class ",
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
      headerName: "Actions",
      field: "ID",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
  ];

  return (
    <div className="my-5 m-auto" style={{ width: "100%" }}>
      <GridTable
        rowData={dataSource}
        columnDefs={columnDefs}
        pageSize={10}
        searchText={searchText}
      />
    </div>
  );
};

export default AllPurchaseTable;
