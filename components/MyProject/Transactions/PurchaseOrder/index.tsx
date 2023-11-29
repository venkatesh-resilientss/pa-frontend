import { Button } from "reactstrap";
import Stats from "./Stats";
import Tabs from "./Tabs";
import Plus from "assets/myIcons/plus.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Example from "components/DropDown";
import DeletePurchaseOrderPopup from "./DeletePurchaseOrderPopup";

function PurchaseOrder() {
  const router = useRouter();

  return (
    <div className="mt-3">
      <DeletePurchaseOrderPopup />
      <div className="d-flex flex-column" style={{ gap: "12px" }}>
        <div>
          <div
            className="border-bottom rounded d-flex justify-content-between"
            style={{
              backgroundColor: "#E7EFFF",
              paddingTop: "12px",
              paddingBottom: "12px",
              paddingRight: "24px",
              paddingLeft: "24px",
              boxShadow:
                "0px 1.0001442432403564px 4.000576972961426px 0px #00000040",
            }}
          >
            <div
              className="text-black d-flex align-items-center "
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              All Purchase Orders
            </div>

            <div>
              <Button
                onClick={() =>
                  router.push(`/transactions/create-purchase-order`)
                }
                className="rounded text-white cursor-pointer d-flex align-items-center justify-content-center "
                style={{
                  backgroundColor: "#00AEEF",
                  fontSize: "14px",
                  fontWeight: "600",
                  // width: "175.15px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  paddingRight: "12.08px",
                  paddingLeft: "12.08px",
                  height: "38px",
                  border: "transparent",
                  gap: "5px",
                }}
              >
                <Image
                  alt="plusIcon"
                  src={Plus}
                  style={{ width: "14px", height: "14px" }}
                  className=""
                />
                New Purchase Order
              </Button>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <Stats />
        </div>
        <div>
          <Tabs />
        </div>
      </div>
    </div>
  );
}

export default PurchaseOrder;
