import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "assets/MyImages/info 1.svg";
import Image from "next/image";
import { closeDeletePayrollPopup } from "redux/slices/mySlices/transactions";

const DeletePayrollPopup = () => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state: any) => state.transactions.payroll.deletePayRollPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.transactions.payroll.deletePayRollPopup.helperData
  );

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeletePayrollPopup("delete"))}
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
            onClick={() => dispatch(closeDeletePayrollPopup("delete"))}
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
            // onClick={() => handleDeleteDepartment()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeletePayrollPopup;
