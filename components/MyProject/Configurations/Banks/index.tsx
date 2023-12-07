import AllBanksTable from "./AllBanksTable";
// import BanksBulkUploadPopup from "./BanksBulkUploadPopup";
import DeleteBankPopup from "./DeleteBankPopup";

function Banks() {
  return (
    <div>
      {/* <BanksBulkUploadPopup /> */}
      <DeleteBankPopup />
      <AllBanksTable />
    </div>
  );
}

export default Banks;
