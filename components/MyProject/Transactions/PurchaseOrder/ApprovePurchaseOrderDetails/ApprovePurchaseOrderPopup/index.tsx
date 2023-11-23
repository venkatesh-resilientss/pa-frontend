import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "assets/MyImages/ApproveImage.svg";
import { DepartmentsService } from "services";
import { closeDeleteDepartmentPopup } from "redux/slices/mySlices/configurations";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import { checkTenant } from "constants/function";
import { useState, useEffect } from "react";
import { closeApprovePurchaseOrderPopup } from "redux/slices/mySlices/transactions";

const ApprovePurchaseOrderPopup = () => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state: any) =>
      state.transactions.purchaseOrder.approvePurchaseOrderPopup.status
  );

  const helperData = useSelector(
    (state: any) =>
      state.transactions.purchaseOrder.approvePurchaseOrderPopup.helperData
  );

  const { register, handleSubmit } = useForm();
  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeApprovePurchaseOrderPopup("delete"))}
      className=" modal-dialog-centered"
      style={{ width: "338px", height: "248px" }}
    >
      <ModalBody
        className="d-flex flex-column "
        style={{ gap: "10px", padding: "16.43px, 24.65px, 16.43px, 24.65px" }}
      >
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
          Approve Purchase Order{" "}
        </div>

        <div
          style={{ fontSize: "12px", fontWeight: "400" }}
          className=" d-flex justify-content-center  align-items-center"
        >
          <div>
            <Label className="text-start">Additional Comments</Label>
            <Input
              style={{
                fontSize: "10px",
                fontWeight: "400",
                height: "54px",
                width: "270px",
              }}
              type="textarea"
              placeholder="Add comments if any"
            />
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-center" style={{ gap: "8px" }}>
          <Button
            style={{ fontSize: "10.96px", fontWeight: "400" }}
            onClick={() => dispatch(closeApprovePurchaseOrderPopup("delete"))}
            color="white"
          >
            Cancel
          </Button>
          <Button
            style={{
              fontSize: "10.96px",
              fontWeight: "400",
              backgroundColor: "#00AEEF",
              border: "none",
            }}
          >
            Approve
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ApprovePurchaseOrderPopup;
