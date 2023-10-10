import { useEmployeeStore } from "@/store/useEmployeeStore";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

import EmployeeCard from "@/common/components/EmployeeCard";
import { Employee } from "@/common/interfaces";
import RootLayout from "@/common/layouts/layout";
import { useRouter } from "next/router";
import { LOCALES_MAPPING } from "@/locales/locales";

interface Props {
  data: Employee[];
}

const UserList: React.FC<Props> = ({ data }): React.ReactElement => {
  const { updateEmployeeList, employees } = useEmployeeStore();
  const { locale = "en" } = useRouter();
  const t = LOCALES_MAPPING[locale];

  useEffect(() => {
    if (!employees.length) {
      updateEmployeeList(data);
    }
  }, []);

  return (
    <RootLayout>
      <div className="flex flex-wrap align content-start">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </RootLayout>
  );
};

const fakeData = [
  {
    id: 1,
    employee_name: "Tiger Nixon",
    employee_salary: 320800,
    employee_age: 61,
    profile_image: "",
  },
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate"
  );
  try {
    const response = await fetch(process.env.DB_HOST + `/api/employee`);

    const { data } = await response.json();

    return { props: { data } };
  } catch (error) {
    return { props: { data: fakeData } };
  }
};

export default UserList;
