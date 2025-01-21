import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { fetchStations, resetStationsState } from "../../slices/stationsSlice";

import { Row, Col } from "antd";
import { ListOfTransport } from "./ListOfTransport";
import { TransportIcon } from "../../components/TransportIcon";

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

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <Row gutter={16}>
                <Col className='gutter-row' span={8}>
                    <ListOfTransport
                        transport='train'
                        stations={data.stations}
                        title={
                            <>
                                Поезд <TransportIcon type={"train"} />
                            </>
                        }
                        loading={loading}
                    />
                </Col>
                <Col className='gutter-row' span={8}>
                    <ListOfTransport
                        transport='plane'
                        stations={data.stations}
                        title={
                            <>
                                Самолет <TransportIcon type={"plane"} />
                            </>
                        }
                        loading={loading}
                    />
                </Col>
                <Col className='gutter-row' span={8}>
                    {" "}
                    <ListOfTransport
                        transport='bus'
                        stations={data.stations}
                        title={
                            <>
                                Автобус <TransportIcon type={"bus"} />
                            </>
                        }
                        loading={loading}
                    />
                </Col>
            </Row>
        </div>
    );
};

export { Home };
