import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { closeAddMoreLinesPopup } from "redux/slices/mySlices/transactions";
import { useState } from "react";

const AddMoreLinesPopup = ({ array, setArray }) => {
  const dispatch = useDispatch();

  const { control, register, reset } = useForm();

  const popupStatus = useSelector(
    (state: any) => state.transactions.addMoreLinePopup.status
  );

  const [numberOfElements, setNumberOfElements] = useState(0);

  const handleAdd = () => {
    const newArray = [...array];
    for (let i = 0; i < numberOfElements; i++) {
      newArray.push("");
    }
    setArray(newArray);
    dispatch(closeAddMoreLinesPopup("close"));
    reset();
  };

  const handleNumberChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumberOfElements(isNaN(value) ? 1 : value);
  };

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeAddMoreLinesPopup("close"))}
      className=" modal-dialog-centered"
      style={{
        width: "338px",
        height: "152px",
        minWidth: "338px",
      }}
    >
      <ModalBody>
        <div
          className="text-black text-center"
          style={{
            fontSize: "19.17px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          Add More Lines
        </div>

        <div
          className=" text-center d-flex justify-content-center align-items-center"
          style={{
            fontSize: "13.69px",
            fontWeight: "400",
            marginBottom: "8px",
            gap: "11px",
          }}
        >
          <div> No. of Lines</div>
          <Controller
            name="addNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                {...register}
                type="number"
                // value={numberOfElements}
                onChange={handleNumberChange}
                style={{
                  width: "37px",
                  height: "34px",
                  fontSize: "12px",
                  fontWeight: "400",
                  borderRadius: "4px",
                }}
                className="text-center"
                placeholder="10"
                min={1}
              />
            )}
          />
        </div>

        <hr />

        <div className="d-flex justify-content-center" style={{ gap: "8px" }}>
          <Button
            style={{ fontSize: "10.96px", fontWeight: "400" }}
            onClick={() => dispatch(closeAddMoreLinesPopup("delete"))}
            color="white"
          >
            Cancel
          </Button>
          <Button
            style={{
              fontSize: "10.96px",
              fontWeight: "400",
              backgroundColor: "#00AEEF",
              border: "none",
            }}
            // onClick={() => handleDeleteDepartment()}
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddMoreLinesPopup;
