import AllSeriesTable from "./AllSeriesTable";
import DeleteSeriesPopup from "./DeleteSeriesPopup";
import SeriesBulkUploadPopup from "./SeriesBulkUploadPopup";

function Series() {
  return (
    <div>
      <SeriesBulkUploadPopup />
      <DeleteSeriesPopup />
      <AllSeriesTable />
    </div>
  );
}

export default Series;
