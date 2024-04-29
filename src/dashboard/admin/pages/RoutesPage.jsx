import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { RouteCard } from "../components";
import { Spinner } from "../../../auth/components/loader/Spinner";

import paqueteriaApi from "../../../api/paqueteriaApi";
import { Link } from "react-router-dom";

export const RoutesPage = () => {
    const [routes, setRoutes] = useState({});
    const [checking, setChecking] = useState(true);

    const getRoutes = async () => {
        const { data } = await paqueteriaApi.get("/rutas");
        setRoutes(data.rutas);
        setChecking(false);
    };

    useEffect(() => {
        getRoutes();
    }, []);

    if (checking) return <Spinner color="#111827" />;

    return (
        <main>
            <div className="flex items-center justify-center gap-6">
                <h1 className="text-3xl font-bold text-center my-5">Users</h1>
                <Link
                    to="/dashboard/admin/routes/add"
                    className="text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    &ensp;Add Route
                </Link>
            </div>
            <div className="flex gap-6 flex-wrap items-center justify-center mb-5">
                {routes.map((route, i) => (
                    <RouteCard
                        activa={route.Activa}
                        cuotaDestino={route.CuotaDestino}
                        destino={route.Destino}
                        id={route.Id}
                        key={i}
                    />
                ))}
            </div>
        </main>
    );
};
