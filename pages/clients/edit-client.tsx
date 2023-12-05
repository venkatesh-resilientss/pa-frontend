import ClientTabs from "components/MyProject/Clients/ClientDetails/ClientTabs";
import { Button } from "reactstrap";
import { useRouter } from "next/router";

function Clients() {
  const router = useRouter();
  return (
    <div
      style={{ fontFamily: "Segoe UI" }}
      className="p-4 text-black"
    >
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-1">
          <img src="/endamol.svg" style={{ width: "50px", height: "50px" }} />

          <div>
            <div style={{ fontSize: "30px", fontWeight: "700" }}>
              Endemol Shine Media
            </div>
            <div>endemol.rssl.io | Client Admin Name | Client Admin Email</div>
          </div>
        </div>
        <div className="d-flex gap-1" style={{ height: "30px" }}>
          <Button onClick={() => router.back()} color="white" size="sm">
            Dismiss
          </Button>
          <Button size="sm" color="info">
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <ClientTabs />
    </div>
  );
}

export default Clients;
