import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "assets/MyImages/info 1.svg";
import useSWR, { mutate } from "swr";
import { closeDeleteSeriesPopup } from "redux/slices/mySlices/configurations";
import { SeriesService } from "services";
import Image from "next/image";
import { checkTenant } from "constants/function";
import { useState, useEffect } from "react";

const DeleteSeriesPopup = ({ id }) => {
  const dispatch = useDispatch();
  const [tenantId, setTenantId] = useState("");

  const seriesService = new SeriesService();
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
  const { mutate: seriesMutate } = useSWR("LIST_SERIES", () =>
    seriesService.getSeries(tenantId)
  );

  const popupStatus = useSelector(
    (state: any) => state.configurations.series.deleteSeriesPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.configurations.series.deleteSeriesPopup.helperData
  );

  const handleDeleteSeries = async () => {
    console.log("IDDD", id);
    try {
      await SeriesService.delete(tenantId, helperData);
      toast.success("Series Deleted Successfully");

      dispatch(closeDeleteSeriesPopup("delete"));
      mutate(seriesMutate());
    } catch (error) {
      console.error("Error deleting Series:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteSeriesPopup("delete"))}
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
            onClick={() => dispatch(closeDeleteSeriesPopup("delete"))}
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
            onClick={() => handleDeleteSeries()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteSeriesPopup;
