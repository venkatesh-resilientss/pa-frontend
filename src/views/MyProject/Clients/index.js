import ClientsListTable from "./ClientTable";
import DeleteClientPopup from "./DeleteClientPopup";

function index() {
  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      <DeleteClientPopup />
      <ClientsListTable />
    </div>
  );
}

export default index;
