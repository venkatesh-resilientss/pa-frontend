import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "@src/assets/MyImages/info 1.svg";
import { closeDeleteSetPopup } from "../../../../../redux/slices/mySlices/configurations";
import { SetsService } from "@src/services";
import useSWR, { mutate } from "swr";

const DeleteSetPopup = ({ id }) => {
  const dispatch = useDispatch();

  const setService = new SetsService();

  const {
    data: setData,
    isLoading: userLoading,
    error: userError,
    mutate: setMutate,
  } = useSWR("LIST_SETS", () => setService.getSets());

  const popupStatus = useSelector(
    (state) => state.configurations.sets.deleteSetPopup.status
  );

  const helperData = useSelector(
    (state) => state.configurations.sets.deleteSetPopup.helperData
  );

  const handleDeleteSet = async () => {
    console.log("IDDD", id);
    try {
      await SetsService.delete(helperData);
      toast.success("Set Deleted Successfully");
      dispatch(closeDeleteSetPopup());
      mutate(setMutate());
    } catch (error) {
      console.error("Error deleting Set:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteSetPopup())}
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
          <Button onClick={() => dispatch(closeDeleteSetPopup())} color="white">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteSet()} color="danger">
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteSetPopup;
