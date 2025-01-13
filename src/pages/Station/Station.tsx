import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../store";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    fetchSchedule,
    resetScheduleState,
} from "../../slices/schedulescheduleSlice";
import useStationParams from "../../hooks/useStationParams";

import type { DatePickerProps } from "antd";
import { List, RadioChangeEvent, Row, Col, Typography } from "antd";
import { PageTitle } from "../../components/PageTitle";
import { SearchForm } from "./SearchForm";
const { Text } = Typography;

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

    const title = `Расписание: "${data.station.title}" (
        ${data.station.station_type_name})`;

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
            <PageTitle title={title} />
            <SearchForm
                params={params}
                handleChangeDate={handleChangeDate}
                handleChangeEvent={handleChangeEvent}
                handleSearch={handleSearch}
                loading={loading}
            />
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
