interface Props {
  defaultValue?: string | undefined | number;
  label: string;
  required?: boolean;
  id: string;
  type: string;
  pattern?: string;
  title?: string;
}

const Input: React.FC<Props> = ({
  defaultValue = "",
  label,
  required = false,
  id,
  type,
  pattern,
  title,
}) => (
  <div className="pb-2 p-5 card">
    <div className="flex flex-col items-start">
      <label className="label">
        <span className="text-sm">{label}</span>
      </label>
      <input
        title={title}
        id={id}
        defaultValue={defaultValue}
        type={type}
        pattern={pattern}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required={required}
      />
    </div>
  </div>
);

export default Input;
