import { useState, useEffect } from "react";
import { ACTIVE_TAB_MAPPER, ACTIVE_TYPE_MAPPER, TAB_LIST } from "../constant";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOCALES_MAPPING } from "@/locales/locales";

interface TabType {
  href: string;
  text: string;
  id: number;
  activeTab: number;
  translate: any;
}

interface TabsCompoundType {
  Tab: React.FC<TabType>;
}

const Tab: React.FC<TabType> = ({ id, activeTab, text, href, translate }) => (
  <li className="mr-2">
    <Link
      href={href}
      className={`inline-block p-4 border-b-2 rounded-t-lg border-transparent ${
        activeTab === id ? ACTIVE_TAB_MAPPER.true : ACTIVE_TAB_MAPPER.false
      }`}
    >
      {translate.tab[text]}
    </Link>
  </li>
);

const Tabs: React.FC & TabsCompoundType = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { asPath, locale = "en" } = useRouter();

  const t = LOCALES_MAPPING[locale];

  useEffect(() => {
    setActiveTab(ACTIVE_TYPE_MAPPER[asPath]);
  }, [asPath]);

  return (
    <div className="text-sm  mb-4 font-medium text-center bg-white text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {TAB_LIST.map((tab) => (
          <Tab key={tab.id} activeTab={activeTab} translate={t} {...tab} />
        ))}
      </ul>
    </div>
  );
};

Tabs.Tab = Tab;
export default Tabs;
