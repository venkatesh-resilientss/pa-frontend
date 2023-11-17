import AllBanksTable from "./AllBanksTable";
import DeleteBankPopup from "./DeleteBankPopup";

function Banks() {
  return (
    <div>
      <DeleteBankPopup id={undefined} />
      <AllBanksTable />
    </div>
  );
}

export default Banks;
