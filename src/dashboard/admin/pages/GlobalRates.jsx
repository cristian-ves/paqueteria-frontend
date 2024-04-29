import React, { useEffect, useRef, useState } from "react";
import { useForm } from "../../../hooks";
import paqueteriaApi from "../../../api/paqueteriaApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export const GlobalRates = () => {
    const { formState, onInputChange, setFormState } = useForm({
        precioLibra: 0,
        tarifaOperacion: 0,
    });
    const { precioLibra, tarifaOperacion } = formState;

    const [readOnly, setReadOnly] = useState(true);

    const tarifaOperacionInput = useRef(null);

    const getRates = async () => {
        try {
            const { data } = await paqueteriaApi.get("/tarifas");
            const { rates } = data;
            setFormState({
                precioLibra: rates.PrecioLibra,
                tarifaOperacion: rates.TarifaOperacion,
            });
        } catch (error) {}
    };

    const prepareEdit = async () => {
        setReadOnly(false);
        tarifaOperacionInput.current.focus();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await paqueteriaApi.put("/tarifas", {
                precioLibra: parseFloat(precioLibra),
                tarifaOperacion: parseFloat(tarifaOperacion),
            });
            Swal.fire("Global rates updated succesfully!", "", "success");
            setReadOnly(true);
        } catch (error) {
            console.log(error);
            Swal.fire(
                "Error updating the global rates",
                error.response.data.error,
                "error"
            );
        }
    };

    useEffect(() => {
        getRates();
    }, []);

    return (
        <form className="max-w-sm mx-auto my-5" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-extrabold my-5">Global Rates</h1>

            <div className="mb-5">
                <label
                    htmlFor="tarifaOperacion"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Tarifa de operacion
                </label>
                <input
                    type="number"
                    id="tarifaOperacion"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={tarifaOperacion}
                    required
                    name="tarifaOperacion"
                    onChange={onInputChange}
                    readOnly={readOnly}
                    ref={tarifaOperacionInput}
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="precioLibra"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Precio por libra
                </label>
                <input
                    type="precioLibra"
                    id="precioLibra"
                    value={precioLibra}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={onInputChange}
                    name="precioLibra"
                    readOnly={readOnly}
                />
            </div>
            <button
                type="button"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                hidden={!readOnly}
                onClick={prepareEdit}
            >
                <FontAwesomeIcon icon={faPencil} />
                &ensp;Edit rates
            </button>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                hidden={readOnly}
            >
                Submit
            </button>
        </form>
    );
};
