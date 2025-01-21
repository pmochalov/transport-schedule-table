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

import { Station } from "./pages/Station/Station.tsx";
import { Thread } from "./pages/Thread/Thread.tsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.tsx";
import { Home } from "./pages/Home/Home.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<AppLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path='station/:stationId' element={<Station />} />
            <Route path='thread/:uid' element={<Thread />} />
        </Route>
    ),
    {
        basename: "/projects/rasp/",
    }
);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
