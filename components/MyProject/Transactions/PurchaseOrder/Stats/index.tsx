import { Card, CardBody } from "reactstrap";
import StatsCard from "./StatsCard";

function Stats() {
  return (
    <div className="d-flex" style={{ gap: "10px" }}>
      <StatsCard title={"POs Awaiting My Approval"} value={122} />
      <StatsCard title={"PO Original Amount"} value={122} />
      <StatsCard title={"Total POs Distributed"} value={122} />
      <StatsCard title={"Remaining Amount"} value={122} />
    </div>
  );
}

export default Stats;
