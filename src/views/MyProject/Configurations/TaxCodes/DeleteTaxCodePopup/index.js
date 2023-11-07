import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "@src/assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { closeDeleteTaxCodesPopup } from "@src/redux/slices/mySlices/configurations";
import { TaxCodesService } from "@src/services";

const DeleteTaxCodePopup = ({ id }) => {
  const dispatch = useDispatch();

  const taxCodeService = new TaxCodesService();

  const { mutate: taxCodeMutate } = useSWR("LIST_TAXCODES", () =>
    taxCodeService.getTaxCodes()
  );

  const popupStatus = useSelector(
    (state) => state.configurations.taxcodes.deleteTaxCodePopup.status
  );

  const helperData = useSelector(
    (state) => state.configurations.taxcodes.deleteTaxCodePopup.helperData
  );

  const handleDeleteTaxCode = async () => {
    console.log("IDDD", id);
    try {
      await TaxCodesService.delete(helperData);
      toast.success("TaxCode Deleted Successfully");
      dispatch(closeDeleteTaxCodesPopup());
      mutate(taxCodeMutate());
    } catch (error) {
      console.error("Error deleting TaxCode:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteTaxCodesPopup())}
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
            onClick={() => dispatch(closeDeleteTaxCodesPopup())}
            color="white"
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeleteTaxCode()} color="danger">
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteTaxCodePopup;