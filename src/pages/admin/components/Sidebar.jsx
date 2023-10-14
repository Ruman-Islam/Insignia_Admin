import Image from "../../../components/UI/Image";
import Insignia__logo from "../../../assets/images/brand/Insignia__logo.png";
import { sidebarManagements, sidebarOverviews } from "../../../constants/menus";
import { HashLink } from "react-router-hash-link";

const Sidebar = () => {
  return (
    <aside className="hidden sm:flex w-[250px] bg-[#1C2536] flex-col h-full sticky top-0">
      <div className="h-full w-full">
        <div className="p-4">
          <Image src={Insignia__logo} className="w-[110px] h-[50px]" />
        </div>

        <div>
          <div className="mt-2">
            <h2 className="text-brand__heading__text font-brand__font__semibold px-4 text-brand__font__size__md">
              Overview
            </h2>
          </div>
          <div>
            {sidebarOverviews.map(({ route, title, icon }) => (
              <HashLink
                key={title}
                to={route}
                className="text-white font-brand__font__medium text-brand__font__size__sm px-4 py-2 hover:bg-white hover:text-primary duration-300 hover:no-underline flex items-center gap-x-2"
              >
                {icon}
                <span>{title}</span>
              </HashLink>
            ))}
          </div>
        </div>

        <div>
          <div className="mt-2">
            <h2 className="text-brand__heading__text font-brand__font__semibold px-4 text-brand__font__size__md">
              Management
            </h2>
          </div>
          <div>
            {sidebarManagements.map(({ route, title, icon }) => (
              <HashLink
                key={title}
                to={route}
                className="text-white font-brand__font__medium text-brand__font__size__sm px-4 py-2 hover:bg-white hover:text-primary duration-300 hover:no-underline flex items-center gap-x-2"
              >
                {icon}
                <span> {title}</span>
              </HashLink>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
