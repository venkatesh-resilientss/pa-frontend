import EditRole from "components/MyProject/Settings/RoleManagement/EditRole";
import Sidebar from "components/Sidebar";

export default function index(){

    return(
        <div className="d-flex gap-3">
      {/* Sidebar - do not enclose in 'div' - width percentages are used*/}
      <Sidebar />
      {/* Main Container Wrapper*/}
      <div
        className="px-2"
        style={{
          height: "100vh",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div>
          <EditRole />
        </div>
      </div>
    </div>
	
    )
}