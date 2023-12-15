import { AiFillCaretRight } from "react-icons/ai";
import budget from "assets/DashboardIcons/budget.svg";
import budgetSpend from "assets/DashboardIcons/budget_spend.svg";
import Image from "next/image";
import carbonDecumentView from "assets/DashboardIcons/carbonDecumentView.svg";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";
import { getLabel } from "@/commonFunctions/common";
import Link from "next/link";

const ProjectCard = ({ data }) => {
  
  return (
    <Card className="text-black px-1 h-100">
      <CardBody>
        <div className="d-flex">
          <div className="w-100 " style={{ marginLeft: "3px" }}>
            <div className="">
              <div className="d-flex justify-content-between">
                <div>
                  {getLabel(data.client_name ? data.client_name : "-")}
                </div>
                <Link href={`/productions/${data.id}`}>
                  <div className="border rounded cr-p text-black text-center d-flex gap-1 px-1 p-1 f-14">
                    <div>
                      <Image
                        src={carbonDecumentView}
                        style={{ height: "12px", width: "12px",marginBottom:"5px" }}
                        alt={"view details"}
                      />
                    </div>
                    <div className="view_details">View Details</div>
                    <div>
                      <AiFillCaretRight style={{ marginBottom: "1px" }} />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="d-flex justify-content-between ">
                <div className="clientcard_headings clr-dblack">
                  {getLabel(data.project_name || "-")}
                </div>
              </div>
            </div>

            <div className="mt-2 f-12 fw-600">
              <p>Production Accountant :{" "} {data.payroll_coordinator ? data.payroll_coordinator : "-"}</p>
              
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3 f-12">
          <div className="d-flex gap-2 ">

            <div className="d-flex gap-2">
              <Image
                src={budget}
                alt=""
                style={{
                  width: "12px",
                }}
              />
              <div>
                <div className="f-12">Budget Allocated </div>
                <div className="fw-bold f-14">{data.budget  || 0}</div>
              </div>
            </div>
            <div className="d-flex gap-2 iconsSpace">
              <Image
                src={budgetSpend}
                alt=""
                style={{
                  width: "12px",
                }}
              />
              <div>
                <div className="f-12">Budget Spent </div>
                <div className="fw-bold f-14">{data.budget_spent || 0}</div>
              </div>
            </div>
          </div>
        </div>
        

        <div className="d-flex justify-content-between mt-3">
          <div>
            <div className="d-flex gap-2 f-12">
              <img src="software_subscribed.svg" alt="" />
              Subscribed Softwares
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "10px" }}
            >
              <div className="d-flex gap-2 mt-2 f-12">
                {data.softwares?.map((software, i) => {
                  return (
                    <div
                      key={`software-card-${i}`}
                      style={{
                        backgroundColor: "#B5DEF0",
                        color: "#030229",
                        borderRadius: "5%",
                      }} className="p-1 px-2 f-12"
                    >
                      {software.software_name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between f-12">
              <div className="d-flex gap-2">
                <div></div>
              </div>
              <div className="d-flex gap-2">
                <div className="d-flex gap-2">
                  <img
                    src="production_type.svg"
                    alt="custom production"
                    style={{ width: "15px" }}
                  />
                  Production Type
                </div>
              </div>
            </div>
            <div>
              <div className="f-14 fw-bold text-end">
                <p>Custom Design</p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
