import AddUser from "components/MyProject/Settings/UserManagement/AddUser";

export default function AddUserPage({router,user}) {
  return (
    <div>
      <AddUser {...{router,user}} />
    </div>
  );
}
