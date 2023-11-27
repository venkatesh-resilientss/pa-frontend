import ClientTabs from "components/MyProject/Clients/ClientDetails/ClientTabs";
import { Button } from "reactstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClientsService } from "services";

function Clients() {
  const router = useRouter();
  const clientService = new ClientsService();

  const defaultClientData: any = {
    software: "",
    name: "",
    code: "",
    legalName: "",
    FEIN: "",
    routing: "",
    bankName: "",
    accountNumber: "",

    pAdd1: "",
    pAdd2: "",
    pCountry: null,
    pState: null,
    pCity: null,
    pZip1: "",

    iAdd1: "",
    iAdd2: "",
    iCountry: null,
    iState: null,
    iCity: null,
    iZip: "",

    pContactName: "",
    pTitle: "",
    pOffice: "",
    pCell: "",
    pEmail: "",

    sContactName: "",
    sTitle: "",
    sOffice: "",
    sCell: "",
    sEmail: "",
  };
  const [clientData, setClientData] = useState(defaultClientData);

  useEffect(() => {
    const getClientDetails = async () => {
      try {
        const resp = await clientService.getClientDetails(
          Number(router.query.id)
        );
        setClientData({ ...clientData, ...resp.Meta });
      } catch (e) {
        toast.error(e?.error || e || "Error");
      }
    };
    if (Number(router.query.id)) getClientDetails();
  }, [router.query.id]);

  return (
    <>
      {clientData.name ? (
        <div style={{ fontFamily: "Segoe UI" }} className="p-4 text-black">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-1">
              <img
                src="/endamol.svg"
                style={{ width: "50px", height: "50px" }}
              />

              <div>
                <div style={{ fontSize: "30px", fontWeight: "700" }}>
                  {clientData.name}
                </div>
                {/* <div>
                  endemol.rssl.io | Client Admin Name | Client Admin Email
                </div> */}
              </div>
            </div>
            <div className="d-flex gap-1" style={{ height: "30px" }}>
              <Button
                onClick={() => router.push("/clients")}
                color="white"
                size="sm"
              >
                Dismiss
              </Button>
              {/* <Button size="sm" color="info">
                Save
              </Button> */}
            </div>
          </div>

          <hr style={{ height: "2px" }} />

          <ClientTabs {...{ clientData, setClientData }} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Clients;
