// import React from "react";
import AllMPIPHPTable from "./AllMPIPHPTable";
import DeleteMPIPHPPopup from "./DeleteMPIPHPPopup";
import MPIPHPBulkUploadPopup from "./MPIPHPBulkUploadPopup";

function OccupationCodes() {
  return (
    <div>
      <MPIPHPBulkUploadPopup />
      <DeleteMPIPHPPopup id={undefined} />
      <AllMPIPHPTable />
    </div>
  );
}

export default OccupationCodes;
