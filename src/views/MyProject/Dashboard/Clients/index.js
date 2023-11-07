import { Search, Users } from "react-feather";
import {
  Button,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import ClientsCard from "./ClientsCard";
import clientLogo from "../../../../assets/MyImages/client.svg";
import storyFarmLogo from "../../../../assets/MyImages/storyfarm.svg";
import fiveFilmsLogo from "../../../../assets/MyImages/5films.svg";
import newPaceLogo from "../../../../assets/MyImages/newpace.svg";
import blubluLogo from "../../../../assets/MyImages/blublu.svg";
import indigoLogo from "../../../../assets/MyImages/indigo.svg";
import { useHistory } from "react-router-dom";

function Clients() {
  const history = useHistory();
  return (
    <div className="my-2">
      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          Newly Onboarded Clients
        </div>

        <div className="d-flex gap-1">
          {/* <Form
            className="faq-search-input"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input placeholder="search..." />
            </InputGroup>
          </Form> */}
          <Button
            size="sm"
            color="info"
            style={{ fontSize: "10px" }}
            onClick={() => history.push(`/create-client`)}
          >
            <Users size={10} /> Create Client
          </Button>
        </div>
      </div>

      <div className="my-2">
        <Row>
          <Col xl="12">
            <ClientsCard
              clientName={"BluBlu Studios Corp"}
              clientLogo={blubluLogo}
              email={"abdul.32malik@gmail.com"}
              insurancePolicy={true}
              w9form={false}
              EIN={true}
            />
          </Col>
          <Col xl="12">
            <ClientsCard
              clientName={"BluBlu Studios Corp"}
              clientLogo={blubluLogo}
              email={"abdul.32malik@gmail.com"}
              insurancePolicy={true}
              w9form={false}
              EIN={true}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Clients;
