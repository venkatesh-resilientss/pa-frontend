import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody } from "reactstrap";
import infoImage from "assets/MyImages/info 1.svg";
import { closeDeleteCurrencyPopup } from "redux/slices/mySlices/configurations";
import { CurrencyService } from "services";
import Image from "next/image";

const DeleteCurrencyPopup = () => {
  const dispatch = useDispatch();

  const currencyService = new CurrencyService();

  const popupStatus = useSelector(
    (state: any) => state.configurations.currency.deleteCurrencyPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.configurations.currency.deleteCurrencyPopup.helperData
  );

  const handleDeleteCurrency = async () => {
    try {
      await currencyService.deleteCurrency(helperData);
      toast.success("Currency Deleted Successfully");
      dispatch(closeDeleteCurrencyPopup("close"));
    } catch (error) {
      console.error("Error deleting Currency:", error);
    }
  };

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteCurrencyPopup("delete"))}
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
            onClick={() => dispatch(closeDeleteCurrencyPopup("delete"))}
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
            onClick={() => handleDeleteCurrency()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteCurrencyPopup;
