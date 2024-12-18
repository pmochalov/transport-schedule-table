import * as React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";

import { RootState } from "../store";
import { fetchThread, resetThreadState } from "../slices/threadSlice";

const Thread: React.FC = () => {
    let { uid } = useParams();

    const dispatch = useAppDispatch();

    const { data, loading, error } = useAppSelector(
        (state: RootState) => state.thread
    );

    React.useEffect(() => {
        if (uid) {
            dispatch(fetchThread({ uid }));
        }

        return () => {
            dispatch(resetThreadState());
        };
    }, [dispatch, uid]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <>
            <h1>Ветка {data.title}</h1>
            <div>
                <ul>
                    <li>{data.number}</li>
                    <li>Остановок: {data.stops.length}</li>
                </ul>
            </div>
        </>
    );
};

export { Thread };
