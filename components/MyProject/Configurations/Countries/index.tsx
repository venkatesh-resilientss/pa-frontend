import AllCountriesTable from "./AllCountriesTable";
import CountriesBulkUploadPopup from "./CountriesBulkUploadPopup";
import DeleteCountryPopup from "./DeleteCountryPopup";
import { useState } from "react";

function Countries() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <CountriesBulkUploadPopup {...{ setRerender, rerender }}/>
      <DeleteCountryPopup />
      <AllCountriesTable {...{ rerender, searchText, setSearchText }}/>
    </div>
  );
}

export default Countries;
