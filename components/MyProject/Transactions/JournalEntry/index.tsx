import { Button } from "reactstrap";
import BasicTabs from "./Tabs";
import Select from "react-select";
import DeleteJournalEntryPopup from "./DeleteJournalEntryPopup";
import { useRouter } from "next/router";
import Image from "next/image";
import Plus from "assets/myIcons/plus.svg";

function JournalEntry() {
  const router = useRouter();

  return (
    <div>
      <DeleteJournalEntryPopup />
      <div className="mt-2">
        <div
          className="border-bottom rounded d-flex justify-content-between"
          style={{
            backgroundColor: "#E7EFFF",
            height: "62px",
            padding: "10px",
          }}
        >
          <div
            className="text-black "
            style={{ fontSize: "16px", fontWeight: "600", marginTop: "10px" }}
          >
            All Journal Entries
          </div>

          <div>
            <Button
              onClick={() => router.push(`/transactions/create-journal-entry`)}
              className="rounded text-white cursor-pointer"
              style={{
                backgroundColor: "#00AEEF",
                fontSize: "14px",
                fontWeight: "600",
                width: "165.15px",
                height: "38px",
                border: "transparent",
              }}
            >
              <Image
                alt="plusIcon"
                src={Plus}
                style={{ width: "14px", height: "14px" }}
              />{" "}
              New Journal Entry
            </Button>
          </div>
        </div>
      </div>
      <BasicTabs />
    </div>
  );
}

export default JournalEntry;
