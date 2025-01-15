import * as React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";

import { RootState } from "../store";
import { fetchThread, resetThreadState } from "../slices/threadSlice";

import { Table } from "antd";
import type { TableProps } from "antd";
import { Station, Stop } from "../types";

type DataType = {
    key: string;
} & Pick<Stop, "departure" | "arrival" | "stop_time" | "duration"> &
    Pick<Station, "title">;

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
            departure: s.departure,
            arrival: s.arrival,
            duration: s.duration,
            stop_time: s.stop_time,
        };
    });

    return (
        <>
            <h1>
                №{data.number}, "{data.title}"
            </h1>
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
