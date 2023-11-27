import AllCountriesTable from "./AllCountriesTable";
import CountriesBulkUploadPopup from "./CountriesBulkUploadPopup";
import DeleteCountryPopup from "./DeleteCountryPopup";

function Countries() {
  return (
    <div>
      <CountriesBulkUploadPopup />
      <DeleteCountryPopup />
      <AllCountriesTable />
    </div>
  );
}

export default Countries;
