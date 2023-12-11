import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Label, Modal, ModalBody } from "reactstrap";
import { closeAssignRSSLPopup } from "redux/slices/mySlices/productions";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";

const AssignRSSLPopup = () => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state: any) => state.productions.assignRSSLPopup.status
  );

  const helperData = useSelector(
    (state: any) => state.productions.assignRSSLPopup.helperData
  );

  const { register } = useForm();

  const users = [
    { value: "Andrew", label: "Andrew" },
    { value: "John", label: "John" },
    { value: "Jack", label: "Jack" },
  ];

  return (
    <Modal
      style={{ width: "402px", maxWidth: "402px" }}
      isOpen={popupStatus}
      toggle={() => dispatch(closeAssignRSSLPopup("close"))}
      className={"modal-dialog-centered  "}
    >
      <ModalBody>
        <div
          className="text-black"
          style={{ fontSize: "20px", fontWeight: "600" }}
        >
          Assign RSSL User
        </div>
        <hr style={{ height: "2px" }} />

        <div className="d-flex flex-column" style={{ gap: "10px" }}>
          <Form>
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Client Name
            </Label>
            <Input
              disabled
              {...register}
              defaultValue={helperData?.Client?.Name}
            />
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              Production Name
            </Label>
            <Input disabled {...register} defaultValue={helperData?.Name} />
            <Label
              className="text-black"
              style={{ fontSize: "12px", fontWeight: "400" }}
            >
              RSSL User
            </Label>
            <ReactSelect options={users} {...register} isClearable />
          </Form>
          <div
            className="d-flex justify-content-end"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            <Button
              // style={{ height: "19px" }}
              onClick={() => dispatch(closeAssignRSSLPopup("close"))}
              size="sm"
              color="white"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              style={{
                // height: "24px",
                backgroundColor: "#00AEEF",
                borderColor: "#00AEEF",
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AssignRSSLPopup;
