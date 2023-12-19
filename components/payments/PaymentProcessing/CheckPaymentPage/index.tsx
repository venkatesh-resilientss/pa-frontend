import { Button, Card, CardBody } from "reactstrap";
import Select from "react-select";
import { useRouter } from "next/router";

export default function CheckPaymentPage() {
  const router = useRouter();

  return (
    <div>
      <div
        className="d-flex  justify-content-between align-items-center"
        style={{ paddingTop: "18px", paddingBottom: "18px" }}
      >
        <div className="d-flex flex-column" style={{ gap: "10px" }}>
          <div style={{ fontSize: "16px", fontWeight: "600" }}>
            Payment Processing
          </div>
          <div style={{ fontSize: "32px", fontWeight: "600" }}>Check</div>
        </div>
        <div className="d-flex" style={{ gap: "10px" }}>
          <Button
            onClick={() => router.back()}
            color="white"
            style={{
              fontSize: "14px",
              fontWeight: "400",
              height: "34px",
              color: "#2D2C2C",
            }}
          >
            Dismiss
          </Button>
          <Button
            onClick={() => router.push(`/payments/print-check`)}
            style={{
              fontSize: "14px",
              fontWeight: "600",
              height: "34px",
              backgroundColor: "#00AEEF",
              border: "none",
            }}
          >
            Print Check
          </Button>
        </div>
      </div>
      <hr />
      <Card style={{ border: "none" }}>
        <CardBody className="d-flex flex-column" style={{ gap: "10px" }}>
          <div className="" style={{ fontSize: "16px", fontWeight: "600" }}>
            Digital Signature
          </div>
          <div
            className="d-flex"
            style={{ fontSize: "12px", fontWeight: "400", gap: "20px" }}
          >
            <div className="d-flex flex-column" style={{ gap: "7px" }}>
              <div>Signature Required</div>
              <div className="d-flex" style={{ gap: "17px" }}>
                <div className="d-flex" style={{ gap: "5px" }}>
                  <input type="radio" />
                  <div>Yes</div>
                </div>
                <div className="d-flex" style={{ gap: "5px" }}>
                  <input type="radio" />
                  <div>No</div>
                </div>{" "}
              </div>
            </div>
            <div className="">
              <div>Select User</div>
              <Select
                styles={{
                  control: (provided: any) => ({
                    ...provided,
                    height: "34px",
                    minHeight: "34px",
                    width: "220px",
                    minWidth: "220px",
                    marginTop: "4px",
                  }),
                }}
              />
            </div>
          </div>
        </CardBody>
      </Card>
      <hr />
    </div>
  );
}
