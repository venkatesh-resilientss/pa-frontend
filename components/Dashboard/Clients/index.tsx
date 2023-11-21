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
import blubluLogo from "assets/MyImages/blublu.svg";
import Ellipse4 from "assets/DashboardIcons/Ellipse4.svg";
import { useRouter } from "next/router";
import DashboardService from "services/dashboard.service";
import useSWR from "swr";

function Clients() {
  const router = useRouter();
  const dashboardService = new DashboardService();

  const {
    data: clientsData,
    isLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("GET_RECENET", () => dashboardService.getOnBoardedClients());
  // const {isLoading,clientsData} = {clientsData : {data : []},isLoading : true}
  return (
    <div className="h-100 d-flex justify-content-between flex-column">
      <div className="d-flex justify-content-between">
        <div
          style={{ fontSize: "16px", fontWeight: "600", color: "#030229" }}
          className="mt-2"
        >
          Newly Onboarded Clients
        </div>

        <div className="d-flex gap-1">
          <Button
            size="sm"
            color="info"
            style={{
              fontSize: "14px",
              color: "#FFFFFF",
              backgroundColor: "#00AEEF",
              margin: "4px",
              padding: "5px",
              width: "120px",
            }}
            onClick={() => router.push(`/clients/create-client`)}
          >
            <Users size={12} /> Create Client
          </Button>
        </div>
      </div>

      <div className="mt-2 d-flex gap-3 flex-column">
        {!isLoading &&
          clientsData?.data.map((client: any, i: any) => {
            return (
              <Col xl="12" key={`new-onboarded-client-${i}`}>
                <ClientsCard data={client} />
              </Col>
            );
          })}
      </div>
    </div>
  );
}

export default Clients;
