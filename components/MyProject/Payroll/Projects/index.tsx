import ProjectsListTable from "./ProjectTable";
import DeleteProjectPopup from "./DeleteProjectPopup";
function Projects() {
  return (
    <div style={{ fontFamily: "Segoe UI" }}>
      {/* <DeleteProjectPopup id={undefined} /> */}
      <ProjectsListTable />
    </div>
  );
}

export default Projects;
