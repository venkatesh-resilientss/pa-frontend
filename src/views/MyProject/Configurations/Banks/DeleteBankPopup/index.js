import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "@src/assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { BankService } from "@src/services";
import { closeDeleteBanksPopup } from "@src/redux/slices/mySlices/configurations";

const DeleteBankPopup = ({ id }) => {
  const dispatch = useDispatch();

  const bankService = new BankService();

  const { mutate: bankMutate } = useSWR("LIST_BANKS", () =>
    bankService.getBanks()
  );

  const popupStatus = useSelector(
    (state) => state.configurations.banks.deleteBankPopup.status
  );

  const helperData = useSelector(
    (state) => state.configurations.banks.deleteBankPopup.helperData
  );

  const handleDeleteBank = async () => {
    console.log("IDDD", id);
    try {
      await BankService.delete(helperData);
      toast.success("Bank Deleted Successfully");
      dispatch(closeDeleteBanksPopup());
      mutate(bankMutate());
    } catch (error) {
      console.error("Error deleting Bank:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteBanksPopup())}
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
            onClick={() => dispatch(closeDeleteBanksPopup())}
            color="white"
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeleteBank()} color="danger">
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteBankPopup;
