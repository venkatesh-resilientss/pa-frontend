import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody } from "reactstrap";
import infoImage from "assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { LocationsService } from "services";
import { closeDeleteLocationPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";

const DeleteLocationPopup = () => {
  const dispatch = useDispatch();

  const locationService = new LocationsService();

  const { mutate: locationMutate } = useSWR("LIST_LOCATIONS", () =>
    locationService.getLocations({ search: "", pageLimit: 25, offset: 0 })
  );

  const popupStatus = useSelector(
    (state: any) => state.configurations.locations.deleteLocationPopup.status
  );

  const helperData = useSelector(
    (state: any) =>
      state.configurations.locations.deleteLocationPopup.helperData
  );

  const handleDeleteLocation = async () => {
    try {
      await locationService.deleteLocation(helperData);
      toast.success("Location Deleted Successfully");
      dispatch(closeDeleteLocationPopup("close"));
      mutate(locationMutate());
    } catch (error) {
      console.error("Error deleting Location:", error);
    }
  };

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteLocationPopup("delete"))}
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
            onClick={() => dispatch(closeDeleteLocationPopup("delete"))}
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
            onClick={() => handleDeleteLocation()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteLocationPopup;
