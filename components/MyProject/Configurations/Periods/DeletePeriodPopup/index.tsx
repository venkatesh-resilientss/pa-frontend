import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { closeDeletePeriodPopup } from "redux/slices/mySlices/configurations";
import { PeriodsService } from "services";
import Image from "next/image";

const DeletePeriodPopup = ({ id }) => {
  const dispatch = useDispatch();

  const periodService = new PeriodsService();

  const { mutate: periodMutate } = useSWR("LIST_PERIODS", () =>
    periodService.getPeriods()
  );

  const popupStatus = useSelector(
    (state: any) => state.configurations.periods.deletePeriodPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.configurations.periods.deletePeriodPopup.helperData
  );

  const handleDeletePeriod = async () => {
    try {
      await PeriodsService.delete(helperData);
      toast.success("Period Deleted Successfully");
      dispatch(closeDeletePeriodPopup("close"));

      mutate(periodMutate());
    } catch (error) {
      console.error("Error deleting Period:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeletePeriodPopup("delete"))}
      className="custom-modal modal-dialog-centered"
    >
      <ModalBody>
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
          Are you sure you want to delete?{" "}
        </div>

        <div
          className=" text-center"
          style={{
            fontSize: "13.69px",
            fontWeight: "400",
            marginBottom: "8px",
          }}
        >
          This action will delete the information permanently. You cannot undo
          this action.{" "}
        </div>

        <hr />

        <div className="d-flex justify-content-center" style={{ gap: "8px" }}>
          <Button
            style={{ fontSize: "10.96px", fontWeight: "400" }}
            onClick={() => dispatch(closeDeletePeriodPopup("delete"))}
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
            onClick={() => handleDeletePeriod()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeletePeriodPopup;
