import { useState } from "react";
import AllLocationsTable from "./AllLocationsTable";
import DeleteLocationPopup from "./DeleteLocationPopup";
import LocationsBulkUploadPopup from "./LocationsBulkUploadPopup";

function Locations() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <LocationsBulkUploadPopup {...{ setRerender, rerender }} />
      <DeleteLocationPopup />
      <AllLocationsTable {...{ rerender, searchText, setSearchText }} />
    </div>
  );
}

export default Locations;
