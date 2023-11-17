import AllTaxCodesTable from "./AllTaxCodesTable";
import DeleteTaxCodePopup from "./DeleteTaxCodePopup";

function TaxCodes() {
  return (
    <div>
      <DeleteTaxCodePopup id={undefined} />
      <AllTaxCodesTable />
    </div>
  );
}

export default TaxCodes;
