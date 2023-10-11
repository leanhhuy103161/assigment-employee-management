import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { LOCALES, LOCALES_MAPPING } from "@/locales/locales";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const {
    locale = LOCALES.en,
    pathname,
    asPath,
    query,
    ...router
  } = useRouter();
  const t = LOCALES_MAPPING[locale];

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="w-full bg-base-300">
      <TopBar
        pathname={pathname}
        query={query}
        asPath={asPath}
        router={router}
        locale={locale}
        translate={t}
      />
      <SideBar translate={t} />
      {isClient && (
        <div className="p-4 min-h-screen pt-0 sm:ml-64 ">{children}</div>
      )}
    </section>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutWrapper>
      <div className="mt-20">{children}</div>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
