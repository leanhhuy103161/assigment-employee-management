import Link from "next/link";
import { useRouter } from "next/router";

import { CreateIcon, EmployeeIcon } from "../icons";
import { LOCALES, LOCALES_MAPPING } from "@/locales/locales";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    locale = LOCALES.en,
    pathname,
    asPath,
    query,
    ...router
  } = useRouter();
  const t = LOCALES_MAPPING[locale];

  const handleSelectLocale = (event: any) => {
    router.push({ pathname, query }, asPath, {
      locale: event.target.value,
    });
  };

  return (
    <section className="w-full bg-base-300">
      <div className="flex-1 z-auto flex flex-col ">
        <nav className="px-4 w-full fixed flex justify-between bg-gray-50 dark:bg-gray-800 h-16 border-b-2">
          <ul className="flex items-center">
            <li className="h-6 w-6"></li>
          </ul>

          <ul className="flex items-center">
            <li>
              <h1 className="pl-8 font-bold lg:pl-0 text-gray-700">
                Employee Manager
              </h1>
            </li>
          </ul>

          <ul className="flex items-center">
            <li>
              <div className="ml-auto flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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
        </nav>
      </div>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium h-full flex flex-col">
            <li>
              <Link
                href="/"
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
                href="/create"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CreateIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {t.sidebar.tab.create}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 pt-0 sm:ml-64 ">
        <div className=" mt-20">{children}</div>
      </div>
    </section>
  );
};

export default DashboardLayout;
