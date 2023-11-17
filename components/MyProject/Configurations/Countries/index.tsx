import AllCountriesTable from "./AllCountriesTable";
import DeleteCountryPopup from "./DeleteCountryPopup";

function Countries() {
  return (
    <div>
      <DeleteCountryPopup />
      <AllCountriesTable />
    </div>
  );
}

export default Countries;
