import { Button, Form } from "reactstrap";
import ProjectCard from "./ProjectCard";
import { BsCameraVideo } from "react-icons/bs";
import { DashboardService } from "services";
import { useEffect, useState } from "react";
import { hasPermission } from "commonFunctions/functions";
import router from "next/router";
import { Plus } from "react-feather";

function RecentProductions() {
  const dashboardService = new DashboardService();
  const [recentProductionsData, setRecentProductionsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const hasCreateProductionPermission = hasPermission(
    "production_management",
    "create_production"
  );

  useEffect(() => {
    const getTenant = async () => {
      dashboardService.getRecentProductions().then((res) => {
        if (res.data) {
          // setRecentProductionsData(res.data);
          setRecentProductionsData(res.data.slice(0, 3));
        }
      });
    };
    getTenant();
  }, []);

  const filteredProductions = recentProductionsData.filter((project) =>
    project.project_name
      ? project.project_name.toLowerCase().includes(searchInput.toLowerCase())
      : false
  );

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="my-1 mt-1 mb-2 fw-600" style={{ color: "#030229" }}>
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
              placeholder="Search by Production Name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Form>
          {hasCreateProductionPermission && (
            <Button
              color="primary"
              className="py-1 px-3"
              onClick={() => router.push(`/productions`)}
            >
              <BsCameraVideo />
              <span style={{ fontSize: "14px" }}> New Production</span>
            </Button>
          )}
        </div>
      </div>

      <div className="my-2">
        <div className="row">
          {searchInput === "" ? (
            // Show when no search input
            recentProductionsData.slice(0, 6).map((project, i) => (
              <div className="col-md-4 mb-4" key={`recent-project-card-${i}`}>
                <ProjectCard data={project} />
              </div>
            ))
          ) : filteredProductions.length > 0 ? (
            // Show when there's search input and results found
            filteredProductions.slice(0, 6).map((project, i) => (
              <div className="col-md-4 mb-4" key={`recent-project-card-${i}`}>
                <ProjectCard data={project} />
              </div>
            ))
          ) : (
            // Show when there's search input and no results found
            <div className="text-center mt-3 nodataAvailable">
              <img
                src="./no_client_data_available.svg"
                alt="No clients available"
                style={{ maxWidth: "100%" }}
              />
              <p className="nodataAvailable">No Data available.</p>
              <h6 className="text-sm">
                Please create your first Production to be able to work{" "}
              </h6>
              <Button
                size="sm"
                className="py-2 px-3 mt-2"
                color="info"
                style={{
                  fontSize: "14px",
                  color: "#FFFFFF",
                  backgroundColor: "#00AEEF",
                }}
                onClick={() => router.push(`/productions`)}
              >
                <Plus size={16} /> Create Production
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RecentProductions;
