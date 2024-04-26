import React from "react";
import { useAuthStore } from "../../../hooks";
import { NavbarList } from "./";

export const Navbar = () => {
    const { user, startLogout } = useAuthStore();

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1554/1554561.png"
                            className="h-8"
                            alt="Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Paqueteria
                        </span>
                    </a>
                    <NavbarList />
                    <div className="flex text-white items-center gap-4">
                        <p>{user.name}</p>
                        <button
                            onClick={startLogout}
                            type="button"
                            className=" bg-gray-800 flex hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};
