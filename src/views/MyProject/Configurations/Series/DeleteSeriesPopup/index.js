import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "@src/assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { closeDeleteSeriesPopup } from "@src/redux/slices/mySlices/configurations";
import { SeriesService } from "@src/services";

const DeleteSeriesPopup = ({ id }) => {
  const dispatch = useDispatch();

  const seriesService = new SeriesService();

  const { mutate: seriesMutate } = useSWR("LIST_SERIES", () =>
    seriesService.getSeries()
  );

  const popupStatus = useSelector(
    (state) => state.configurations.series.deleteSeriesPopup.status
  );

  const helperData = useSelector(
    (state) => state.configurations.series.deleteSeriesPopup.helperData
  );

  const handleDeleteSeries = async () => {
    console.log("IDDD", id);
    try {
      await SeriesService.delete(helperData);
      toast.success("Series Deleted Successfully");
      dispatch(closeDeleteSeriesPopup());
      mutate(seriesMutate());
    } catch (error) {
      console.error("Error deleting Series:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteSeriesPopup())}
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
            onClick={() => dispatch(closeDeleteSeriesPopup())}
            color="white"
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeleteSeries()} color="danger">
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteSeriesPopup;
