import AllVendorsTable from "./AllVendorsTable";
import DeleteVendorPopup from "./DeleteVendorPopup";
import VendorsBulkUploadPopup from "./VendorsBulkUploadPopup";
import { useState } from "react";

function Vendors() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <VendorsBulkUploadPopup {...{rerender, setRerender}} />
      <DeleteVendorPopup />
      <AllVendorsTable {...{ rerender, searchText, setSearchText }} />
    </div>
  );
}

export default Vendors;
