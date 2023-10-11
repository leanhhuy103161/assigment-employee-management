import React, { useState } from "react";
import { Employee } from "../interfaces";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOCALES_MAPPING } from "@/locales/locales";

interface Props {
  editable?: boolean;
  employees?: Employee[];
  children?: React.ReactNode;
}

interface TableCompoundType {
  Row: React.FC<TableRowProps>;
  Header: React.FC;
  Body: React.FC<Props>;
}

interface TableRowProps {
  employee: Employee;
  editable?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ employee, editable = false }) => {
  const { removeEmployee } = useEmployeeStore();
  const { locale = "en" } = useRouter();
  const t = LOCALES_MAPPING[locale];

  return (
    <tr key={employee.id} className="border-b">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{employee.id}</td>
      <td className="whitespace-nowrap px-6 py-4 flex items-center truncate  max-w-xs">
        <img
          className="w-10 h-10  rounded-full shadow-lg mr-4"
          src={
            employee.profile_image && typeof employee.profile_image !== "string"
              ? URL.createObjectURL(employee.profile_image)
              : `https://ui-avatars.com/api/?name=${employee.employee_name}`
          }
          alt={employee.employee_name || ""}
        />
        <p className="truncate">{employee.employee_name}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">{employee.employee_age}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {employee.employee_salary}
      </td>
      {editable && (
        <td className="whitespace-nowrap px-6 py-4">
          <Link
            href={`/${employee.id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
          >
            {t.card.edit}
          </Link>
          <button
            type="button"
            onClick={() => removeEmployee(employee.id)}
            className="btn ml-3 px-4 py-2 mb-4 text-white bg-red-700 rounded-lg hover:bg-red-800"
          >
            {t.card.delete}
          </button>
        </td>
      )}
    </tr>
  );
};

const TableHeader = ({ editable = false }: { editable?: boolean }) => {
  const { locale = "en" } = useRouter();
  const t = LOCALES_MAPPING[locale];

  return (
    <thead className="border-b font-medium">
      <tr>
        <th scope="col" className="px-6 py-4">
          #
        </th>
        <th scope="col" className="px-6 py-4">
          {t.form.nameLabel}
        </th>
        <th scope="col" className="px-6 py-4">
          {t.form.ageLabel}
        </th>
        <th scope="col" className="px-6 py-4">
          {t.form.salaryLabel}
        </th>
        {editable && (
          <th scope="col" className="px-6 py-4">
            {t.form.action}
          </th>
        )}
      </tr>
    </thead>
  );
};

const TableBody: React.FC<Props> = ({ employees = [], editable = false }) => (
  <tbody>
    {employees.map((employee) => (
      <TableRow key={employee.id} employee={employee} editable={editable} />
    ))}
  </tbody>
);

const Table: React.FC<Props> & TableCompoundType = ({
  employees,
  editable = false,
  children,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        editable,
      } as React.HTMLAttributes<HTMLElement>);
    }
    return child;
  });

  return (
    <div className="flex flex-col bg-gray-100 w-full">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              {childrenWithProps || (
                <>
                  <TableHeader />
                  <TableBody employees={employees} />
                </>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Table.Row = TableRow;
Table.Header = TableHeader;
Table.Body = TableBody;
export default Table;
