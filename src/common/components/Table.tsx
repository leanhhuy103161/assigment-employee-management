import { Employee } from "../interfaces";

interface Props {
  employees: Employee[];
  Row: React.FC<TableRowProps>;
  Header: React.FC;
}

interface TableRowProps {
  employee: Employee;
}

const TableRow: React.FC<TableRowProps> = ({ employee }) => (
  <tr key={employee.id} className="border-b dark:border-neutral-500">
    <td className="whitespace-nowrap px-6 py-4 font-medium">{employee.id}</td>
    <td className="whitespace-nowrap px-6 py-4">{employee.employee_name}</td>
    <td className="whitespace-nowrap px-6 py-4">{employee.employee_age}</td>
    <td className="whitespace-nowrap px-6 py-4">{employee.employee_salary}</td>
    <td className="whitespace-nowrap px-6 py-4">
      <button
        type="submit"
        className="btn px-4 py-2 mb-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Edit
      </button>
      <button
        type="submit"
        className="btn ml-3 px-4 py-2 mb-4 text-white bg-red-700 rounded-lg hover:bg-red-800"
      >
        Delete
      </button>
    </td>
  </tr>
);

const TableHeader: React.FC = () => (
  <thead className="border-b font-medium dark:border-neutral-500">
    <tr>
      <th scope="col" className="px-6 py-4">
        #
      </th>
      <th scope="col" className="px-6 py-4">
        Name
      </th>
      <th scope="col" className="px-6 py-4">
        Age
      </th>
      <th scope="col" className="px-6 py-4">
        Salary($)
      </th>
      <th scope="col" className="px-6 py-4">
        Actions
      </th>
    </tr>
  </thead>
);

const Table: React.FC<Props> = ({ employees }) => {
  return (
    <div className="flex flex-col bg-gray-100 w-full">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <TableHeader />
              <tbody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} employee={employee} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Table.Row = TableRow;
export default Table;
