import * as React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
    fetchSchedule,
    resetScheduleState,
} from "../slices/schedulescheduleSlice";

import { RootState } from "../store";
import { List } from "antd";

const Station: React.FC = () => {
    let { stationId } = useParams();
    const [searchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    const { data, loading, error } = useAppSelector(
        (state: RootState) => state.schedule
    );

    React.useEffect(() => {
        const date = searchParams.get("date");
        const event = searchParams.get("event");

        if (stationId) {
            dispatch(fetchSchedule({ stationId, date, event }));
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
            <h1>
                Расписание &laquo;{data.station.title}&raquo; (
                {data.station.station_type_name})
            </h1>
            <p>
                Дата: {data.date} / {data.event}
            </p>
            <List
                bordered
                dataSource={data.schedule.map((item) => (
                    <p>
                        <Link to={`/thread/${item.thread.uid}`}>
                            {item.thread.title} {item.thread.uid}
                        </Link>
                    </p>
                ))}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </>
    );
};

export { Station };
