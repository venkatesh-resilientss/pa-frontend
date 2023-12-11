import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import * as XLSX from "xlsx";

import Image from "next/image";
import downloadIcon from "assets/myIcons/download.svg";
import uploadIcon from "assets/myIcons/upload.svg";
import cancelIcon from "assets/myIcons/cancel.svg";

import {
  closeImportFromExcelPurchaseOrderPopup,
  updatePurchaseOrderData,
} from "redux/slices/mySlices/transactions";

import { useDropzone } from "react-dropzone";

const ImportExcelPopup = ({ array, setArray }) => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state: any) =>
      state.transactions.purchaseOrder.purchaseOrderImportFromExcelPopup.status
  );

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileName, setFileName] = useState([]);

  const handleUpload = () => {
    const newArray = [...array]; // Create a copy of the existing array
    uploadedFiles.forEach((uploadedItem, idx) => {
      newArray[idx] = { ...newArray[idx], ...uploadedItem };
    });
    setArray(newArray); // Set the updated array
    dispatch(updatePurchaseOrderData(newArray)); // Dispatch your Redux action to update data
    dispatch(closeImportFromExcelPurchaseOrderPopup("close"));
  };

  useEffect(() => {
    if (!popupStatus) {
      // Reset uploaded files and array data when the popup is closed
      setUploadedFiles([]);
    }
  }, [popupStatus]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
    readExcel(acceptedFiles[0]);
    setFileName(acceptedFiles);
  }, []);

  const readExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Assuming the Excel file has only one sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert Excel data to JSON
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Extract values from the Excel data (excluding the header)

      const keys = excelData[0]; // Assuming the first row contains the keys
      const values = excelData.slice(1).map((row: any) =>
        row.reduce((obj, cell, index) => {
          obj[keys[index]] = cell;
          return obj;
        }, {})
      );

      // Set the values to the array
      setUploadedFiles([...values]); // Corrected line
    };

    reader.readAsBinaryString(file);
  };

  const handleRemoveFile = () => {
    setUploadedFiles([]);
    setFileName([]);
  };

  const handleDownload = () => {
    const url = "/upload-sample-files/transaction_lines_sample.csv";
    window.open(url);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept : {
    'text/csv' : ['.csv'],
    'application/vnd.ms-excel' : ['.xls','.xlsx']
  } });

  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeImportFromExcelPurchaseOrderPopup("close"))}
      className=" modal-dialog-centered"
      style={{ width: "515.14px", height: "220.91px" }}
    >
      <ModalBody className="d-flex flex-column" style={{ gap: "17px" }}>
        <div className="d-flex justify-content-between">
          <div style={{ fontSize: "23.67px", fontWeight: "600" }}>
            Import from Excel
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
            {uploadedFiles.length > 0 ? (
              <p>{uploadedFiles[0].name}</p>
            ) : isDragActive ? (
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
                  All .xlsx,  .xlsa and .csv file types are allowed
                </div>
              </div>
            )}
          </div>
          {uploadedFiles.length > 0 && (
            <div>
              <ul>
                <li
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "#030229",
                  }}
                >
                  {fileName[0]?.name}{" "}
                  <Image
                    onClick={handleRemoveFile}
                    className="cursor-pointer"
                    src={cancelIcon}
                    alt="can-icon"
                    style={{ width: "10px", height: "10px" }}
                  />
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-center" style={{ gap: "8px" }}>
          <Button
            onClick={() =>
              dispatch(closeImportFromExcelPurchaseOrderPopup("close"))
            }
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
              backgroundColor: "#00AEEF",
              border: "none",
            }}
          >
            Upload
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ImportExcelPopup;
