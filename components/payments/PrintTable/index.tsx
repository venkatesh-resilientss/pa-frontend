import DataTable from "react-data-table-component";

export default function PrintTable({ columns, data }) {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
