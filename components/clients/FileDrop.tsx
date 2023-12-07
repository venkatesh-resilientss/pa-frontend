import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const FileDrop = ({ setName, uploadedFile, onFileSelect }) => {
  const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      // Handle rejected files if needed
      toast.error("File Rejected");
    } else {
      const file = acceptedFiles[0];
      onFileSelect(file);
      setName((pN) => (pN.trim() ? pN : (file.name || "").split(".")[0]));
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: { "application/*": [".docx", ".doc", ".pdf"] },
    maxFiles: 1,
  });

  const style = useMemo(
    () => ({
      outline: "none",
      background: "white",
      borderRadius: "10px",
      color: "#A0A1AB",
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="d-flex align-items-center justify-content-center text-center dropzone-div px-3 py-4 cr-p">
          <h6 className="">
            Drag and drop your document here or{" "}
            <span className="clr-blue fw-600">browse</span>
          </h6>
        </div>
      </div>
      {uploadedFile && (
        <div className="f-ellipsis py-2">{uploadedFile.name}</div>
      )}
    </div>
  );
};

export default FileDrop;
