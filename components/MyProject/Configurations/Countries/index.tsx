import AllCountriesTable from "./AllCountriesTable";
import CountriesBulkUploadPopup from "./CountriesBulkUploadPopup";
import { useState } from "react";

function Countries() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <CountriesBulkUploadPopup {...{ setRerender, rerender }}/>
      <AllCountriesTable {...{ rerender, searchText, setSearchText }}/>
    </div>
  );
}

export default Countries;
