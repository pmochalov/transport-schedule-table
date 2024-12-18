import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
    fetchSchedule,
    resetScheduleState,
} from "../slices/schedulescheduleSlice";

import { RootState } from "../store";

const Station: React.FC = () => {
    let { stationId } = useParams();

    const dispatch = useAppDispatch();

    const { data, loading, error } = useAppSelector(
        (state: RootState) => state.schedule
    );

    React.useEffect(() => {
        if (stationId) {
            dispatch(fetchSchedule({ stationId }));
        }

        return () => {
            dispatch(resetScheduleState());
        };
    }, [dispatch, stationId]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <>
            <h1>Расписание по станции {data.station.title}</h1>
            <div>
                {data.schedule.map((item) => (
                    <p>
                        <Link to={`/thread/${item.thread.uid}`}>
                            {item.thread.title} {item.thread.uid}
                        </Link>
                    </p>
                ))}
            </div>
        </>
    );
};

export { Station };
