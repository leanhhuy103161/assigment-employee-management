import { useRouter } from "next/router";
import { useState } from "react";

import { Employee } from "../interfaces";
import { LOCALES, LOCALES_MAPPING } from "@/locales/locales";
import Input from "./Input";
import { BUTTON } from "../constant";
import UploadImage from "./UploadImage";

interface Props {
  employee?: Employee;
  stateHandler: (event: any) => void;
  type?: string;
}

interface LoadImageProps {
  isUploaded: boolean;
  children: React.ReactNode;
}

const LoadImage: React.FC<LoadImageProps> = ({ isUploaded, children }) => {
  return !isUploaded ? <UploadImage /> : children;
};

const EmployeeForm: React.FC<Props> = ({
  employee,
  stateHandler,
  type = "create",
}) => {
  const [selectedImage, setSelectedImage] = useState<
    string | Blob | MediaSource | undefined
  >(employee?.profile_image);

  const {
    locale = LOCALES.en,
    pathname,
    query,
    asPath,
    ...router
  } = useRouter();
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

    stateHandler(payload);
    router.push(`/${locale}/`);
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
                    <LoadImage isUploaded={selectedImage !== undefined}>
                      <img
                        className="uploadImage absolute flex items-center justify-center w-56 h-56 rounded-full bg-base-100 z-50 opacity-50 hover:opacity-80"
                        src={
                          (typeof selectedImage !== "string" &&
                            selectedImage !== undefined &&
                            URL.createObjectURL(selectedImage)) ||
                          ""
                        }
                      />
                    </LoadImage>
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
            <Input
              label={t.form.nameLabel}
              id="name"
              type="text"
              defaultValue={employee?.employee_name}
              required
            />
            <Input
              label={t.form.ageLabel}
              id="age"
              type="number"
              defaultValue={employee?.employee_age}
              required
            />
            <Input
              label={t.form.salaryLabel}
              id="salary"
              type="number"
              defaultValue={employee?.employee_salary}
              required
            />
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
