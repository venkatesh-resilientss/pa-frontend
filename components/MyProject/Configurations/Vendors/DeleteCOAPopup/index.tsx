import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { BankService, COAAccountsService, CountryService } from "services";
import { closeDeleteCOAPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";
import { useState, useEffect } from "react";
import { checkTenant } from "constants/function";

const DeleteCOAPopup = () => {
  const dispatch = useDispatch();

  const coaService = new COAAccountsService();

  const [tenantId, setTenantId] = useState("");
  useEffect(() => {
    const getTenant = async () => {
      const tenant = await checkTenant();
      // console.log(tenant, "tenant");
      if (tenant) {
        setTenantId(tenant.id);
      }
    };
    getTenant();
  }, []);
  const { mutate: coaMutate } = useSWR("LIST_COAS", () =>
    coaService.getCoasAccounts(tenantId)
  );

  const popupStatus = useSelector(
    (state: any) => state.configurations.coa.deleteCOAPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.configurations.coa.deleteCOAPopup.helperData
  );

  const handleDeleteCOA = async () => {
    try {
      await COAAccountsService.delete(tenantId, helperData);
      toast.success("COA Deleted Successfully");
      dispatch(closeDeleteCOAPopup("close"));
      mutate(coaMutate());
    } catch (error) {
      console.error("Error deleting COA:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteCOAPopup("delete"))}
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
            onClick={() => dispatch(closeDeleteCOAPopup("delete"))}
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
            onClick={() => handleDeleteCOA()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteCOAPopup;
