import AllTaxCodesTable from "./AllTaxCodesTable";
import DeleteTaxCodePopup from "./DeleteTaxCodePopup";
import TaxCodesBulkUploadPopup from "./TaxCodesBulkUploadPopup";
import { useState } from "react";

function TaxCodes() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <TaxCodesBulkUploadPopup {...{ setRerender, rerender }} />
      <DeleteTaxCodePopup />
      <AllTaxCodesTable {...{ rerender, searchText, setSearchText }}/>
    </div>
  );
}

export default TaxCodes;
