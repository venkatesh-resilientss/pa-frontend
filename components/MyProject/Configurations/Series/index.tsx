import { useState } from "react";
import AllSeriesTable from "./AllSeriesTable";
import DeleteSeriesPopup from "./DeleteSeriesPopup";
import SeriesBulkUploadPopup from "./SeriesBulkUploadPopup";

function Series() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <SeriesBulkUploadPopup {...{ setRerender, rerender }} />
      <DeleteSeriesPopup />
      <AllSeriesTable {...{ rerender, searchText, setSearchText }} />
    </div>
  );
}

export default Series;
