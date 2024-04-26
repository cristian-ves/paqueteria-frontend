import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import { useAuthStore } from "../../hooks";
import { useEffect } from "react";

export default function LoginPage() {
    const { startLogin, errorMessage } = useAuthStore();

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startLogin({
            username: data.get("username"),
            password: data.get("password"),
        });
    };

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire("Authentication failed", errorMessage, "error");
        }
    }, [errorMessage]);

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <div className="w-full max-w-xs">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4 flex justify-center">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <h1 className="text-center text-xl font-bold mb-4">
                            Sign in
                        </h1>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    autoComplete="off"
                                    autoFocus
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                />
                            </div>
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
