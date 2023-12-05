import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

import { closeAddVendorPopup } from "redux/slices/mySlices/transactions";

const AddVendorPopup = () => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state: any) => state.transactions.addVendorPopup.status
  );

  const {
    control,
    formState: { errors },
  } = useForm();
  return (
    <Modal
      isOpen={popupStatus}
      toggle={() => dispatch(closeAddVendorPopup("delete"))}
      className="custom-vendor-popup modal-dialog-centered "
      style={{ maxWidth: "603px" }}
    >
      <div className="d-flex justify-content-center">
        <div style={{ width: "554.98px" }}>
          <ModalBody>
            <div className="d-flex flex-column" style={{ gap: "16px" }}>
              <div
                className="text-black text-center"
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Add Vendor
              </div>

              <Row style={{ fontSize: "12px", fontWeight: "400" }}>
                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Vendor Name</Label>
                    <Controller
                      name="vendorName"
                      rules={{ required: "Vendor Name is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Vendor Name"
                          invalid={errors.vendorName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.vendorName && (
                      <span className="text-danger">
                        {errors.vendorName.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Vendor Code</Label>
                    <Controller
                      name="vendorCode"
                      rules={{ required: "Vendor Code is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Vendor Code"
                          invalid={errors.vendorCode && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.vendorCode && (
                      <span className="text-danger">
                        {errors.vendorCode.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Payee Name</Label>
                    <Controller
                      name="payeeName"
                      rules={{ required: "Payee Name is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Payee Name"
                          invalid={errors.payeeName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.payeeName && (
                      <span className="text-danger">
                        {errors.payeeName.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Vendor Legal Name</Label>
                    <Controller
                      name="vendorLegalName"
                      rules={{ required: "Vendor Legal Name is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Vendor Legal Name"
                          invalid={errors.vendorLegalName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.vendorLegalName && (
                      <span className="text-danger">
                        {errors.vendorLegalName.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Entity Type</Label>
                    <Controller
                      name="entityType"
                      rules={{ required: "Entity Type is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Entity Type"
                          invalid={errors.entityType && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.entityType && (
                      <span className="text-danger">
                        {errors.entityType.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Default Address</Label>
                    <Controller
                      name="defaultAddress"
                      rules={{ required: "Default Address is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder=" Enter Default Address"
                          invalid={errors.defaultAddress && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.defaultAddress && (
                      <span className="text-danger">
                        {errors.defaultAddress.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Work State</Label>
                    <Controller
                      name="workState"
                      rules={{ required: "Work State is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Enter Work State"
                          invalid={errors.workState && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.workState && (
                      <span className="text-danger">
                        {errors.workState.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Default Payment Type</Label>
                    <Controller
                      name="defaultPaymentType"
                      rules={{ required: "Default Payment Type is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Enter Default Payment Type"
                          invalid={errors.defaultPaymentType && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.defaultPaymentType && (
                      <span className="text-danger">
                        {errors.defaultPaymentType.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Default Account</Label>
                    <Controller
                      name="defaultAccount"
                      rules={{ required: "Default Account is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Enter Default Account"
                          invalid={errors.defaultAccount && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.defaultAccount && (
                      <span className="text-danger">
                        {errors.defaultAccount.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">Tax ID</Label>
                    <Controller
                      name="taxID"
                      rules={{ required: "Tax ID is required" }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Enter Tax ID"
                          invalid={errors.taxID && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.taxID && (
                      <span className="text-danger">
                        {errors.taxID.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>
                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">ACH Bank Routing Number</Label>
                    <Controller
                      name="achRoutingNumber"
                      rules={{
                        required: "ACH Bank Routing Number is required",
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Enter ACH Bank Routing Number"
                          invalid={errors.achRoutingNumber && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.achRoutingNumber && (
                      <span className="text-danger">
                        {errors.achRoutingNumber.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>

                <Col xl="4">
                  <div className="mb-1 mt-1">
                    <Label className=" ">ACH Bank Account Number</Label>
                    <Controller
                      name="achBankNumber"
                      rules={{
                        required: "ACH Bank Account Number is required",
                      }}
                      control={control}
                      render={({ field }) => (
                        <Input
                          style={{ fontSize: "12px", fontWeight: "400" }}
                          placeholder="Enter ACH Bank Account Number"
                          invalid={errors.achBankNumber && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.achBankNumber && (
                      <span className="text-danger">
                        {errors.achBankNumber.message as React.ReactNode}
                      </span>
                    )}
                  </div>
                </Col>
              </Row>

              <hr />

              <div
                className="d-flex justify-content-end"
                style={{ gap: "8px" }}
              >
                <Button
                  style={{ fontSize: "12px", fontWeight: "400" }}
                  onClick={() => dispatch(closeAddVendorPopup("delete"))}
                  color="white"
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    backgroundColor: "#00AEEF",
                    border: "none",
                  }}
                // onClick={() => handleDeleteDepartment()}
                >
                  Add Vendor
                </Button>
              </div>
            </div>
          </ModalBody>
        </div>
      </div>
    </Modal>
  );
};

export default AddVendorPopup;
