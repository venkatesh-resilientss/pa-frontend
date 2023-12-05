import React, { useEffect } from "react";
import GridTable from "components/grid-tables/gridTable";
import Image from "next/image";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import CustomBadge from "components/Generic/CustomBadge";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
const MyPage = () => {
  const StateBadge = (props) => {
    const sateDir = {
      active: "success",
      inactive: "danger",
    };
    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value === "active" ? "Active" : "In-active"}
      />
    );
  };

  const ActionsButton = (props) => {
    const id = `action-popover-${props.value}`;

    const Action = ({ icon, name }) => {
      return (
        <div className="d-flex align-items-center gap-2">
          <img src={icon} alt={name} />
          <p>{name}</p>
        </div>
      );
    };
    return (
      <div>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <Image src={actionIcon} alt="" width={14} id={id} />
          </DropdownToggle>
          <DropdownMenu end container="body">
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Action icon={"/icons/edit_square.svg"} name={"Edit"} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Action icon={"/icons/delete.svg"} name={"Delete"} />
            </DropdownItem>
            <DropdownItem className="w-100">
              <Action icon={"/icons/list.svg"} name={"View Details"} />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, resizable: true },
    { headerName: "Title", field: "title", sortable: true, resizable: true },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      resizable: true,
    },
    { headerName: "Price", field: "price", sortable: true, resizable: true },
    {
      headerName: "Discount Percentage",
      field: "discountPercentage",
      sortable: true,
      resizable: true,
    },
    { headerName: "Rating", field: "rating", sortable: true, resizable: true },
    { headerName: "Stock", field: "stock", sortable: true, resizable: true },
    { headerName: "Brand", field: "brand", sortable: true, resizable: true },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: StateBadge,
    },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: ActionsButton,
      cellStyle: {
        textAlign: "center",
      },
    },
    // Add more columns as needed
  ];

  const rowData = [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      actions: "",
      status: "active",
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      actions: "",
      status: "active",
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      actions: "",
      status: "inactive",
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      actions: "",
      status: "active",
    },
    {
      id: 5,
      title: "Huawei P30",
      description:
        "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: "Huawei",
      actions: "",
      status: "inactive",
    },
    {
      id: 6,
      title: "MacBook Pro",
      description:
        "MacBook Pro 2021 with mini-LED display may launch between September, November",
      price: 1749,
      discountPercentage: 11.02,
      rating: 4.57,
      stock: 83,
      brand: "Apple",
      category: "laptops",
      status: "active",
    },
    {
      id: 7,
      title: "Samsung Galaxy Book",
      description:
        "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
      price: 1499,
      discountPercentage: 4.15,
      rating: 4.25,
      stock: 50,
      brand: "Samsung",
      category: "laptops",
      status: "active",
    },
  ];

  const encryptTest = async () => {
    // var res = await encrypt('krish');
    // var res  = await decrypt(de);
  };

  useEffect(() => {
    encryptTest();
  }, []);
  return (
    <>
      <div className="my-5 m-auto d-flex">
        <GridTable
          rowData={rowData}
          columnDefs={columnDefs}
          pageSize={4}
          searchText={undefined}
        />
      </div>
      {/* <div className="">
    <Sidebar />
    </div> */}
    </>
  );
};

export default MyPage;
