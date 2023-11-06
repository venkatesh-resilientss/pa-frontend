import { Search } from "react-feather";
import {
  Button,
  div,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import { BsCameraVideo } from "react-icons/bs";
import AssignRSSLPopup from "./PendingProductions/AssignRSSLPopup";
import Tabs from "./Tabs";
import { useHistory } from "react-router-dom";

function index() {
  const history = useHistory();
  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      <AssignRSSLPopup />
      <div
        className="border-bottom rounded d-flex justify-content-between"
        style={{ backgroundColor: "#E7EFFF", height: "62px", padding: "10px" }}
      >
        {/* <CardTitle tag="h4">{tableTitle}</CardTitle> */}
        <div
          className="text-black "
          style={{ fontSize: "16px", fontWeight: "600", marginTop: "10px" }}
        >
          All Productions
        </div>

        <div className="col-6 d-flex">
          <Form
            className="faq-search-input"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input placeholder="search..." />
            </InputGroup>
          </Form>
          <Button
            onClick={() => history.push(`/create-production`)}
            color="info"
            className="my-1 m-auto my-sm-0 "
          >
            <BsCameraVideo style={{ marginBottom: "2px" }} /> New Production
          </Button>
        </div>
      </div>
      <Tabs />
    </div>
  );
}

export default index;
