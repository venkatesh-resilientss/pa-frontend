import AllBanksTable from "./AllBanksTable";
import DeleteBankPopup from "./DeleteBankPopup";

function Banks() {
  return (
    <div>
      <DeleteBankPopup />
      <AllBanksTable />
    </div>
  );
}

export default Banks;
