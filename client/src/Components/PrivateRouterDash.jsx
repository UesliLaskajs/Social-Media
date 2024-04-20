import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRouterDash = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  if (currentUser) {
    return <Outlet />;
  }


  return <Navigate to={"/sign-in"} />;
};

export default PrivateRouterDash;
