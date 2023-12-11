import Link from "next/link";

export default function Footer() {
  return (
    <div className="text-center mt-5 mb-auto f-12 clr-lblack">
      <p className="mt-3 ">Have Questions or Suggestions?</p>
      <p className="">
        Please&nbsp;
        <a href="mailto:support@example.com">
          <u className="clr-dblack">email</u>
        </a>
        &nbsp;support or call &nbsp;
        <a href="tel:805-428-8024">
          <u className="clr-dblack">805-428-8024</u>
        </a>
      </p>
      <p className="">Powered by Resilient Software Solutions LLC</p>

      <div className="d-inline-flex justify-content-between my-2">
        <Link href="/">
          <u className="clr-dblack">Terms & conditions</u>
        </Link>
        <span className="mx-3">|</span>
        <Link href="/">
          <u className="clr-dblack">Privacy Policy</u>
        </Link>
      </div>
    </div>
  );
}
