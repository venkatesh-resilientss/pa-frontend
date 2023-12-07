import AllSetsTable from "./AllSetsTable";
import DeleteSetPopup from "./DeleteSetPopup";
import SetsBulkUploadPopup from "./SetsBulkUploadPopup";
// import { SetsService } from "services";
import { useState } from "react";
// const setsService = new SetsService();

function Sets() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  // const { data: setsData, isLoading: setsLoading, mutate: setsMutate } = useSWR(
  //   ["LIST_SETS", searchText],
  //   () => setsService.getSets()
  // );
  return (
    <div>
      <SetsBulkUploadPopup {...{ setRerender, rerender }} />
      <DeleteSetPopup />
      <AllSetsTable {...{ rerender, searchText, setSearchText }} />
    </div>
  );
}

export default Sets;
