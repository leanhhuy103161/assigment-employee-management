import { useEmployeeStore } from "@/store/useEmployeeStore";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

import EmployeeCard from "@/common/components/EmployeeCard";
import { Employee } from "@/common/interfaces";
import RootLayout from "@/common/layouts/layout";
import { fakeData } from "@/common/constant";
import Table from "@/common/components/Table";
import Tab from "@/common/components/Tab";

interface Props {
  data: Employee[];
}

const UserList: React.FC<Props> = ({ data }): React.ReactElement => {
  const { updateEmployeeList, employees } = useEmployeeStore();

  useEffect(() => {
    if (!employees.length) {
      updateEmployeeList(data);
    }
  }, []);

  return (
    <RootLayout>
      <div className="flex flex-wrap align content-start">
        <Tab />
        <Table employees={employees} />
      </div>
    </RootLayout>
  );
};

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
