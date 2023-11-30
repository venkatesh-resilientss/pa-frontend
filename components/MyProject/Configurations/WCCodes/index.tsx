// import React from "react";
import AllWCCodesTable from "./AllWCCodesTable";
import DeleteWCCodesPopup from "./DeleteWCCodesPopup";
import WCCodesBulkUploadPopup from "./WCCodesBulkUploadPopup";

function OccupationCodes() {
  return (
    <div>
      <WCCodesBulkUploadPopup />
      <DeleteWCCodesPopup id={undefined} />
      <AllWCCodesTable />
    </div>
  );
}

export default OccupationCodes;
