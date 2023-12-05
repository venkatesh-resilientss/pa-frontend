import AllTaxCodesTable from "./AllTaxCodesTable";
import DeleteTaxCodePopup from "./DeleteTaxCodePopup";
import TaxCodesBulkUploadPopup from "./TaxCodesBulkUploadPopup";

function TaxCodes() {
  return (
    <div>
      <TaxCodesBulkUploadPopup />
      <DeleteTaxCodePopup />
      <AllTaxCodesTable />
    </div>
  );
}

export default TaxCodes;
