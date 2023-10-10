import Link from "next/link";
import { useRouter } from "next/router";

import { Employee } from "../interfaces";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { LOCALES_MAPPING } from "@/locales/locales";

interface Props {
  employee: Employee;
}

const EmployeeCard: React.FC<Props> = ({ employee }) => {
  const { removeEmployee } = useEmployeeStore();

  const { locale = "en" } = useRouter();
  const t = LOCALES_MAPPING[locale];

  return (
    <div className="m-4 w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 pt-4">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={
            employee.profile_image
              ? URL.createObjectURL(employee.profile_image)
              : `https://ui-avatars.com/api/?name=${employee.employee_name}`
          }
          alt={employee.employee_name || ""}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {employee.employee_name || ""}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {t.card.ageLabel}: {employee.employee_age || ""} {t.card.ageSuffixes}
        </span>
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          {t.card.salaryLabel}: {employee.employee_salary || ""}$
        </span>
        <div className="flex mt-4 space-x-3">
          <Link
            href={`/employee/${employee.id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            {t.card.edit}
          </Link>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none  "
            onClick={() => removeEmployee(employee.id)}
          >
            {t.card.delete}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
