import AllStatesTable from "./AllStatesTable";
import StatesBulkUploadPopup from "./StatesBulkUploadPopup";
import { useState } from "react";

function States() {
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <StatesBulkUploadPopup {...{ setRerender, rerender }}/>
      <AllStatesTable {...{ rerender}}/>
    </div>
  );
}

export default States;
