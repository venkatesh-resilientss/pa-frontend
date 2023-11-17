import React, { useState } from "react";
import GridTable from "components/grid-tables/gridTable";
import Image from "next/image";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import approveIcon from "assets/myIcons/approveIcon.svg";

import detailsIocn from "assets/myIcons/list.svg";
import CustomBadge from "components/Generic/CustomBadge";
import {
  Popover,
  PopoverBody,
  PopoverHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { openDeleteSJornalEntryPopup } from "redux/slices/mySlices/transactions";

const AllJournalEntryTable = () => {
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
    const [open, setOpen] = useState(false);
    const toggle = () => {
      setOpen(!open);
    };
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
        <UncontrolledDropdown style={{ width: "112px", height: "98px" }}>
          <DropdownToggle tag="span">
            <Image src={actionIcon} alt="" width={14} id={id} />
          </DropdownToggle>
          <DropdownMenu
            end
            container="body"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"View Details"}
                action={() => {}}
              />
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Action icon={editIocn} name={"Edit"} action={() => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Action icon={approveIcon} name={"Approve"} action={() => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault(),
                  dispatch(openDeleteSJornalEntryPopup("delete"));
              }}
            >
              <Action icon={deleteIcon} name={"Delete"} action={() => {}} />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "Journal Entry ID",
      field: "po_number",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400", color: "#24AAE2" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Transaction Number",
      field: "po_number",
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
      headerName: "Amount",
      field: "amount",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Jornal Entry Date",
      field: "issued_on",
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
      headerName: "Status",
      field: "status",
      cellRenderer: StateBadge,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Action",
      field: "id",
      cellRenderer: ActionsButton,
      headerClass: "custom-header-class",

      cellStyle: {
        textAlign: "center",
      },
    },
    // Add more columns as needed
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
      <GridTable rowData={rowData} columnDefs={columnDefs} pageSize={4} />
    </div>
  );
};

export default AllJournalEntryTable;
