import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { useState, useEffect } from "react";
import Image from "next/image";
import { UsersService } from "services";
import useSWR from "swr";
import moment from "moment";
import { Plus } from "react-feather";
import GridTable from "components/grid-tables/gridTable";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import infoImage from "assets/MyImages/info.svg";
import router, { useRouter } from "next/router";
import { hasPermission } from "commonFunctions/functions";
import { checkTenant } from "constants/function";

const AllRoleTable = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [tenantId, setTenantId] = useState("");
  useEffect(() => {
    const getTenant = async () => {
      const tenant = await checkTenant();
      // console.log(tenant, "tenant");
      if (tenant) {
        setTenantId(tenant.id);
      }
    };
    getTenant();
  }, []);
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteClick = (id) => {
    setDeleteModalId(id);
    toggleDeleteModal();
  };

  const handleDeleteUser = async (id) => {
    try {
      await UsersService.delete(tenantId, id);
      // Optionally, you can update your local state or refetch data here
    } catch (error) {
      // Handle error, show a message, or log it
      console.error("Error deleting user:", error);
    } finally {
      toggleDeleteModal();
    }
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
          Are you sure you want to delete? {deleteModalId}
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
          <Button
            color="danger"
            onClick={() => handleDeleteUser(deleteModalId)}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );

  const clientService = new UsersService();

  const { data: clientData } = useSWR(["LIST_CLIENTS", searchText], () =>
    clientService.getUsers(tenantId)
  );

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
      <div>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <Image src={actionIcon} alt="" width={14} id={id} />
          </DropdownToggle>
          <DropdownMenu end container="body">
            {/* <DropdownItem
              tag="a"
              className="w-100 cursor-pointer"
              onClick={() => router.push(`/settings/edit-user/${id}`)}
            >
              <Action
                icon={"/icons/edit_square.svg"}
                name={"Edit"}
                action={() => { }}
              />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100 cursor-pointer"
              onClick={() => handleDeleteClick(id)}
            >
              <Action
                icon={"/icons/delete.svg"}
                name={"Delete"}
                action={() => { }}
              />
            </DropdownItem> */}
            {hasPermission("user_and_role_management", "edit_user") && (
              <DropdownItem
                tag="a"
                className="w-100"
                onClick={() => router.push(`/settings/edit-user/${id}`)}
              >
                <Action
                  icon={"/icons/edit_square.svg"}
                  name={"Edit"}
                  action={() => {}}
                />
              </DropdownItem>
            )}
            {hasPermission("user_and_role_management", "deactivate_user") && (
              <DropdownItem
                tag="a"
                className="w-100"
                onClick={() => handleDeleteClick(id)}
              >
                <Action
                  icon={"/icons/delete.svg"}
                  name={"Delete"}
                  action={() => {}}
                />
              </DropdownItem>
            )}
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
              props.data.profile_image
                ? props.data.profile_image
                : "/icons/sample-profile.png"
            }
            alt="Profile"
            width={30}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div>
          <p style={{ fontSize: "14px" }}>{props.data.adminname}</p>
          <p className="mt-1" style={{ fontSize: "14px" }}>
            {props.data.email}
          </p>
        </div>
      </div>
    </div>
  );

  const columnDefs = [
    {
      headerName: "Member",
      field: "user.profile_image",
      cellRenderer: MemberRenderer,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
      getQuickFilterText: (params) => {
        const res = `${params.data.adminname}${params.data.email}`;
        return res;
      },
    },
    {
      headerName: "Role",
      field: "rollname",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Client",
      field: "client_name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    // { headerName: "id", field: "id", sortable: true, resizable: true, cellStyle: { fontSize: "16px", fontWeight: "400" }, headerClass: "custom-header-class", },
    {
      headerName: "Production",
      field: "project_name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Created On",
      field: "created_on",
      sortable: true,
      resizable: true,
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
      <Card
        className="mt-4 px-2"
        style={{
          backgroundColor: "#E7EFFF",
          boxShadow: "0px 2.53521px 10.14085px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <CardBody>
          <div className="d-flex justify-content-between">
            <div>
              <p className="m-2" style={{ fontWeight: "bold" }}>
                User Management
              </p>
            </div>
            <div className="d-flex align-items-center">
              <Form>
                <input
                  className="search mr-2"
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  placeholder="Search..."
                />
              </Form>
              {/* <button
                className='btn btn-primary'
                onClick={() => router.push('/settings/add-user')}
              >
                <Plus size={16} /> Add User
              </button> */}
              {hasPermission("user_and_role_management", "create_user") && (
                <button
                  className="btn btn-primary"
                  onClick={() => router.push("/settings/add-user")}
                >
                  <Plus size={16} /> Add User
                </button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="mt-4">
        <GridTable
          rowData={clientData?.data}
          columnDefs={columnDefs}
          pageSize={9}
          searchText={searchText}
        />
      </div>

      <DeleteModal />
    </>
  );
};

export default AllRoleTable;
