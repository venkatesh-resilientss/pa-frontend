import AllSetsTable from "./AllSetsTable";
import SetsBulkUploadPopup from "./SetsBulkUploadPopup";
import { useState } from "react";

function Sets() {
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <SetsBulkUploadPopup {...{ setRerender, rerender }} />
      <AllSetsTable {...{ rerender}} />
    </div>
  );
}

export default Sets;
