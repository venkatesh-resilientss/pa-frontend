import AllStatesTable from "./AllStatesTable";
import DeleteStatePopup from "./DeleteStatePopup";

function States() {
  return (
    <div>
      <DeleteStatePopup id={undefined} />
      <AllStatesTable />
    </div>
  );
}

export default States;
