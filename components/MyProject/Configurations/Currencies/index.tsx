import AllCurrencyTable from "./AllCurrencyTable";
import CurrenciesBulkUploadPopup from "./CurrenciesBulkUploadPopup";
import DeleteCurrencyPopup from "./DeleteCurrencyPopup";
import { useState } from "react";

function Currencies() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <CurrenciesBulkUploadPopup {...{ setRerender, rerender }} />
      <DeleteCurrencyPopup />
      <AllCurrencyTable {...{ rerender, searchText, setSearchText }} />
    </div>
  );
}

export default Currencies;
