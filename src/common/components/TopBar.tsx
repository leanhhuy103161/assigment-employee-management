import { CreateIcon } from "../icons";
import { TopBarProps } from "../interfaces";

const TopBar: React.FC<TopBarProps> = ({
  pathname,
  query,
  asPath,
  router,
  locale,
  translate,
}) => {
  const handleSelectLocale = (event: any) => {
    router.push({ pathname, query }, asPath, {
      locale: event.target.value,
    });
  };

  return (
    <div className="flex-1 z-auto flex flex-col ">
      <nav className="px-4 w-full fixed flex justify-between bg-gray-50 dark:bg-gray-800 h-16 border-b-2">
        <ul className="flex items-center">
          <li className="h-6 w-6"></li>
        </ul>

        <ul className="flex items-center">
          <li>
            <h1 className="pl-8 font-bold lg:pl-0 text-gray-700">
              {translate.topBar.title}
            </h1>
          </li>
        </ul>

        <ul className="flex items-center">
          <li>
            <div className="ml-auto flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <CreateIcon />
              <div className="relative inline-flex self-center ml-3">
                <select
                  onChange={handleSelectLocale}
                  value={locale}
                  className="text-md font-bold rounded border-2 border-blue-700 text-gray-600 h-7 w-32 pl-3  bg-white hover:border-gray-400 focus:outline-none appearance-none"
                >
                  <option value="en">English</option>
                  <option value="jp">Japanese</option>
                  <option value="vn">Vietnamese</option>
                </select>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
