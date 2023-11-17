import AllLocationsTable from "./AllLocationsTable";
import DeleteLocationPopup from "./DeleteLocationPopup";

function Locations() {
  return (
    <div>
      <DeleteLocationPopup id={undefined} />
      <AllLocationsTable />
    </div>
  );
}

export default Locations;
