import AllLocationsTable from "./AllLocationsTable";
import DeleteLocationPopup from "./DeleteLocationPopup";

function Locations() {
  return (
    <div>
      <DeleteLocationPopup />
      <AllLocationsTable />
    </div>
  );
}

export default Locations;
