import { useDispatch, useSelector } from "react-redux";
import paqueteriaApi from "../api/paqueteriaApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ username, password }) => {
        dispatch(onChecking());

        const showErrorMessage = (error) => {
            localStorage.clear();
            dispatch(onLogout(error));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 100);
        };

        try {
            const { data } = await paqueteriaApi.post("/login", {
                username,
                password,
            });
            const { nombre: name, username: user, rol, activo } = data.usuario;

            if (activo) {
                localStorage.setItem("username", user);
                dispatch(
                    onLogin({
                        name,
                        username: user,
                        rol,
                    })
                );
            } else {
                showErrorMessage(
                    "This user is inactive, please contact your admin"
                );
            }
        } catch ({ response }) {
            showErrorMessage(response.data.error);
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    };

    const checkAuth = async () => {
        const username = localStorage.getItem("username");

        try {
            const { data } = await paqueteriaApi.post("/usuariou", {
                Username: username,
            });

            const { nombre: name, username: user, rol, activo } = data.usuario;

            if (activo)
                dispatch(
                    onLogin({
                        name,
                        username: user,
                        rol,
                    })
                );
            else throw new Error("User is inactive");
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    return {
        //* Properties
        errorMessage,
        status,
        user,

        //* Methods
        checkAuth,
        startLogin,
        startLogout,
    };
};
