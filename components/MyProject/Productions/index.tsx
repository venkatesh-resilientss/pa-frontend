import { Search } from "react-feather";
import { Button, Col, Row } from "reactstrap";
import { BsCameraVideo } from "react-icons/bs";
import Tabs from "./Tabs";
import { useRouter } from "next/router";
import AssignRSSLPopup from "./PendingProductions/AssignRSSLPopup";
import { hasPermission } from "commonFunctions/functions";
function Productions() {
  const router = useRouter();
  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      <div>
        <AssignRSSLPopup />
        <Row
          className="border-bottom rounded shadow m-2 mb-1"
          style={{
            backgroundColor: "#E7EFFF",
            height: "62px",
            padding: "10px",
          }}
        >
          <Col md="6">
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                marginTop: "10px",
                color: "#030229",
              }}
            >
              All Productions
            </div>
          </Col>
          <Col md="6" className="d-flex justify-content-end">
            {/* <Form
            className="faq-search-input"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input placeholder="search..." />
            </InputGroup>
          </Form> */}
            {/* <Button
              onClick={() => router.push(`/create-production`)}
              color="info"
              style={{ color: "#FFFFFF", fontWeight: 600 }}
            >
              <BsCameraVideo
                style={{
                  marginBottom: "2px",
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
              />{" "}
              New Production
            </Button> */}
            {hasPermission("production_management", "create_production") && (
              <Button
                onClick={() => router.push(`/create-production`)}
                color="info"
                style={{ color: "#FFFFFF", fontWeight: 600 }}
              >
                <BsCameraVideo
                  style={{
                    marginBottom: "2px",
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                />{" "}
                New Production
              </Button>
            )}
          </Col>
        </Row>
        <Tabs />
      </div>
    </div>
  );
}

export default Productions;
