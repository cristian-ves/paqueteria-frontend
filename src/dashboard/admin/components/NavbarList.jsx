import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Routes",
        path: "/routes",
    },
    {
        name: "Global rates",
        path: "/rates",
    },
    {
        name: "Users",
        path: "/users",
    },
];

export const NavbarList = () => {
    const { pathname } = useLocation();

    return (
        <div className="hidden md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {links.map((link, i) => (
                    <li key={i}>
                        <Link
                            to={`/dashboard/admin${link.path}`}
                            className={
                                pathname === "/dashboard/admin" + link.path
                                    ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                    : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            }
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
