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
            All Purchase Orders
          </div>

          <div>
            <Button
              onClick={() => router.push(`/transactions/create-purchase-order`)}
              className="rounded text-white cursor-pointer"
              style={{
                backgroundColor: "#00AEEF",
                fontSize: "14px",
                fontWeight: "600",
                width: "175.15px",
                height: "38px",
                border: "transparent",
              }}
            >
              <Image
                alt="plusIcon"
                src={Plus}
                style={{ width: "14px", height: "14px" }}
              />
              New Purchase Order
            </Button>
          </div>
        </div>
      </div>
      <div className="my-2">
        <Stats />
      </div>
      <Tabs />
    </div>
  );
}

export default PurchaseOrder;
