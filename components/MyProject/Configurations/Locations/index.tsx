import AllLocationsTable from "./AllLocationsTable";
import DeleteLocationPopup from "./DeleteLocationPopup";
import LocationsBulkUploadPopup from "./LocationsBulkUploadPopup";

function Locations() {
  return (
    <div>
      <LocationsBulkUploadPopup />
      <DeleteLocationPopup id={undefined} />
      <AllLocationsTable />
    </div>
  );
}

export default Locations;
