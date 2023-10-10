import Link from "next/link";
import { CreateIcon, DetailIcon, EmployeeIcon } from "../icons";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useRouter } from "next/router";
import { LOCALES_MAPPING } from "@/locales/locales";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { editingEmployee } = useEmployeeStore();

  const { locale = "en", pathname, asPath, query, ...router } = useRouter();
  const t = LOCALES_MAPPING[locale];

  const handleSelectLocale = (event) => {
    router.push({ pathname, query }, asPath, {
      locale: event.target.value,
    });
  };

  return (
    <section className="w-full bg-base-300">
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium h-full flex flex-col">
            <li>
              <Link
                href="/employee"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <EmployeeIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {t.sidebar.tab.employees}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/employee/create"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CreateIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {t.sidebar.tab.create}
                </span>
              </Link>
            </li>
            {editingEmployee && (
              <li>
                <Link
                  href={`/employee/${editingEmployee.id}`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <DetailIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    {t.sidebar.tab.detail}
                  </span>

                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    ID: {editingEmployee.id}
                  </span>
                </Link>
              </li>
            )}
            <li>
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <CreateIcon />
                <div className="relative inline-flex self-center ml-3">
                  <select
                    onChange={handleSelectLocale}
                    value={locale}
                    className="text-md font-bold rounded border-2 border-blue-700 text-gray-600 h-7 w-32 pl-3  bg-white hover:border-gray-400 focus:outline-none appearance-none"
                  >
                    <option value="en">English</option>
                    <option value="jp">Japanese</option>
                    <option value="vn">Vietnamese</option>
                  </select>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 min-h-screen">{children}</div>
    </section>
  );
};

export default DashboardLayout;
