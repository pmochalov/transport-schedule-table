import * as React from "react";

import { Link } from "react-router-dom";
import { Station, Transport } from "../../types";

import { List, Skeleton } from "antd";

type ListOfTransportProps = {
    transport: Transport;
    stations: Station[];
    title: React.ReactNode;
    loading: boolean;
};

function filterStations(stations: Station[], type: Transport) {
    return stations.filter((s: Station) => {
        return type === s.transport_type;
    });
}

const ListOfTransport: React.FC<ListOfTransportProps> = ({
    transport,
    stations,
    title,
    loading,
}) => {
    return (
        <Skeleton loading={loading} active paragraph={{ rows: 20 }}>
            <List
                bordered
                header={<h2>{title}</h2>}
                dataSource={filterStations(stations, transport).map(
                    (station) => station
                )}
                renderItem={(station) => (
                    <List.Item>
                        <Link to={`/station/${station.code}`}>
                            {station.title}
                        </Link>
                    </List.Item>
                )}
            />
        </Skeleton>
    );
};

export { ListOfTransport };
