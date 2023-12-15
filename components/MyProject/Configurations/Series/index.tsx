import { useState } from "react";
import AllSeriesTable from "./AllSeriesTable";
import SeriesBulkUploadPopup from "./SeriesBulkUploadPopup";

function Series() {
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <SeriesBulkUploadPopup {...{ setRerender, rerender }} />
      <AllSeriesTable {...{ rerender}} />
    </div>
  );
}

export default Series;
