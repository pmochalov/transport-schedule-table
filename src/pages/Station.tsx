import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../store";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
    fetchSchedule,
    resetScheduleState,
} from "../slices/schedulescheduleSlice";
import useStationParams from "../hooks/useStationParams";

import type { DatePickerProps } from "antd";
import {
    DatePicker,
    List,
    Radio,
    RadioChangeEvent,
    Button,
    Row,
    Col,
    Card,
    Spin,
    Space,
    Typography,
} from "antd";
const { Text } = Typography;

const dateFormat = "YYYY-MM-DD";

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

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <>
            <h1>
                Расписание: &laquo;{data.station.title}&raquo; (
                {data.station.station_type_name})
            </h1>
            <Card>
                <Row gutter={{ xs: 8, sm: 16 }}>
                    <Col>
                        <Radio.Group
                            value={params.event}
                            onChange={handleChangeEvent}
                            size='large'
                            disabled={loading}
                        >
                            <Radio.Button value='departure'>
                                Отправление
                            </Radio.Button>
                            <Radio.Button value='arrival'>
                                Прибытие
                            </Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col>
                        <DatePicker
                            onChange={handleChangeDate}
                            size='large'
                            placeholder='Дата'
                            defaultValue={dayjs(params.date, dateFormat)}
                            format={dateFormat}
                            disabled={loading}
                        />
                    </Col>
                    <Col>
                        <Space>
                            <Button
                                onClick={handleSearch}
                                disabled={loading}
                                type='primary'
                                size='large'
                            >
                                Найти
                            </Button>

                            {loading && (
                                <span>
                                    <Spin size='small' />
                                </span>
                            )}
                        </Space>
                    </Col>
                </Row>
            </Card>

            <List
                bordered={true}
                dataSource={data.schedule.map((item) => {
                    const time = dayjs(item.departure || item.arrival).format(
                        "HH:mm"
                    );

                    return (
                        <Row gutter={16}>
                            <Col xs={24} sm={3}>
                                <Text strong>{item.thread.number}</Text>
                            </Col>
                            <Col xs={20} sm={17}>
                                <Text strong>
                                    <Link to={`/thread/${item.thread.uid}`}>
                                        {item.thread.title}
                                    </Link>
                                </Text>
                                <div>{item.days}</div>
                            </Col>
                            <Col xs={2} sm={4}>
                                {time}
                            </Col>
                        </Row>
                    );
                })}
                renderItem={(item) => (
                    <List.Item style={{ display: "block" }}>{item}</List.Item>
                )}
            />
        </>
    );
};

export { Station };
