import { Card, CardBody } from "reactstrap";

function StatsCard({ title, value }) {
  return (
    <Card
      className="text-black d-flex flex-column"
      style={{
        width: "144px",
        height: "54px",
        paddingTop: "4px",
        paddingBottom: "4px",
        paddingLeft: "8px",
        paddingRight: "8px",
        gap: "10px",
        border: "none",
        boxShadow:
          " 0.9998936057090759px 0.9998936057090759px 3.9995744228363037px 0px #00000040",
      }}
    >
      <div style={{ fontSize: "10px", fontWeight: "600" }}>{title}</div>
      <div style={{ fontSize: "12px", fontWeight: "600" }}>{value}</div>
    </Card>
  );
}

export default StatsCard;
