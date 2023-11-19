import { Button, Col, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import VendorAccordion from "./Accordion";
import { VendorsService } from "services";
import { useForm, Controller } from "react-hook-form";

import { toast } from "react-toastify";

function AddVendor() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="overflow-auto">
      <VendorAccordion />
    </div>
  );
}

export default AddVendor;
