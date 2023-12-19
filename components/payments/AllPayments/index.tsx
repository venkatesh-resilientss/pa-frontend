import AllPaymentsTable from "./AllPaymentsTable";

export default function AllPayments() {
  return (
    <div>
      <div className="mt-3">
        <div className="d-flex flex-column" style={{ gap: "12px" }}>
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
              All Payments
            </div>
          </div>
        </div>
      </div>
      <div>
        <AllPaymentsTable />
      </div>
    </div>
  );
}
