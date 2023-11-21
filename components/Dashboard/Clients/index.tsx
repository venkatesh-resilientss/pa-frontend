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
import { useEffect, useState } from "react";
import { checkTenant } from "constants/function";

function Clients() {
  const router = useRouter();
  const [tenantId, setTenantId] = useState("");
  useEffect(() => {
    const getTenant = async () => {
      const tenant = await checkTenant();
      // console.log(tenant, "tenant");
      if (tenant) {
        setTenantId(tenant.id);
      }
    };
    getTenant();
  }, []);
  const dashboardService = new DashboardService();

  const {
    data: clientsData,
    isLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("GET_RECENET", () => dashboardService.getOnBoardedClients(tenantId));
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
