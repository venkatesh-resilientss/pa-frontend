// ** Third Party Components
import {
  BiCalendar,
  BiCheckCircle,
  BiSolidCameraMovie,
  BiXCircle,
} from "react-icons/bi";
import { AiFillCaretRight, AiOutlineProfile } from "react-icons/ai";
import { TbBrandStackshare, TbTriangleSquareCircle } from "react-icons/tb";
import { CgCalendarDates } from "react-icons/cg";
import budget from "assets/DashboardIcons/budget.svg";
import Image from "next/image";
import outlined from "assets/DashboardIcons/outlined.svg";
import calenderMonth from "assets/DashboardIcons/calenderMonth.svg";

// ** Reactstrap Imports
import { Badge, Card, CardBody, Button, Col, Row } from "reactstrap";
import { Calendar, CheckCircle, Info, Mail, Users } from "react-feather";
import { useEffect } from "react";

const ProjectCard = ({ data }) => {
  const formatDate = (date: any) => {
    const res = new Date(data.payrolldate).toDateString().slice(4);
    return res;
  };
  return (
    <Card className="text-black px-1 h-100">
      <CardBody>
        <div className="d-flex">
          <div className="w-100 " style={{ marginLeft: "3px" }}>
            <div className="">
              <div className="d-flex justify-content-between">
                <div style={{ fontSize: "12px", color: "#030229" }}>
                  {data.client_name ? data.client_name : "-"}
                </div>
                <div
                  className="border rounded cursor-pointer text-black text-center d-flex px-1 p-1"
                  style={{
                    fontSize: "10px",
                    gap: "3px",
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

              <div className="d-flex justify-content-between mt-1">
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#030229",
                  }}
                >
                  {data.project_name ? data.project_name : "-"}
                </div>
              </div>
            </div>

            <div style={{ fontSize: "10px" }} className="mt-1">
              Payroll Coordinator :{" "}
              {data.payroll_coordinator ? data.payroll_coordinator : "-"}
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-between mt-3"
          style={{ fontSize: "10px" }}
        >
          <div className="d-flex" style={{ gap: "2px" }}>
            <Image
              src={budget}
              alt=""
              style={{
                height: "12px",
                width: "12px",
                fontWeight: "400",
                color: "#030229",
                marginTop: "2px",
              }}
            />
            <div>
              <span>Budget Allocated</span>
              <div style={{ fontWeight: "bold", fontSize: "10px" }}>
                {data.budget || 0}
              </div>
            </div>
            {/* Add margin to create space */}
            <div className="d-flex" style={{ gap: "2px", marginLeft: "8px" }}>
              <CgCalendarDates style={{ marginTop: "2px" }} />
              <div>
                <div>Budget Spent </div>
                <div style={{ fontWeight: "bold" }}>
                  {data.budget_spent || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-between mt-3"
          style={{ fontSize: "10px" }}
        >
          <div>
            <div className="d-flex" style={{ gap: "2px" }}>
              <BiSolidCameraMovie
                style={{ marginBottom: "3px", fontSize: "10px" }}
              />{" "}
              Subscribed Softwares
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "10px" }}
            >
              <div className="d-flex gap-1 mt-1">
                {data.softwares?.map((software, i) => {
                  return (
                    <div
                      key={`software-card-${i}`}
                      style={{
                        fontSize: "10px",
                        fontWeight: "400",
                        backgroundColor: "#B5DEF0",
                        width: "auto",
                        color: "#030229",
                        padding: "4px",
                        borderRadius: "5%",
                      }}
                    >
                      {software.name} test
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "10px" }}
            >
              <div className="d-flex" style={{ gap: "2px" }}>
                <div></div>
              </div>
              <div className="d-flex" style={{ gap: "2px" }}>
                <Image
                  src={calenderMonth}
                  style={{ height: "12px", width: "12px" }}
                  alt={""}
                />
                <div>
                  <div>Last payroll Date</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "10px" }}>
                {data.payrolldate ? formatDate(data.payrolldate) : "-"}{" "}
                {/* Payroll date */}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
