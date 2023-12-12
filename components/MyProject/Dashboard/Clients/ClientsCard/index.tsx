// ** Third Party Components
// ** Reactstrap Imports
import { Card } from "reactstrap";
import Image from "next/image";

import fluentEmoji from "assets/DashboardIcons/fluentEmoji.svg";
import router from "next/router";
const ClientsCard = ({ data }) => {
  
  const handleViewDetailsClick = () => {
    router.push(`/configurations/edit-country/${data.id}`)
  };

  return (
    <Card
      style={{ padding: "10px", borderRadius: "10px", gap: "4px" }}
      className="p-3"
    >
      <div className="d-flex">
        <div className={` rounded-circle  ${"bg-light-secondary"}`}>
          <img
            src={
              data.clientLogo == undefined
                ? "/default.svg"
                : data.clientLogo
            }
            alt="logo"
            style={{
              height: "37px",
              width: "37px",
              borderRadius: "50%",
              backgroundColor: "#E7E7E7",
            }}
          />
        </div>
        <div className="w-100 " style={{ marginLeft: "10px" }}>
          <div className="d-flex justify-content-between">
            <div
              style={{ fontSize: "18px", fontWeight: "700", color: "#030229" }}
            >
                {data.name ? data.name.charAt(0).toUpperCase() + data.name.slice(1) : "-"}

            </div>
            <div
                className="border rounded cursor-pointer text-black text-center d-flex align-items-center py-1 px-2"
                style={{ fontSize: "10px", fontWeight: "400", gap: "3px", }}  onClick={handleViewDetailsClick}              
              >
                  <div>
                    <img src="/view_details.svg" alt="" />
                  </div>{" "}
                  <p style={{ fontSize: "14px" }}>View Details</p>
                </div>
          </div>

          <div className="d-flex gap-4 justify-content-between mt-3">
            <div
              className="text-black d-flex align-items-center"
              style={{
                fontSize: "10px",
                fontWeight: "400",
                marginBottom: "4px",
              }}
            >
              <img src="user.svg" alt="user" style={{ marginRight: "5px", width:"15px"}} />
              <p style={{fontSize:"12px"}}>{data.contact.full_name ? data.contact.full_name : "-"}</p>
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#030229",
                marginLeft: "90px",
              }}
            >
              No. of Active Productions:{" "}
              {data.projects_count ? data.projects_count : "-"}
            </div>
        </div>
          <div className="d-flex gap-4 justify-content-between mt-3">
            <div
              className="text-black d-flex align-items-center"
              style={{
                fontSize: "10px",
                fontWeight: "400",
                marginBottom: "4px",
              }}
            >
              <img src="mail.svg" alt="user" style={{ marginRight: "5px", width:"15px"}} />
              <p style={{fontSize:"12px"}}>{data.contact.full_name ? data.contact.full_name : "-"}</p>
            </div>
        </div>

          
         <div className="d-flex mt-2">
          <p style={{ fontSize: "14px" }} className="d-flex align-items-center">
            <img src="psa.svg" style={{ width: "17px", marginRight: "5px" }} alt="" />
            PSA
          </p>
          <p style={{ fontSize: "14px" }} className="d-flex align-items-center ms-2">
            <img src="psa.svg" style={{ width: "17px", marginRight: "5px" }} alt="" />
            Software Requirement
          </p>
          <p style={{ fontSize: "14px" }} className="d-flex align-items-center ms-2">
            <img src="work_order.svg" style={{ width: "17px", marginRight: "5px" }} alt="" />
            Work Order
          </p>
        </div>


        </div>
      </div>

      <hr className="mt-2" />
      
      <div className="text-black d-flex align-items-center" style={{ fontWeight: "400", color: "#030229", fontSize: "12px" }}>
        <Image src={fluentEmoji} style={{ height: "18px", width: "18px" }} alt={""} />
        <span className="m-2" style={{ fontSize: "14px" }}>Subscribed Softwares</span>
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
            {software.software_name}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ClientsCard;
