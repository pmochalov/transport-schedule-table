import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Station } from "./components/Station.tsx";
import { Thread } from "./components/Thread.tsx";
import { ErrorPage } from "./components/ErrorPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />} errorElement={<ErrorPage />}>
            <Route path='station/:stationId' element={<Station />} />
            <Route path='station/:uid' element={<Thread />} />
        </Route>
    )
);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
