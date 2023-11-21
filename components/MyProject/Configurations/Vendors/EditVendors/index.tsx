import ReactSelect from "react-select";
import { Button, Col, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import VendorAccordion from "./Accordion";

function EditVendor() {
  const router = useRouter();

  return (
    <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
      <VendorAccordion />
    </div>
  );
}

export default EditVendor;
