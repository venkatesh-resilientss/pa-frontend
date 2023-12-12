import { Modal, ModalBody, ModalFooter } from "reactstrap";
import useSWR from "swr";

import { useState } from "react";

import { ClientsService } from "services";

const clientService = new ClientsService();

export default function SoftwaresModal(props: any) {
  const { router, show, setShow } = props;

  const [softwares, setSoftwares] = useState<any>([]);

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
                  checked={softwares.find((e) => e === software.ID)}
                  onChange={(event) => {
                    const tempArr: any = event.target.checked
                      ? [...softwares, software.ID]
                      : [...softwares].filter((e) => e !== software.ID);

                    setSoftwares(tempArr);
                  }}
                />
                <p className="text-nowrap f-12 m-0">{software.Name}</p>
              </label>
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn" onClick={() => setShow(false)}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            router.push(`/clients/create-client?softwares=${softwares.join()}`)
          }
          disabled={softwares.length === 0}
        >
          Create
        </button>
      </ModalFooter>
    </Modal>
  );
}
