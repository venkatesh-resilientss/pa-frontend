import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody } from "reactstrap";

import infoImage from "assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { closeDeleteSeriesPopup } from "redux/slices/mySlices/configurations";
import { SeriesService } from "services";
import Image from "next/image";

const DeleteSeriesPopup = () => {
  const dispatch = useDispatch();

  const seriesService = new SeriesService();

  const { mutate: seriesMutate } = useSWR("LIST_SERIES", () =>
    seriesService.getSeries()
  );

  const popupStatus = useSelector(
    (state: any) => state.configurations.series.deleteSeriesPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.configurations.series.deleteSeriesPopup.helperData
  );

  const handleDeleteSeries = async () => {
    try {
      await seriesService.deleteSeries(helperData);
      toast.success("Series Deleted Successfully");

      dispatch(closeDeleteSeriesPopup("delete"));
      mutate(seriesMutate());
    } catch (error) {
      console.error("Error deleting Series:", error);
    }
  };

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteSeriesPopup("delete"))}
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
            onClick={() => dispatch(closeDeleteSeriesPopup("delete"))}
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
            onClick={() => handleDeleteSeries()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteSeriesPopup;
