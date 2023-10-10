import { useRouter } from "next/router";
import { useEffect } from "react";

import EmployeeForm from "@/common/components/EmployeeForm";
import DashboardLayout from "@/common/layouts/layout";
import { useEmployeeStore } from "@/store/useEmployeeStore";

const UserDetail: React.FC = () => {
  const { editEmployee, updateEditingEmployee, editingEmployee, employees } =
    useEmployeeStore();
  const { query } = useRouter();

  useEffect(() => {
    const updatingEmployee = employees.find(
      (employee) => employee.id == query.id
    );

    updatingEmployee && updateEditingEmployee(updatingEmployee);
  }, []);

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col ">
        <EmployeeForm
          stateHandler={editEmployee}
          employee={editingEmployee || undefined}
          type="edit"
        />
      </main>
    </DashboardLayout>
  );
};

export default UserDetail;
