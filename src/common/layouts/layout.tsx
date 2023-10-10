import Link from "next/link";
import { CreateIcon, DetailIcon, EmployeeIcon } from "../icons";
import { useEmployeeStore } from "@/store/useEmployeeStore";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { editingEmployee } = useEmployeeStore();

  return (
    <section className="w-full bg-base-300">
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/employee"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <EmployeeIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Employee</span>
              </Link>
            </li>
            <li>
              <Link
                href="/employee/create"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CreateIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Create</span>
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
                    Employee Detail
                  </span>

                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    ID: {editingEmployee.id}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 min-h-screen">{children}</div>
    </section>
  );
};

export default DashboardLayout;
