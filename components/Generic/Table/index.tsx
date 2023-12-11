// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ArrowDown } from "react-feather";

const DataTableWithButtons = ({ data, columns }) => {
  return (
    <Fragment>
      <div className="react-dataTable mt-2">
        <DataTable
          noHeader
          pagination
          columns={columns}
          className="react-dataTable"
          sortIcon={<ArrowDown size={10} />}
          data={data}
          paginationRowsPerPageOptions={[6, 12, 18, 24, 29, 35]}
        />
      </div>
    </Fragment>
  );
};

export default DataTableWithButtons;
