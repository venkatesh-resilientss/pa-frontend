// ** Third Party Components
import { BiSolidCameraMovie } from "react-icons/bi";
import { AiFillCaretRight, AiOutlineProfile } from "react-icons/ai";
import { LiaClipboardListSolid, LiaMoneyBillSolid } from "react-icons/lia";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";
import { Calendar } from "react-feather";

const ProductionsCard = () => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <div className="w-100 " style={{ marginLeft: "1px" }}>
            <div className="">
              <div className="d-flex justify-content-between">
                <div
                  className="text-black"
                  style={{ fontSize: "14px", fontWeight: "700" }}
                >
                  Client Name
                </div>
                <div
                  className="border rounded cursor-pointer text-black d-flex align-items-center"
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                    width: "90px",
                    height: "20px",
                  }}
                >
                  <AiOutlineProfile size={12} /> View Details{" "}
                  <AiFillCaretRight />
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div
                  className="text-black"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  Production Name
                </div>

                <div
                  className="text-black"
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                  }}
                >
                  <Calendar size={12} /> Apr 1, 2023 - Dec 31 2023
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              {" "}
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

            <div className="">
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-1">
                  <div>
                    <div
                      className="text-black"
                      style={{ fontSize: "10px", fontWeight: "400" }}
                    >
                      Account Payable{" "}
                    </div>
                    <div
                      className="text-black"
                      style={{ fontSize: "12px", fontWeight: "700" }}
                    >
                      07
                    </div>
                  </div>

                  <div>
                    <div
                      className="text-black"
                      style={{ fontSize: "10px", fontWeight: "400" }}
                    >
                      Petty Cash
                    </div>
                    <div
                      className="text-black"
                      style={{ fontSize: "12px", fontWeight: "700" }}
                    >
                      02
                    </div>
                  </div>

                  <div>
                    <div
                      className="text-black"
                      style={{ fontSize: "10px", fontWeight: "400" }}
                    >
                      Payroll
                    </div>
                    <div
                      className="text-black"
                      style={{ fontSize: "12px", fontWeight: "700" }}
                    >
                      12
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-1">
                  <div>
                    <div
                      className="text-black"
                      style={{ fontSize: "10px", fontWeight: "400" }}
                    >
                      Allocated
                    </div>
                    <div
                      className="text-black"
                      style={{ fontSize: "12px", fontWeight: "700" }}
                    >
                      $500,000{" "}
                    </div>
                  </div>

                  <div>
                    <div
                      className="text-black"
                      style={{ fontSize: "10px", fontWeight: "400" }}
                    >
                      Awarded
                    </div>
                    <div
                      className="text-black"
                      style={{ fontSize: "12px", fontWeight: "700" }}
                    >
                      $350,190{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div
          className="text-black"
          style={{ fontSize: "10px", fontWeight: "400" }}
        >
          <BiSolidCameraMovie size={14} /> Departments
        </div>

        <div className="d-flex gap-1 mt-1">
          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "2px",
            }}
          >
            Production Accounting
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Finance
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Construction
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Lighting
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Location
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Props
          </div>
        </div>

        <div className="d-flex gap-1 mt-1">
          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Hair
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Makeup
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Costumes
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Art
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Accounting
          </div>

          <div
            className="text-black rounded border d-flex align-items-center"
            style={{
              fontSize: "8px",
              fontWeight: "400",
              padding: "5px",
            }}
          >
            Camera
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductionsCard;
