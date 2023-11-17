import AllCurrencyTable from "./AllCurrencyTable";
import DeleteCurrencyPopup from "./DeleteCurrencyPopup";

function Currencies() {
  return (
    <div>
      <DeleteCurrencyPopup id={undefined} />
      <AllCurrencyTable />
    </div>
  );
}

export default Currencies;
