import { useEmployeeStore } from "@/store/useEmployeeStore";
import { GetServerSideProps } from "next";
import { useEffect, Fragment } from "react";

import { Employee } from "@/common/interfaces";
import RootLayout from "@/common/layouts/layout";
import { ACTIVE_TYPE_MAPPER, HREF_TYPES, fakeData } from "@/common/constant";
import Table from "@/common/components/Table";
import Tabs from "@/common/components/Tabs";
import EmployeeForm from "@/common/components/EmployeeForm";
import { useRouter } from "next/router";
interface Props {
  data: Employee[];
}

interface ContentType {
  type: number;
  employees: Employee[];
  stateHandler: (payload: Employee) => void;
}

const ViewOnlyTable: React.FC<Props> = ({ data }) => (
  <Table>
    <Table.Header />
    <Table.Body employees={data} />
  </Table>
);

const EditableTable: React.FC<Props> = ({ data }) => (
  <Table editable>
    <Table.Header />
    <Table.Body employees={data} />
  </Table>
);

interface type {
  [key: number]: any;
}

export const FEATURES: type = {
  1: ViewOnlyTable,
  2: EditableTable,
  3: EmployeeForm,
};

const Content: React.FC<ContentType> = ({
  type = 1,
  employees,
  stateHandler,
}) => {
  const Component = (typeof type === "number" && FEATURES[type]) || <></>;
  return <Component data={employees} stateHandler={stateHandler} />;
};

const UserList: React.FC<Props> = ({ data }): React.ReactElement => {
  const { updateEmployeeList, employees, editEmployee } = useEmployeeStore();
  const { asPath } = useRouter();

  useEffect(() => {
    if (!employees.length) {
      updateEmployeeList(data);
    }
  }, []);

  return (
    <RootLayout>
      <div className="flex flex-wrap align content-start">
        <Tabs />
        <Content
          type={ACTIVE_TYPE_MAPPER[asPath]}
          employees={employees}
          stateHandler={editEmployee}
        />
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
