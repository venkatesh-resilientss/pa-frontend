import AllVendorsTable from "./AllVendorsTable";
import DeleteVendorPopup from "./DeleteVendorPopup";
import VendorsBulkUploadPopup from "./VendorsBulkUploadPopup";

function Vendors() {
  return (
    <div>
      <VendorsBulkUploadPopup />
      <DeleteVendorPopup />
      <AllVendorsTable />
    </div>
  );
}

export default Vendors;
