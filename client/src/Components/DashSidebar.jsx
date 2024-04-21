import { Sidebar, SidebarItem } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
function DashSidebar() {
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
    <Sidebar className="w-full md:w-56 ">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="md:min-h-screen">
          <SidebarItem>
            <Link to="/dashboard?tab=profile">
              <SidebarItem
                active={tab === "profile"}
                icon={HiUser}
                label={"User"}
                labelColor="dark"
              >
                Profile
              </SidebarItem>
            </Link>
          </SidebarItem>
          <SidebarItem icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
