import { useState } from "react";
import AllLocationsTable from "./AllLocationsTable";
import LocationsBulkUploadPopup from "./LocationsBulkUploadPopup";

function Locations() {
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <LocationsBulkUploadPopup {...{ setRerender, rerender }} />
      <AllLocationsTable {...{ rerender}} />
    </div>
  );
}

export default Locations;
