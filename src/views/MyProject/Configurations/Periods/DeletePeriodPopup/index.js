import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "@src/assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { closeDeletePeriodPopup } from "@src/redux/slices/mySlices/configurations";
import { PeriodsService } from "@src/services";

const DeletePeriodPopup = ({ id }) => {
  const dispatch = useDispatch();

  const periodService = new PeriodsService();

  const { mutate: periodMutate } = useSWR("LIST_PERIODS", () =>
    periodService.getPeriods()
  );

  const popupStatus = useSelector(
    (state) => state.configurations.periods.deletePeriodPopup.status
  );

  const helperData = useSelector(
    (state) => state.configurations.periods.deletePeriodPopup.helperData
  );

  const handleDeletePeriod = async () => {
    try {
      await PeriodsService.delete(helperData);
      toast.success("Period Deleted Successfully");
      dispatch(closeDeletePeriodPopup());
      mutate(periodMutate());
    } catch (error) {
      console.error("Error deleting Period:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeletePeriodPopup())}
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
            onClick={() => dispatch(closeDeletePeriodPopup())}
            color="white"
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeletePeriod()} color="danger">
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeletePeriodPopup;
