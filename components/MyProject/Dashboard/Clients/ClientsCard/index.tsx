// ** Third Party Components
import { BiCheckCircle, BiSolidCameraMovie, BiXCircle } from "react-icons/bi";
import { AiFillCaretRight, AiOutlineProfile } from "react-icons/ai";

// ** Reactstrap Imports
import { Badge, Card, CardBody } from "reactstrap";
import { Calendar, CheckCircle, Info, Mail, Users } from "react-feather";
import Image from "next/image";
import carbonDecumentView from "assets/DashboardIcons/carbonDecumentView.svg";
import user from "assets/DashboardIcons/person.svg";
import fluentEmoji from "assets/DashboardIcons/fluentEmoji.svg";
const ClientsCard = ({ data }) => {
  return (
    <Card
      style={{ padding: "10px", borderRadius: "10px", gap: "4px" }}
      className="p-3"
    >
      <div className="d-flex">
        <div className={` rounded-circle  ${"bg-light-secondary"}`}>
          <img
            src={
              data.clientLogo == undefined ? "/icons/dummy-client-logo.svg" : data.clientLogo
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
              {data.name ? data.name : '-'}
            </div>

            <div
              className="border rounded cursor-pointer text-black text-center d-flex align-items-center py-1 px-2"
              style={{
                fontSize: "10px",
                fontWeight: "400",
                gap: "3px",
              }}
            >
              <div>
                <Image
                  src={carbonDecumentView}
                  style={{ height: "11px", width: "11px" }}
                  alt={""}
                />
              </div>{" "}
              <p>View Details</p>
              <div>
                <AiFillCaretRight style={{ marginBottom: "1px" }} />
              </div>
            </div>
          </div>

          <div className="d-flex gap-4 justify-content-between mt-2">
            <div
              className="text-black mt-1"
              style={{
                fontSize: "10px",
                fontWeight: "400",
                marginBottom: "4px",
                display: "flex",
              }}
            >
              <Image
                src={user}
                style={{
                  height: "12px",
                  width: "12px",
                  fontWeight: "400",
                  color: "#030229",
                }}
                alt={""}
              />{" "}
              {data.contact.full_name ? data.contact.full_name : '-'}
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: "400",
                color: "#030229",
                marginLeft: "90px",
              }}
            >
              No. of Active Productions: {data.projects_count ? data.projects_count : '-'}
            </div>
          </div>
          <div className="d-flex flex-column gap-1 mt-1">
            <div
              className="text-black"
              style={{ fontSize: "10px", fontWeight: "400" }}
            >
              <Mail size={12} /> Email:{data.contact.email_id ? data.contact.email_id : '-'}
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-2" />

      <div
        className="text-black"
        style={{ fontWeight: "400", color: "#030229", fontSize: "12px" }}
      >
        <Image
          src={fluentEmoji}
          style={{ height: "18px", width: "18px" }}
          alt={""}
        />
        <span className="m-2">Subscribed Softwares</span>
      </div>

      <div className="d-flex gap-1 mt-2">
  {data.softwares.map((software, i) => (
    <div
      key={i}
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
      {software.software_name}
    </div>
  ))}
</div>
    </Card>
  );
};

export default ClientsCard;
