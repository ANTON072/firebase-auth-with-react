import { Outlet } from "react-router-dom";

function AuthRoot() {
  return (
    <div>
      <p>auth root</p>
      <Outlet />
    </div>
  );
}

export default AuthRoot;
