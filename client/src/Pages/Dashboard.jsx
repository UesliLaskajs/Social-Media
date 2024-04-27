import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../Components/DashProfile";
import DashSidebar from "../Components/DashSidebar";
function Dashboard() {
  const location = useLocation(); // Using useLocation hook to get the current location
  const [tab, setTab] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search); //searchParam from the location object to get location dashboard?tab="{To get data from here}"
    const tabUrl = searchParams.get("tab"); //Getting the parameter tab if it is found in the location.search
    if (tabUrl) {
      //if we have it we set the tabUrl to "tab => parameter"
      setTab(tabUrl);
    }
    console.log(tabUrl);
  }, [location.search]); //Rendering based on the change of parameter tab="profile or "

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="w-full">{tab === "profile" && <DashProfile />}</div>
    </div>
  );
}

export default Dashboard;
