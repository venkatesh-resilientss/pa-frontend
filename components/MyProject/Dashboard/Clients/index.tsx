import { Col, Row } from "reactstrap";
import ClientsCard from "./ClientsCard";
import { DashboardService } from "services";
import { useEffect, useState } from "react";
import NoClientPage from "@/components/clients/NoClientPage";
import { CreateClientButton } from "@/components/clients";

function Clients({ router, user }) {
  const dashboardService = new DashboardService();

  const [clientsData, setClientsData] = useState([]);

  useEffect(() => {
    const getTenant = async () => {
      dashboardService.getOnBoardedClients().then((res) => {
        if (res.data) {
          setClientsData(res.data.slice(0, 3));
        }
      });
    };
    getTenant();
  }, []);

  return (
    <div className="h-100 d-flex gap-2 flex-column">
      <div className="d-flex justify-content-between">
        <div
          style={{ fontSize: "16px", fontWeight: "600", color: "#030229" }}
          className="mt-2"
        >
          Newly Onboarded Clients
        </div>

        <div className="ms-auto">
          <CreateClientButton {...{ router, user }} cls="f-14 mx-auto" />
        </div>
      </div>

      <div className="mt-2 d-flex h-100 gap-3 justify-content-between flex-column">
        {clientsData && clientsData.length > 0 ? (
          <Row className="mt-2">
            {clientsData.slice(0, 3).map((client, i) => (
              <Col key={`new-onboarded-client-${i}`} md="4" className="mb-3">
                <ClientsCard data={client} />
              </Col>
            ))}
          </Row>
        ) : (
          <NoClientPage {...{ router, user }} />
        )}
      </div>
    </div>
  );
}

export default Clients;
