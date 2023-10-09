import EmployeeCard from "@/common/components/EmployeeCard";
import { Employee } from "@/common/interfaces";
import RootLayout from "@/common/layouts/layout";
import { GetServerSideProps } from "next";

interface Props {
  data: Employee[];
}

const UserList: React.FC<Props> = ({ data }): React.ReactElement => {
  return (
    <RootLayout>
      <div className="flex flex-wrap align content-start">
        {data.map((employee) => (
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
  res.setHeader("Cache-Control", "public, s-maxage=5, stale-while-revalidate");
  try {
    const response = await fetch(`http://localhost:3000/api/employee`);
    console.log(response.status);

    const { data } = await response.json();

    // Pass data to the page via props
    return { props: { data } };
  } catch (error) {
    return { props: { data: fakeData } };
  }
};

export default UserList;
