import { useRouter } from "next/router";

import EmployeeForm from "@/common/components/EmployeeForm";
import DashboardLayout from "@/common/layouts/layout";
import { useEmployeeStore } from "@/store/useEmployeeStore";

const UserDetail: React.FC = () => {
  const { editEmployee, employees } = useEmployeeStore();
  const { query } = useRouter();

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col ">
        <EmployeeForm
          stateHandler={editEmployee}
          employee={
            employees.find((employee) => employee.id == query.id) || undefined
          }
          type="edit"
        />
      </main>
    </DashboardLayout>
  );
};

export default UserDetail;
