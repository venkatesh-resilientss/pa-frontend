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
import ProjectCard from "./ProjectCard";
import { BsCameraVideo } from "react-icons/bs";

function RecentProductions() {
  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          Recent Productions
        </div>

        <div className="d-flex gap-1">
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

          <Button color="info">
            <BsCameraVideo /> New Production
          </Button>
        </div>
      </div>

      <div className="my-2">
        <Row>
          <Col xl="4">
            <ProjectCard />
          </Col>

          <Col xl="4">
            <ProjectCard />
          </Col>

          <Col xl="4">
            <ProjectCard />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default RecentProductions;
