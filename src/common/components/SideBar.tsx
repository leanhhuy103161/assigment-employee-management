import Link from "next/link";

import { CreateIcon, EmployeeIcon } from "../icons";
import { SideBarProps } from "../interfaces";

const SideBar: React.FC<SideBarProps> = ({ translate }) => (
  <aside
    id="sidebar-multi-level-sidebar"
    className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100">
      <ul className="space-y-2 font-medium h-full flex flex-col">
        <li>
          <Link
            href="/"
            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <EmployeeIcon />
            <span className="flex-1 ml-3 whitespace-nowrap">
              {translate.sidebar.tab.employees}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  </aside>
);

export default SideBar;
