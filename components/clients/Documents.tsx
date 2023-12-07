import { useState } from "react";
import Button from "react-bootstrap-button-loader";
import Image from "next/image";
import downloadIcon from "assets/myIcons/download.svg";
import deleteIcon from "assets/myIcons/delete.svg";

import FileDrop from "./FileDrop";

import { ClientsService } from "services";

const clientService = new ClientsService();

export default function Documents(props) {
  const { clientData, setClientData, back, step, setStep } = props;
  const { disabled, hideBtns } = props;

  const [name, setName] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  if (step !== 4) return <></>;

  return (
    <div>
      <div className="d-flex  justify-content-between gap-3">
        <p className="text-black f-20 fw-600">Documents</p>
        {hideBtns ? (
          <div></div>
        ) : (
          <div>
            <button className="btn" onClick={back}>
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setStep((prev) => Math.min(prev + 1, 5))}
            >
              Continue
            </button>
          </div>
        )}
      </div>

      <hr />

      {!disabled && (
        <div className="d-inline-flex flex-column">
          <input
            className={`form-control ${
              err && !name.trim() ? "border-danger" : ""
            }`}
            placeholder="Enter Document Name"
            type="text"
            name="Document Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {err && !name.trim() && (
            <span className="f-12 text-danger">Document Name is required</span>
          )}
        </div>
      )}

      {!disabled && (
        <div className="rounded p-2 my-3">
          <FileDrop
            {...{ setName, uploadedFile }}
            onFileSelect={(file) => setUploadedFile(file)}
          />
        </div>
      )}
      {!disabled && err && !uploadedFile && (
        <span className="f-12 text-danger">Upload File</span>
      )}

      {!disabled && (
        <div className="d-flex justify-content-end gap-3">
          <button
            className="btn f-12"
            onClick={() => {
              setName("");
              setUploadedFile(null);
              setErr(false);
            }}
          >
            Clear
          </button>
          <Button
            variant="outline-primary"
            loading={loading}
            disabled={loading}
            className="f-12 px-4"
            onClick={async () => {
              try {
                let tempErr = false;
                if (!name.trim() || !uploadedFile) tempErr = true;
                setErr(tempErr);

                if (tempErr) return;
                const formData = new FormData();
                formData.append("file", uploadedFile);
                formData.append("name", "uploadedFile");
                setLoading(true);
                const fileUpload = await clientService.s3upload(formData);
                const doc_path = fileUpload.url;
                setClientData({
                  ...clientData,
                  Meta: {
                    ClientFile: [
                      ...clientData.Meta.ClientFile,
                      { name, doc_path },
                    ],
                  },
                });
                setLoading(false);
              } catch (e) {
                setLoading(false);
              }
            }}
          >
            Save
          </Button>
        </div>
      )}

      <div className="">
        <p className="text-black fw-600">All Documents</p>
        <div className="d-flex flex-nowrap docs-table header mt-3 p-1 px-2">
          <div className="w-100">Document Name</div>
          <div className="actions">Actions</div>
        </div>
        {clientData.Meta.ClientFile.map((e, id) => (
          <div
            className="d-flex flex-nowrap docs-table border-bottom p-1 px-2"
            key={id}
          >
            <div className="w-100">{e.name}</div>
            <div className="actions">
              <Image
                src={downloadIcon}
                alt="downld"
                width={22}
                height={22}
                onClick={async () => {
                  if (e.doc_path) {
                    const res = await fetch(e.doc_path);
                    const blob = await res.blob();

                    const url: any = window.URL.createObjectURL(blob);
                    const a: any = document.createElement("a");
                    a.style.display = "none";
                    a.href = url;
                    a.download =
                      e.doc_path.split("/")[e.doc_path.split("/").length - 1];
                    document.body.appendChild(a);
                    a.click();
                  }
                }}
              />
              {!disabled && (
                <Image
                  src={deleteIcon}
                  alt="delete"
                  width={16}
                  height={16}
                  onClick={() => {
                    const tempArr: any = { ...clientData };
                    tempArr?.Meta?.ClientFile.splice(id, 1);
                    setClientData({
                      ...clientData,
                      Meta: {
                        ClientFile: [...tempArr.Meta.ClientFile],
                      },
                    });
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
