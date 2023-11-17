import AllSetsTable from "./AllSetsTable";
import DeleteSetPopup from "./DeleteSetPopup";

function Sets() {
  return (
    <div>
      <DeleteSetPopup id={undefined} />
      <AllSetsTable />
    </div>
  );
}

export default Sets;
