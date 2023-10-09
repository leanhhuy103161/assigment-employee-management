import { Employee } from "@/common/interfaces";
import { create } from "zustand";

interface State {
  employees: Employee[];
  editingEmployee: Employee | null;
  totalEmployees: number;
}

interface Actions {
  updateEmployeeList: (Employees: Employee[]) => void;
}

const INITIAL_STATE: State = {
  employees: [],
  editingEmployee: null,
  totalEmployees: 0,
};

export const useCartStore = create<State & Actions>((set, get) => ({
  employees: INITIAL_STATE.employees,
  editingEmployee: INITIAL_STATE.editingEmployee,
  totalEmployees: INITIAL_STATE.totalEmployees,
  updateEmployeeList: (employeesList: Employee[]) => {
    set(() => ({
      employees: employeesList,
      totalEmployees: employeesList.length,
    }));
  },
  removeEmployee: (id: string) => {
    const newEmployeeList = get().employees.filter(
      (employee) => employee.id !== id
    );

    set(() => ({
      ...get(),
      employees: newEmployeeList,
    }));
  },
  editEmployee: (payload: Employee) => {
    const newEmployeeList: Employee[] = get().employees.filter(
      (employee) => employee.id !== payload.id
    );

    set(() => ({
      ...get(),
      employees: [payload, ...newEmployeeList],
    }));
  },
}));
