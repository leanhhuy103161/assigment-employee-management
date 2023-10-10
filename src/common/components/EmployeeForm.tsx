import { useState } from "react";
import { Employee } from "../interfaces";
import { useRouter } from "next/router";
import { LOCALES_MAPPING } from "@/locales/locales";

interface Props {
  employee?: Employee;
  stateHandler: (event: any) => void;
  type?: string;
}

type ButtonType = {
  [key: string]: string;
};

const BUTTON: ButtonType = {
  edit: "Edit",
  create: "Create",
};

const EmployeeForm: React.FC<Props> = ({
  employee,
  stateHandler,
  type = "create",
}) => {
  const [selectedImage, setSelectedImage] = useState<
    string | Blob | MediaSource | undefined
  >(employee?.profile_image);

  console.log(employee);

  const { locale = "en" } = useRouter();
  const t = LOCALES_MAPPING[locale];

  const onSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formFields = form?.elements;

    const payload: Employee = {
      id: employee?.id || (Math.random() + 1).toString(36).substring(7),
      employee_name: formFields.name.value,
      employee_age: formFields.age.value,
      employee_salary: formFields.salary.value,
      profile_image: selectedImage,
    };

    console.log(payload);

    stateHandler(payload);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid mt-11 w-full grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 "
    >
      <div className="card mx-auto w-full max-w-3xl  text-center bg-base-200 shadow-2xl bg-white border border-gray-200 rounded-lg">
        <div className="flex flex-wrap">
          <div className="flex-1">
            <div className="pb-2 p-5 card h-full">
              <div className="flex flex-col items-start">
                <label className="label">
                  <span className="label-text">{t.form.avatar}</span>
                </label>
                <label
                  htmlFor="uploadImageProfile"
                  className="avatar cursor-pointer my-auto mx-auto"
                >
                  <div className="mb-8 rounded-full w-56 h-56 relative ring ring-offset-2">
                    {selectedImage === undefined ? (
                      <>
                        <div className="absolute flex items-center justify-center w-56 h-56 rounded-full bg-base-100 z-50 opacity-0 hover:opacity-80">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current"
                          >
                            <path
                              d="M16 18H2C0.89543 18 0 17.1046 0 16V2C0 0.89543 0.89543 0 2 0H16C17.1046 0 18 0.89543 18 2V16C18 17.1046 17.1046 18 16 18ZM2 2V16H16V2H2ZM15 14H3L6 10L7 11L10 7L15 14ZM5.5 8C4.67157 8 4 7.32843 4 6.5C4 5.67157 4.67157 5 5.5 5C6.32843 5 7 5.67157 7 6.5C7 7.32843 6.32843 8 5.5 8Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <img
                          src="https://avatars.dicebear.com/api/open-peeps/your-custom-seed.svg"
                          className="w-full object-cover z-0 rounded-full"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="uploadImage absolute flex items-center justify-center w-56 h-56 rounded-full bg-base-100 z-50 opacity-50 hover:opacity-80"
                          src={
                            (typeof selectedImage !== "string" &&
                              URL.createObjectURL(selectedImage)) ||
                            ""
                          }
                        ></img>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="uploadImageProfile"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files !== null)
                      setSelectedImage(event.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="pb-2 p-5 card ">
              <div className="flex flex-col items-start">
                <label className="label">
                  <span className="text-sm">{t.form.nameLabel}</span>
                </label>
                <input
                  id="name"
                  defaultValue={employee?.employee_name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            <div className="pb-2 p-5 card ">
              <div className="flex flex-col items-start">
                <label className="label">
                  <span className="text-sm">{t.form.ageLabel}</span>
                </label>
                <input
                  id="age"
                  defaultValue={employee?.employee_age}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="p-5 card ">
              <div className="flex flex-col items-start">
                <label className="label">
                  <span className="text-sm">{t.form.salaryLabel}</span>
                </label>
                <input
                  id="salary"
                  defaultValue={employee?.employee_salary}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn px-4 py-2 mb-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            {BUTTON[type]}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
