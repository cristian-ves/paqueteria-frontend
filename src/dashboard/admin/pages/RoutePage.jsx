import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import paqueteriaApi from "../../../api/paqueteriaApi";
import Swal from "sweetalert2";
import { useForm } from "../../../hooks";
import { Spinner } from "../../../auth/components/loader/Spinner";

export const RoutePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [route, setRoute] = useState({});
    const [activa, setActiva] = useState(false);

    const { formState, onInputChange, setFormState } = useForm({
        cuotaDestino: "",
    });
    const { cuotaDestino } = formState;

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const { data } = await paqueteriaApi.get("/rutaid?id=" + id);
                setRoute(data.route);
            } catch (error) {
                Swal.fire("Error loading route", "", "error");
                navigate("/dashboard/admin/");
            }
        };

        fetchRoute();
    }, [id]);

    useEffect(() => {
        if (route.CuotaDestino) {
            setFormState({
                cuotaDestino: route.CuotaDestino,
            });
            setActiva(route.Activa);
        }
    }, [route]);

    useEffect(() => {
        console.log(formState, activa);
    }, [formState, activa]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const body = {
                id: parseInt(id),
                activa,
                CuotaDestino: parseFloat(cuotaDestino),
            };
            await paqueteriaApi.put("/ruta", body);
            Swal.fire("Route updated succesfully!", "", "success");
        } catch (error) {
            console.log(error);
            Swal.fire(
                "Error updating the route",
                error.response.data.error,
                "error"
            );
        }
    };

    if (Object.keys(route).length === 0) return <Spinner color="#111827" />;

    return (
        <form className="max-w-sm mx-auto my-5" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-extrabold my-5">
                Edit Route
                <small className="ms-2 font-semibold text-gray-500">
                    Id: {route.Id}
                </small>
            </h1>

            <div className="mb-5">
                <label
                    htmlFor="cuotaDestino"
                    className="block mb-2 text-lg font-medium text-gray-900"
                >
                    Destino Id: {route.Destino}
                </label>
            </div>

            <div className="mb-5">
                <label
                    htmlFor="cuotaDestino"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Cuota Destino
                </label>
                <input
                    type="text"
                    id="cuotaDestino"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={cuotaDestino}
                    required
                    name="cuotaDestino"
                    onChange={onInputChange}
                />
            </div>

            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input
                        id="activa"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                        checked={activa}
                        onChange={() => {
                            setActiva(!activa);
                        }}
                    />
                </div>
                <label
                    htmlFor="activa"
                    className="ms-2 text-sm font-medium text-gray-900"
                >
                    Activa
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
