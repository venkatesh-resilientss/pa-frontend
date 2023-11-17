import { Button } from "reactstrap";
import Tabs from "./Tabs";
import Select from "react-select";
import Plus from "assets/myIcons/plus.svg";
import Image from "next/image";
import Stats from "./Stats";
import DeletePayrollPopup from "./DeletePayrollPopup";
import { useRouter } from "next/router";

function Payroll() {
  const router = useRouter();
  return (
    <div>
      <DeletePayrollPopup />{" "}
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
            All Payroll
          </div>

          <div>
            <Button
              onClick={() => router.push(`/transactions/create-payroll`)}
              className="rounded text-white cursor-pointer"
              style={{
                backgroundColor: "#00AEEF",
                fontSize: "14px",
                fontWeight: "600",
                width: "125.15px",
                height: "38px",
                border: "transparent",
              }}
            >
              <Image
                alt="plusIcon"
                src={Plus}
                style={{ width: "14px", height: "14px" }}
              />{" "}
              New Payroll
            </Button>
          </div>
        </div>
      </div>
      <Stats />
      <Tabs />
    </div>
  );
}

export default Payroll;
