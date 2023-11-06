// ** Third Party Components
import { BiCheckCircle, BiSolidCameraMovie, BiXCircle } from "react-icons/bi";
import { AiFillCaretRight, AiOutlineProfile } from "react-icons/ai";

// ** Reactstrap Imports
import { Badge, Card, CardBody } from "reactstrap";
import { Calendar, CheckCircle, Info, Mail, Users } from "react-feather";

const ClientsCard = ({
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
    <Card style={{ padding: "10px" }} className="">
      <div className="d-flex">
        <div
          className={` rounded-circle  ${
            color ? `bg-light-${color}` : "bg-light-secondary"
          }`}
          style={{ width: "37px", height: "37px" }}
        >
          <img src={clientLogo} />
        </div>
        <div className="w-100 " style={{ marginLeft: "1px" }}>
          <div className="d-flex justify-content-between">
            <div
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "700" }}
            >
              {clientName}
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

          <div
            className="d-flex gap-1"
            style={{
              marginTop: "4px",
            }}
          >
            <div
              className="text-black"
              style={{
                fontSize: "10px",
                fontWeight: "400",
                marginBottom: "4px",
              }}
            >
              <Calendar size={12} /> Winston George
            </div>
            <div
              className="text-black"
              style={{ fontSize: "10px", fontWeight: "400" }}
            >
              No. of Active Productions:2
            </div>
          </div>

          <div className="d-flex flex-column gap-1">
            <div
              className="text-black"
              style={{ fontSize: "10px", fontWeight: "400" }}
            >
              <Mail size={12} /> Email:{email}
            </div>

            <div className="d-flex gap-1">
              <div
                className="text-black"
                style={{ fontSize: "10px", fontWeight: "400" }}
              >
                {insurancePolicy ? (
                  <BiCheckCircle className="text-success" size={14} />
                ) : (
                  <BiXCircle className="text-danger" size={14} />
                )}
                Insurance Policy
              </div>

              <div
                className="text-black"
                style={{ fontSize: "10px", fontWeight: "400" }}
              >
                {w9form ? (
                  <BiCheckCircle className="text-success" size={14} />
                ) : (
                  <BiXCircle className="text-danger" size={14} />
                )}{" "}
                W-9 form
              </div>

              <div
                className="text-black"
                style={{ fontSize: "10px", fontWeight: "400" }}
              >
                {EIN ? (
                  <BiCheckCircle className="text-success" size={14} />
                ) : (
                  <BiXCircle className="text-danger" size={14} />
                )}{" "}
                EIN
              </div>
            </div>
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
    </Card>
  );
};

export default ClientsCard;
