import Link from "next/link";
import { Card } from "reactstrap";
import Image from "next/image";
import { AiFillCaretRight } from "react-icons/ai";
import carbonDecumentView from "assets/DashboardIcons/carbonDecumentView.svg";

import fluentEmoji from "assets/DashboardIcons/fluentEmoji.svg";
import { getLabel } from "@/commonFunctions/common";
import { Col, Row } from "react-bootstrap";

const ClientsCard = ({ data }) => {
  return (
    <Card
      style={{ padding: "10px", borderRadius: "10px", gap: "4px" }}
      className="p-3"
    >
      <div className="d-flex">
        <div className={` rounded-circle  ${"bg-light-secondary"}`}>
          <img
            src={data.logo_url || "/default.svg"}
            alt="logo"
            style={{
              height: "37px",
              width: "37px",
              borderRadius: "50%",
              backgroundColor: "#E7E7E7",
            }}
          />
        </div>
        <div className="w-100 ms-2">
          <div className="d-flex justify-content-between">
            <div className="clientcard_headings">
              {getLabel(data.name || "-")}
            </div>
            <Link href={`/clients/${data.id}`}>
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
                  <AiFillCaretRight className="mb-1" />
                </div>
              </div>
            </Link>
          </div>

        
           <div className="d-flex gap-4 justify-content-between mt-3">
            <div className="text-black d-flex align-items-center f-10 mb-1">
              <div className="custom-margin">
                <img src="user.svg" alt="user" className="img-fluid" style={{ width: "15px" }} />
              </div>
              <div className="f-12 f-clamp-2">
                {getLabel(data.client_admin.name || "-")}
              </div>
            </div>
            <div className="f-12 clr-dblack">
              <div>
                No. of Active Productions:{' '}
                {data.projects_count ? data.projects_count : '0'}
              </div>
            </div>
          </div>
          

           <div className="d-flex gap-4 justify-content-between mt-1">
            <div className="text-black d-flex align-items-center fs-10 fw-400 mb-1">
              <div className="custom-margin">
                <img src="mail.svg" alt="mail" className="img-fluid" style={{ width: "14px" }} />
              </div>
              <div className="f-12">
                {data.client_admin.email ? data.client_admin.email : "-"}
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <p className="d-flex align-items-center f-12">
              <img
                src="psa.svg"
                style={{ width: "17px", marginRight: "5px" }}
                alt=""
              />
              PSA
            </p>
            <p className="d-flex align-items-center ms-2 f-12">
              <img
                src="psa.svg"
                style={{ width: "17px", marginRight: "5px" }}
                alt=""
              />
              Software Requirement
            </p>
            <p className="d-flex align-items-center ms-2 f-12">
              <img
                src="work_order.svg"
                style={{ width: "17px", marginRight: "5px" }}
                alt=""
              />
              Work Order
            </p>
          </div>
        </div>
      </div>

      <hr className="mt-2 mb-0" />

      <div
        className="text-black d-flex align-items-center fw-400 f-12"
        style={{  color: "#030229"}}
      >
        <Image
          src={fluentEmoji}
          style={{ height: "18px", width: "18px" }}
          alt={""}
        />
        <span className="m-2 f-12">Subscribed Softwares</span>
      </div>

      <div className="d-flex gap-1">
        {data.softwares.map((software, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#B5DEF0",
              borderRadius: "5%",
            }} className="p-1 px-2 f-12"
          >
            {software.software_name || "-"}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ClientsCard;
