interface Props {
  defaultValue?: string | undefined | number;
  label: string;
  required?: boolean;
  id: string;
  type: string;
}

const Input: React.FC<Props> = ({
  defaultValue = "",
  label,
  required = false,
  id,
  type,
}) => (
  <div className="pb-2 p-5 card">
    <div className="flex flex-col items-start">
      <label className="label">
        <span className="text-sm">{label}</span>
      </label>
      <input
        id={id}
        defaultValue={defaultValue}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={required}
      />
    </div>
  </div>
);

export default Input;
