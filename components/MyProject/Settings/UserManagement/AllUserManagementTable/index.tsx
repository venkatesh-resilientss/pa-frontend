import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Modal,
  ModalBody,
} from "reactstrap";
import Image from "next/image";
import { UsersService } from "services";
import moment from "moment";
import { Plus } from "react-feather";
import GridWithPagination from "@/components/dataTable/GridWithPagination";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import infoImage from "assets/MyImages/info.svg";
import router from "next/router";
import { hasPermission } from "commonFunctions/functions";
import NoDataPage from "@/components/NoDataPage";
import { useEffect, useState } from "react";
import { AuthService, ForgotPasswordService } from "services";
import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const authService = new AuthService();
const forgotPassword = new ForgotPasswordService();

const AllRoleTable = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tableData, setTableData] = useState<any>({
    data: [],
    total_records: 0,
  });

  const defaultFilters: any = {
    limit: 10,
    offset: 0,
    search: "",
    pageNumber: 1,
  };

  const [filters, setFilters] = useState<any>(defaultFilters);
  const [userDetails, setUserDetails] = useState(null) as any;

  const hasCreateUseerPermission = hasPermission(
    "user_and_role_management",
    "create_user"
  );
  const hasEditUserPermission = hasPermission(
    "user_and_role_management",
    "edit_user"
  );

  useEffect(() => {
    authService.getUserDetails().then((response) => {
      setUserDetails(response?.data);
    });
  }, []);

  useEffect(() => {
    if (userDetails) {
      const queryParams = {
        search: filters.search.trim(),
        limit: filters.limit,
        offset: filters.offset,
        name: "asc",
      };
      userService
        .getUsers(queryParams)
        .then((response) => {
          setTableData(response);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [filters, userDetails]);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const DeleteModal = () => (
    <Modal
      isOpen={isDeleteModalOpen}
      toggle={toggleDeleteModal}
      className={"modal-dialog-centered "}
    >
      <ModalBody>
        <div className="d-flex justify-content-center">
          <Image
            src={infoImage}
            style={{ height: "30.93px", width: "30.93px", marginBottom: "8px" }}
            alt={""}
          />
        </div>
        <div
          className="text-black text-center"
          style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}
        >
          Are you sure you want to delete?
        </div>
        <div
          className="text-center"
          style={{ fontSize: "13px", fontWeight: "400", marginBottom: "8px" }}
        >
          This action will delete the information permanently. <br /> You cannot
          undo this action.
        </div>
        <hr />
        <div
          className="d-flex justify-content-center text-end"
          style={{ gap: "8px" }}
        >
          <a
            href="#"
            onClick={toggleDeleteModal}
            className="text-decoration-none text-secondary m-2"
          >
            Cancel
          </a>
        </div>
      </ModalBody>
    </Modal>
  );

  const userService = new UsersService();

  const resendPasswordLink = (data) => {
    const payload = { email: data.email };
    forgotPassword
      .forgotPassword(payload)
      .then(() => {
        toast.success("Password reset link has been sent to registred email.");
      })
      .catch((e) => {
        console.error(e);
        toast.error("something went wrong");
      });
  };

  const StateBadge = (props) => {
    const stateDir = {
      true: "success",
      false: "danger",
    };
    return (
      <CustomBadge
        bg={stateDir[props.value]}
        value={props.value ? "Active" : "In-active"}
      />
    );
  };

  const ActionsButton = (props) => {
    const id = props.value;

    const Action = ({ icon, name, action }) => (
      <div onClick={action} className="d-flex align-items-center gap-2">
        <img src={icon} alt={name} />
        <p>{name}</p>
      </div>
    );

    return (
      <div className="cursor-pointer">
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <Image src={actionIcon} alt="" width={14} id={id} />
          </DropdownToggle>
          <DropdownMenu end container="body" className="userpopover">
            {hasEditUserPermission && (
              <DropdownItem
                tag="a"
                className="w-100 cursor-pointer"
                onClick={() => router.push(`/settings/users/${id}`)}
              >
                <Action
                  icon={"/icons/edit_square.svg"}
                  name={"View/Edit User"}
                  action={undefined}
                />
              </DropdownItem>
            )}
            <DropdownItem
              tag="a"
              className="w-100 cursor-pointer"
              onClick={() => {
                resendPasswordLink(props.data);
              }}
            >
              <Action
                icon={"/icons/edit_square.svg"}
                name={"Resend Password Link"}
                action={undefined}
              />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  const MemberRenderer = (props) => (
    <div className="d-flex align-items-center mr-3">
      <div className="ml-2 d-flex align-items-center gap-2">
        <div className="rounded-circle">
          <img
            src={
              props.data?.profile_image
                ? props.data?.profile_image
                : "/default.svg"
            }
            alt="Profile"
            width={30}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div>
          <p style={{ fontSize: "14px" }}>
            {props?.data?.adminName?.charAt(0).toUpperCase() +
              props?.data?.adminName?.slice(1)}
          </p>
          <p className="mt-1" style={{ fontSize: "14px" }}>
            {props?.data?.email}
          </p>
        </div>
      </div>
    </div>
  );

  const columnDefs = [
    {
      headerName: "Member",
      field: "adminName",
      sortable: true,
      unSortIcon: true,
      cellRenderer: MemberRenderer,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
      resizable: true,
      getQuickFilterText: (params) => {
        const res = `${
          params?.adminName?.charAt(0).toUpperCase() +
          params?.adminName?.slice(1)
        }${params?.email}`;
        return res;
      },
    },
    {
      headerName: "Role",
      field: "roleName",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
      // cellRenderer: (params) => params.roleName,
      unSortIcon: true,
      cellRenderer: (params) => {
        return (
          params?.data?.roleName?.charAt(0).toUpperCase() +
          params?.data?.roleName?.slice(1)
        );
      },
    },
    {
      headerName: "Client",
      field: "clientNames",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        const clientNames: any = params?.data?.clientNames; // Assuming clientNames is an array
        const arrayLength = clientNames ? clientNames.length : 0;
        let tooltipContent;

        if (arrayLength === 0) {
          tooltipContent = ""; // Provide a default message if array is empty
        } else {
          const capitalizedNames = clientNames?.map(
            (name) => name?.charAt(0).toLocaleUpperCase() + name?.slice(1)
          );
          tooltipContent = capitalizedNames.join(", ");
        }

        const maxLength = 8; // Adjust the maximum length for ellipsis as needed
        let displayContent;

        if (arrayLength === 0) {
          displayContent = "";
        } else if (arrayLength === 1) {
          const firstClientName = clientNames[0] || ""; // Use an empty string if firstClientName is undefined or null

          displayContent =
            firstClientName.length > maxLength
              ? `${
                  firstClientName?.charAt(0).toUpperCase() +
                  firstClientName?.slice(1).substring(0, maxLength)
                }...`
              : firstClientName?.charAt(0).toUpperCase() +
                firstClientName?.slice(1);
        } else {
          const firstClientName = clientNames[0] || "";

          displayContent = `${
            firstClientName.length > maxLength
              ? `${
                  firstClientName?.charAt(0).toUpperCase() +
                  firstClientName?.slice(1).substring(0, maxLength)
                }...`
              : firstClientName?.charAt(0).toUpperCase() +
                firstClientName?.slice(1)
          } + ${arrayLength - 1}`;
        }

        return (
          <>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-engine">{tooltipContent}</Tooltip>}
            >
              <p>{displayContent}</p>
            </OverlayTrigger>
          </>
        );
      },
      unSortIcon: true,
    },

    {
      headerName: "Created By",
      field: "CreatedBy",
      sortable: true,
      resizable: true,
      unSortIcon: true,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params?.value?.charAt(0).toUpperCase() + params?.value?.slice(1);
      },
    },
    {
      headerName: "Created On",
      field: "createdOn",
      sortable: true,
      resizable: true,
      unSortIcon: true,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        const formattedDate = moment(params.value).format("MM/DD/YYYY, HH:mm");
        return <span>{formattedDate}</span>;
      },
    },
    {
      headerName: "Status",
      field: "active",
      cellRenderer: StateBadge,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
      unSortIcon: true,
      sortable: true,
    },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: ActionsButton,
      headerClass: "custom-header-class",
    },
  ];

  return (
    <>
      <div className="section mt-4">
        <div>
          <Card
            style={{
              backgroundColor: "#E7EFFF",
              boxShadow: "0px 2.53521px 10.14085px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p
                    className="m-2"
                    style={{
                      fontWeight: "600",
                      fontFamily: "Segoe UI Semibold",
                    }}
                  >
                    User Management
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <Form>
                    <input
                      className="search mr-2"
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                      type="search"
                      placeholder="Search..."
                    />
                  </Form>
                  {hasCreateUseerPermission && (
                    <button
                      className="btn btn-primary"
                      onClick={() => router.push("/settings/users/create-user")}
                    >
                      <Plus size={16} /> Create User
                    </button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="mt-3">
        {tableData.data.length === 0 && !filters.search.trim() ? (
          <NoDataPage
            buttonName={hasCreateUseerPermission ? "Create User" : "No button"}
            buttonLink={"/settings/users/create-user"}
          />
        ) : (
          <GridWithPagination
            rowData={tableData}
            columnDefs={columnDefs}
            limit={filters.limit}
            pageNumber={filters.pageNumber}
            setPageNumber={setFilters}
          />
        )}
      </div>

      <DeleteModal />
    </>
  );
};

export default AllRoleTable;
