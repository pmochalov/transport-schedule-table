import * as React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
    fetchSchedule,
    resetScheduleState,
} from "../slices/schedulescheduleSlice";

import { RootState } from "../store";
import type { DatePickerProps } from "antd";
import { DatePicker, List, Radio, RadioChangeEvent } from "antd";

const Station: React.FC = () => {
    const [event, setEvent] = React.useState<"departure" | "arrival">(
        "departure"
    );

    const { stationId } = useParams<string>();

    const [searchParams, setSearchParams] = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());

    const dispatch = useAppDispatch();

    const { data, loading, error } = useAppSelector(
        (state: RootState) => state.schedule
    );

    const handleChangeEvent = (e: RadioChangeEvent) => {
        setEvent(e.target.value);
        setSearchParams({ ...paramsObject, event: e.target.value });
    };

    const handleChangeDate: DatePickerProps["onChange"] = (
        _date,
        dateString
    ) => {
        setSearchParams({ ...paramsObject, date: dateString });
    };

    React.useEffect(() => {
        const date = searchParams.get("date");
        const eventParam = searchParams.get("event");

        if (
            eventParam &&
            (eventParam === "departure" || eventParam === "arrival")
        ) {
            setEvent(eventParam);
        } else {
            setEvent("departure");
        }

        if (stationId) {
            dispatch(fetchSchedule({ stationId, date, event }));
        }

        return () => {
            dispatch(resetScheduleState());
        };
    }, [dispatch, stationId]);

    React.useEffect(() => {
        console.log("paramsObject: ", paramsObject);
    }, [searchParams]);

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
            <div>
                <Radio.Group
                    value={event}
                    size='large'
                    onChange={handleChangeEvent}
                >
                    <Radio.Button value='departure'>Отправление</Radio.Button>
                    <Radio.Button value='arrival'>Прибытие</Radio.Button>
                </Radio.Group>
                <DatePicker onChange={handleChangeDate} size='large' />
            </div>
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
