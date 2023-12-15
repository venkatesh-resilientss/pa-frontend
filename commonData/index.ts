export const bIFields = [
  {
    lb: "Client Name",
    ph: "Enter Client Name",
    typ: "text",
    vl: "Name",
    err: "Enter Client Name",
  },
  {
    lb: "Client Code",
    ph: "Enter Client Code",
    typ: "text",
    vl: "Code",
    err: "Enter Client Code",
  },
  {
    lb: "Client Legal Name (If different)",
    ph: "Enter Legal Name",
    typ: "text",
    vl: "LegalName",
    err: "",
  },
  {
    lb: "Client Type",
    ph: "Select",
    typ: "select",
    vl: "clientType",
    err: "Select Client Type",
  },
];
export const pFields = [
  {
    lb: "Address Line 1",
    ph: "Enter Address",
    typ: "text",
    vl: "PhysicalAddress.Line1",
    err: "Enter Address",
  },
  {
    lb: "Address Line 2",
    ph: "Enter Address",
    typ: "text",
    vl: "PhysicalAddress.Line2",
    err: "",
  },
  {
    lb: "City",
    ph: "Select City",
    typ: "text",
    vl: "PhysicalAddress.CityName",
    err: "Enter City Name",
  },
  {
    lb: "Country",
    ph: "Select Country",
    typ: "select",
    vl: "PhysicalAddress.country",
    err: "Select Country",
  },
  {
    lb: "State",
    ph: "Select State",
    typ: "select",
    vl: "PhysicalAddress.state",
    err: "Select State",
  },
  {
    lb: "Zip Code",
    ph: "Enter Zip Code",
    typ: "number",
    vl: "PhysicalAddress.Zipcode",
    err: "Enter Zip Code",
  },
];

export const iFields = [
  {
    lb: "Address Line 1",
    ph: "Enter Address",
    typ: "text",
    vl: "MailingAddress.Line1",
    err: "",
  },
  {
    lb: "Address Line 2",
    ph: "Enter Address",
    typ: "text",
    vl: "MailingAddress.Line2",
    err: "",
  },
  {
    lb: "City",
    ph: "Select City",
    typ: "text",
    vl: "MailingAddress.CityName",
    err: "",
  },
  {
    lb: "Country",
    ph: "Select Country",
    typ: "select",
    vl: "MailingAddress.country",
    err: "",
  },
  {
    lb: "State",
    ph: "Select State",
    typ: "select",
    vl: "MailingAddress.state",
    err: "",
  },
  {
    lb: "Zip Code",
    ph: "Enter Zip Code",
    typ: "number",
    vl: "MailingAddress.Zipcode",
    err: "",
  },
];

export const prFields = [
  {
    lb: "Last Name",
    ph: "Enter Last Name",
    typ: "text",
    vl: "Company.PrimaryContact.FirstName",
    err: "Enter Last Name",
  },
  {
    lb: "First Name",
    ph: "Enter First Name",
    typ: "text",
    vl: "Company.PrimaryContact.LastName",
    err: "Enter First Name",
  },
  {
    lb: "Middle Initial Name",
    ph: "Enter Middle Name",
    typ: "text",
    vl: "Company.PrimaryContact.MiddleName",
    err: "",
  },
  {
    lb: "Title",
    ph: "Enter Role",
    typ: "text",
    vl: "Company.PrimaryContact.Title",
    err: "",
  },
  {
    lb: "Office Phone",
    ph: "Enter Phone Number",
    typ: "text",
    vl: "Company.PrimaryContact.OfficePhone",
    err: "",
  },
  {
    lb: "Cell Phone",
    ph: "Enter Mobile Number",
    typ: "phone",
    vl: "Company.PrimaryContact.CellPhone",
    err: "",
  },
  {
    lb: "Email",
    ph: "Enter Email ID",
    typ: "text",
    vl: "Company.PrimaryContact.EmailID",
    err: "Enter Email ID",
  },
];

export const inFields = [
  {
    lb: "Last Name",
    ph: "Enter Last Name",
    typ: "text",
    vl: "Company.SecondaryContact.FirstName",
    err: "",
  },
  {
    lb: "First Name",
    ph: "Enter First Name",
    typ: "text",
    vl: "Company.SecondaryContact.LastName",
    err: "",
  },
  {
    lb: "Middle Initial Name",
    ph: "Enter Middle Name",
    typ: "text",
    vl: "Company.SecondaryContact.MiddleName",
    err: "",
  },
  {
    lb: "Title",
    ph: "Enter Role",
    typ: "text",
    vl: "Company.SecondaryContact.Title",
    err: "",
  },
  {
    lb: "Office Phone",
    ph: "Enter Phone Number",
    typ: "text",
    vl: "Company.SecondaryContact.OfficePhone",
    err: "",
  },
  {
    lb: "Cell Phone",
    ph: "Enter Mobile Number",
    typ: "phone",
    vl: "Company.SecondaryContact.CellPhone",
    err: "",
  },
  {
    lb: "Email",
    ph: "Enter Email ID",
    typ: "text",
    vl: "Company.SecondaryContact.EmailID",
    err: "Primary and Secondary should not match",
  },
];

export const wFields = [
  {
    lb: "Logo",
    ph: "Choose file",
    typ: "file",
    vl: "LogoUrl",
    err: "",
  },
  {
    lb: "Domain",
    ph: "Enter Client name",
    typ: "domain",
    vl: "Tenant.Slug",
    err: "Enter Client name",
  },
  {
    lb: "Client Admin",
    ph: "Select Admin",
    typ: "select",
    vl: "clientAdmin",
    err: "",
  },
  {
    lb: "RSSL Support User",
    ph: "Select Admin",
    typ: "select",
    vl: "rsslSupportUser",
    err: "",
  },
];

export const allFields = [
  ...bIFields,
  ...pFields,
  ...iFields,
  ...prFields,
  ...inFields,
  ...wFields,
];
