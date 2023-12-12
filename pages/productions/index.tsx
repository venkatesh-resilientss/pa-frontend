import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, UncontrolledDropdown } from "reactstrap";
import { DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import moment from "moment";
import { useDispatch } from "react-redux";

import { openAssignRSSLPopup } from "@/redux/slices/mySlices/productions";
import editIocn from "assets/myIcons/edit_square.svg";
import detailsIocn from "assets/myIcons/list.svg";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import CustomBadge from "components/Generic/CustomBadge";

import { ProjectService } from "services";
import GridTable from "@/components/dataTable/GridWithPagination";
import CreateProductionButton from "@/components/productions/CreateProductionButton";
import NoProductionPage from "@/components/productions/NoProductionPage";

const projectService = new ProjectService();

export default function Productions({ router, user }) {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState({
    data: [],
    total_records: 0,
  }) as any;

  const [filters, setFilters] = useState<any>({
    dateStart: "",
    dateEnd: "",
    clients: [],
    softwares: [],
    limit: 10,
    offset: 10,
    search: "",
    status: "",
    pageNumber: 1,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const offset = (filters.pageNumber - 1) * filters.limit;
        const payload = { ...filters, offset };
        const response = await projectService.getAllProjectsList(payload);
        setTableData({
          data: response.data || [],
          total_records: response.total_records || 0,
        });
        /*  eslint-disable-next-line @typescript-eslint/no-unused-vars */
      } catch (e) {
        //
      }
    };
    getData();
  }, [filters]);

  const StateBadge = (props) => {
    const sateDir = {
      true: "success",
      false: "danger",
    };

    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value ? "Active" : "In-active"}
      />
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
              onClick={() => router.push(`/production/${props.data.ID}`)}
            >
              <Action
                icon={editIocn}
                name={"View Details"}
                action={() => {
                  //
                }}
              />
            </DropdownItem>

            <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"Assign RSSL User"}
                action={() => dispatch(openAssignRSSLPopup(props.data))}
              />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "Production Code",
      field: "Code",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },
    {
      headerName: "Production Name",
      field: "Name",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 2,
    },
    {
      headerName: "Production Type",
      field: "ProjectType.Name",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },
    {
      headerName: "Client",
      field: "Client.Name",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 2,
    },
    {
      headerName: "Last Payroll Date",
      field: "LastPayrollDate",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },

    {
      headerName: "Labour Type",
      field: "LabourType",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },
    {
      headerName: "Created By",
      field: "Created",
      cellRenderer: (params) => {
        return (
          <div className="f-ellipsis">
            {(params?.data?.Created?.first_name || "") +
              " " +
              (params?.data?.Created?.last_name || "")}
          </div>
        );
      },
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },
    {
      headerName: "Created On",
      field: "CreatedDate",
      cellRenderer: (params) => {
        const formattedDate = moment(params.value).format("YYYY-MM-DD");
        return <div>{formattedDate}</div>;
      },
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },
    {
      headerName: "Status",
      field: "IsActive",
      cellRenderer: StateBadge,
      suppressSizeToFit: true,
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "ID",
      cellRenderer: ActionsButton,
      cellStyle: { textAlign: "center" },
      suppressSizeToFit: true,
      flex: 1,
    },
  ];
  return (
    <div className="py-4">
      <Card className="w-100 p-3 client-card-bg my-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="f-18 fw-600 clr-dblack">All Productions</div>

          <CreateProductionButton {...{ user }} cls="" />
        </div>
      </Card>

      <div className="mt-3">
        {tableData.data.length === 0 ? (
          <NoProductionPage {...{ user }} />
        ) : (
          <GridTable
            rowData={tableData}
            columnDefs={columnDefs}
            pageSize={filters.limit}
            searchText={filters.search}
            pageNumber={filters.pageNumber}
            setPageNumber={setFilters}
          />
        )}
      </div>
    </div>
  );
}
