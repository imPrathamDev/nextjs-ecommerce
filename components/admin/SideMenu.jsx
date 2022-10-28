import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const SideMenu = ({ children }) => {
  const options = [
    {
      title: "Dashboard",
      href: "/adminDashboard",
    },
    {
      title: "Products",
      href: "/adminDashboard/products",
    },
    {
      title: "Orders",
      href: "/adminDashboard/orders",
    },
    {
      title: "Meta Data",
      href: "/adminDashboard/meta-data",
    },
    {
      title: "Collections",
      href: "/adminDashboard/collections",
    },
    {
      title: "Assets",
      href: "/adminDashboard/assets",
    },
    {
      title: "Users",
      href: "/adminDashboard/users",
    },
  ];
  const router = useRouter();
  return (
    <div className="w-full flex">
      <div className="w-1/5 px-6">
        <ul className="flex flex-col gap-y-3 text-lg">
          {options.map((item, key) => (
            <Link key={key} href={item?.href}>
              <li
                className={`font-Cinzel font-medium ${
                  router.asPath === item.href
                    ? "text-primary font-semibold"
                    : "text-primary-black font-medium"
                } hover:tracking-wider hover:text-primary hover:underline transition-all`}
              >
                {item?.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="w-4/5">{children}</div>
    </div>
  );
};

export default SideMenu;
