import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
    fetchSchedule,
    resetScheduleState,
} from "../slices/schedulescheduleSlice";

import { RootState } from "../store";
import type { DatePickerProps } from "antd";
import {
    DatePicker,
    List,
    Radio,
    RadioChangeEvent,
    Button,
    Row,
    Col,
} from "antd";
import useStationParams from "../hooks/useStationParams";

const Station: React.FC = () => {
    const { stationId } = useParams<string>();
    const { params, setSearchParams } = useStationParams();

    const { data, loading, error } = useAppSelector(
        (state: RootState) => state.schedule
    );

    const dispatch = useAppDispatch();

    const handleChangeEvent = (e: RadioChangeEvent) => {
        setSearchParams({ ...params, event: e.target.value });
    };

    const handleChangeDate: DatePickerProps["onChange"] = (
        _date,
        dateString
    ) => {
        setSearchParams({ ...params, date: dateString });
    };

    const handleSearch = () => {
        dispatch(fetchSchedule({ ...params, stationId }));
    };

    React.useEffect(() => {
        if (!stationId) {
            return;
        }

        dispatch(fetchSchedule({ ...params, stationId }));

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
            <Row gutter={{ xs: 8, sm: 16 }}>
                <Col>
                    <Radio.Group
                        value={params.event}
                        onChange={handleChangeEvent}
                        size='large'
                    >
                        <Radio.Button value='departure'>
                            Отправление
                        </Radio.Button>
                        <Radio.Button value='arrival'>Прибытие</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col>
                    <DatePicker
                        onChange={handleChangeDate}
                        size='large'
                        placeholder='Дата'
                    />
                </Col>
                <Col>
                    <Button onClick={handleSearch} type='primary' size='large'>
                        Найти
                    </Button>
                </Col>
            </Row>
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
