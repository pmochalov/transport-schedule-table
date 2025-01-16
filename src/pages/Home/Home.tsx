import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { fetchStations, resetStationsState } from "../../slices/stationsSlice";
import { Link } from "react-router-dom";

import { Row, Col } from "antd";
import { Station } from "../../types";
import { Transport } from "../../types";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    const { data, loading, error } = useAppSelector(
        (state: RootState) => state.stations
    );

    React.useEffect(() => {
        dispatch(fetchStations({}));

        return () => {
            dispatch(resetStationsState());
        };
    }, [dispatch]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    function filterStations(stations: Station[], type: Transport) {
        return stations.filter((s: Station) => {
            return type === s.transport_type;
        });
    }

    return (
        <>
            <h1>Расписание вокзалов Архангельска</h1>
            <Row gutter={16}>
                <Col className='gutter-row' span={8}>
                    <h2>Поезд</h2>
                    <ul>
                        {filterStations(data.stations, "train").map(
                            (station) => (
                                <li key={station.code}>
                                    <Link to={`/station/${station.code}`}>
                                        {station.title} (
                                        {station.station_type_name})
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </Col>
                <Col className='gutter-row' span={8}>
                    <h2>Самолёт</h2>
                    <ul>
                        {filterStations(data.stations, "plane").map(
                            (station) => (
                                <li key={station.code}>
                                    <Link to={`/station/${station.code}`}>
                                        {station.title} (
                                        {station.station_type_name})
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </Col>
                <Col className='gutter-row' span={8}>
                    <h2>Автобус</h2>
                    <ul>
                        {filterStations(data.stations, "bus").map((station) => (
                            <li key={station.code}>
                                <Link to={`/station/${station.code}`}>
                                    {station.title} ({station.station_type_name}
                                    )
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </>
    );
};

export { Home };
