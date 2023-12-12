import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody,Spinner } from "reactstrap";
import { closeBulkUploadSetsPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";
import downloadIcon from "assets/myIcons/download.svg";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import uploadIcon from "assets/myIcons/upload.svg";
import cancelIcon from "assets/myIcons/cancel.svg";
import { SetsService } from "services";
import { getSessionVariables } from "@/constants/function";
import { UploadSampleFiles } from "@/constants/common";

const SetsBulkUploadPopup = ({ setRerender, rerender }) => {
  const dispatch = useDispatch();

  const setsService = new SetsService();

  const popupStatus = useSelector(
    (state: any) => state.configurations.sets.bulkUploadPopup.status
  );

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept : {
    'text/csv' : ['.csv'],
    'application/vnd.ms-excel' : ['.xls','.xlsx']
  } });

  const handleRemoveFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };
  const [isLoading, setLoader] = useState(false);

  const handleUpload = () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please select a file to upload.");
      return;
    }

    setLoader(true);
    const fileName = uploadedFiles[0];
    const {clientID,projectID} = getSessionVariables()
    // Call the uploadbanklist function from your service with only the file name
    setsService
      .uploadsetlist(fileName,clientID,projectID)
      .then(() => {
        // Handle success
        toast.success("Data inserted successfully.");
        setRerender(!rerender)
        setLoader(false);
        dispatch(closeBulkUploadSetsPopup("close"));
      })
      .catch((error) => {
        toast.error(error.Message || error.error || "Failed to insert data.");
        setLoader(false);
      });
  };

  const handleDownload = () => {
    window.open(UploadSampleFiles.sets);
  };

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeBulkUploadSetsPopup("delete"))}
      className=" modal-dialog-centered"
      style={{ width: "515.14px", height: "220.91px" }}
    >
      <ModalBody className="d-flex flex-column" style={{ gap: "17px" }}>
        <div className="d-flex justify-content-between">
          <div style={{ fontSize: "23.67px", fontWeight: "600" }}>
            Bulk Upload
          </div>
          <Button
            color="white"
            style={{
              fontSize: "10px",
              fontWeight: "400",
              height: "25.31px",
              borderColor: "#00AEEF",
            }}
            onClick={handleDownload}
          >
            <Image
              src={downloadIcon}
              style={{ height: "14px", width: "14px", marginBottom: "3px" }}
              alt="downld-img"
            />
            Download Sample Files
          </Button>
        </div>
        <div className="d-flex flex-column" style={{ gap: "5px" }}>
          <div
            {...getRootProps()}
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              width: "",
              height: "99.81px",
              border: "0.79px dashed",
              backgroundColor: "#E7F3FF",
              borderColor: "#9FC3E7",
              gap: "8px",
              borderWidth: "2px",
            }}
          >
            <div>
              <Image
                src={uploadIcon}
                alt="upl-icon"
                style={{ height: "26.77px", width: "26.77px" }}
              />
            </div>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="text-center">
                <div
                  style={{
                    fontSize: "15.78px",
                    fontWeight: "400",
                    color: "#A0A1AB",
                  }}
                >
                  Drop your files here or{" "}
                  <span style={{ fontWeight: "600", color: "#7C7878" }}>
                    Browse
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "400",
                    color: "#A0A1AB",
                  }}
                >
                  All .xlsx,  .xls and .csv file types are allowed
                </div>
              </div>
            )}
          </div>
          {uploadedFiles.length > 0 && (
            <div>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#030229",
                    }}
                    key={index}
                  >
                    {file.name}{" "}
                    <Image
                      onClick={handleRemoveFile}
                      className="cursor-pointer"
                      src={cancelIcon}
                      alt="can-icon"
                      style={{ width: "10px", height: "10px" }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-center" style={{ gap: "8px" }}>
          <Button
            onClick={() => dispatch(closeBulkUploadSetsPopup("close"))}
            color="white"
            style={{
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            style={{
              fontSize: "14px",
              fontWeight: "400",
              backgroundColor: "#00AEEF",
              border: "none",
            }}
            disabled={isLoading}
          >
           {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SetsBulkUploadPopup;
