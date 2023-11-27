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
import { DashboardService } from "services";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { hasPermission } from "commonFunctions/functions";

function Clients() {
  const router = useRouter();
  const dashboardService = new DashboardService();

  const [clientsData, setClientsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasCreateClientPermission = hasPermission(
    "client_management",
    "create_client"
  );

  useEffect(() => {
    const getTenant = async () => {
        dashboardService.getOnBoardedClients().then((res) => {
          if (res.data) {
            setClientsData(res.data);
            setIsLoading(false);
          }
        });
    };
    getTenant();
  }, []);

  // const {isLoading,clientsData} = {clientsData : {data : []},isLoading : true}
  return (
    <div className="h-100 d-flex gap-2 flex-column">
      <div className="d-flex justify-content-between">
        <div
          style={{ fontSize: "16px", fontWeight: "600", color: "#030229" }}
          className="mt-2"
        >
          Newly Onboarded Clients
        </div>

        <div className="d-flex gap-1">
          

          {hasCreateClientPermission && (
            <Button
              size="sm" className="py-1 px-3"
              color="info"
              style={{
                fontSize: "14px",
                color: "#FFFFFF",
                backgroundColor: "#00AEEF",
              }}
              onClick={() => router.push(`/clients/create-client`)}
            >
              <Users size={12} /> Create Client
            </Button>
          )}
        </div>
      </div>

    <div className="mt-2 d-flex h-100 gap-3 justify-content-between flex-column">
  {!isLoading && (
    <Row className="mt-2">
      {clientsData.map((client, i) => (
        <Col key={`new-onboarded-client-${i}`} md="4" className="mb-3">
          <ClientsCard data={client} />
        </Col>
      ))}
    </Row>
  )}
</div>

      
    </div>
  );
}

export default Clients;
