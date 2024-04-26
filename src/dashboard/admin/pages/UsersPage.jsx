import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import paqueteriaApi from "../../../api/paqueteriaApi";

import { UserCard } from "../components";
import { Spinner } from "../../../auth/components/loader/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const UsersPage = () => {
    const [users, setUsers] = useState({});
    const [checking, setChecking] = useState(true);

    const getUsers = async () => {
        const { data } = await paqueteriaApi.get("/usuarios");
        setUsers(data.usuarios);
        setChecking(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (username) => {
        Swal.fire({
            title: `Do you want to delete the username ${username}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setChecking(true);
                    await paqueteriaApi.delete(`/usuario?username=${username}`);
                    await getUsers();
                    Swal.fire("Username deleted succesfully!", "", "success");
                } catch (error) {
                    Swal.fire(
                        "There was a problem deleting the user",
                        "",
                        "info"
                    );
                }
            } else if (result.isDenied) {
                Swal.fire("Username wasn't deleted", "", "info");
            }
        });
    };

    if (checking) return <Spinner color="#111827" />;

    return (
        <main>
            <div className="flex items-center justify-center gap-6">
                <h1 className="text-3xl font-bold text-center my-5">Users</h1>
                <Link
                    to="/dashboard/admin/users/add"
                    className="text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                >
                    <FontAwesomeIcon icon={faUserPlus} />
                    &ensp;Add User
                </Link>
            </div>
            <div className="flex gap-6 flex-wrap items-center justify-center mb-5">
                {users.map((user, i) => (
                    <UserCard
                        activo={user.activo}
                        nombre={user.nombre}
                        rol={user.rol}
                        username={user.username}
                        key={i}
                        deleteUser={deleteUser}
                    />
                ))}
            </div>
        </main>
    );
};
