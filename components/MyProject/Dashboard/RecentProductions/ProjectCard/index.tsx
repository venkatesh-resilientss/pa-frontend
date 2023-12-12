// ** Third Party Components
import { AiFillCaretRight } from "react-icons/ai";
import budget from "assets/DashboardIcons/budget.svg";
import budgetSpend from "assets/DashboardIcons/budget_spend.svg";
import Image from "next/image";
import carbonDecumentView from "assets/DashboardIcons/carbonDecumentView.svg";



// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";
import router from "next/router";

const ProjectCard = ({ data }) => {
 

  const handleViewDetailsClick = () => {
    router.push(`/edit-production/${data.id}`);
  };
  
  return (
    <Card className="text-black px-1 h-100">
      <CardBody>
        <div className="d-flex">
          <div className="w-100 " style={{ marginLeft: "3px" }}>
            <div className="">
              <div className="d-flex justify-content-between">
                <div style={{ fontSize: "14px", color: "#030229" }}>
                  {data.client_name ? data.client_name : "-"}
                </div>
                <div
                  className="border rounded cursor-pointer text-black text-center d-flex px-1 p-1"
                  style={{
                    fontSize: "14px",
                    gap: "3px",
                  }}
                  onClick={handleViewDetailsClick}
                >
                  <div>
                    <Image src={carbonDecumentView} style={{ height: "11px", width: "11px" }} alt={"view details"}/>
                  </div>
                  <div>View Details</div>
                  <div>
                    <AiFillCaretRight style={{ marginBottom: "1px" }} />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-1">
                <div className="font-size-16 fw-600"
                  style={{
                    color: "#030229",
                  }}
                >
                  {data.project_name ? data.project_name.replace(/\b\w/g, match => match.toUpperCase()) : "-"}
                </div>
              </div>
            </div>

            <div  className="mt-2 font-size-14">
              Payroll Coordinator :{" "}
              {data.payroll_coordinator ? data.payroll_coordinator : "-"}
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-between mt-3 font-size-14"
        >
          <div className="d-flex gap-2">
            <Image
              src={budget}
              alt=""
              style={{
                width: "15px",
              }}
            />
            <div>
              <span>Budget Allocated</span>
              <div className="fw-bold font-size-14">
                {data.budget || 0}
              </div>
            </div>
            
            <div className="d-flex gap-2 iconsSpace">
            <Image
              src={budgetSpend}
              alt=""
              style={{
                width: "15px",
              }}
            />
              <div>
                <div>Budget Spent </div>
                <div className="fw-bold">
                  {data.budget_spent || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-between mt-3">
          <div>
            <div className="d-flex gap-2">
              <img src="software_subscribed.svg" alt="" />
              Subscribed Softwares
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "10px" }}
            >
              <div className="d-flex gap-2 mt-1 font-size-14 fw-400">
                {data.softwares?.map((software, i) => {
                  return (
                    <div
                      key={`software-card-${i}`}
                      style={{
                        backgroundColor: "#B5DEF0",
                        width: "auto",
                        color: "#030229",
                        padding: "4px",
                        borderRadius: "5%",
                      }}
                    >
                      {software.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "14px" }}
            >
              <div className="d-flex gap-2">
                <div></div>
              </div>
              <div className="d-flex gap-2">
                
                 <div className="d-flex gap-2">
              <img src="production_type.svg" alt="" />
              Production Type
            </div>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>
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
