import { Plus, Users } from "react-feather";
import { Button, Col, Row } from "reactstrap";
import ClientsCard from "./ClientsCard";
import { useRouter } from "next/router";
import { DashboardService } from "services";
import { useEffect, useState } from "react";
import { hasPermission } from "commonFunctions/functions";



function Clients() {
  const router = useRouter();
  const dashboardService = new DashboardService();



  const [clientsData, setClientsData] = useState([]);
  const hasCreateClientPermission = hasPermission(
    "client_management",
    "create_client"
  );

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
      <div style={{color: "#030229" }} className="mt-2 fw-600"
      >
        Newly Onboarded Clients
      </div>

      <div className="d-flex gap-1">
        {hasCreateClientPermission && (
          <Button
            size="sm"
            className="py-2 px-3 btn-primary"
            onClick={() => router.push(`/clients/create-client`)}
          >
            <Users size={12} /> Create Client
          </Button>
        )}
      </div>
    </div>

    <div className="mt-2 d-flex h-100 gap-3 justify-content-between flex-column">
      {clientsData && clientsData.length > 0 ? (
        <Row className="mt-2">
          {clientsData.map((client, i) => (
            <Col key={`new-onboarded-client-${i}`} md="4" className="mb-3">
              <ClientsCard data={client} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center nodataAvailable">
          <img
            src="./no_client_data_available.svg"
            alt="No clients available"
          />
          <p className="nodataAvailable">No Data available.</p>
          <h6 className="text-sm">Please create your first client to be able to work.</h6>
           <Button
            size="sm"
            className="py-2 px-3 mt-2 btn-primary"
            onClick={() => router.push(`/clients/create-client`)}
          >
            <Plus size={16} /> Create Client
          </Button>
        </div>
      )}
    </div>
  </div>
);
}

export default Clients;
