import { Modal, ModalBody, ModalFooter } from "reactstrap";
import useSWR from "swr";

import { ClientsService } from "services";

const clientService = new ClientsService();

export default function SoftwaresModal(props: any) {
  const { router, show, setShow, clientData, setClientData } = props;

  const { data } = useSWR("SOFTWARES", () => clientService.getSoftwares());

  return (
    <Modal isOpen={show} size="md">
      <ModalBody>
        <h5 className="fw-600">Add New Client</h5>
        <p className="f-18">Softwares</p>

        <div className="row m-0 mt-2">
          {(data || []).map((software, idx) => (
            <div key={idx} className="col-12 col-sm-6 my-1">
              <label className="flex-center d-inline-flex gap-1">
                <input
                  name={software.Name}
                  type="checkbox"
                  className=""
                  checked={clientData.Softwares.find(
                    (e) => e.Name === software.Name
                  )}
                  onChange={(event) => {
                    let tempArr: any = [...clientData.Softwares];
                    if (event.target.checked)
                      tempArr = [
                        ...tempArr,
                        { Name: software.Name, ID: software.ID },
                      ];
                    else
                      tempArr = [...tempArr].filter(
                        (e) => e.Name !== software.Name
                      );
                    setClientData({
                      ...clientData,
                      Softwares: tempArr,
                    });
                  }}
                />
                <p className="text-nowrap f-12 m-0">{software.Name}</p>
              </label>
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn" onClick={() => router.back()}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setShow(false)}
          disabled={clientData.Softwares.length === 0}
        >
          Create
        </button>
      </ModalFooter>
    </Modal>
  );
}
