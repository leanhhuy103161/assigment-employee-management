export type EmployeeProps = {
  employee_name?: string;
  employee_salary?: number | string;
  employee_age?: number | string;
  profile_image?: string | Blob | MediaSource;
};

export type Employee = EmployeeProps & { id: string };

export type responseType = {
  status: string;
  data: Employee[];
};

export type ButtonType = {
  [key: string]: string;
};
