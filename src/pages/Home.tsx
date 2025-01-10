import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import { fetchStations, resetStationsState } from "../slices/stationsSlice";
import { Link } from "react-router-dom";
// import { Layout, Col, Row, Flex } from "antd";

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

    return (
        <>
            <h1>Станции Архангельска</h1>
            <ul>
                {data.stations.map((station) => (
                    <li>
                        <Link to={`/station/${station.code}`}>
                            {station.title} ({station.station_type_name})
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export { Home };
