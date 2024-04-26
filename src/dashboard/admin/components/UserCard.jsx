import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getRolString } from "../../../helpers";
import { Link } from "react-router-dom";

export const UserCard = ({ nombre, rol, username, activo, deleteUser }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
                <FontAwesomeIcon
                    icon={faPerson}
                    className="text-7xl text-white my-4"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {nombre}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    role: {getRolString(rol)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    username: {username}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activo ? "activo" : "inactivo"}
                </span>
                <div className="flex mt-4 md:mt-6 gap-3">
                    <Link
                        to={`/dashboard/admin/user/${username}`}
                        className="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => {
                            deleteUser(username);
                        }}
                        className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
