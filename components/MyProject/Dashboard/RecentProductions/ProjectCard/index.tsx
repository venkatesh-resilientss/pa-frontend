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
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <p className="f-14 m-0 clr-dbalck">
                  {getLabel(data?.client_name || "-")}
                </p>
                <Link href={`/productions/${data.id}`} className="ms-auto">
                  <div className="border rounded cr-p text-black text-center d-flex align-items-center gap-1 px-1 p-1 f-14">
                    <Image
                      src={carbonDecumentView}
                      alt={"view details"}
                      width={12}
                      height={12}
                    />
                    <div className="f-12 text-nowrap">View Details</div>

                    <AiFillCaretRight size={12} />
                  </div>
                </Link>
              </div>

              <div className="d-flex justify-content-between mt-1">
                <div className="fw-600 clr-dblack">
                  {getLabel(data?.project_name || "-")}
                </div>
              </div>
            </div>

            <div className="mt-2 f-12">
              <b>Production Accountant</b> :{" "}
              {data?.production_accountant || "-"}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3 f-12">
          <div className="d-flex gap-2">
            <Image src={budget} alt="" style={{ width: "15px" }} />
            <div>
              <span>Budget Allocated</span>
              <div className="fw-bold font-size-14">{data?.budget || 0}</div>
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
                <div>Budget Spent </div>
                <div className="fw-bold">{data?.budget_spent || 0}</div>
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
                      }}
                      className="p-1 px-2 f-12"
                    >
                      {software?.software_name || "-"}
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
