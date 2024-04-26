import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./router/AppRouter";
import { store } from "./store";

import "normalize.css/normalize.css";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
