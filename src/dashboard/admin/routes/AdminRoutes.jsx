import React from "react";
import { Navbar } from "../components";
import { Navigate, Route, Routes } from "react-router-dom";
import {
    UsersPage,
    AdminPage,
    UserPage,
    AddUserPage,
    GlobalRates,
    RoutePage,
} from "../pages";
import { RoutesPage } from "../pages";

export const AdminRoutes = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<AdminPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/add" element={<AddUserPage />} />
                <Route path="/user/:username" element={<UserPage />} />
                <Route path="/rates" element={<GlobalRates />} />
                <Route path="/routes" element={<RoutesPage />} />\
                <Route path="/route/edit/:id" element={<RoutePage />} />\
                <Route path="/route/puntos/:id" element={<RoutePage />} />\
                <Route path="/*" element={<Navigate to={"/"} />} />
            </Routes>
        </>
    );
};
