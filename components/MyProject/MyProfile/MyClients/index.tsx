import GridTable from "components/grid-tables/gridTable";
import moment from "moment";
import { Card, CardBody } from "reactstrap";

export default function MyClients() {
  const columnDefs = [
    {
      headerName: "Client Name",
      field: "Cdde",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Client ID",
      field: "Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Created Date",
      cellRenderer: (params) => {
        const formattedDate = moment(params.value).format("YYYY-MM-DD");
        return <div>{formattedDate}</div>;
      },
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Actions",
      field: "ID",
      // cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
  ];
  return (
    <Card className="mt-2">
      <CardBody>
        <div style={{ fontSize: "19px", fontWeight: "600" }}>My Clients</div>
        <div className="mt-2">
          <GridTable
            rowData={undefined}
            columnDefs={columnDefs}
            pageSize={10}
            searchText={undefined}
          />
        </div>
      </CardBody>
    </Card>
  );
}
