import { UseAuthContext } from "../context/Auth";

function Logout() {
  const { logoutUser } = UseAuthContext();
  const handleSubmit = () => {
    logoutUser();
  };
  return (
    <button
      onClick={handleSubmit}
      className="text-sm rounded-md p-1 border-blue-600 border-2 dark:border-white "
    >
      Logout
    </button>
  );
}

export default Logout;
