import Link from "next/link";
import { Card } from "reactstrap";
import Image from "next/image";
import { AiFillCaretRight } from "react-icons/ai";

import fluentEmoji from "assets/DashboardIcons/fluentEmoji.svg";
import { getLabel } from "@/commonFunctions/common";

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
            <div className="f-18 fw-bold clr-dblack">
              {getLabel(data.name || "-")}
            </div>
            <Link href={`/clients/${data.id}`}>
              <div className="border rounded cr-p text-black text-center d-flex align-items-center gap-1 f-10 py-1 px-2">
                <img src="/view_details.svg" alt="view" />
                <p className="f-14">View Details</p>
                <AiFillCaretRight style={{ marginBottom: "1px" }} />
              </div>
            </Link>
          </div>

          <div className="d-flex gap-4 justify-content-between mt-3">
            <div className="text-black d-flex align-items-center f-10 mb-1">
              <img
                src="user.svg"
                alt="user"
                style={{ marginRight: "5px", width: "15px" }}
              />
              <p className="f-12">{getLabel(data.client_admin.name || "-")}</p>
            </div>
            <div className="f-14 clr-dblack" style={{ marginLeft: "90px" }}>
              No. of Active Productions:{" "}
              {data.projects_count ? data.projects_count : "0"}
            </div>
          </div>
          <div className="d-flex gap-4 justify-content-between mt-2">
            <div
              className="text-black d-flex align-items-center"
              style={{
                fontSize: "10px",
                fontWeight: "400",
                marginBottom: "4px",
              }}
            >
              <img
                src="mail.svg"
                alt="user"
                style={{ marginRight: "5px", width: "15px" }}
              />
              <p style={{ fontSize: "12px" }}>
                {data.client_admin.email ? data.client_admin.email : "-"}
              </p>
            </div>
          </div>

          <div className="d-flex mt-2">
            <p
              style={{ fontSize: "14px" }}
              className="d-flex align-items-center"
            >
              <img
                src="psa.svg"
                style={{ width: "17px", marginRight: "5px" }}
                alt=""
              />
              PSA
            </p>
            <p
              style={{ fontSize: "14px" }}
              className="d-flex align-items-center ms-2"
            >
              <img
                src="psa.svg"
                style={{ width: "17px", marginRight: "5px" }}
                alt=""
              />
              Software Requirement
            </p>
            <p
              style={{ fontSize: "14px" }}
              className="d-flex align-items-center ms-2"
            >
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

      <hr className="mt-2" />

      <div
        className="text-black d-flex align-items-center"
        style={{ fontWeight: "400", color: "#030229", fontSize: "12px" }}
      >
        <Image
          src={fluentEmoji}
          style={{ height: "18px", width: "18px" }}
          alt={""}
        />
        <span className="m-2" style={{ fontSize: "14px" }}>
          Subscribed Softwares
        </span>
      </div>

      <div className="d-flex gap-1 mt-2">
        {data.softwares.map((software, i) => (
          <div
            key={i}
            style={{
              fontSize: "12px",
              fontWeight: "400",
              backgroundColor: "#B5DEF0",
              width: "auto",
              color: "#030229",
              padding: "4px",
              borderRadius: "5%",
            }}
          >
            {software.software_name || "-"}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ClientsCard;
