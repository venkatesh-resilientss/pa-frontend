import { Button, Card, CardBody } from "reactstrap";
import Profile from "./Profile";
import MyClients from "./MyClients";

export default function MyProfilePage() {
  return (
    <div className="section mt-4">
      <Card
        style={{
          backgroundColor: "#E7EFFF",
          boxShadow: "0px 2.53521px 10.14085px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <CardBody>
          <div className="d-flex justify-content-between">
            <div>
              <div
                className="m-2"
                style={{ fontSize: "16px", fontWeight: "600" }}
              >
                My Profile
              </div>
            </div>

            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
              <Button
                style={{
                  height: "38px",
                  backgroundColor: "#00AEEF",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      <Profile />
      <MyClients />
    </div>
  );
}
