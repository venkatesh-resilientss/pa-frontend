import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "@src/assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { closeDeleteCurrencyPopup } from "@src/redux/slices/mySlices/configurations";
import { CurrencyService } from "@src/services";

const DeleteCurrencyPopup = ({ id }) => {
  const dispatch = useDispatch();

  const currencyService = new CurrencyService();

  const { mutate: currencyMutate } = useSWR("LIST_CURRENCY", () =>
    currencyService.getCurrencies()
  );

  const popupStatus = useSelector(
    (state) => state.configurations.currency.deleteCurrencyPopup.status
  );

  const helperData = useSelector(
    (state) => state.configurations.currency.deleteCurrencyPopup.helperData
  );

  const handleDeleteCurrency = async () => {
    try {
      await CurrencyService.delete(helperData);
      toast.success("Currency Deleted Successfully");
      dispatch(closeDeleteCurrencyPopup());
      mutate(currencyMutate());
    } catch (error) {
      console.error("Error deleting Currency:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteCurrencyPopup())}
      className={"modal-dialog-centered modal-sm "}
    >
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
            onClick={() => dispatch(closeDeleteCurrencyPopup())}
            color="white"
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeleteCurrency()} color="danger">
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteCurrencyPopup;
