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
import { DashboardService } from "services";
import { useEffect, useState } from "react";
import { hasPermission } from "commonFunctions/functions";

function RecentProductions() {
  const dashboardService = new DashboardService();
  const [recentProductionsData, setRecentProductionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasCreateProductionPermission = hasPermission(
    "production_management",
    "create_production"
  );

  useEffect(() => {
    const getTenant = async () => {
        dashboardService.getRecentProductions().then((res) => {
          setIsLoading(res.isLoading);
          if (res.data) {
            // console.log(res.data)
            setRecentProductionsData(res.data);
          }
        });
    };
    getTenant();
  }, []);
  useEffect(() => {}, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div
          className="text-black mt-1"
          style={{ fontSize: "16px", fontWeight: "600", color: "#030229" }}
        >
          Recent Productions
        </div>

        <div className="d-flex gap-1">
          <Form
            className="faq-search-input"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="search mr-2"
              type="search"
              placeholder="Search..."
            />
          </Form>
          {hasCreateProductionPermission && (
          <Button color="primary">
            <BsCameraVideo style={{ color: "#FFFFFF" }} />
            <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
              {" "}
              New Production
            </span>
          </Button>
          )}
        </div>
      </div>

      <div className="my-2">
        <div className="row">
          {!isLoading &&
            recentProductionsData.map((project, i) => {
              return (
                <div className="col-md-4 mb-4" key={`recent-project-card-${i}`}>
                  <ProjectCard data={project} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default RecentProductions;
