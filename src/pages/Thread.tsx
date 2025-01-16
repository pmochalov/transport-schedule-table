import * as React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";

import { RootState } from "../store";
import { fetchThread, resetThreadState } from "../slices/threadSlice";

import { Table } from "antd";
import type { TableProps } from "antd";
import { Station, Stop } from "../types";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"; // ES 2015

dayjs.extend(duration);

/* type DataType = {
    key: string;
} & Pick<Stop, "departure" | "arrival" | "stop_time" | "duration"> &
    Pick<Station, "title">;
 */

type DataType = {
    key: string;
    title: string;
    departure: string;
    arrival: string;
    duration: number | string;
    stop_time: string;
};

function formatDuration(seconds: number): string {
    const durationObj = dayjs.duration(seconds, "seconds");

    const days = Math.floor(durationObj.asDays());
    const hours = durationObj.hours();
    const minutes = durationObj.minutes();

    return `${days} д ${hours} ч ${minutes} мин`;
}

function getTableHeader(): TableProps<DataType>["columns"] {
    return [
        {
            title: "Станция",
            dataIndex: "title",
            // key: "name",
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Прибытие",
            dataIndex: "arrival",
            // key: "age",
        },
        {
            title: "Отправление",
            dataIndex: "departure",
            // key: "address",
        },
        {
            title: "Стоянка",
            dataIndex: "stop_time",
            // key: "address",
        },
        {
            title: "Время в пути",
            dataIndex: "duration",
            // key: "address",
        },
    ];
}

const Thread: React.FC = () => {
    let { uid } = useParams();

    const dispatch = useAppDispatch();

    const { data, loading, error } = useAppSelector(
        (state: RootState) => state.thread
    );

    // Заголовок(колонки таблицы)
    const columns: TableProps<DataType>["columns"] = getTableHeader();

    React.useEffect(() => {
        if (uid) {
            dispatch(fetchThread({ uid }));
        }

        return () => {
            dispatch(resetThreadState());
        };
    }, [dispatch, uid]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    const stops: DataType[] = data.stops.map((s: Stop, index: number) => {
        return {
            key: `${index}`,
            title: s.station.title,
            departure: s.departure ? dayjs(s.departure).format("HH:mm") : "-",
            arrival: s.arrival ? dayjs(s.arrival).format("HH:mm") : "-",
            duration: s.duration > 0 ? formatDuration(s.duration) : "-",
            stop_time: s.stop_time
                ? `${Math.floor(s.stop_time / 60)} мин`
                : "-",
        };
    });

    return (
        <>
            <h1>
                №{data.number}, "{data.title}"
            </h1>
            <p>{data.days}</p>
            <div>
                <Table<DataType>
                    columns={columns}
                    dataSource={stops}
                    pagination={false}
                />
            </div>
        </>
    );
};

export { Thread };
