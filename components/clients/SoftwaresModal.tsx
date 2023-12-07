import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import useSWR from "swr";

import { ClientsService } from "services";

const clientService = new ClientsService();

export default function SoftwaresModal(props: any) {
  const { show, setShow, clientData, setClientData } = props;

  const { data } = useSWR("SOFTWARES", () => clientService.getSoftwares());

  return (
    <Modal isOpen={show} size="lg">
      <ModalHeader>Add New Client</ModalHeader>
      <ModalBody>
        <p>Softwares</p>

        <div className="row m-0">
          {(data || []).map((software, idx) => (
            <div key={idx} className="col-12 col-sm-4 my-1">
              <div className="flex-center me-3">
                <input
                  type="radio"
                  id={software.Name}
                  checked={software.ID === clientData.SoftwareID}
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      SoftwareID: software.ID,
                    })
                  }
                />
                <label htmlFor={software.Name} className="ms-1">
                  {software.Name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-primary"
          onClick={() => setShow(false)}
          disabled={!clientData.SoftwareID}
        >
          Create
        </button>
      </ModalFooter>
    </Modal>
  );
}
