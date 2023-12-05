import Image from "next/image";
import BgImage from "assets/MyImages/NoDataImage.svg";
import { Button } from "reactstrap";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import { useRouter } from "next/router";

export default function NoDataPage({ buttonLink, buttonName }) {
  const router = useRouter();
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "60vh", gap: "8px" }}
    >
      <Image
        alt="bg-image"
        src={BgImage}
        style={{ width: "516px", height: "251px" }}
      />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ gap: "12px" }}
      >
        <div className="d-flex flex-column" style={{ gap: "5px" }}>
          <div
            style={{ fontSize: "27.75px", fontWeight: "600", color: "#B0B0B0" }}
          >
            No Data available
          </div>
          <div
            style={{ fontSize: "11.13px", fontWeight: "600", color: "#B0B0B0" }}
          >
            {/* Please create your first client to be able to work */}
          </div>
        </div>
        {/* <Button
          onClick={() => router.push(buttonLink)}
          style={{
            fontSize: "14px",
            fontWeight: "600",
            backgroundColor: "#00AEEF",
            border: "none",
            height: "38.01px",
          }}
        >
          <Image
            style={{ width: "14px", height: "14px" }}
            src={plusWhiteIcon}
            alt="plus-icon"
          />{" "}
          {buttonName}
        </Button> */}
        {buttonName !== "No button" && (
          <Button
            onClick={() => router.push(buttonLink)}
            style={{
              fontSize: "14px",
              fontWeight: "600",
              backgroundColor: "#00AEEF",
              border: "none",
              height: "38.01px",
            }}
          >
            <Image
              style={{ width: "14px", height: "14px" }}
              src={plusWhiteIcon}
              alt="plus-icon"
            />{" "}
            {buttonName}
          </Button>
        )}
      </div>
    </div>
  );
}
