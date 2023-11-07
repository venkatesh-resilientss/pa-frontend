import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import infoImage from "@src/assets/MyImages/info 1.svg";
import { DepartmentsService } from "@src/services";
import { closeDeleteDepartmentPopup } from "../../../../../redux/slices/mySlices/configurations";
import useSWR, { mutate } from "swr";

const DeleteDepartmentPopup = ({ id }) => {
  const dispatch = useDispatch();

  const departmentsService = new DepartmentsService();

  const {
    data: departmentsData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_DEPARTMENTS", () => departmentsService.getDepartments());

  const popupStatus = useSelector(
    (state) => state.configurations.department.deleteDepartmentPopup.status
  );

  const helperData = useSelector(
    (state) => state.configurations.department.deleteDepartmentPopup.helperData
  );

  const handleDeleteDepartment = async () => {
    console.log("IDDD", id);
    try {
      await DepartmentsService.delete(helperData);
      toast.success("Department Deleted Successfully");
      dispatch(closeDeleteDepartmentPopup());
      mutate(userMutate());
    } catch (error) {
      console.error("Error deleting Department:", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteDepartmentPopup())}
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
            onClick={() => dispatch(closeDeleteDepartmentPopup())}
            color="white"
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeleteDepartment()} color="danger">
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteDepartmentPopup;
