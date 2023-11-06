// ** Third Party Components
import {
  BiCalendar,
  BiCheckCircle,
  BiSolidCameraMovie,
  BiXCircle,
} from "react-icons/bi";
import { AiFillCaretRight, AiOutlineProfile } from "react-icons/ai";
import { LiaClipboardListSolid, LiaMoneyBillSolid } from "react-icons/lia";
import { TbBrandStackshare, TbTriangleSquareCircle } from "react-icons/tb";
import { CgCalendarDates } from "react-icons/cg";

// ** Reactstrap Imports
import { Badge, Card, CardBody, Button, Col, Row } from "reactstrap";
import { Calendar, CheckCircle, Info, Mail, Users } from "react-feather";

const ProjectCard = ({
  icon,
  color,
  className,
  clientLogo,
  clientName,
  email,
  insurancePolicy,
  w9form,
  EIN,
}) => {
  return (
    <Card className="text-black">
      <CardBody>
        <div className="d-flex">
          <div className="w-100 " style={{ marginLeft: "1px" }}>
            <div className="">
              <div className="d-flex justify-content-between">
                <div
                  className="text-black"
                  style={{ fontSize: "12px", fontWeight: "700" }}
                >
                  Client Name
                </div>
                <div
                  className="border rounded cursor-pointer text-black text-center d-flex  "
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                    width: "90px",
                    height: "20px",
                    gap: "3px",
                    padding: "2px",
                  }}
                >
                  <div>
                    <AiOutlineProfile style={{ marginBottom: "1px" }} />
                  </div>{" "}
                  <div>View Details</div>
                  <div>
                    <AiFillCaretRight style={{ marginBottom: "1px" }} />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div
                  className="text-black"
                  style={{ fontSize: "16px", fontWeight: "700" }}
                >
                  Production Name
                </div>

                <div
                  className="text-black"
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                    marginTop: "4px",
                  }}
                >
                  <Calendar size={12} /> Apr 1, 2023 - Dec 31 2023
                </div>
              </div>
            </div>

            <div style={{ fontSize: "10px" }}>
              Payroll Coordinator : John Duo
            </div>

            <div className="d-flex justify-content-between my-1">
              <div
                className="text-black"
                style={{ fontSize: "10px", fontWeight: "400" }}
              >
                <LiaClipboardListSolid size={14} /> Pending Items
              </div>
              <div
                className="text-black"
                style={{ fontSize: "10px", fontWeight: "400" }}
              >
                <LiaMoneyBillSolid size={14} /> Budget
              </div>
            </div>

            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "8px" }}
            >
              <div className="d-flex gap-1 mb-1">
                <div>
                  <div>Account Payable</div>
                  <div style={{ fontWeight: "600" }}>07</div>
                </div>
                <div>
                  <div>Petty Cash </div>
                  <div style={{ fontWeight: "600" }}>02</div>
                </div>
                <div>
                  <div>Journal Entry</div>
                  <div style={{ fontWeight: "600" }}>12</div>
                </div>
              </div>

              <div className="d-flex gap-1">
                <div>
                  <div>Allocated</div>
                  <div style={{ fontWeight: "600" }}>$500,000</div>
                </div>
                <div>
                  <div>Spend</div>
                  <div style={{ fontWeight: "600" }}>$350,190</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-between"
          style={{ fontSize: "10px" }}
        >
          <div className="d-flex" style={{ gap: "2px" }}>
            <TbTriangleSquareCircle style={{ marginTop: "2px" }} />
            <div>
              <div>Project Type</div>
              <div style={{ fontWeight: "600" }}>Costume Design</div>
            </div>
          </div>

          <div className="d-flex" style={{ gap: "2px" }}>
            <CgCalendarDates style={{ marginTop: "2px" }} />
            <div>
              <div>Last Payroll Date </div>
              <div style={{ fontWeight: "600" }}>Sep 30, 2023</div>
            </div>
          </div>

          <div className="d-flex" style={{ gap: "2px" }}>
            <TbBrandStackshare style={{ marginTop: "2px" }} />
            <div>
              <div>Labour Type</div>
              <div style={{ fontWeight: "600" }}>Union</div>
            </div>
          </div>
        </div>

        <hr />

        <div
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          <BiSolidCameraMovie style={{ marginBottom: "3px" }} /> Subscribed
          Softwares
        </div>

        <div className="d-flex gap-1 mt-1">
          <div
            className="text-black text-center rounded"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              backgroundColor: "#B5DEF0",
              width: "112px",
              padding: "5px",
            }}
          >
            Production Accounting
          </div>

          <div
            className="text-black text-center rounded"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              backgroundColor: "#B5DEF0",
              width: "112px",
              padding: "5px",
            }}
          >
            Electronic Time Capture
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
