import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { closeDeleteClientPopup } from "../../../../redux/slices/mySlices/clients";
import infoImage from "../../../../assets/MyImages/info 1.svg";

const DeleteClientPopup = ({ id }) => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.clients.deleteClientPopup.status
  );

  const helperData = useSelector(
    (state) => state.clients.deleteClientPopup.helperData
  );

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteClientPopup())}
      className={"modal-dialog-centered modal-sm "}
    >
      {/* <ModalHeader
        className="bg-white"
        toggle={() => dispatch(closeAssignRSSLPopup())}
      ></ModalHeader> */}
      <ModalBody>
        <div className="d-flex justify-content-center">
          <img src={infoImage} />
        </div>
        <div
          className="text-black text-center"
          style={{ fontSize: "21px", fontWeight: "600" }}
        >
          Are you sure you want to delete?{" "}
        </div>

        <div
          className=" text-center"
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          This action will delete the information permanently. You cannot undo
          this action.{" "}
        </div>

        <hr />

        <div className="d-flex justify-content-center gap-1">
          <Button
            onClick={() => dispatch(closeDeleteClientPopup())}
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

export default DeleteClientPopup;
