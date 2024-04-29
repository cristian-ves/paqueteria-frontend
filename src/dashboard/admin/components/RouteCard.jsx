import React from "react";
import { Link } from "react-router-dom";

import {
    faLocation,
    faPencil,
    faRoute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RouteCard = ({ activa, destino, cuotaDestino, id }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
                <FontAwesomeIcon
                    icon={faRoute}
                    className="text-7xl text-white my-4"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Ruta id: {id}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activa ? "activo" : "inactivo"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    destino id: {destino}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Cuota destino: Q{cuotaDestino.toFixed(2)}
                </span>
                <div className="flex mt-4 md:mt-6 gap-3 items-center">
                    <Link
                        to={`/dashboard/admin/route/edit/${id}`}
                        className="cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        <FontAwesomeIcon icon={faPencil} />
                        &ensp;Edit
                    </Link>
                    <Link
                        to={`/dashboard/admin/route/puntos/${id}`}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faLocation} />
                        &ensp;Puntos de control
                    </Link>
                </div>
            </div>
        </div>
    );
};
