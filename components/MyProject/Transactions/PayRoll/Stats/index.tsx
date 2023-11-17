import { Card, CardBody } from "reactstrap";
import StatsCard from "./StatsCard";

function Stats() {
  return (
    <div className="d-flex" style={{ gap: "10px", marginTop: "12px" }}>
      <StatsCard title={"POs Awaiting My Approval"} value={"122"} />
      <StatsCard title={"Total Payroll Amount"} value={"122"} />
      <StatsCard title={"Last Payroll Date"} value={"09/09/2023"} />
      <StatsCard title={"Pending Payments"} value={"122"} />
    </div>
  );
}

export default Stats;
