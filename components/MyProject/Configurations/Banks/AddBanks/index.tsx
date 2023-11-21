import { useRouter } from "next/router";
import VendorAccordion from "./Accordion";
import { useForm, Controller } from "react-hook-form";

import { toast } from "react-toastify";
import BankAccordion from "./Accordion";

function AddBanks() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="overflow-auto">
      <BankAccordion />
    </div>
  );
}

export default AddBanks;
