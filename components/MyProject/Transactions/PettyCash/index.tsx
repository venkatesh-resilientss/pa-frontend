import { Button } from "reactstrap";
import Tabs from "./Tabs";
import Select from "react-select";
import Plus from "assets/myIcons/plus.svg";
import Image from "next/image";
import DeletePettyCashPopup from "./DeletePettyCashPopup";
import { useRouter } from "next/router";

function PettyCash() {
  const router = useRouter();
  return (
    <div>
      <DeletePettyCashPopup />
      <div style={{ fontFamily: "Segoe UI" }}>
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
            All Petty Cash
          </div>

          <div>
            <Button
              onClick={() => router.push(`/transactions/create-pettycash`)}
              className="rounded text-white cursor-pointer"
              style={{
                backgroundColor: "#00AEEF",
                fontSize: "14px",
                fontWeight: "600",
                width: "145.15px",
                height: "38px",
                border: "transparent",
              }}
            >
              <Image
                src={Plus}
                alt="plusIcon"
                style={{ width: "14px", height: "14px" }}
              />
              New Petty Cash
            </Button>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  );
}

export default PettyCash;
