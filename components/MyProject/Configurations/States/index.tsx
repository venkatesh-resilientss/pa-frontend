import AllStatesTable from "./AllStatesTable";
import DeleteStatePopup from "./DeleteStatePopup";
import StatesBulkUploadPopup from "./StatesBulkUploadPopup";
import { useState } from "react";

function States() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <StatesBulkUploadPopup {...{ setRerender, rerender }}/>
      <DeleteStatePopup />
      <AllStatesTable {...{ rerender, searchText, setSearchText }}/>
    </div>
  );
}

export default States;
