import * as React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";

import { RootState } from "../store";
import { fetchThread, resetThreadState } from "../slices/threadSlice";

import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Station, Stop } from "../types";

type DataType = {
    key: string;
} & Pick<Stop, "departure" | "arrival"> &
    Pick<Station, "title">;

function getTableHeader(): TableProps<DataType>["columns"] {
    return [
        {
            title: "Станция",
            dataIndex: "stationTitle",
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
            stationTitle: s.station.title,
            departure: s.departure ?? "",
            arrival: s.arrival ?? "",
        };
    });

    return (
        <>
            <h1>
                №{data.number}, "{data.title}"
            </h1>
            <div>
                <Table<DataType> columns={columns} dataSource={stops} />
            </div>
        </>
    );
};

export { Thread };
