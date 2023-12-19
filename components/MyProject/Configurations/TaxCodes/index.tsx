import AllTaxCodesTable from "./AllTaxCodesTable";
import TaxCodesBulkUploadPopup from "./TaxCodesBulkUploadPopup";
import { useState } from "react";

function TaxCodes() {
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <TaxCodesBulkUploadPopup {...{ setRerender, rerender }} />
      <AllTaxCodesTable {...{ rerender}}/>
    </div>
  );
}

export default TaxCodes;
