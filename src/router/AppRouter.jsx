import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Spinner } from "../auth/components/loader/Spinner";
import { AdminRoutes } from "../dashboard/admin/routes/AdminRoutes";
import LoginPage from "../auth/pages/LoginPage";

import { useAuthStore } from "../hooks";
import { getRolString } from "../helpers";
import { AdminPage, UsersPage } from "../dashboard/admin/pages";
import { Navbar } from "../dashboard/admin/components";

export const AppRouter = () => {
    const { user, status, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    if (status === "checking") {
        return <Spinner color="#111827" />;
    }

    if (status === "not-authenticated") {
        return (
            <Routes>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/*" element={<Navigate to="/auth/login" />} />
            </Routes>
        );
    }

    const dashboardRoute = `/dashboard/${getRolString(user.rol)}`;

    return (
        <Routes>
            <Route
                path="/auth/login"
                element={<Navigate to={dashboardRoute + "/"} replace />}
            />

            {user.rol === 1 && (
                <Route path={`${dashboardRoute}/*`} element={<AdminRoutes />} />
            )}

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
