import AllCurrencyTable from "./AllCurrencyTable";
import DeleteCurrencyPopup from "./DeleteCurrencyPopup";

function Currencies() {
  return (
    <div>
      <DeleteCurrencyPopup />
      <AllCurrencyTable />
    </div>
  );
}

export default Currencies;