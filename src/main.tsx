import { createRoot } from "react-dom/client";
import "./index.css";
import { AppLayout } from "./AppLayout.tsx";
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
import { Home } from "./Home.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<AppLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path='station/:stationId' element={<Station />} />
            <Route path='thread/:uid' element={<Thread />} />
        </Route>
    )
);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
