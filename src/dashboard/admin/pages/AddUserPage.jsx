import React, { useState } from "react";

import { useForm } from "../../../hooks";
import paqueteriaApi from "../../../api/paqueteriaApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const AddUserPage = () => {
    const navigate = useNavigate();

    const { formState, onInputChange } = useForm({
        name: "",
        username: "",
        password: "",
        role: "",
    });
    const { name, password, role, username } = formState;
    const [checked, setChecked] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await paqueteriaApi.post("/usuario", {
                username,
                password,
                nombre: name,
                activo: checked,
                rol: parseInt(role),
            });
            await Swal.fire("User created successfully", "", "success");
            navigate("/dashboard/admin/users");
        } catch (error) {
            Swal.fire(
                "Error creating user",
                error.response.data.error,
                "error"
            );
        }
    };

    return (
        <form className="max-w-sm mx-auto my-5" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-extrabold my-5">Add user</h1>

            <div className="mb-5">
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={name}
                    required
                    name="name"
                    onChange={onInputChange}
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Username
                </label>
                <input
                    type="username"
                    id="username"
                    value={username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={onInputChange}
                    name="username"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={onInputChange}
                    name="password"
                    required
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Role
                </label>
                <input
                    type="number"
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={role}
                    onChange={onInputChange}
                    name="role"
                    required
                />
            </div>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input
                        id="activo"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                        checked={checked}
                        onChange={() => {
                            setChecked(!checked);
                        }}
                    />
                </div>
                <label
                    htmlFor="activo"
                    className="ms-2 text-sm font-medium text-gray-900"
                >
                    Activo
                </label>
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
                Submit
            </button>
        </form>
    );
};
