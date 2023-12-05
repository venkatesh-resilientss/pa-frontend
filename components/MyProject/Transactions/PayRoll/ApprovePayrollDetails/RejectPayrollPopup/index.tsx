import { useDispatch, useSelector } from "react-redux";

import { Button, Input, Label, Modal, ModalBody } from "reactstrap";
import infoImage from "assets/MyImages/info.svg";

import Image from "next/image";

import { closeRejectPayrollPopup } from "redux/slices/mySlices/transactions";

const RejectPayrollPopup = () => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state: any) => state.transactions.payroll.rejectPayRollPopup.status
  );

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeRejectPayrollPopup("delete"))}
      className=" modal-dialog-centered"
      style={{ width: "338px", height: "248px" }}
    >
      <ModalBody
        className="d-flex flex-column "
        style={{ gap: "10px", padding: "16.43px, 24.65px, 16.43px, 24.65px" }}
      >
        <div className="d-flex justify-content-center">
          <Image
            src={infoImage}
            style={{ height: "42.36px", width: "42.36px", marginBottom: "8px" }}
            alt={""}
          />
        </div>
        <div
          className="text-black text-center"
          style={{
            fontSize: "19.17px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          Reject Payroll
        </div>

        <div
          style={{ fontSize: "12px", fontWeight: "400" }}
          className=" d-flex justify-content-center  align-items-center"
        >
          <div>
            <Label className="text-start">Reject Reason</Label>
            <Input
              style={{
                fontSize: "10px",
                fontWeight: "400",
                height: "54px",
                width: "270px",
              }}
              type="textarea"
              placeholder="Add the reason here"
            />
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-center" style={{ gap: "8px" }}>
          <Button
            style={{ fontSize: "10.96px", fontWeight: "400" }}
            onClick={() => dispatch(closeRejectPayrollPopup("delete"))}
            color="white"
          >
            Cancel
          </Button>
          <Button
            style={{
              fontSize: "10.96px",
              fontWeight: "400",
              backgroundColor: "#CF0C0C",
              border: "none",
            }}
          >
            Reject
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default RejectPayrollPopup;
