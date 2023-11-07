import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "@src/assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { LocationsService } from "../../../../../services";
import { closeDeleteLocationPopup } from "../../../../../redux/slices/mySlices/configurations";

const DeleteLocationPopup = ({ id }) => {
  const dispatch = useDispatch();

  const locationService = new LocationsService();

  const {
    data: locationData,
    isLoading: userLoading,
    error: userError,
    mutate: locationMutate,
  } = useSWR("LIST_LOCATIONS", () => locationService.getLocations());

  const popupStatus = useSelector(
    (state) => state.configurations.locations.deleteLocationPopup.status
  );

  const helperData = useSelector(
    (state) => state.configurations.locations.deleteLocationPopup.helperData
  );

  const handleDeleteLocation = async () => {
    console.log("IDDD", id);
    try {
      await LocationsService.delete(helperData);
      toast.success("Location Deleted Successfully");
      dispatch(closeDeleteLocationPopup());
      mutate(locationMutate());
    } catch (error) {
      console.error("Error deleting Location:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteLocationPopup())}
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
            onClick={() => dispatch(closeDeleteLocationPopup())}
            color="white"
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeleteLocation()} color="danger">
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteLocationPopup;
