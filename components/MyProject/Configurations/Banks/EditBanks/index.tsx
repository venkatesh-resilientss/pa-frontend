import { useRouter } from "next/router";
import VendorAccordion from "./Accordion";
import { useForm, Controller } from "react-hook-form";

import { toast } from "react-toastify";
import BankAccordion from "./Accordion";

function EditBanks() {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="overflow-auto">
      <BankAccordion id={id} />
    </div>
  );
}

export default EditBanks;
