import React from "react";
import GridTable from "components/grid-tables/gridTable";
import Image from "next/image";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
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
import { useDispatch } from "react-redux";
import { openDeleteAccountPayablePopup } from "redux/slices/mySlices/transactions";
import { useRouter } from "next/router";

const AllAccountPayablesTable = () => {
  const dispatch = useDispatch();

  const router = useRouter();

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

    const Action = ({ icon, name }) => {
      return (
        <div className="d-flex align-items-center gap-2">
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
                  pathname: `/transactions/edit-account-payable/${props.data?.ID}`,
                });
              }}
            >
              <Action icon={detailsIocn} name={"View Details"} />
            </DropdownItem>
            <DropdownItem
              // tag="a"
              // href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                router.push({
                  pathname: `/transactions/edit-account-payable/${props.data?.ID}`,
                });
              }}
            >
              <Action icon={editIocn} name={"Edit"} />
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() =>
                router.push(
                  `/transactions/approve-account-payables/${props?.data?.ID}`
                )
              }
            >
              <Action icon={approveIcon} name={"Approve"} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100 cursor-pointer"
              onClick={() =>
                dispatch(openDeleteAccountPayablePopup(props.data?.ID))
              }
            >
              <Action icon={deleteIcon} name={"Delete"} />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "ID",
      field: "po_number",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400", color: "#24AAE2" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Invoice Number",
      field: "po_number",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Vendor",
      field: "vendor",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Currency",
      field: "currency",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Amount",
      field: "orginal_amount",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Issued On",
      field: "issued_on",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Status",
      field: "status",
      cellRenderer: StateBadge,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Options",
      field: "id",
      cellRenderer: ActionsButton,
      headerClass: "custom-header-class",

      cellStyle: {
        textAlign: "center",
      },
    },
  ];

  const rowData = [
    {
      po_number: 93457,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      actions: "",
      currency: "USD",
      status: "open",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      orginal_amount: "$576.28",
      approval_status: "Fully Approved",
    },
    {
      po_number: 93457,
      title: "iPhone X",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      approval_status: "Fully Approved",

      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      currency: "USD",

      stock: 34,
      brand: "Apple",
      actions: "",
      status: "open",
      orginal_amount: "$576.28",
    },
    {
      po_number: 93457,
      title: "Samsung Universe 9",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      currency: "USD",

      approval_status: "Fully Approved",

      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      actions: "",
      status: "posted",
      orginal_amount: "$576.28",
    },
    {
      po_number: 93457,
      title: "OPPOF19",
      currency: "USD",

      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      approval_status: "Fully Approved",

      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      actions: "",
      status: "open",
      orginal_amount: "$576.28",
    },
    {
      po_number: 93457,
      title: "Huawei P30",
      currency: "USD",

      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      approval_status: "Fully Approved",

      description:
        "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: "Huawei",
      actions: "",
      orginal_amount: "$576.28",

      status: "posted",
    },
    {
      po_number: 93457,
      title: "MacBook Pro",
      currency: "USD",

      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      orginal_amount: "$576.28",
      approval_status: "Fully Approved",

      description:
        "MacBook Pro 2021 with mini-LED display may launch between September, November",
      price: 1749,
      discountPercentage: 11.02,
      rating: 4.57,
      stock: 83,
      brand: "Apple",
      category: "laptops",
      status: "open",
    },
    {
      po_number: 93457,
      title: "Samsung Galaxy Book",
      vendor: "Winston George",
      issued_on: "06/24/2022, 20:12",
      approval_status: "Fully Approved",
      currency: "USD",

      description:
        "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
      price: 1499,
      discountPercentage: 4.15,
      rating: 4.25,
      stock: 50,
      brand: "Samsung",
      category: "laptops",
      status: "open",
    },
  ];

  return (
    <div className="my-5 m-auto" style={{ width: "100%" }}>
      <GridTable
        rowData={rowData}
        columnDefs={columnDefs}
        pageSize={4}
        searchText={undefined}
      />
    </div>
  );
};

export default AllAccountPayablesTable;
