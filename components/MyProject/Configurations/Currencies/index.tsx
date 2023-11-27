import AllCurrencyTable from "./AllCurrencyTable";
import CurrenciesBulkUploadPopup from "./CurrenciesBulkUploadPopup";
import DeleteCurrencyPopup from "./DeleteCurrencyPopup";

function Currencies() {
  return (
    <div>
      <CurrenciesBulkUploadPopup />
      <DeleteCurrencyPopup id={undefined} />
      <AllCurrencyTable />
    </div>
  );
}

export default Currencies;
