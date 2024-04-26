import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import paqueteriaApi from "../../../api/paqueteriaApi";
import Swal from "sweetalert2";
import { useForm } from "../../../hooks";
import { Spinner } from "../../../auth/components/loader/Spinner";

export const UserPage = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [checked, setChecked] = useState(false);

    const { formState, onInputChange, setFormState } = useForm({
        name: "",
        password: "",
        role: "",
    });
    const { name, password, role } = formState;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await paqueteriaApi.post("/usuariou", {
                    username,
                });
                setUser(data.usuario);
            } catch (error) {
                Swal.fire("Error al cargar usuario", "", "error");
                navigate("/dashboard/admin");
            }
        };

        fetchUser();
    }, [username]);

    useEffect(() => {
        if (user.nombre && user.password && user.rol) {
            setFormState({
                name: user.nombre,
                password: "",
                role: user.rol,
            });
            setChecked(user.activo);
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newPswd = password === "" ? user.password : password;
            const body = {
                username,
                password: newPswd,
                nombre: name,
                activo: checked,
                rol: parseInt(role),
            };
            console.log(body);
            await paqueteriaApi.put("/usuario", body);
            Swal.fire("User updated succesfully!", "", "success");
        } catch (error) {
            console.log(error);
            Swal.fire(
                "Error updating the user",
                error.response.data.error,
                "error"
            );
        }
    };

    if (Object.keys(user).length === 0) return <Spinner color="#111827" />;

    return (
        <form className="max-w-sm mx-auto my-5" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-extrabold my-5">
                Edit User
                <small className="ms-2 font-semibold text-gray-500">
                    {user.username}
                </small>
            </h1>

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
                />
                <small>Leaving the password empty will not change it</small>
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
