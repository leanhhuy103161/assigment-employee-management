import { ButtonType } from "./interfaces";

export const DATA_SOURCE_URL = "https://dummy.restapiexample.com/api/v1";
export const PATHS = {
  GET: "employees",
  POST: "create",
  PUT: "update",
  DELETE: "delete",
  GET_DETAIL: "employee",
};
export const REVALIDATE = 300;

export const fakeData = [
  {
    id: 1,
    employee_name: "Tiger Nixon",
    employee_salary: 320800,
    employee_age: 61,
    profile_image: "",
  },
];

export const BUTTON: ButtonType = {
  edit: "Edit",
  create: "Create",
};

export const HREF_TYPES = {
  viewOnly: "/#view-only",
  editable: "/#editable",
  create: "/#create",
};

export const TAB_LIST = [
  {
    id: 1,
    text: "viewOnly",
    href: HREF_TYPES.viewOnly,
  },
  {
    id: 2,
    text: "editable",
    href: HREF_TYPES.editable,
  },
  {
    id: 3,
    text: "create",
    href: HREF_TYPES.create,
  },
];

export const ACTIVE_TAB_MAPPER = {
  true: "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500",
  false:
    "bg-white text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700",
};

export const ACTIVE_TYPE_MAPPER = {
  [HREF_TYPES.viewOnly]: 1,
  [HREF_TYPES.editable]: 2,
  [HREF_TYPES.create]: 3,
};
