import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "@src/assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { closeDeleteStatePopup } from "@src/redux/slices/mySlices/configurations";
import { StatesService } from "@src/services";

const DeleteStatePopup = ({ id }) => {
  const dispatch = useDispatch();

  const stateService = new StatesService();

  const { mutate: stateMutate } = useSWR("LIST_STATES", () =>
    stateService.getStates()
  );

  const popupStatus = useSelector(
    (state) => state.configurations.states.deleteStatePopup.status
  );

  const helperData = useSelector(
    (state) => state.configurations.states.deleteStatePopup.helperData
  );

  const handleDeleteState = async () => {
    console.log("IDDD", id);
    try {
      await StatesService.delete(helperData);
      toast.success("State Deleted Successfully");
      dispatch(closeDeleteStatePopup());
      mutate(stateMutate());
    } catch (error) {
      console.error("Error deleting State:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteStatePopup())}
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
            onClick={() => dispatch(closeDeleteStatePopup())}
            color="white"
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeleteState()} color="danger">
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteStatePopup;
