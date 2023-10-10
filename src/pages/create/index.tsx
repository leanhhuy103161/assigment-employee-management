import DashboardLayout from "@/common/layouts/layout";

import { useEmployeeStore } from "@/store/useEmployeeStore";
import EmployeeForm from "@/common/components/EmployeeForm";

export default function CreateUser() {
  const { editEmployee } = useEmployeeStore();

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <EmployeeForm stateHandler={editEmployee} type="create" />
      </main>
    </DashboardLayout>
  );
}
