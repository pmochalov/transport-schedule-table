import * as React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
    fetchSchedule,
    resetScheduleState,
} from "../slices/schedulescheduleSlice";

import { RootState } from "../store";
import type { DatePickerProps } from "antd";
import { DatePicker, List, Radio, RadioChangeEvent, Button } from "antd";

const Station: React.FC = () => {
    const { stationId } = useParams<string>();

    const [searchParams, setSearchParams] = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());

    const { data, loading, error } = useAppSelector(
        (state: RootState) => state.schedule
    );

    const dispatch = useAppDispatch();

    const handleChangeEvent = (e: RadioChangeEvent) => {
        setSearchParams({ ...paramsObject, event: e.target.value });
    };

    const handleChangeDate: DatePickerProps["onChange"] = (
        _date,
        dateString
    ) => {
        setSearchParams({ ...paramsObject, date: dateString });
    };

    const handleSearch = () => {
        dispatch(fetchSchedule({ ...paramsObject, stationId }));
    };

    React.useEffect(() => {
        if (!stationId) {
            return;
        }

        dispatch(fetchSchedule({ ...paramsObject, stationId }));

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
                <Button onClick={handleSearch} type='primary' size='large'>
                    Найти
                </Button>
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
