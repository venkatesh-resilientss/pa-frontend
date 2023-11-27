import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "assets/MyImages/info 1.svg";
import Image from "next/image";
import { closeDeleteJournalEntryPopup } from "redux/slices/mySlices/transactions";

const DeleteJournalEntryPopup = () => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state: any) =>
      state.transactions.journalEntry.deleteJournalEntryPopup.status
  );

  const helperData = useSelector(
    (state: any) =>
      state.transactions.journalEntry.deleteJournalEntryPopup.helperData
  );

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteJournalEntryPopup("delete"))}
      className={"modal-dialog-centered modal-sm "}
    >
      {/* <ModalHeader
        className="bg-white"
        toggle={() => dispatch(closeAssignRSSLPopup())}
      ></ModalHeader> */}
      <ModalBody>
        <div className="d-flex justify-content-center">
          <Image
            alt="infoImage"
            src={infoImage}
            style={{ height: "30.93px", width: "30.93px", marginBottom: "8px" }}
          />
        </div>
        <div
          className="text-black text-center"
          style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}
        >
          Are you sure you want to delete?{" "}
        </div>

        <div
          className=" text-center"
          style={{ fontSize: "10px", fontWeight: "400", marginBottom: "8px" }}
        >
          This action will delete the information permanently. You cannot undo
          this action.{" "}
        </div>

        <hr />

        <div className="d-flex justify-content-center" style={{ gap: "8px" }}>
          <Button
            onClick={() => dispatch(closeDeleteJournalEntryPopup("delete"))}
            color="white"
          >
            Cancel
          </Button>
          <Button color="danger">Delete</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteJournalEntryPopup;
