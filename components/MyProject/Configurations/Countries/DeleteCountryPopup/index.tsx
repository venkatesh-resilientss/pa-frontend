import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { BankService, CountryService } from "services";
import { closeDeleteCountryPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";
import { checkTenant } from "constants/function";
import { useState, useEffect } from "react";

const DeleteCountryPopup = () => {
  const dispatch = useDispatch();
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
  const countryService = new CountryService();

  const { mutate: countryMutate } = useSWR("LIST_COUNTRIES", () =>
    countryService.getCountries(tenantId)
  );

  const popupStatus = useSelector(
    (state: any) => state.configurations.countries.deleteCountryPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.configurations.countries.deleteCountryPopup.helperData
  );

  const handleDeleteCountry = async () => {
    try {
      await CountryService.delete(tenantId, helperData);
      toast.success("Country Deleted Successfully");
      dispatch(closeDeleteCountryPopup("close"));
      mutate(countryMutate());
    } catch (error) {
      console.error("Error deleting Bank:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteCountryPopup("delete"))}
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
            onClick={() => dispatch(closeDeleteCountryPopup("delete"))}
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
            onClick={() => handleDeleteCountry()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteCountryPopup;
