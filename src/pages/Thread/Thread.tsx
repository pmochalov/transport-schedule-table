import * as React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { Stop } from "../../types";

import { RootState } from "../../store";
import { fetchThread, resetThreadState } from "../../slices/threadSlice";

import { Flex, Skeleton, Table } from "antd";
import type { TableProps } from "antd";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { PageTitle } from "../../components/PageTitle";

dayjs.extend(duration);

function formatDuration(seconds: number): string {
    const durationObj = dayjs.duration(seconds, "seconds");

    let result = "";

    const days = Math.floor(durationObj.asDays());
    if (days > 0) {
        result += `${days} д `;
    }

    const hours = durationObj.hours();
    if (hours > 0) {
        result += `${hours} ч `;
    }

    const minutes = durationObj.minutes();
    result += `${minutes} мин`;

    return result;
}

function getTableHeader(): TableProps<TableDataType>["columns"] {
    return [
        {
            title: "Станция",
            dataIndex: "title",
        },
        {
            title: "Прибытие",
            dataIndex: "arrival",
        },
        {
            title: "Отправление",
            dataIndex: "departure",
        },
        {
            title: "Стоянка",
            dataIndex: "stop_time",
        },
        {
            title: "Время в пути",
            dataIndex: "duration",
        },
    ];
}

type TableDataType = {
    key: string;
    title: string;
    departure: string;
    arrival: string;
    duration: number | string;
    stop_time: string;
};

const Thread: React.FC = () => {
    let { uid } = useParams();

    const dispatch = useAppDispatch();

    const { data, loading, error } = useAppSelector(
        (state: RootState) => state.thread
    );

    const columns: TableProps<TableDataType>["columns"] = getTableHeader();

    const stopsData: TableDataType[] = data.stops.map(
        (s: Stop, index: number) => {
            return {
                key: `${index}`,
                title: s.station.title,
                departure: s.departure
                    ? dayjs(s.departure).format("HH:mm")
                    : "—",
                arrival: s.arrival ? dayjs(s.arrival).format("HH:mm") : "—",
                duration: s.duration > 0 ? formatDuration(s.duration) : "—",
                stop_time: s.stop_time
                    ? `${Math.floor(s.stop_time / 60)} мин`
                    : "—",
            };
        }
    );

    React.useEffect(() => {
        if (uid) {
            dispatch(fetchThread({ uid }));
        }

        return () => {
            dispatch(resetThreadState());
        };
    }, [dispatch, uid]);

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <Flex gap='middle' vertical>
            <PageTitle
                title={`${data.number}, ${data.title}`}
                loading={loading}
            />
            <Skeleton active loading={loading} paragraph={{ rows: 12 }}>
                <p>{data.days}</p>

                <Table<TableDataType>
                    columns={columns}
                    dataSource={stopsData}
                    pagination={false}
                />
            </Skeleton>
        </Flex>
    );
};

export { Thread };
