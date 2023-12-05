import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody } from "reactstrap";
import infoImage from "assets/MyImages/info 1.svg";
import { DepartmentsService } from "services";
import { closeDeleteDepartmentPopup } from "redux/slices/mySlices/configurations";
import useSWR, { mutate } from "swr";
import Image from "next/image";

const DeleteDepartmentPopup = () => {
  const dispatch = useDispatch();

  const departmentsService = new DepartmentsService();

  const { mutate: departmentMutate } = useSWR("LIST_DEPARTMENTS", () =>
    departmentsService.getDepartments()
  );

  const popupStatus = useSelector(
    (state: any) => state.configurations.department.deleteDepartmentPopup.status
  );

  const helperData = useSelector(
    (state: any) =>
      state.configurations.department.deleteDepartmentPopup.helperData
  );

  const handleDeleteDepartment = async () => {
    try {
      await departmentsService.deleteDepartment(helperData);
      toast.success("Department Deleted Successfully");
      dispatch(closeDeleteDepartmentPopup("delete"))
      mutate(departmentMutate());
    } catch (error) {
      console.error("Error deleting Department:", error);
    }
  };

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeDeleteDepartmentPopup("delete"))}
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
            onClick={() => dispatch(closeDeleteDepartmentPopup("delete"))}
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
            onClick={() => handleDeleteDepartment()}
          >
            Delete
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteDepartmentPopup;
