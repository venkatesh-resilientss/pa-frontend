import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "assets/MyImages/info 1.svg";
import { closeDeleteSetPopup } from "redux/slices/mySlices/configurations";
import { SetsService } from "services";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import { checkTenant } from "constants/function";
import { useState, useEffect } from "react";

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
    (state: any) => state.configurations.sets.deleteSetPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.configurations.sets.deleteSetPopup.helperData
  );

  const handleDeleteSet = async () => {
    console.log("IDDD", id);
    try {
      await setService.deleteSet(helperData);
      toast.success("Set Deleted Successfully");
      dispatch(closeDeleteSetPopup("close"));
      mutate(setMutate());
    } catch (error) {
      console.error("Error deleting Set:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteSetPopup("delete"))}
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
            onClick={() => dispatch(closeDeleteSetPopup("delete"))}
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
            onClick={() => handleDeleteSet()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteSetPopup;
