import AllTaxCodesTable from "./AllTaxCodesTable";
import DeleteTaxCodePopup from "./DeleteTaxCodePopup";

function TaxCodes() {
  return (
    <div>
      <DeleteTaxCodePopup />
      <AllTaxCodesTable />
    </div>
  );
}

export default TaxCodes;
