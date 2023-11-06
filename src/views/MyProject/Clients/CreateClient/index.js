import { Button } from "reactstrap";
import ClientAccordion from "./Accordion";
import { useHistory } from "react-router-dom";

function index() {
  const history = useHistory();
  return (
    <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Clients
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Add New Client{" "}
        </div>
        <div className="d-flex gap-1">
          <Button color="white" size="sm" onClick={() => history.goBack()}>
            Dismiss
          </Button>
          <Button size="sm" color="info">
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <ClientAccordion />
    </div>
  );
}

export default index;
