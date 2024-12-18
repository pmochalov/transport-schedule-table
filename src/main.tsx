import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Station } from "./components/Station.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "station/:stationId",
                element: <Station />,
            },
            {
                path: "hello2",
                element: <>222</>,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
