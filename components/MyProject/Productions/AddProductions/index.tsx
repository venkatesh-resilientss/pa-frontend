import ReactSelect from "react-select";
import { Button, Col, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
function AddProductions() {
  const router = useRouter();

  return (
    <div
      style={{ fontFamily: "Segoe UI" }}
      className="overflow-auto text-black"
    >
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Productions{" "}
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Create New Production{" "}
        </div>
        <div className="d-flex gap-1">
          <Button onClick={() => router.back()} color="white" size="sm">
            Dismiss
          </Button>
          <Button size="sm" color="info">
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <div>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Basic Information
        </div>
        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Production Code{" "}
          </Label>
          <Input placeholder="Production Code" />
        </Col>
        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Production Name{" "}
          </Label>
          <Input placeholder=" Production Name" />
        </Col>
        <div className="d-flex flex-column mt-1">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Status{" "}
          </Label>
          <div className="d-flex gap-1">
            <div className="d-flex gap-1">
              <input type="radio" />
              <div>Active</div>
            </div>
            <div className="d-flex gap-1">
              <input type="radio" />
              <div>In-Active</div>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <div>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Approval work flow for Transactions
        </div>
        <div className="col-4 mt-2 ms-2">
          <div className="d-flex" style={{ gap: "5px" }}>
            <input type="checkbox" />
            <div style={{ fontSize: "16px" }}>Purchase Order</div>
          </div>

          <div className="d-flex" style={{ gap: "5px" }}>
            <input type="checkbox" />
            <div style={{ fontSize: "16px" }}>Account Payable</div>
          </div>

          <div className="d-flex" style={{ gap: "5px" }}>
            <input type="checkbox" />
            <div style={{ fontSize: "16px" }}>Journal Entry</div>
          </div>

          <div className="d-flex" style={{ gap: "5px" }}>
            <input type="checkbox" />
            <div style={{ fontSize: "16px" }}>Petty Cash</div>
          </div>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <div>
        <div style={{ fontSize: "16px", fontWeight: "600" }}>
          Basic Information
        </div>
        <div className="d-flex justify-content-between   ">
          <Col xl="3">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              First Name{" "}
            </Label>
            <Input placeholder="First Name" />
          </Col>
          <Col xl="3">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Middle Name
            </Label>
            <Input placeholder="Middle Name" />
          </Col>

          <Col xl="3">
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Last Name
            </Label>
            <Input placeholder="Last Name" />
          </Col>
        </div>

        <Col xl="3">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Email ID
          </Label>
          <Input placeholder="Email ID" />
        </Col>
      </div>

      <hr style={{ height: "2px" }} />

      <div className="d-flex flex-column mt-1">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Status{" "}
        </Label>
        <div className="d-flex gap-1">
          <div className="d-flex gap-1">
            <input type="radio" />
            <div>Active</div>
          </div>
          <div className="d-flex gap-1">
            <input type="radio" />
            <div>In-Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductions;
