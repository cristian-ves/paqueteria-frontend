import React from "react";
import { Navbar } from "../components";
import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage, AdminPage, UserPage, AddUserPage } from "../pages";

export const AdminRoutes = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<AdminPage />} />
                <Route path="/users" element={<UsersPage />} />

                <Route path="/users/add" element={<AddUserPage />} />
                <Route path="/user/:username" element={<UserPage />} />

                <Route path="/*" element={<Navigate to={"/"} />} />
            </Routes>
        </>
    );
};
