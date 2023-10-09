import axiosClient from "./axios-client";

import { EmployeeProps, responseType } from "@/common/interfaces";

export const employeeApi = {
  getAll() {
    return axiosClient.get<responseType>("/employee");
  },
  getDetail(id: string) {
    return axiosClient.get(`/employee/${id}`);
  },
  update(payload: EmployeeProps, id: string) {
    return axiosClient.put(`/employee/${id}`, payload);
  },
  create(payload: EmployeeProps) {
    return axiosClient.post("/employee", payload);
  },
  delete(id: string) {
    return axiosClient.delete(`/employee/${id}`);
  },
};
