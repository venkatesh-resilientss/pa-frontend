import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import {
  BankService,
  COAAccountsService,
  CountryService,
  VendorsService,
} from "services";
import { closeDeleteVendorPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";

const DeleteVendorPopup = () => {
  const dispatch = useDispatch();

  const vendorService = new VendorsService();

  const { mutate: coaMutate } = useSWR("LIST_VENDORS", () =>
    vendorService.getVendors()
  );

  const popupStatus = useSelector(
    (state: any) => state.configurations.vendors.deleteVendorPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.configurations.vendors.deleteVendorPopup.helperData
  );

  const handleDeleteVendor = async () => {
    try {
      await VendorsService.delete(helperData);
      toast.success("Vendor Deleted Successfully");
      dispatch(closeDeleteVendorPopup("close"));
      mutate(coaMutate());
    } catch (error) {
      console.error("Error deleting Vendor:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteVendorPopup("delete"))}
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
            onClick={() => dispatch(closeDeleteVendorPopup("delete"))}
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
            onClick={() => handleDeleteVendor()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteVendorPopup;
