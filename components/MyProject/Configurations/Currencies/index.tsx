import AllCurrencyTable from "./AllCurrencyTable";
import CurrenciesBulkUploadPopup from "./CurrenciesBulkUploadPopup";
import DeleteCurrencyPopup from "./DeleteCurrencyPopup";
import { useState } from "react";

function Currencies() {
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <CurrenciesBulkUploadPopup {...{ setRerender, rerender }} />
      <DeleteCurrencyPopup />
      <AllCurrencyTable {...{ rerender}} />
    </div>
  );
}

export default Currencies;
