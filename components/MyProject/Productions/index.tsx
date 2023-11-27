import { Search } from "react-feather";
import { Button, Col, Row } from "reactstrap";
import { BsCameraVideo } from "react-icons/bs";
import Tabs from "./Tabs";
import { useRouter } from "next/router";
import AssignRSSLPopup from "./PendingProductions/AssignRSSLPopup";
import { hasPermission } from "commonFunctions/functions";
import Image from "next/image";
import cameraIcon from "assets/myIcons/missed_video_call.svg";
import AllProductionsTable from "./AllproductionsTable";
function Productions() {
  const router = useRouter();
  const hasCreateProductionPermission = hasPermission(
    "production_management",
    "create_production"
  );

  return (
    <div className="mt-3">
      <div className="d-flex flex-column" style={{ gap: "12px" }}>
        <AssignRSSLPopup />
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
            {/* {hasCreateProductionPermission && (
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
            )} */}
            {hasCreateProductionPermission && (
              <div>
                <Button
                  onClick={() => router.push(`/create-production`)}
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
                    alt=""
                    src={cameraIcon}
                    style={{ width: "14px", height: "14px" }}
                    className=""
                  />
                  New Production{" "}
                </Button>
              </div>
            )}
          </Col>
        </div>
        {/* <Tabs /> */}
        <AllProductionsTable />
      </div>
    </div>
  );
}

export default Productions;
