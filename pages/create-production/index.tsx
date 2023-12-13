import AddProductions from "components/MyProject/Productions/AddProductions";

export default function Index({ router, clientData }) {
  return (
    <div>
      <AddProductions {...{ router, clientData }} />
    </div>
  );
}
