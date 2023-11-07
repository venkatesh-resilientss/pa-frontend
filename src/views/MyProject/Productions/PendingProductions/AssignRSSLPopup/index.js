import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { closeAssignRSSLPopup } from "../../../../../redux/slices/mySlices/productions";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";

const AssignRSSLPopup = ({ id }) => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.productions.assignRSSLPopup.status
  );

  const helperData = useSelector(
    (state) => state.productions.assignRSSLPopup.helperData
  );

  const { register, handleSubmit } = useForm();

  const users = [
    { value: "Andrew", label: "Andrew" },
    { value: "John", label: "John" },
    { value: "Jack", label: "Jack" },
  ];

  return (
    <Modal
      style={{ fontFamily: "Segoe UI" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeAssignRSSLPopup())}
      className={"modal-dialog-centered modal-sm "}
    >
      {/* <ModalHeader
        className="bg-white"
        toggle={() => dispatch(closeAssignRSSLPopup())}
      ></ModalHeader> */}
      <ModalBody>
        <div
          className="text-black"
          style={{ fontSize: "20px", fontWeight: "600" }}
        >
          Assign RSSL User
        </div>
        <hr style={{ height: "2px" }} />

        <Form>
          <Label
            className="text-black"
            style={{ fontSize: "14px", fontWeight: "400" }}
          >
            Client Name
          </Label>
          <Input disabled {...register} defaultValue={helperData?.client} />
          <Label
            className="text-black"
            style={{ fontSize: "14px", fontWeight: "400" }}
          >
            Production Name
          </Label>
          <Input
            disabled
            {...register}
            defaultValue={helperData?.production_name}
          />
          <Label
            className="text-black"
            style={{ fontSize: "14px", fontWeight: "400" }}
          >
            RSSL User
          </Label>
          <ReactSelect options={users} {...register} isClearable />

          <div className="d-flex justify-content-end gap-1 mt-2">
            <Button onClick={() => dispatch(closeAssignRSSLPopup())}>
              Cancel
            </Button>
            <Button color="info">Submit</Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AssignRSSLPopup;
