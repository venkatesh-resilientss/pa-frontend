import AllSeriesTable from "./AllSeriesTable";
import DeleteSeriesPopup from "./DeleteSeriesPopup";

function Series() {
  return (
    <div>
      <DeleteSeriesPopup id={undefined} />
      <AllSeriesTable />
    </div>
  );
}

export default Series;
