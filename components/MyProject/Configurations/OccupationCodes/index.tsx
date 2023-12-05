// import React from "react";
import AllOccupationCodesTable from "./AllOccupationCodesTable";
import DeleteOccupationPopup from "./DeleteOccupationPopup";
import OccupationCodesBulkUploadPopup from "./OccupationCodesBulkUploadPopup";

function OccupationCodes() {
  return (
    <div>
      <OccupationCodesBulkUploadPopup />
      <DeleteOccupationPopup id={undefined} />
      <AllOccupationCodesTable />
    </div>
  );
}

export default OccupationCodes;
