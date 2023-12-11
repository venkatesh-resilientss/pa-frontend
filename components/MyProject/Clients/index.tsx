import ClientsListTable from "./ClientTable";
import DeleteClientPopup from "./DeleteClientPopup";
function Clients() {
  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      <DeleteClientPopup />
      <ClientsListTable />
    </div>
  );
}

export default Clients;
